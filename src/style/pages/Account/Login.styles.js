import styled from 'styled-components';

export const ModalOverlay = styled.div`
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.6);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        backdrop-filter: blur(5px);
`;

export const ModalContainer = styled.div`
        position: relative;
        width: 1000px;
        max-width: 90vw;
        height: 600px;
        max-height: 90vh;
        background-color: #ffffff;
        border-radius: 20px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        overflow: hidden;
        display: flex;

        @media (max-width: 768px) {
                height: 80vh;
                flex-direction: column;
        }
`;

export const CloseButton = styled.button`
        position: absolute;
        top: 20px;
        right: 20px;
        background: none;
        border: none;
        font-size: 24px;
        color: #666;
        cursor: pointer;
        z-index: 10000;
        transition: color 0.3s;

        &:hover {
                color: #000;
        }
`;

export const Container = styled.div`
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 100%;

        @media (max-width: 768px) {
                flex-direction: column;
        }
`;

export const LoginSection = styled.div`
        flex: 1.5;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #ffffff;
        position: relative;
        z-index: 3;
        height: 100%;

        @media (max-width: 768px) {
                flex: 1;
                height: auto;
                align-items: flex-start;
                padding: 40px 20px 30px;
                background-color: #fff;
                border-top-left-radius: 30px;
                border-top-right-radius: 30px;
                margin-top: -40px;
                box-shadow: 0 -10px 20px rgba(0, 0, 0, 0.05);
                overflow-y: auto;
        }
`;

export const LoginCard = styled.div`
        width: 100%;
        max-width: 400px;
        padding: 0 40px;

        @media (max-width: 768px) {
                padding: 0 10px;
                max-width: 100%;
        }
`;

export const InputGroup = styled.div`
        margin-bottom: 30px;
        text-align: left;

        @media (max-width: 768px) {
                margin-bottom: 35px;
        }
`;

export const LabelRow = styled.div`
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 5px;

        label {
                font-size: 14px;
                font-weight: 600;
                color: #666;
                min-width: 70px;
        }
`;

export const FieldMessage = styled.span`
        font-size: 12px;
        font-weight: 500;
        white-space: nowrap;
        opacity: ${props => (props.$show ? '1 !important' : '0')};
        transition: opacity 0.25s ease-in-out;
        pointer-events: none;
        color: ${props => (props.$type === 'error' ? '#ef4444' : props.$type === 'success' ? '#22c55e' : 'inherit')};
`;

export const PasswordWrapper = styled.div`
        position: relative;
        width: 100%;

        input {
                padding-right: 40px !important;
                box-sizing: border-box;
        }
`;

export const ToggleIcon = styled.i`
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
        color: ${props => (props.$active ? '#FFD166' : '#ccc')};
        transition: color 0.3s;
        font-size: 1.1rem;
        z-index: 10;

        &:hover {
                color: #FFD166;
        }
`;

export const Input = styled.input`
        width: 100%;
        padding: 10px 0;
        border: none;
        border-bottom: 2px solid #eee;
        outline: none;
        font-size: 15px;
        background-color: transparent;
        transition: border-color 0.3s;

        &::placeholder {
                color: #d0d0d0;
                opacity: 1;
        }

        &:focus {
                border-bottom-color: #aaa;
        }
`;

export const BtnLogin = styled.button`
        width: 100%;
        padding: 15px;
        color: #333;
        border: none;
        border-radius: 30px;
        font-size: 0.9rem;
        font-weight: bold;
        cursor: pointer;
        margin-top: 10px;
        transition: background-color 0.3s, transform 0.1s;
        box-shadow: 0 4px 15px rgba(51, 51, 51, 0.4);

        &:hover {
                transform: translateY(-2px);
        }
`;

export const FindLinks = styled.div`
        text-align: center;
        font-size: 0.9rem;
        color: #888;
        margin-top: 25px;

        @media (max-width: 768px) {
                margin-top: 35px;
        }
`;

export const FindRow = styled.div`
        a {
                color: #888;
                text-decoration: none;
                transition: color 0.2s;
                font-size: 0.85rem;

                &:hover {
                        color: #FFD166;
                }
        }
`;

export const Separator = styled.span`
        margin: 0 8px;
        color: #ddd;
`;