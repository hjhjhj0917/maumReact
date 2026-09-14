import apiClient from './apiClient';

export const createChatRoomApi = async () => {
    try {
        const response = await apiClient.post('/chat/rooms');
        return response;
    } catch (error) {
        console.error("채팅방 생성 에러:", error);
        throw error;
    }
};

export const getChatRoomsApi = async () => {
    try {
        const response = await apiClient.get('/chat/rooms');
        return response;
    } catch (error) {
        console.error("채팅방 목록 조회 에러:", error);
        throw error;
    }
};

export const getRoomMessagesApi = async (chatRoomNo) => {
    try {
        const response = await apiClient.get(`/chat/rooms/${chatRoomNo}/messages`);
        return response;
    } catch (error) {
        console.error("채팅방 내역 조회 에러:", error);
        throw error;
    }
};

export const renameChatRoomApi = async (chatRoomNo, roomTitle) => {
    try {
        const response = await apiClient.post(`/chat/rooms/${chatRoomNo}/title`, { roomTitle });
        return response;
    } catch (error) {
        console.error("채팅방 이름변경 에러:", error);
        throw error;
    }
};

export const pinChatRoomApi = async (chatRoomNo, isPinned) => {
    try {
        const response = await apiClient.post(`/chat/rooms/${chatRoomNo}/pin`, { isPinned });
        return response;
    } catch (error) {
        console.error("채팅방 고정 에러:", error);
        throw error;
    }
};

export const deleteChatRoomApi = async (chatRoomNo) => {
    try {
        const response = await apiClient.delete(`/chat/rooms/${chatRoomNo}`);
        return response;
    } catch (error) {
        console.error("채팅방 삭제 에러:", error);
        throw error;
    }
};

// 마이크로 녹음한 오디오(webm/opus)를 서버로 올려서 텍스트로 변환함 (GCP Speech-to-Text)
export const sttApi = async (audioBlob) => {
    try {
        const formData = new FormData();
        formData.append('audio', audioBlob, 'recording.webm');

        // apiClient 인스턴스 기본 헤더(Content-Type: application/json)가 그대로 나가면
        // 브라우저가 FormData용 multipart boundary를 못 붙여서 Spring이 멀티파트 요청으로
        // 인식을 못 함 — 이 요청에서만 명시적으로 지워서 브라우저가 자동으로 채우게 함
        const response = await apiClient.post('/stt', formData, {
            headers: { 'Content-Type': undefined }
        });
        return response;
    } catch (error) {
        console.error("음성 인식 에러:", error);
        throw error;
    }
};

// TTS 오디오 라인인지 확인하고, 맞다면 base64 오디오 데이터만 추출함
const AUDIO_PREFIX = '[[AUDIO]]';
const AUDIO_SUFFIX = '[[/AUDIO]]';

const extractAudioBase64 = (text) => {
    if (text.startsWith(AUDIO_PREFIX) && text.endsWith(AUDIO_SUFFIX)) {
        return text.slice(AUDIO_PREFIX.length, -AUDIO_SUFFIX.length);
    }
    return null;
};

// 정책/기관 카드 라인인지 확인하고, 맞다면 JSON 배열로 파싱해서 반환함
const CARD_PREFIX = '[[CARD]]';
const CARD_SUFFIX = '[[/CARD]]';

const extractCards = (text) => {
    if (!text.startsWith(CARD_PREFIX) || !text.endsWith(CARD_SUFFIX)) {
        return null;
    }
    try {
        return JSON.parse(text.slice(CARD_PREFIX.length, -CARD_SUFFIX.length));
    } catch (error) {
        console.error("카드 데이터 파싱 에러:", error);
        return null;
    }
};

// 텍스트 전송이 끝났음을 알리는 마커 (오디오는 이 이후에 이어서 옴)
const TEXT_DONE_MARKER = '[[TEXT_DONE]]';

// 한 줄(data: 이후 내용)을 텍스트/오디오/카드/완료신호로 구분해서 각각의 콜백으로 전달
const dispatchLine = (rawText, onChunk, onAudio, onCards, onTextDone) => {
    let text = rawText;
    if (text.startsWith(' ')) {
        text = text.substring(1);
    }

    if (!text || text === '[DONE]') return;

    if (text === TEXT_DONE_MARKER) {
        onTextDone();
        return;
    }

    const audioBase64 = extractAudioBase64(text);
    if (audioBase64) {
        onAudio(audioBase64);
        return;
    }

    const cards = extractCards(text);
    if (cards) {
        onCards(cards);
        return;
    }

    text = text.split('<br>').join('  \n').split('<sp>').join(' ');
    onChunk(text);
};

export const streamChatApi = async (chatRoomNo, message, onChunk, onAudio, onCards, onTextDone, onError, onComplete) => {
    try {
        const response = await fetch('/api/v1/chat/stream', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'text/event-stream'
            },
            credentials: 'include',
            body: JSON.stringify({ chatRoomNo, message })
        });

        if (!response.ok) {
            throw new Error(`서버 에러: ${response.status}`);
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder('utf-8');
        let buffer = '';

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');

            buffer = lines.pop();

            for (let line of lines) {
                if (line.startsWith('data:')) {
                    dispatchLine(line.substring(5), onChunk, onAudio, onCards, onTextDone);
                }
            }
        }

        if (buffer.startsWith('data:')) {
            dispatchLine(buffer.substring(5), onChunk, onAudio, onCards, onTextDone);
        }

        onComplete();
    } catch (error) {
        console.error("채팅 스트리밍 에러:", error);
        onError('연결에 문제가 발생했습니다.');
    }
};