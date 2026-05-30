import styled, { keyframes } from 'styled-components';

const float = keyframes`
    0% { transform: translateY(0px); }
    50% { transform: translateY(-15px); }
    100% { transform: translateY(0px); }
`;

export const NotFoundContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    /* 따뜻하고 편안한 오프화이트 ~ 연한 그레이 배경 */
    background: linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%);
    font-family: 'Pretendard', sans-serif;
    text-align: center;
    padding: 20px;
`;

export const ErrorCode = styled.h1`
    font-size: 140px;
    font-weight: 800;
    margin: 0;
    line-height: 1;
    animation: ${float} 4s ease-in-out infinite;
    
    /* 기존 챗봇 인풋창에 쓰신 따뜻한 무지개/선셋 그라데이션 재사용 */
    background: linear-gradient(
        115deg,
        #FFD700, #FFA500, #FF3B30, #4B0082, #00BFFF
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    opacity: 0.8;
    filter: drop-shadow(0px 8px 16px rgba(0, 0, 0, 0.08));
`;

export const Title = styled.h2`
    font-size: 28px;
    font-weight: 700;
    color: #222;
    margin: 30px 0 16px;
    word-break: keep-all;
`;

export const Description = styled.p`
    font-size: 16px;
    color: #666;
    line-height: 1.6;
    margin-bottom: 40px;
    max-width: 420px;
    word-break: keep-all;
`;

export const HomeButton = styled.button`
    background-color: #222;
    color: #ffffff;
    border: none;
    border-radius: 30px;
    padding: 16px 36px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 10px;

    &:hover {
        background-color: #000;
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
    }

    &:active {
        transform: translateY(1px);
    }
    
    i {
        font-size: 14px;
    }
`;