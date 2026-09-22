import { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
    streamChatApi, createChatRoomApi, getChatRoomsApi, getRoomMessagesApi, synthesizeMessageAudioApi
} from '../../api/chatApi';

// ★ 즐겨찾기 이후 추가/수정
export const useChatBot = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const roomParam = searchParams.get('room');

    const [currentRoomNo, setCurrentRoomNo] = useState(roomParam ? Number(roomParam) : null);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isStreaming, setIsStreaming] = useState(false);
    const [isWaiting, setIsWaiting] = useState(false);
    const [isTextDone, setIsTextDone] = useState(false); // 텍스트 전송 완료 시점(오디오는 이후에도 계속 옴) — 이 시점부터 마크다운 렌더링 가능
    const [isLoading, setIsLoading] = useState(true);
    const messagesEndRef = useRef(null);
    const textareaRef = useRef(null);

    // TTS 오디오를 문장 순서대로 재생하기 위한 큐 (자동재생 대신, 사용자가 버튼을 눌렀을 때만 재생함)
    const audioQueueRef = useRef([]);
    const isPlayingAudioRef = useRef(false);
    const currentAudioRef = useRef(null); // 지금 재생 중인 오디오 (바지-인/정지 시 즉시 멈추기 위해 따로 참조를 들고 있음)
    const [speakingIndex, setSpeakingIndex] = useState(null); // 지금 소리로 재생 중인 메시지의 인덱스 (버튼 표시용)
    const [synthesizingIndex, setSynthesizingIndex] = useState(null); // 과거 내역의 오디오를 재생성하는 동안(버튼 로딩 표시용)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleInputResize = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${Math.min(textarea.scrollHeight, 84)}px`;
        }
    };

    useEffect(() => {
        handleInputResize();
    }, [input]);

    // URL에 ?room= 이 있으면 그 방을 그대로 씀. 없으면(사이드바를 거치지 않고 /chatbot으로
    // 바로 들어온 경우) 기존 방 중 가장 최근 걸 골라 쓰고, 방이 하나도 없으면 새로 만듦
    useEffect(() => {
        if (roomParam) {
            setCurrentRoomNo(Number(roomParam));
            return;
        }

        const pickRoom = async () => {
            try {
                const roomList = await getChatRoomsApi();
                let targetRoomNo;
                if (roomList && roomList.length > 0) {
                    targetRoomNo = roomList[0].chatRoomNo;
                } else {
                    const newRoom = await createChatRoomApi();
                    targetRoomNo = newRoom.chatRoomNo;
                }
                setCurrentRoomNo(targetRoomNo);
                setSearchParams({ room: targetRoomNo });
            } catch (error) {
                console.error(error);
                setIsLoading(false);
            }
        };
        pickRoom();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [roomParam]);

    // 선택된 채팅방이 바뀌면 그 방의 대화 내역을 불러옴
    useEffect(() => {
        if (!currentRoomNo) return;

        const fetchMessages = async () => {
            setIsLoading(true);
            try {
                const history = await getRoomMessagesApi(currentRoomNo);
                setMessages(history || []);
            } catch (error) {
                console.error(error);
                setMessages([]);
            } finally {
                setIsLoading(false);
            }
        };
        fetchMessages();
    }, [currentRoomNo]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // 큐에 쌓인 오디오를 순서대로 하나씩 재생함
    // ★ 즐겨찾기 이후 추가/수정
    const playNextAudio = (index) => {
        if (audioQueueRef.current.length === 0) {
            isPlayingAudioRef.current = false;
            setSpeakingIndex(null);
            return;
        }

        isPlayingAudioRef.current = true;
        const audio = audioQueueRef.current.shift();
        currentAudioRef.current = audio;

        audio.onended = () => playNextAudio(index);
        audio.onerror = () => playNextAudio(index); // 재생 실패해도 다음 문장은 이어서 재생

        audio.play().catch(error => {
            console.error("오디오 재생 에러:", error);
            playNextAudio(index);
        });
    };

    // base64로 받은 문장 단위 오디오를 자동 재생하지 않고, 해당 메시지에 쌓아만 둠
    // (사용자가 스피커 버튼을 눌렀을 때 playMessageAudio로 재생)
    // ★ 즐겨찾기 이후 추가/수정
    const handleAudioChunk = (base64Audio) => {
        setMessages(prev => {
            const lastMessage = prev[prev.length - 1];
            if (lastMessage && lastMessage.role === 'bot') {
                const newMessages = [...prev];
                const lastIndex = newMessages.length - 1;
                const audioChunks = [...(newMessages[lastIndex].audioChunks || []), base64Audio];
                newMessages[lastIndex] = { ...newMessages[lastIndex], audioChunks };
                return newMessages;
            } else {
                return [...prev, { role: 'bot', content: '', audioChunks: [base64Audio] }];
            }
        });
    };

    // 챗봇 음성 재생을 즉시 중단함 (바지-인: 마이크로 말하기 시작할 때, 또는 스피커 버튼으로 정지할 때 호출)
    // ★ 즐겨찾기 이후 추가/수정
    const stopSpeaking = () => {
        if (currentAudioRef.current) {
            currentAudioRef.current.onended = null;
            currentAudioRef.current.onerror = null;
            currentAudioRef.current.pause();
            currentAudioRef.current = null;
        }
        audioQueueRef.current = [];
        isPlayingAudioRef.current = false;
        setSpeakingIndex(null);
    };

    // ★ 즐겨찾기 이후 추가/수정
    const playAudioChunks = (index, audioChunks) => {
        audioQueueRef.current = audioChunks.map(
            base64Audio => new Audio(`data:audio/mp3;base64,${base64Audio}`)
        );
        setSpeakingIndex(index);
        playNextAudio(index);
    };

    // 특정 메시지(index)에 쌓인 오디오 조각들을 순서대로 재생함. 이미 재생 중이면 정지시킴(토글)
    // 라이브 스트리밍 중 받은 audioChunks가 없고(=채팅방을 나갔다 돌아온 경우) hasAudio만 true면,
    // 저장된 텍스트로 TTS를 다시 합성해서 재생함(음성 데이터 자체는 저장하지 않으므로)
    // ★ 즐겨찾기 이후 추가/수정
    const playMessageAudio = async (index) => {
        if (speakingIndex === index) {
            stopSpeaking();
            return;
        }

        stopSpeaking();

        const message = messages[index];
        if (!message) return;

        if (message.audioChunks?.length) {
            playAudioChunks(index, message.audioChunks);
            return;
        }

        if (message.hasAudio && message.chatMsgNo) {
            setSynthesizingIndex(index);
            try {
                const audioChunks = await synthesizeMessageAudioApi(message.chatMsgNo);
                if (!audioChunks?.length) return;

                setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[index] = { ...newMessages[index], audioChunks };
                    return newMessages;
                });
                playAudioChunks(index, audioChunks);
            } catch (error) {
                console.error("음성 재생성 에러:", error);
            } finally {
                setSynthesizingIndex(null);
            }
        }
    };

    // 정책/기관 카드 데이터를 답변 텍스트와 별개로 마지막 봇 메시지에 붙임
    // ★ 즐겨찾기 이후 추가/수정
    const handleCardsChunk = (cards) => {
        setMessages(prev => {
            const lastMessage = prev[prev.length - 1];
            if (lastMessage && lastMessage.role === 'bot') {
                const newMessages = [...prev];
                const lastIndex = newMessages.length - 1;
                newMessages[lastIndex] = { ...newMessages[lastIndex], cards };
                return newMessages;
            } else {
                return [...prev, { role: 'bot', content: '', cards }];
            }
        });
    };

    // ★ 즐겨찾기 이후 추가/수정
    const sendMessage = async () => {
        if (!input.trim() || isStreaming || !currentRoomNo) return;

        const userMessage = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setIsStreaming(true);
        setIsWaiting(true);
        setIsTextDone(false);

        await streamChatApi(
            currentRoomNo,
            userMessage,
            (chunk) => {
                setIsWaiting(false);
                setMessages(prev => {
                    const lastMessage = prev[prev.length - 1];
                    if (lastMessage && lastMessage.role === 'bot') {
                        const newMessages = [...prev];
                        const lastIndex = newMessages.length - 1;
                        newMessages[lastIndex] = {
                            ...newMessages[lastIndex],
                            content: newMessages[lastIndex].content + chunk
                        };
                        return newMessages;
                    } else {
                        return [...prev, { role: 'bot', content: chunk }];
                    }
                });
            },
            handleAudioChunk,
            handleCardsChunk,
            () => setIsTextDone(true),
            (error) => {
                console.error(error);
                setIsStreaming(false);
                setIsWaiting(false);
            },
            () => {
                setIsStreaming(false);
                setIsWaiting(false);
                // 방금 보낸 메시지로 방 제목/최근순서가 바뀌었을 수 있으니 사이드바에 알려서 갱신시킴
                window.dispatchEvent(new Event('chat-updated'));
            }
        );
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return {
        messages, input, setInput, isStreaming, isWaiting, isLoading, isTextDone,
        messagesEndRef, textareaRef, sendMessage, handleKeyDown, handleInputResize,
        stopSpeaking, playMessageAudio, speakingIndex, synthesizingIndex
    };
};
