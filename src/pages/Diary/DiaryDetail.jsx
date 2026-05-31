import React, { useRef, useEffect } from 'react';
import { useDiaryDetail } from '../../hooks/diary/useDiaryDetail';
import * as S from '../../style/pages/diary/DiaryDetail.styles';

const DiaryDetail = () => {
    const {
        diary, loading, handleGoBack,
        isEditing, editTitle, setEditTitle, editContent, setEditContent,
        handleEditClick, handleCancelEdit, handleSaveClick, handleDeleteClick
    } = useDiaryDetail();

    const textareaRef = useRef(null);

    useEffect(() => {
        if (isEditing && textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
        }
    }, [editContent, isEditing]);

    if (loading && !diary) {
        return (
            <S.LoadingOverlay>
                <S.Spinner />
                <S.LoadingText>
                    불러오는 중...
                </S.LoadingText>
            </S.LoadingOverlay>
        );
    }

    if (!diary) return null;

    return (
        <>
            {loading && (
                <S.LoadingOverlay>
                    <S.Spinner />
                    <S.LoadingText>
                        {isEditing ? 'AI 재분석 중...' : '처리 중...'}
                    </S.LoadingText>
                </S.LoadingOverlay>
            )}

            <S.PageContainer>
                <S.TopBar>
                    <S.ActionButton onClick={handleGoBack} disabled={loading}>
                        <i className="fa-solid fa-arrow-left"></i> 목록으로
                    </S.ActionButton>

                    <S.ButtonGroup>
                        {isEditing ? (
                            <>
                                <S.ActionButton onClick={handleCancelEdit} disabled={loading}>
                                    취소
                                </S.ActionButton>
                                <S.SaveButton onClick={handleSaveClick} disabled={loading}>
                                    저장
                                </S.SaveButton>
                            </>
                        ) : (
                            <>
                                <S.ActionButton onClick={handleEditClick} disabled={loading}>
                                    수정
                                </S.ActionButton>
                                <S.DeleteButton onClick={handleDeleteClick} disabled={loading}>
                                    삭제
                                </S.DeleteButton>
                            </>
                        )}
                    </S.ButtonGroup>
                </S.TopBar>

                <S.ContentWrapper>
                    {isEditing ? (
                        <S.TitleInput
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            placeholder="제목을 입력하세요"
                            disabled={loading}
                        />
                    ) : (
                        <S.PageTitle>{diary.title}</S.PageTitle>
                    )}

                    {!isEditing && diary.summary && (
                        <S.AICallout>
                            <S.CalloutHeader>
                                AI 감정 분석
                            </S.CalloutHeader>
                            <S.CalloutContent>
                                <S.CalloutRow>
                                    <S.CalloutLabel>감정</S.CalloutLabel>
                                    <S.EmotionTag>
                                        <S.ColorDot $color={diary.emotionColor || '#e0e0e0'} />
                                        {diary.mainEmotion}
                                    </S.EmotionTag>
                                </S.CalloutRow>
                                <S.CalloutRow>
                                    <S.CalloutLabel>요약</S.CalloutLabel>
                                    <S.CalloutText>"{diary.summary}"</S.CalloutText>
                                </S.CalloutRow>
                                {diary.depLvl != null && (
                                    <S.CalloutRow>
                                        <S.CalloutLabel>상태 지수</S.CalloutLabel>
                                        <S.CalloutText>Level {diary.depLvl}</S.CalloutText>
                                    </S.CalloutRow>
                                )}
                            </S.CalloutContent>
                        </S.AICallout>
                    )}

                    <S.EntrySection>
                        <S.EntryHeader>
                            <S.EntryDate>
                                @{diary?.createdAt?.substring(0, 4)}년
                                &nbsp;{diary?.createdAt?.substring(5, 7)}월
                                &nbsp;{diary?.createdAt?.substring(8, 10)}일
                            </S.EntryDate>
                        </S.EntryHeader>

                        {isEditing ? (
                            <S.ContentTextarea
                                ref={textareaRef}
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value)}
                                placeholder="일기 내용을 입력하세요..."
                                disabled={loading}
                                rows={1}
                            />
                        ) : (
                            <S.EntryContent>{diary.content}</S.EntryContent>
                        )}
                    </S.EntrySection>
                </S.ContentWrapper>
            </S.PageContainer>
        </>
    );
};

export default DiaryDetail;