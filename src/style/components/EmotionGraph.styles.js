import styled, { keyframes } from 'styled-components';

const fillBar = keyframes`
    from { width: 0%; }
`;

export const GraphContainer = styled.div`
    width: 100%;
    background: #ffffff;
    border-radius: 8px;
    padding: 24px;
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;

    h3 {
        margin: 0;
        font-size: 16px;
        color: #37352f;
        font-weight: 700;
        display: flex;
        align-items: center;
        gap: 8px;

        i {
            color: #787774;
        }
    }
`;

export const Badge = styled.div`
    padding: 6px 12px;
    border-radius: 16px;
    background-color: #f7f7f5;
    border: 1px solid #ededeb;
    color: #787774;
    font-size: 13px;
    font-weight: 600;
`;

export const EmptyState = styled.div`
    text-align: center;
    color: #9a9a97;
    font-size: 15px;
    padding: 40px 0;
`;

export const GraphBody = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

export const Row = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
    height: 32px;
`;

export const LabelArea = styled.div`
    width: 80px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-size: 14px;
    font-weight: 600;
    color: #37352f;
`;

export const TrackArea = styled.div`
    flex: 1;
    background-color: #f7f7f5;
    border-radius: 6px;
    height: 100%;
    display: flex;
    align-items: center;
    position: relative;
`;

export const Bar = styled.div`
    height: 100%;
    background-color: ${props => props.$color || '#8fa8db'};
    width: ${props => props.$percent}%;
    animation: ${fillBar} 0.6s ease-out forwards;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: ${props => props.$isInside ? '12px' : '0'};
    box-sizing: border-box;
    min-width: 4px;
`;

export const CountText = styled.span`
    color: ${props => (props.$isInside ? '#333' : '#333')};
    font-size: 13px;
    font-weight: 600;
    margin-left: ${props => (props.$isInside ? '0' : '8px')};
    white-space: nowrap;
`;