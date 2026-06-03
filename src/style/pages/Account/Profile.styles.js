import styled from 'styled-components';

export const PageWrapper = styled.div`
    width: 100%;
    min-height: 100vh;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 100px 20px 60px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
`;

export const ProfileContainer = styled.div`
    width: 100%;
    max-width: 800px;
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

export const PageTitle = styled.h1`
    text-align: center;
    font-size: 28px;
    font-weight: 700;
    color: #37352f;
    margin-bottom: 20px;
`;

export const ProfileHeaderSection = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 32px;
    width: 100%;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
        gap: 24px;
    }
`;

export const EditIcon = styled.i`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.6);
    color: white;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.2s ease;
    font-size: 16px;
    z-index: 2;
`;

export const AvatarWrapper = styled.div`
    width: 160px;
    height: 160px;
    border-radius: 50%;
    position: relative;
    cursor: pointer;
    flex-shrink: 0;
    border: 1px solid #ededeb;

    &:hover ${EditIcon} {
        opacity: 1;
    }

    @media (max-width: 768px) {
        width: 140px;
        height: 140px;
    }
`;

export const AvatarImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
    background-color: #333333;
`;

export const RightColumn = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
`;

export const InfoCard = styled.div`
    background: #ffffff;
    border: 1px solid #ededeb;
    border-radius: 8px;
    padding: 24px;
    display: flex;
    flex-direction: column;
`;

export const ActionCard = styled.div`
    background: #ffffff;
    border: 1px solid #ededeb;
    border-radius: 8px;
    padding: 24px;
`;

export const CardTitle = styled.h3`
    font-size: 16px;
    color: #37352f;
    font-weight: 700;
    margin: 0 0 16px 0;
`;

export const ActionGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;

    @media (max-width: 500px) {
        grid-template-columns: 1fr;
    }
`;

export const ActionButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 12px;
    background: #ffffff;
    border: 1px solid #ededeb;
    border-radius: 6px;
    color: #37352f;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.2s;

    &:hover {
        background: #f7f7f5;
    }

    i {
        color: #787774;
    }
`;

export const UserName = styled.h1`
    font-size: 24px;
    font-weight: 700;
    color: #37352f;
    margin: 0 0 4px 0;
`;

export const UserId = styled.span`
    font-size: 14px;
    color: #787774;
    margin-bottom: 16px;
    display: inline-block;
`;

export const ContactInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    border-top: 1px solid #ededeb;
    padding-top: 16px;
`;

export const ContactItem = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 14px;
    color: #37352f;

    span i {
        color: #787774;
        width: 14px;
        text-align: center;
    }
`;

export const MainContent = styled.div`
    width: 100%;
`;

export const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(2px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

export const ModalContent = styled.div`
    background: white;
    width: 100%;
    max-width: 480px;
    border-radius: 8px;
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    border: 1px solid #ededeb;
`;

export const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    h2 {
        font-size: 18px;
        font-weight: 700;
        color: #37352f;
        display: flex;
        align-items: center;
        gap: 8px;

        img {
            width: 24px;
            height: auto;
        }
    }
`;

export const CloseIcon = styled.button`
    background: none;
    border: none;
    font-size: 22px;
    color: #787774;
    cursor: pointer;
    line-height: 1;
    padding: 0;
`;

export const CharacterGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
`;

export const CharacterItem = styled.div`
    width: 100%;
    aspect-ratio: 1;
    border-radius: 50%;
    border: 2px solid ${props => props.$isSelected ? '#333333' : 'transparent'};
    padding: 3px;
    box-sizing: border-box;
    cursor: pointer;
    transition: transform 0.2s ease, border-color 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        transform: scale(1.04);
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
    }
`;

export const ModalFooter = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 8px;
`;

export const CancelButton = styled.button`
    padding: 8px 14px;
    background-color: transparent;
    color: #787774;
    border: 1px solid #ededeb;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;

    &:hover {
        background-color: #f7f7f5;
    }
`;

export const ConfirmButton = styled.button`
    padding: 8px 14px;
    background-color: #333333;
    color: #ffffff;
    border: none;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: filter 0.2s, opacity 0.2s;

    &:hover:not(:disabled) {
        filter: brightness(0.85);
    }

    &:disabled {
        opacity: 0.4;
        cursor: not-allowed;
    }
`;

export const ModalScrollContent = styled.div`
    max-height: 50vh;
    overflow-y: auto;
    padding-right: 6px;

    &::-webkit-scrollbar {
        width: 6px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: #e2e2e0;
        border-radius: 3px;
    }
`;

export const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 16px;
    text-align: left;
`;

export const FormLabel = styled.label`
    font-size: 14px;
    font-weight: 600;
    color: #37352f;
`;

export const InputRow = styled.div`
    display: flex;
    gap: 8px;
`;

export const FormInput = styled.input`
    flex: 1;
    padding: 12px;
    border: 1px solid #ededeb;
    border-radius: 6px;
    font-size: 14px;
    outline: none;
    background: #fbfbfa;
    color: #37352f;

    &:focus {
        border-color: #333333;
        background: #ffffff;
    }
    &:disabled, &[readonly] {
        background-color: #f1f1f0;
        color: #787774;
        cursor: not-allowed;
    }
`;

export const VerifyButton = styled.button`
    padding: 0 16px;
    background-color: #333333;
    color: #ffffff;
    border: none;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    white-space: nowrap;

    &:disabled {
        background-color: #e2e2e0;
        color: #9a9a97;
        cursor: not-allowed;
    }
`;

export const StepContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    position: relative;
    padding: 0 12px;
`;

export const StepLine = styled.div`
    position: absolute;
    top: 13px;
    left: 30px;
    right: 30px;
    height: 1px;
    background-color: #ededeb;
    z-index: 1;
`;

export const StepItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    z-index: 2;
`;

export const StepCircle = styled.div`
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background-color: ${props => props.$active || props.$completed ? '#333333' : '#ffffff'};
    border: 1px solid ${props => props.$active || props.$completed ? '#333333' : '#ededeb'};
    color: ${props => props.$active || props.$completed ? '#ffffff' : '#9a9a97'};
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 12px;
`;

export const StepLabel = styled.span`
    font-size: 13px;
    color: ${props => props.$active ? '#333333' : '#9a9a97'};
    font-weight: ${props => props.$active ? '600' : '400'};
`;

export const StepContentWrapper = styled.div`
    min-height: 90px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;