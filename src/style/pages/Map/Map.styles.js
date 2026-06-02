import styled, { keyframes } from 'styled-components';

const slideUpFadeIn = keyframes`
    0% { transform: translateY(20px); opacity: 0; }
    15% { transform: translateY(0); opacity: 1; }
    85% { transform: translateY(0); opacity: 1; }
    100% { transform: translateY(20px); opacity: 0; }
`;

export const Container = styled.div`
    width: 100%;
    height: 100vh;
    box-sizing: border-box;
    background-color: #f8f9fa;
    display: flex;
    flex-direction: column;
    padding: 20px;
`;

export const MapWrapper = styled.div`
    width: 100%;
    flex: 1;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    position: relative;

    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 80px;
        background: linear-gradient(to bottom, rgba(248, 249, 250, 1) 0%, rgba(248, 249, 250, 0) 100%);
        pointer-events: none;
        z-index: 2;
    }
`;

export const LoadingErrorText = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    font-size: 1.2rem;
    color: ${(props) => (props.$isError ? '#d9534f' : '#666')};
`;

export const TopUIWrapper = styled.div`
    position: absolute;
    top: 70px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
    width: 90%;
    max-width: 800px;
    display: flex;
    gap: 10px;
    align-items: flex-start;
`;

export const SearchSection = styled.div`
    flex: 1;
    position: relative;
    display: flex;
    flex-direction: column;
`;

export const SearchContainer = styled.form`
    display: flex;
    width: 100%;
    height: 48px;
    background-color: white;
    border-radius: 24px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.2);
    overflow: hidden;
`;

export const SearchInput = styled.input`
    flex: 1;
    border: none;
    padding: 0 20px;
    font-size: 15px;
    outline: none;
    background: transparent;
`;

export const SearchButton = styled.button`
    border: none;
    background-color: transparent;
    padding: 0 20px;
    cursor: pointer;
    color: #666;
    font-size: 18px;

    &:hover {
        color: #333;
    }
`;

export const FilterWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
`;

export const FilterButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    height: 48px;
    padding: 0 20px;
    background-color: white;
    border: 1px solid #e0e0e0;
    border-radius: 24px;
    font-size: 14px;
    font-weight: 500;
    color: #333;
    cursor: pointer;
    white-space: nowrap;
    box-shadow: 0 2px 6px rgba(0,0,0,0.2);
    transition: background-color 0.2s;

    &:hover {
        background-color: #f8f9fa;
    }

    i {
        font-size: 12px;
        color: #666;
    }
`;

export const FilterDropdown = styled.ul`
    position: absolute;
    top: calc(100% + 8px);
    left: 100%;
    transform: translateX(-50%);
    background-color: white;
    border-radius: 20px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.15);
    padding: 5px 0;
    margin: 0;
    list-style: none;
    width: max-content;
    min-width: 180px;
    max-height: 300px;
    overflow-y: auto;
    z-index: 20;

    &::-webkit-scrollbar {
        width: 8px;
    }
    &::-webkit-scrollbar-track {
        background: transparent;
        border-radius: 12px;
        margin-top: 12px;
        margin-bottom: 12px;
    }
    &::-webkit-scrollbar-thumb {
        background: #ced4da;
        border-radius: 12px;
        border: 2px solid white;
    }
    &::-webkit-scrollbar-thumb:hover {
        background: #adb5bd;
    }
`;

export const FilterItem = styled.li`
    padding: 12px 20px;
    font-size: 14px;
    color: ${(props) => (props.$isActive ? '#4A90E2' : '#333')};
    font-weight: ${(props) => (props.$isActive ? 'bold' : 'normal')};
    cursor: pointer;
    background-color: ${(props) => (props.$isActive ? '#f1f8ff' : 'transparent')};
    transition: background-color 0.2s;

    &:hover {
        background-color: #f8f9fa;
    }
`;

export const MyLocationButton = styled.button`
    width: 48px;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    color: #333;
    background-color: white;
    border: none;
    border-radius: 50%;
    box-shadow: 0 2px 6px rgba(0,0,0,0.2);
    cursor: pointer;
    flex-shrink: 0;

    &:hover {
        background-color: #f8f9fa;
    }
`;

export const DropdownContainer = styled.ul`
    position: absolute;
    top: calc(100% + 8px);
    left: 0;
    background-color: white;
    border-radius: 20px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    margin: 0;
    padding: 5px;
    list-style: none;
    max-height: 250px;
    overflow-y: auto;
    width: 100%;
    z-index: 20;

    &::-webkit-scrollbar {
        width: 8px;
    }
    &::-webkit-scrollbar-track {
        background: transparent;
        border-radius: 12px;
        margin-top: 12px;
        margin-bottom: 12px;
    }
    &::-webkit-scrollbar-thumb {
        background: #ced4da;
        border-radius: 12px;
        border: 2px solid white;
    }
    &::-webkit-scrollbar-thumb:hover {
        background: #adb5bd;
    }
`;

export const DropdownItem = styled.li`
    padding: 12px 20px;
    border-bottom: 1px solid #f1f3f5;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    gap: 4px;

    &:last-child {
        border-bottom: none;
    }

    &:hover {
        background-color: #f8f9fa;
    }
`;

export const DropdownItemHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const DropdownItemName = styled.span`
    font-size: 15px;
    font-weight: bold;
    color: #333;
`;

export const DropdownItemDistance = styled.span`
    font-size: 13px;
    color: #4A90E2;
    font-weight: bold;
`;

export const DropdownItemAddress = styled.span`
    font-size: 12px;
    color: #888;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const OverlayContainer = styled.div`
    position: absolute;
    bottom: 55px;
    left: 50%;
    transform: translateX(-50%);
    background-color: white;
    border-radius: 100px;
    border: 1px solid #ccc;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.15);
    padding: 24px 20px 24px 32px;
    min-width: 280px;
    width: max-content;
    height: auto;
    min-height: 110px;
    max-width: 600px;
    box-sizing: border-box;
    z-index: 5;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
`;

export const OverlayLeftSection = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 0;
    width: 100%;
`;

export const OverlayHeader = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    margin-bottom: 8px;
    padding-bottom: 8px;
    width: 100%;
`;

export const OverlayTitle = styled.h3`
    margin: 0;
    font-size: 15px;
    font-weight: bold;
    color: #333;
    line-height: 1.4;
    word-break: break-word;
    white-space: normal;
`;

export const OverlayBody = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
    width: 100%;
`;

export const InfoText = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 8px;
    margin: 0;
    font-size: 12px;
    color: #555;
    line-height: 1.4;
    word-break: break-word;
    white-space: normal;

    span, a {
        flex: 1;
        margin-top: 1px;
    }

    a {
        color: #4A90E2;
        text-decoration: none;
        word-break: break-all;
        &:hover { text-decoration: underline; }
    }
`;

export const IconWrapper = styled.div`
    min-width: 14px;
    text-align: center;
    color: #adb5bd;
    margin-top: 2px;
`;

export const CopyButton = styled.button`
    background: none;
    border: none;
    color: #adb5bd;
    cursor: pointer;
    font-size: 14px;
    padding: 0 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.2s;
    margin-top: 1px;

    &:hover {
        color: #495057;
    }
`;

export const HashtagText = styled.div`
    display: inline-block;
    font-size: 13px;
    font-weight: bold;
    color: ${(props) => props.$color || '#4A90E2'};
    margin-top: 4px;
    padding-left: 4px;
    word-break: keep-all;
`;

export const OverlayRightSection = styled.div`
    width: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
`;

export const RouteButtonRound = styled.a`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 76px;
    height: 76px;
    border-radius: 50%;
    background-color: ${(props) => props.$color || '#FFC130'};
    color: ${(props) => {
        const lightColors = ['#FFD700', '#66CDAA', '#00BFFF', '#FFA500', '#20C997', '#FFC130'];
        return lightColors.includes(props.$color) ? '#212529' : 'white';
    }};
    text-decoration: none;
    box-shadow: 0 4px 10px rgba(0,0,0,0.15);
    font-size: 34px;
    transition: all 0.2s;

    &:hover {
        filter: brightness(0.9);
        box-shadow: 0 6px 15px rgba(0,0,0,0.2);
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