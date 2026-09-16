import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from '../style/components/MyPageWidgets.styles';

const FavoriteDiaryPreview = ({ diaries }) => {
    const navigate = useNavigate();

    return (
        <S.WidgetCard>
            <S.WidgetTitle>즐겨찾기한 일기</S.WidgetTitle>
            {(!diaries || diaries.length === 0) ? (
                <S.EmptyState>즐겨찾기한 일기가 없습니다.</S.EmptyState>
            ) : (
                <S.FavoriteList>
                    {diaries.map(diary => (
                        <S.FavoriteItem key={diary.diaryNo} onClick={() => navigate(`/diary/${diary.diaryNo}`)}>
                            <S.FavoriteColorDot $color={diary.emotionColor} />
                            <S.FavoriteTitle>{diary.title || '제목 없음'}</S.FavoriteTitle>
                            <S.FavoriteDate>{diary.createdAt}</S.FavoriteDate>
                        </S.FavoriteItem>
                    ))}
                </S.FavoriteList>
            )}
        </S.WidgetCard>
    );
};

export default FavoriteDiaryPreview;
