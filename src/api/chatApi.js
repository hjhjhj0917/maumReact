import apiClient from './apiClient';

export const getChatHistoryApi = async () => {
    try {
        const response = await apiClient.get('/chat/history');
        return response;
    } catch (error) {
        console.error("채팅 내역 불러오기 에러:", error);
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

// 한 줄(data: 이후 내용)을 텍스트/오디오/카드로 구분해서 각각의 콜백으로 전달
const dispatchLine = (rawText, onChunk, onAudio, onCards) => {
    let text = rawText;
    if (text.startsWith(' ')) {
        text = text.substring(1);
    }

    if (!text || text === '[DONE]') return;

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

export const streamChatApi = async (message, onChunk, onAudio, onCards, onError, onComplete) => {
    try {
        const response = await fetch('/api/v1/chat/stream', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'text/event-stream'
            },
            credentials: 'include',
            body: JSON.stringify({ message })
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
                    dispatchLine(line.substring(5), onChunk, onAudio, onCards);
                }
            }
        }

        if (buffer.startsWith('data:')) {
            dispatchLine(buffer.substring(5), onChunk, onAudio, onCards);
        }

        onComplete();
    } catch (error) {
        console.error("채팅 스트리밍 에러:", error);
        onError('연결에 문제가 발생했습니다.');
    }
};