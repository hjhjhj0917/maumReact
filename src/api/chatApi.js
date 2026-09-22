import apiClient from './apiClient';

// ★ 즐겨찾기 이후 추가/수정
export const createChatRoomApi = async () => {
    try {
        const response = await apiClient.post('/chat/rooms');
        return response;
    } catch (error) {
        console.error("채팅방 생성 에러:", error);
        throw error;
    }
};

// ★ 즐겨찾기 이후 추가/수정
export const getChatRoomsApi = async () => {
    try {
        const response = await apiClient.get('/chat/rooms');
        return response;
    } catch (error) {
        console.error("채팅방 목록 조회 에러:", error);
        throw error;
    }
};

// ★ 즐겨찾기 이후 추가/수정
export const getRoomMessagesApi = async (chatRoomNo) => {
    try {
        const response = await apiClient.get(`/chat/rooms/${chatRoomNo}/messages`);
        return response;
    } catch (error) {
        console.error("채팅방 내역 조회 에러:", error);
        throw error;
    }
};

// ★ 즐겨찾기 이후 추가/수정
export const renameChatRoomApi = async (chatRoomNo, roomTitle) => {
    try {
        const response = await apiClient.post(`/chat/rooms/${chatRoomNo}/title`, { roomTitle });
        return response;
    } catch (error) {
        console.error("채팅방 이름변경 에러:", error);
        throw error;
    }
};

// ★ 즐겨찾기 이후 추가/수정
export const pinChatRoomApi = async (chatRoomNo, isPinned) => {
    try {
        const response = await apiClient.post(`/chat/rooms/${chatRoomNo}/pin`, { isPinned });
        return response;
    } catch (error) {
        console.error("채팅방 고정 에러:", error);
        throw error;
    }
};

// ★ 즐겨찾기 이후 추가/수정
export const deleteChatRoomApi = async (chatRoomNo) => {
    try {
        const response = await apiClient.delete(`/chat/rooms/${chatRoomNo}`);
        return response;
    } catch (error) {
        console.error("채팅방 삭제 에러:", error);
        throw error;
    }
};

// ★ 즐겨찾기 이후 추가/수정
export const synthesizeMessageAudioApi = async (chatMsgNo) => {
    try {
        const response = await apiClient.post(`/chat/messages/${chatMsgNo}/tts`);
        return response; // base64 오디오 문자열(또는 합성 실패 시 null)
    } catch (error) {
        console.error("음성 재생성 에러:", error);
        throw error;
    }
};

// ★ 즐겨찾기 이후 추가/수정
export const sttApi = async (audioBlob) => {
    try {
        const formData = new FormData();
        formData.append('audio', audioBlob, 'recording.webm');

        // apiClient의 기본 Content-Type(application/json)이 그대로 나가면 브라우저가 FormData용
        // multipart boundary를 못 붙여 Spring이 멀티파트 요청으로 인식하지 못함 — 여기서만 지워서
        // 브라우저가 자동으로 채우게 함
        const response = await apiClient.post('/stt', formData, {
            headers: { 'Content-Type': undefined }
        });
        return response;
    } catch (error) {
        console.error("음성 인식 에러:", error);
        throw error;
    }
};

// 서버가 스트림 안에서 TTS 오디오 청크를 텍스트와 구분하기 위해 이 마커로 감싸서 보냄
const AUDIO_PREFIX = '[[AUDIO]]';
const AUDIO_SUFFIX = '[[/AUDIO]]';

// ★ 즐겨찾기 이후 추가/수정
const extractAudioBase64 = (text) => {
    if (text.startsWith(AUDIO_PREFIX) && text.endsWith(AUDIO_SUFFIX)) {
        return text.slice(AUDIO_PREFIX.length, -AUDIO_SUFFIX.length);
    }
    return null;
};

// 서버가 정책/기관 추천 카드를 JSON 배열로 보낼 때 텍스트와 구분하기 위해 감싸는 마커
const CARD_PREFIX = '[[CARD]]';
const CARD_SUFFIX = '[[/CARD]]';

// ★ 즐겨찾기 이후 추가/수정
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

// ★ 즐겨찾기 이후 추가/수정
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

// ★ 즐겨찾기 이후 추가/수정
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