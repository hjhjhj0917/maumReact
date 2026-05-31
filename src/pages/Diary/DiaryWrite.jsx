import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RollerDatePicker from '../../components/RollerDatePicker';
import { useDiaryWriteForm } from '../../hooks/diary/useDiaryWriteForm';
import * as S from '../../style/pages/Diary/DiaryWrite.styles';

const DiaryWrite = () => {
    const navigate = useNavigate();
    const {
        title, setTitle,
        content, setContent,
        showDatePicker, setShowDatePicker,
        date, setDate,
        formattedDate,
        handleSubmit,
        isLoading
    } = useDiaryWriteForm();

    const textareaRef = useRef(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
        }
    }, [content]);

    return (
        <>
            {isLoading && (
                <S.LoadingOverlay>
                    <S.Spinner />
                    <S.LoadingText>
                        마음 AI가 당신의 하루를 분석하고 있어요...
                        <span>깊이 있는 이해를 위해 약간의 시간이 소요됩니다.</span>
                    </S.LoadingText>
                </S.LoadingOverlay>
            )}

            <S.PageContainer>
                <S.TopBar>
                    <S.ActionButton onClick={() => navigate(-1)} disabled={isLoading}>
                        <i className="fa-solid fa-arrow-left"></i> 취소
                    </S.ActionButton>

                    <S.ButtonGroup>
                        <S.SaveButton onClick={handleSubmit} disabled={isLoading}>
                            {isLoading ? '분석 중...' : '작성 완료'}
                        </S.SaveButton>
                    </S.ButtonGroup>
                </S.TopBar>

                <S.ContentWrapper>
                    <S.TitleInput
                        type="text"
                        placeholder="제목을 입력하세요"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        disabled={isLoading}
                    />

                    <S.EntrySection>
                        <S.EntryHeader>
                            <S.DateWrapper>
                                <S.DateSelector onClick={() => !isLoading && setShowDatePicker(true)}>
                                    @{formattedDate}
                                </S.DateSelector>

                                {showDatePicker && !isLoading && (
                                    <>
                                        <S.PickerOverlay onClick={() => setShowDatePicker(false)} />
                                        <S.PickerContainer>
                                            <RollerDatePicker
                                                initialDate={date}
                                                onClose={() => setShowDatePicker(false)}
                                                onConfirm={(selectedDate) => {
                                                    setDate(selectedDate);
                                                    setShowDatePicker(false);
                                                }}
                                            />
                                        </S.PickerContainer>
                                    </>
                                )}
                            </S.DateWrapper>
                        </S.EntryHeader>

                        <S.ContentTextarea
                            ref={textareaRef}
                            placeholder="이곳에 당신의 하루를 자유롭게 기록해 보세요..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            disabled={isLoading}
                            rows={1}
                        />
                    </S.EntrySection>
                </S.ContentWrapper>
            </S.PageContainer>
        </>
    );
};

export default DiaryWrite;