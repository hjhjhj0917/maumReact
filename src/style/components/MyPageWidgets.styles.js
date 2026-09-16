import styled from 'styled-components';

export const WidgetGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;

    @media (max-width: 600px) {
        grid-template-columns: 1fr;
    }
`;

export const WidgetCard = styled.div`
    background: #ffffff;
    border: 1px solid #ededeb;
    border-radius: 8px;
    padding: 20px 24px;
    display: flex;
    flex-direction: column;
    gap: 14px;
`;

export const WidgetTitle = styled.h3`
    font-size: 15px;
    font-weight: 700;
    color: #37352f;
    margin: 0;
`;

export const EmptyState = styled.div`
    font-size: 13px;
    color: #9b9a97;
    padding: 12px 0;
`;

/* 연속 작성일 / 총 작성 수 */
export const StatTileRow = styled.div`
    display: flex;
    gap: 12px;
`;

export const StatTile = styled.div`
    flex: 1;
    background: #f7f7f5;
    border-radius: 8px;
    padding: 14px 10px;
    text-align: center;
`;

export const StatValue = styled.div`
    font-size: 22px;
    font-weight: 800;
    color: #333333;
`;

export const StatLabel = styled.div`
    font-size: 12px;
    color: #787774;
    margin-top: 4px;
`;

/* 우울 지수 추이 */
export const TrendChartWrapper = styled.div`
    width: 100%;
    overflow-x: auto;
`;

/* 인기 추천곡 */
export const MusicList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const MusicItem = styled.a`
    display: flex;
    align-items: center;
    gap: 12px;
    text-decoration: none;
    color: inherit;
    padding: 6px;
    border-radius: 6px;
    transition: background 0.15s;

    &:hover {
        background: #f7f7f5;
    }
`;

export const MusicRank = styled.span`
    width: 18px;
    flex-shrink: 0;
    text-align: center;
    font-size: 13px;
    font-weight: 700;
    color: #b3b0a9;
`;

export const MusicThumb = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 6px;
    object-fit: cover;
    flex-shrink: 0;
    background: #f0f0ee;
`;

export const MusicInfo = styled.div`
    min-width: 0;
    flex: 1;

    div:first-child {
        font-size: 13px;
        font-weight: 600;
        color: #37352f;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    div:last-child {
        font-size: 12px;
        color: #9b9a97;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`;

export const MusicCount = styled.span`
    font-size: 11px;
    color: #b3b0a9;
    flex-shrink: 0;
`;

/* 즐겨찾기 미리보기 */
export const FavoriteList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const FavoriteItem = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px;
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.15s;

    &:hover {
        background: #f7f7f5;
    }
`;

export const FavoriteColorDot = styled.span`
    width: 10px;
    height: 10px;
    border-radius: 50%;
    flex-shrink: 0;
    background-color: ${props => props.$color || '#d9d9d9'};
`;

export const FavoriteTitle = styled.div`
    flex: 1;
    min-width: 0;
    font-size: 13px;
    color: #37352f;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const FavoriteDate = styled.span`
    font-size: 12px;
    color: #9b9a97;
    flex-shrink: 0;
`;

/* 주간 리포트 카드 */
export const ReportCard = styled.div`
    background: #EEF4F8;
    border: 1px solid #ededeb;
    border-radius: 8px;
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

export const ReportHeader = styled.div`
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 8px;
    flex-wrap: wrap;
`;

export const ReportPeriod = styled.span`
    font-size: 12px;
    color: #787774;
`;

export const ReportComment = styled.p`
    font-size: 14px;
    line-height: 1.6;
    color: #37352f;
    margin: 0;
    white-space: pre-line;
`;

export const ReportMetaRow = styled.div`
    display: flex;
    gap: 16px;
    font-size: 12px;
    color: #787774;
`;
