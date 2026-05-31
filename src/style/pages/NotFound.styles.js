import styled, { keyframes, css } from 'styled-components';

// const float = keyframes`
//     0% { transform: translateY(0px); }
//     50% { transform: translateY(-15px); }
//     100% { transform: translateY(0px); }
// `;

const floatAnimation = keyframes`
    0% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-15px) rotate(2deg); }
    100% { transform: translateY(0px) rotate(0deg); }
`;

export const NotFoundContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background: linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%);
    font-family: 'Pretendard', sans-serif;
    text-align: center;
    padding: 20px;
    position: relative;
    overflow: hidden;
`;

export const ContentWrapper = styled.div`
    position: relative;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const ErrorCode = styled.h1`
    font-size: 140px;
    font-weight: 800;
    margin: 0;
    line-height: 1;
    background: linear-gradient(115deg, #555555, #888888, #cccccc);
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

export const InteractiveCanvas = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 5;
`;

export const DraggableItem = styled.div`
    pointer-events: auto;
    touch-action: none;
    user-select: none;
    will-change: transform;
    left: 50%;
    top: 50%;
`;

export const FloatingElement = styled.div`
    animation: ${props => !props.$isDragging && css`${floatAnimation} ${props.$duration || '6s'} ease-in-out infinite`};
    animation-delay: ${props => props.$delay || '0s'};
`;

export const HeroPill = styled.div`
    padding: 10px 22px;
    border-radius: 30px;
    font-size: 15px;
    font-weight: 700;
    color: ${props => props.$isDark ? '#ffffff' : '#000000'};
    background: ${props => props.$color || '#fff'};
    white-space: nowrap;
    box-shadow: 0 10px 25px rgba(0,0,0,0.15);
    border: 2px solid rgba(255, 255, 255, 0.2);
    cursor: grab;

    &:active {
        cursor: grabbing;
    }
`;