import { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
    streamChatApi, createChatRoomApi, getChatRoomsApi, getRoomMessagesApi
} from '../../api/chatApi';

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

    // TTS 오디오를 문장 순서대로 재생하기 위한 큐
    const audioQueueRef = useRef([]);
    const isPlayingAudioRef = useRef(false);

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
    const playNextAudio = () => {
        if (audioQueueRef.current.length === 0) {
            isPlayingAudioRef.current = false;
            return;
        }

        isPlayingAudioRef.current = true;
        const audio = audioQueueRef.current.shift();

        audio.onended = playNextAudio;
        audio.onerror = playNextAudio; // 재생 실패해도 다음 문장은 이어서 재생

        audio.play().catch(error => {
            console.error("오디오 재생 에러:", error);
            playNextAudio();
        });
    };

    // base64로 받은 문장 단위 오디오를 큐에 넣고, 재생 중이 아니면 바로 재생 시작
    const handleAudioChunk = (base64Audio) => {
        const audio = new Audio(`data:audio/mp3;base64,${base64Audio}`);
        audioQueueRef.current.push(audio);

        if (!isPlayingAudioRef.current) {
            playNextAudio();
        }
    };

    // 정책/기관 카드 데이터를 답변 텍스트와 별개로 마지막 봇 메시지에 붙임
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
        messagesEndRef, textareaRef, sendMessage, handleKeyDown, handleInputResize
    };
};
