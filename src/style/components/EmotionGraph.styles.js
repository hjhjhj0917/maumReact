import styled from 'styled-components';

export const GraphContainer = styled.div`
    width: 100%;
    background: #ffffff;
    border-radius: 8px;
    padding: 24px;
    box-sizing: border-box;
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

export const ChartWrapper = styled.div`
    width: 100%;
    min-width: 0;
`;

export const TooltipBox = styled.div`
    background: #ffffff;
    border: 1px solid #ededeb;
    border-radius: 6px;
    padding: 8px 12px;
    font-size: 13px;
    color: #37352f;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`;
