import styled from 'styled-components';

export const SidebarWrapper = styled.aside`
    width: ${props => (props.$isOpen ? '240px' : '68px')};
    height: 100vh;
    background-color: #f4f7f9;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 100;
`;

export const TopSection = styled.div`
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    flex-shrink: 0;
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
    color: #fff;
    font-weight: 600;
    cursor: ${props => props.$isOpen ? 'pointer' : 'default'};
    pointer-events: ${props => props.$isOpen ? 'auto' : 'none'};
    overflow: hidden;
    white-space: nowrap;
    box-sizing: border-box;
    transition: all 0.2s ease;

    &:hover {
        background-color: #E5B300;
        color: #fff;
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

    &::-webkit-scrollbar {
        width: 4px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #555;
        border-radius: 4px;
    }

    &::-webkit-scrollbar-track {
        background: transparent;
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
    transition: color 0.2s;
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
    }

    i {
        color: ${props => props.$active ? '#FFC700' : '#333'};
        font-size: 15px;
        min-width: 20px;
        text-align: center;
        transition: color 0.2s;
    }
`;

export const BottomSection = styled.div`
    padding: 12px;
    flex-shrink: 0;
`;

export const RecentDiarySection = styled.div`
    padding: 12px 4px;
    margin-top: 30px;
    flex-shrink: 0;
`;

export const RecentDiaryTitle = styled.div`
    font-size: 11px;
    color: #aaaaaa;
    margin-bottom: 8px;
    padding-left: 12px;
    font-weight: 600;
`;

export const RecentDiaryItem = styled.div`
    cursor: pointer;
    padding: 10px 12px;
    margin: 2px 0;
    font-size: 13.5px;
    color: #333;
    border-radius: 24px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: color 0.2s;
    flex-shrink: 0;

    &:hover {
        color: #FFC700;
    }
`;