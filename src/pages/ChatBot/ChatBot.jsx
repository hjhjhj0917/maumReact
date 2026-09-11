import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useChatBot } from '../../hooks/chatbot/useChatBot';
import * as S from '../../style/pages/ChatBot/ChatBot.styles';

const ChatBot = () => {
    const {
        messages, input, setInput, isStreaming, isWaiting,
        messagesEndRef, textareaRef, sendMessage, handleKeyDown, handleInputResize
    } = useChatBot();
    const [toastState, setToastState] = useState({ show: false, message: '' });

    const suggestions = [
        {icon: 'fa-solid fa-hashtag', text: '나 요즘 지치고 힘들다. 예전에 나는 언제 기분이 좋았었지?'},
        {icon: 'fa-solid fa-hashtag', text: '나 요즘 우울한데, 어디서 상담 같은 걸 받아볼 수 없을까?'},
        {icon: 'fa-solid fa-hashtag', text: '다음 달 월세 낼 돈도 부족한데, 내가 받을 수 있는 지원금이 있을까?'},
        {icon: 'fa-solid fa-hashtag', text: '오늘 저녁 메뉴 추천해줘.'}
    ];

    const isEmptyState = messages.length === 0;

    const handleCopy = async (text) => {
        if (!text) return;
        try {
            await navigator.clipboard.writeText(text);
            setToastState({ show: true, message: '클립보드에 복사됨' });
            setTimeout(() => {
                setToastState({ show: false, message: '' });
            }, 2500);
        } catch (err) {
            console.error(err);
        }
    };

    const renderInputArea = () => (
        <S.InputWrapper>
            <S.StyledTextarea
                ref={textareaRef}
                rows={1}
                placeholder="대화 내용을 입력해주세요."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onInput={handleInputResize}
                onKeyDown={handleKeyDown}
                disabled={isStreaming}
            />
            <S.RightActions>
                <S.SendButton onClick={sendMessage} disabled={!input.trim() || isStreaming}>
                    <i className="fa-solid fa-arrow-up"></i>
                </S.SendButton>
            </S.RightActions>
        </S.InputWrapper>
    );

    return (
        <S.ChatContainer>
            {isEmptyState ? (
                <S.EmptyStateContainer>
                    <S.SuggestionContainer>
                        {suggestions.map((item, idx) => (
                            <S.SuggestionButton
                                key={idx}
                                onClick={() => setInput(item.text)}
                                disabled={isStreaming}
                            >
                                <i className={item.icon}></i>
                                {item.text}
                            </S.SuggestionButton>
                        ))}
                    </S.SuggestionContainer>
                </S.EmptyStateContainer>
            ) : (
                <S.MessageList>
                    {messages.map((msg, index) => {
                        const cleanContent = msg.content.replace(/<think>[\s\S]*?(?:<\/think>|$)/gi, '');
                        const isThinking = msg.role === 'bot' && msg.content.includes('<think>') && cleanContent.trim() === '';

                        let thinkingText = '';
                        if (msg.content.includes('<think>')) {
                            const match = msg.content.match(/<think>([\s\S]*?)(?:<\/think>|$)/i);
                            if (match) thinkingText = match[1];
                        }

                        const textToCopy = msg.role === 'user' ? msg.content : cleanContent;
                        const isMessageStreaming = isStreaming && index === messages.length - 1;

                        return (
                            <S.MessageWrapper key={index} $isUser={msg.role === 'user'}>
                                {msg.cards && msg.cards.length > 0 && (
                                    <S.CardList>
                                        {msg.cards.map((card, cardIdx) => (
                                            <S.InfoCard key={cardIdx}>
                                                <S.CardTitle>{card.name}</S.CardTitle>
                                                {card.type === 'welfare' ? (
                                                    <>
                                                        {card.target && <S.CardRow><span>대상</span>{card.target}</S.CardRow>}
                                                        {card.summary && <S.CardRow><span>내용</span>{card.summary}</S.CardRow>}
                                                        {card.method && <S.CardRow><span>신청</span>{card.method}</S.CardRow>}
                                                    </>
                                                ) : (
                                                    <>
                                                        {card.category && <S.CardRow><span>구분</span>{card.category}</S.CardRow>}
                                                        {card.address && <S.CardRow><span>주소</span>{card.address}</S.CardRow>}
                                                        {card.contact && <S.CardRow><span>연락처</span>{card.contact}</S.CardRow>}
                                                    </>
                                                )}
                                            </S.InfoCard>
                                        ))}
                                    </S.CardList>
                                )}
                                <S.Bubble $isUser={msg.role === 'user'}>
                                    {isThinking && (
                                        <S.ThinkingIndicator>
                                            <i className="fa-solid fa-circle-notch fa-spin"></i>
                                            {thinkingText || '생각하는 중...'}
                                        </S.ThinkingIndicator>
                                    )}
                                    {msg.role === 'user' ? (
                                        msg.content
                                    ) : cleanContent ? (
                                        isMessageStreaming ? (
                                            // 스트리밍 중에는 매 글자마다 마크다운을 다시 파싱하면서
                                            // 목록 등이 중간 상태로 깨진 채 DOM에 남는 문제가 있어서,
                                            // 스트리밍 중엔 그냥 텍스트로만 보여주고 완료된 후에만 마크다운을 적용함
                                            <>{cleanContent}{' ▌'}</>
                                        ) : (
                                            <ReactMarkdown>{cleanContent}</ReactMarkdown>
                                        )
                                    ) : (
                                        !isThinking && isMessageStreaming ? ' ▌' : null
                                    )}
                                </S.Bubble>

                                {textToCopy.trim().length > 0 && (
                                    <S.MessageActions $isUser={msg.role === 'user'}>
                                        <S.ActionIcon onClick={() => handleCopy(textToCopy)}>
                                            <i className="fa-regular fa-copy"></i>
                                        </S.ActionIcon>
                                    </S.MessageActions>
                                )}
                            </S.MessageWrapper>
                        );
                    })}
                    {isStreaming && isWaiting && (
                        <S.MessageWrapper $isUser={false}>
                            <S.Bubble $isUser={false}>
                                <S.ThinkingIndicator>
                                    <i className="fa-solid fa-circle-notch fa-spin"></i>
                                    마음이 답변을 생성하고 있습니다...
                                </S.ThinkingIndicator>
                            </S.Bubble>
                        </S.MessageWrapper>
                    )}
                    <div ref={messagesEndRef} />
                </S.MessageList>
            )}

            <S.BottomInputArea>
                {renderInputArea()}
            </S.BottomInputArea>

            {toastState.show && (
                <S.ToastNotification>
                    {toastState.message}
                </S.ToastNotification>
            )}
        </S.ChatContainer>
    );
};

export default ChatBot;