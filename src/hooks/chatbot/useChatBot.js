import { useState, useRef, useEffect } from 'react';
import { streamChatApi, getChatHistoryApi } from '../../api/chatApi';

export const useChatBot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isStreaming, setIsStreaming] = useState(false);
    const [isWaiting, setIsWaiting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const messagesEndRef = useRef(null);
    const textareaRef = useRef(null);

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

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const history = await getChatHistoryApi();
                if (history && history.length > 0) {
                    const formattedHistory = history.map(msg => ({
                        ...msg,
                        content: msg.role === 'bot'
                            ? msg.content.split('<br>').join('  \n').split('<sp>').join(' ')
                            : msg.content
                    }));
                    setMessages(formattedHistory);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchHistory();
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim() || isStreaming) return;

        const userMessage = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setIsStreaming(true);
        setIsWaiting(true);

        await streamChatApi(
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
            (error) => {
                console.error(error);
                setIsStreaming(false);
                setIsWaiting(false);
            },
            () => {
                setIsStreaming(false);
                setIsWaiting(false);
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
        messages, input, setInput, isStreaming, isWaiting, isLoading,
        messagesEndRef, textareaRef, sendMessage, handleKeyDown, handleInputResize
    };
};