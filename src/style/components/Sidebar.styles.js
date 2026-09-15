import styled from 'styled-components';

export const SidebarWrapper = styled.aside`
    width: ${props => (props.$isOpen ? '240px' : '68px')};
    height: 100vh;
    background-color: #EEF4F8;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    box-shadow: 5px 0 15px rgba(0, 0, 0, 0.1);
    transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 100;

    @media (max-width: 768px) {
        width: 100%;
        height: calc(75px + env(safe-area-inset-bottom, 0px));
        padding: 0 10px env(safe-area-inset-bottom, 0px);
        flex-direction: row;
        position: fixed;
        bottom: 0;
        left: 0;
        background-color: #EEF4F8;
        box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.08);
        border-radius: 24px 24px 0 0;
        z-index: 9999;
    }
`;

export const TopSection = styled.div`
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    flex-shrink: 0;

    @media (max-width: 768px) {
        display: none;
    }
`;

export const IconButton = styled.button`
    width: 44px;
    height: 44px;
    border: none;
    background: transparent;
    color: #333;
    border-radius: 50%;
    cursor: pointer;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: ${props => props.$isOpen ? '0' : '0 auto'};
    transition: color 0.2s;

    &:hover {
        color: #FFC700;
    }
`;

export const NewPostBtn = styled.button`
    display: flex;
    align-items: center;
    justify-content: ${props => props.$isOpen ? 'flex-start' : 'center'};
    gap: 12px;
    width: ${props => props.$isOpen ? 'fit-content' : '44px'};
    height: 44px;
    padding: 0 ${props => props.$isOpen ? '16px' : '0'};
    margin: ${props => props.$isOpen ? '0' : '0 auto'};
    border-radius: ${props => props.$isOpen ? '22px' : '50%'};
    border: none;
    background-color: #FFC700;
    color: #333;
    font-weight: 600;
    cursor: ${props => props.$isOpen ? 'pointer' : 'default'};
    pointer-events: ${props => props.$isOpen ? 'auto' : 'none'};
    overflow: hidden;
    white-space: nowrap;
    box-sizing: border-box;
    transition: all 0.2s ease;

    &:hover {
        background-color: #E5B300;
        color: #333;
    }

    span {
        display: ${props => props.$isOpen ? 'inline' : 'none'};
    }
`;

export const NavSection = styled.nav`
    flex: 1;
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    overflow-y: auto;
    min-height: 0;

    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
        display: none;
    }

    @media (max-width: 768px) {
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        overflow: visible;
        padding: 0;
        width: 100%;
        gap: 0;
    }
`;

export const NavItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: ${props => props.$isOpen ? 'flex-start' : 'center'};
    gap: 12px;
    width: ${props => props.$isOpen ? '100%' : '44px'};
    height: 44px;
    padding: 0 ${props => props.$isOpen ? '16px' : '0'};
    margin: 0 auto;
    border-radius: ${props => props.$isOpen ? '24px' : '50%'};
    box-sizing: border-box;
    cursor: ${props => props.$isOpen ? 'pointer' : 'default'};
    pointer-events: ${props => props.$isOpen ? 'auto' : 'none'};
    color: ${props => props.$active ? '#FFC700' : '#333'};
    background-color: transparent;
    white-space: nowrap;
    overflow: hidden;
    transition: all 0.2s;
    flex-shrink: 0;

    &:hover {
        color: #FFC700;
        span, i {
            color: #FFC700;
        }
    }

    span {
        color: ${props => props.$active ? '#FFC700' : '#333'};
        font-size: 15px;
        transition: color 0.2s;
        display: ${props => props.$isOpen ? 'inline' : 'none'};
    }

    i {
        color: ${props => props.$active ? '#FFC700' : '#333'};
        font-size: 15px;
        min-width: 20px;
        text-align: center;
        transition: color 0.2s;
    }

    @media (max-width: 768px) {
        width: 70px;
        height: 60px;
        flex-direction: column;
        justify-content: center;
        gap: 6px;
        padding: 0;
        border-radius: 16px;
        pointer-events: auto;
        cursor: pointer;
        background-color: transparent;

        span {
            display: block;
            font-size: 11px;
            font-weight: ${props => props.$active ? '600' : '500'};
        }

        i {
            font-size: 20px;
        }
    }
`;

export const MobileOnlyItem = styled(NavItem)`
    display: none;

    @media (max-width: 768px) {
        display: flex;
    }
`;

export const BottomSection = styled.div`
    padding: 12px;
    flex-shrink: 0;

    @media (max-width: 768px) {
        display: none;
    }
`;

export const RecentDiarySection = styled.div`
    padding: 12px 4px;
    margin-top: 16px;
    flex-shrink: 0;
    display: ${props => props.$show ? 'block' : 'none'};
    max-height: 190px;
    overflow-y: auto;

    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
        display: none;
    }

    @media (max-width: 768px) {
        display: none !important;
    }
`;

export const RecentDiaryTitleRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 4px;
    margin-bottom: 8px;
`;

export const RecentDiaryTitle = styled.div`
    font-size: 11px;
    color: #aaaaaa;
    padding-left: 12px;
    font-weight: 600;
`;

export const AddChatButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 22px;
    border: none;
    border-radius: 50%;
    background-color: transparent;
    color: #aaaaaa;
    font-size: 12px;
    cursor: pointer;
    transition: color 0.2s, background-color 0.2s;

    &:hover {
        color: #333;
        background-color: #e5e5e5;
    }
`;

export const RecentDiaryItemRow = styled.div`
    position: relative;
    display: flex;
    align-items: center;

    &:hover > div:last-child {
        opacity: 1;
        pointer-events: auto;
    }
`;

export const RecentDiaryItem = styled.div`
    cursor: pointer;
    padding: 10px 12px;
    margin: 2px 0;
    font-size: 13.5px;
    color: ${props => props.$active ? '#FFC700' : '#333'};
    font-weight: ${props => props.$active ? '600' : '400'};
    border-radius: 24px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: color 0.2s;
    flex: 1;
    min-width: 0;

    &:hover {
        color: #FFC700;
    }
`;

export const ItemActions = styled.div`
    position: absolute;
    right: 4px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    gap: 2px;
    padding-left: 6px;
    background: linear-gradient(to right, transparent, #EEF4F8 30%);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.15s;
`;

export const ItemActionIcon = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 22px;
    border: none;
    border-radius: 50%;
    background-color: transparent;
    color: ${props => props.$active ? '#FFC700' : '#999999'};
    font-size: 10px;
    cursor: pointer;
    transition: color 0.2s, background-color 0.2s;

    &:hover {
        color: #333;
        background-color: #e5e5e5;
    }
`;

export const EditForm = styled.form`
    padding: 2px 12px;
    margin: 2px 0;
`;

export const EditInput = styled.input`
    width: 100%;
    padding: 8px 10px;
    font-size: 13.5px;
    border: 1px solid #FFC700;
    border-radius: 16px;
    outline: none;
    box-sizing: border-box;
    background-color: #ffffff;
`;