import styled from 'styled-components';

export const PageWrapper = styled.div`
    width: 100%;
    height: 100vh;
    overflow: hidden;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 100px 20px 40px;
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
`;

export const ProfileContainer = styled.div`
    width: 100%;
    max-width: 800px;
    height: 100%;
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
    background: #EEF4F8;
    border: 1px solid #EEF4F8;
    border-radius: 6px;
    color: #333;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.2s;

    i {
        color: #333;
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
    flex: 1;
    min-height: 0;
    background: #ffffff;
    border: 1px solid #ededeb;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
`;

export const MainTitle = styled.h2`
    font-size: 18px;
    font-weight: 700;
    color: #333;
    padding: 20px 24px;
    margin: 0;
    border-bottom: 1px solid #EEF4F8;
    background: #EEF4F8;
    flex-shrink: 0;
`;

export const GraphScrollArea = styled.div`
    flex: 1;
    overflow-y: auto;
    padding: 24px;

    &::-webkit-scrollbar {
        width: 6px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: #e2e2e0;
        border-radius: 3px;
    }
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
    max-width: 481px;
    border-radius: 16px;
    padding: 32px 34px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    border: 1px solid #ededeb;
    position: relative;
    box-sizing: border-box;
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
    font-size: 26px;
    color: #999;
    cursor: pointer;
    line-height: 1;
    padding: 0;
    transition: color 0.2s;

    &:hover {
        color: #333;
    }
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
    padding-right: 15px;

    &::-webkit-scrollbar {
        width: 6px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: #e2e2e0;
        border-radius: 3px;
    }
`;

export const StepperWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: 35px;
    margin-bottom: 35px;
    padding: 0 10px;
    position: relative;
    height: 60px;
`;

export const StepperItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    z-index: 2;
    position: relative;

    .step-circle {
        background-color: ${props => (props.$active || props.$completed ? '#FFD166' : '#fff')};
        border-color: ${props => (props.$active || props.$completed ? '#FFD166' : '#ddd')};
        color: ${props => (props.$active || props.$completed ? '#fff' : '#ddd')};
        width: 32px;
        height: 32px;
        border-radius: 50%;
        border: 2px solid;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        transition: all 0.3s ease;

        i { color: ${props => (props.$active || props.$completed ? '#333' : '#ddd')}; }
    }

    .step-label {
        color: ${props => (props.$active || props.$completed ? '#333' : '#999')};
        font-weight: ${props => (props.$active || props.$completed ? 'bold' : 'normal')};
        font-size: 11px;
        position: absolute;
        top: -25px;
        width: 80px;
        text-align: center;
    }
`;

export const StepLine = styled.div`
    flex: 1;
    height: 1px;
    background-color: #eee;
    margin-bottom: 16px;
    margin-left: -5px;
    margin-right: -5px;
`;

export const SlideViewport = styled.div`
    width: 100%;
    overflow: hidden;
`;

export const SlideTrack = styled.div`
    display: flex;
    width: 100%;
    transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
    transform: translateX(${props => (props.$step - 1) * -100}%);
`;

export const FormStep = styled.div`
    min-width: 100%;
    box-sizing: border-box;
    transform: ${props => (props.$active ? 'scale(1)' : 'scale(0.95)')};
    opacity: ${props => (props.$active ? '1' : '0')};
    transition: all 0.6s ease;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    min-height: 250px;
`;

export const StepTitle = styled.h2`
    font-size: 28px;
    font-weight: 800;
    color: #000;
    margin-bottom: 12px;
    text-align: left;
`;

export const StepSubTitle = styled.p`
    font-size: 15px;
    color: #666;
    line-height: 1.5;
    margin-bottom: 24px;
    text-align: left;
    min-height: 44px;
    span { color: #333; font-weight: 600; }
`;

export const BtnConfirm = styled.button`
    width: 100%;
    padding: 16px;
    background-color: #333;
    color: #fff;
    border: none;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    margin-top: 16px;
    transition: background-color 0.2s;

    &:hover:not(:disabled) {
        background-color: #000;
    }

    &:disabled {
        background-color: #ddd;
        color: #999;
        cursor: not-allowed;
    }
`;