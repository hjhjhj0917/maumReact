import React from 'react';
import * as S from '../style/components/MyPageWidgets.styles';

const DiaryStatsCard = ({ stats }) => {
    return (
        <S.WidgetCard>
            <S.WidgetTitle>작성 현황</S.WidgetTitle>
            <S.StatTileRow>
                <S.StatTile>
                    <S.StatValue>{stats.totalCount ?? 0}</S.StatValue>
                    <S.StatLabel>총 작성 수</S.StatLabel>
                </S.StatTile>
                <S.StatTile>
                    <S.StatValue>{stats.currentStreak ?? 0}</S.StatValue>
                    <S.StatLabel>연속 작성일</S.StatLabel>
                </S.StatTile>
                <S.StatTile>
                    <S.StatValue>{stats.longestStreak ?? 0}</S.StatValue>
                    <S.StatLabel>최장 연속 기록</S.StatLabel>
                </S.StatTile>
            </S.StatTileRow>
        </S.WidgetCard>
    );
};

export default DiaryStatsCard;
