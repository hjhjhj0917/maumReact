import styled, { keyframes } from 'styled-components';

const gradientGlow = keyframes`
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
`;

const slideUpFadeIn = keyframes`
    0% { transform: translateY(20px); opacity: 0; }
    15% { transform: translateY(0); opacity: 1; }
    85% { transform: translateY(0); opacity: 1; }
    100% { transform: translateY(20px); opacity: 0; }
`;

export const ChatContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100%; /* max-width 800px를 해제하여 좌우 빈 공간에서도 스크롤 이벤트를 잡습니다. */
    margin: 0 auto;
    background-color: transparent;
    position: relative;

    /* 최상단 부모 요소에 스크롤 부여 */
    overflow-y: auto;

    /* 스크롤바 완전 숨김 처리 */
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
        display: none;
    }

    &::before {
        content: '';
        position: fixed;
        top: 0;
        left: 50%; /* fixed 요소이므로 화면 중앙에 고정되도록 추가 */
        transform: translateX(-50%);
        width: 100%;
        max-width: 800px;
        height: 120px;
        background: linear-gradient(to bottom,
        rgba(255, 255, 255, 1) 0%,
        rgba(255, 255, 255, 1) 60px,
        rgba(255, 255, 255, 0.8) 90px,
        rgba(255, 255, 255, 0) 100%
        );
        pointer-events: none;
        z-index: 10;
    }
`;

export const EmptyStateContainer = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    width: 100%;
    margin-top: 40px;
`;

export const SuggestionContainer = styled.div`
    display: flex;
    gap: 12px;
    justify-content: center;
    flex-wrap: wrap;
    width: 100%;
    max-width: 760px;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
        gap: 10px;
    }
`;

export const SuggestionButton = styled.button`
    display: flex;
    align-items: center;
    gap: 8px;
    background-color: #ffffff;
    border: 1px solid #e5e5e5;
    border-radius: 20px;
    padding: 12px 18px;
    font-size: 13px;
    color: #444;
    cursor: pointer;
    transition: background-color 0.2s ease;
    line-height: 1.4;

    &:hover {
        background-color: #f9f9f9;
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    i {
        font-size: 14px;
        color: #666;
        flex-shrink: 0;
    }

    @media (max-width: 768px) {
        width: 100%;
        max-width: 340px;
        text-align: left;
    }
`;

export const BottomInputArea = styled.div`
    width: 100%;
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
    position: sticky;
    bottom: 0;
    padding-bottom: 60px;
    background: linear-gradient(to top, rgba(255,255,255,1) 80%, rgba(255,255,255,0) 100%);
    z-index: 20;

    @media (max-width: 768px) {
        padding-bottom: calc(95px + env(safe-area-inset-bottom, 0px));
        padding: 10px 15px;
    }
`;

export const MessageList = styled.div`
    flex-grow: 1;
    width: 100%;
    max-width: 800px; /* 해제했던 800px 너비 제한을 내용물 영역인 여기서 잡아줍니다. */
    margin: 0 auto;   /* 메시지 리스트를 화면 정중앙에 배치 */
    padding: 120px 20px 40px;
    display: flex;
    flex-direction: column;
    gap: 40px;

    /* 하위 컴포넌트의 독자적인 스크롤 기능을 모두 제거했습니다. */

    @media (max-width: 768px) {
        padding: 100px 15px 20px;
        gap: 24px;
    }
`;

export const MessageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: ${({ $isUser }) => ($isUser ? 'flex-end' : 'flex-start')};
    width: 100%;
`;

export const Bubble = styled.div`
    max-width: 85%;
    padding: ${({ $isUser }) => ($isUser ? '12px 20px' : '0')};
    border-radius: 24px;
    font-size: 16px;
    line-height: 1.6;
    white-space: pre-wrap;
    word-break: break-word;
    background-color: ${({ $isUser }) => ($isUser ? '#ffffff' : 'transparent')};
    color: #0d0d0d;
    box-shadow: ${({ $isUser }) => ($isUser ? '0 2px 8px rgba(0, 0, 0, 0.15)' : 'none')};

    p { margin: 0 0 12px 0; }
    p:last-child { margin: 0; }
    strong { font-weight: 600; }
    ul, ol { margin-top: 4px; padding-left: 20px; }
    li { margin-bottom: 4px; }
`;

export const MessageActions = styled.div`
    display: flex;
    justify-content: ${({ $isUser }) => ($isUser ? 'flex-end' : 'flex-start')};
    width: 100%;
    margin-top: 6px;
    padding: 0 10px;
`;

export const ActionIcon = styled.button`
    background: none;
    border: none;
    color: #8e8e8e;
    cursor: pointer;
    font-size: 14px;
    padding: 12px 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.2s;

    &:hover {
        color: #333333;
    }
`;

export const InputWrapper = styled.div`
    display: flex;
    align-items: flex-end;
    width: 100%;
    min-height: 64px;
    padding: 12px 16px 12px 24px;
    border-radius: 36px;
    position: relative;
    box-sizing: border-box;
    z-index: 1;
    background-color: transparent;

    &::before {
        content: '';
        position: absolute;
        inset: -2px;
        border-radius: 38px;
        background: linear-gradient(
                115deg,
                #FFD700, #66CDAA, #4B0082, #00BFFF, #1E3A8A, #556B2F, #FF3B30, #FFA500, #9E9E9E, #FFD700
        );
        background-size: 300% 300%;
        animation: ${gradientGlow} 6s ease infinite;
        filter: blur(10px);
        opacity: 0.5;
        z-index: -2;
        pointer-events: none;
        transition: opacity 0.3s, filter 0.3s;
    }

    &::after {
        content: '';
        position: absolute;
        inset: -2px;
        border-radius: 38px;
        background:
                linear-gradient(#ffffff, #ffffff) padding-box,
                linear-gradient(
                        115deg,
                        #FFD700, #66CDAA, #4B0082, #00BFFF, #1E3A8A, #556B2F, #FF3B30, #FFA500, #9E9E9E, #FFD700
                ) border-box;
        border: 2px solid transparent;
        background-size: 100% 100%, 300% 300%;
        animation: ${gradientGlow} 6s ease infinite;
        z-index: -1;
        pointer-events: none;
    }

    &:focus-within::before {
        opacity: 0.8;
        filter: blur(14px);
    }
`;

export const StyledTextarea = styled.textarea`
    flex-grow: 1;
    border: none;
    background: transparent;
    resize: none;
    max-height: 200px;
    min-height: 28px;
    padding: 6px 12px 6px 0;
    margin-bottom: 2px;
    font-size: 16px;
    line-height: 1.5;
    outline: none;
    color: #0d0d0d;
    width: 100%;

    &::placeholder {
        color: #8e8e8e;
    }
`;

export const RightActions = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

export const SendButton = styled.button`
    background-color: ${({ disabled }) => (disabled ? '#e5e5e5' : '#000000')};
    color: ${({ disabled }) => (disabled ? '#a3a3a3' : '#ffffff')};
    border: none;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
    transition: background-color 0.2s, color 0.2s;
    margin-bottom: 1px;
    flex-shrink: 0;

    &:hover {
        background-color: ${({ disabled }) => (disabled ? '#e5e5e5' : '#333333')};
    }

    i {
        font-size: 16px;
    }
`;

export const ThinkingIndicator = styled.div`
    font-size: 14px;
    color: #666;
    display: flex;
    align-items: center;
    gap: 8px;
    animation: pulse 1.5s infinite;

    @keyframes pulse {
        0% { opacity: 0.5; }
        50% { opacity: 1; }
        100% { opacity: 0.5; }
    }
`;

export const ToastNotification = styled.div`
    position: fixed;
    bottom: 40px;
    right: 40px;
    background-color: #e5e5e5;
    color: #333333;
    padding: 12px 24px;
    border-radius: 12px;
    font-size: 15px;
    font-weight: 500;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    z-index: 9999;
    animation: ${slideUpFadeIn} 2.5s ease-in-out forwards;
`;