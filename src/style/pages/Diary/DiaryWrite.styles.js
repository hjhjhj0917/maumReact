import styled, { keyframes } from 'styled-components';

const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;

export const LoadingOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(2px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 9999;
`;

export const Spinner = styled.div`
    width: 40px;
    height: 40px;
    border: 3px solid #f3f3f3;
    border-top: 3px solid #37352f;
    border-radius: 50%;
    animation: ${spin} 1s linear infinite;
    margin-bottom: 16px;
`;

export const LoadingText = styled.div`
    font-size: 15px;
    font-weight: 500;
    color: #37352f;
    text-align: center;

    span {
        display: block;
        font-size: 13px;
        color: #787774;
        margin-top: 8px;
        font-weight: 400;
    }
`;

export const PageContainer = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #ffffff;
    color: #37352f;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
    padding-bottom: 100px;
    padding-top: 100px;
`;

export const TopBar = styled.div`
    width: 100%;
    max-width: 900px;
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
`;

export const ButtonGroup = styled.div`
    display: flex;
    gap: 8px;
`;

export const ActionButton = styled.button`
    background: transparent;
    border: none;
    color: #787774;
    font-size: 14px;
    font-weight: 500;
    padding: 6px 12px;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.2s, color 0.2s;
    display: flex;
    align-items: center;
    gap: 6px;

    &:hover:not(:disabled) {
        background: #efefef;
        color: #37352f;
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

export const SaveButton = styled(ActionButton)`
    color: #0f7b6c;

    &:hover:not(:disabled) {
        background: #e1f5f2;
        color: #0f7b6c;
    }
`;

export const ContentWrapper = styled.div`
    width: 100%;
    max-width: 900px;
    padding: 40px 40px;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
`;

export const TitleInput = styled.input`
    font-size: 40px;
    font-weight: 700;
    color: #37352f;
    margin: 0 0 30px 0;
    letter-spacing: -0.02em;
    width: 100%;
    border: none;
    outline: none;
    background: transparent;
    font-family: inherit;
    padding: 0;

    &::placeholder {
        color: #e2e2e0;
    }
`;

export const EntrySection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-top: 20px;
`;

export const EntryHeader = styled.div`
    display: flex;
    align-items: baseline;
    gap: 8px;
    flex-wrap: wrap;
    margin-bottom: 10px;
`;

export const DateWrapper = styled.div`
    position: relative;
`;

export const DateSelector = styled.span`
    font-size: 22px;
    font-weight: 600;
    color: #9a9a97;
    transition: color 0.2s;
`;

export const ContentTextarea = styled.textarea`
    width: 100%;
    min-height: 400px;
    font-size: 16px;
    line-height: 1.7;
    color: #37352f;
    background: transparent;
    border: none;
    padding: 0;
    outline: none;
    resize: none;
    overflow: hidden;
    font-family: inherit;
    white-space: pre-wrap;
    word-break: break-all;

    &::placeholder {
        color: #e2e2e0;
    }
`;