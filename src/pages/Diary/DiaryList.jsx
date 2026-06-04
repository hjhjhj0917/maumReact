import React from 'react';
import { useDiaryList, EMOTION_GROUPS } from '../../hooks/diary/useDiaryList';
import * as S from '../../style/pages/Diary/DiaryList.styles';

const getEmotionName = (color) => {
    const entry = Object.entries(EMOTION_GROUPS).find((item) => item[1] === color);
    return entry ? entry[0] : '기록';
};

const DiaryList = () => {
    const {
        year, month, daysList,
        handlePrevMonth, handleNextMonth, handleDayClick,
        keyword, setKeyword, searchResults, handleResultClick,
        selectedColors, toggleColorFilter, filterResults
    } = useDiaryList();

    const isSearchingOrFiltering = keyword.trim() || selectedColors.length > 0;

    return (
        <S.PageContainer>
            <S.ContentWrapper>
                <S.StickyHeaderContainer>
                    <S.PageHeader>
                        <S.PageTitle>Daily Journal</S.PageTitle>
                        <S.MonthNav>
                            <S.NavButton onClick={handlePrevMonth}>
                                <i className="fa-solid fa-chevron-left"></i>
                            </S.NavButton>
                            <S.MonthText>{year}년 {month}월</S.MonthText>
                            <S.NavButton onClick={handleNextMonth}>
                                <i className="fa-solid fa-chevron-right"></i>
                            </S.NavButton>
                        </S.MonthNav>
                    </S.PageHeader>

                    <S.SectionHeader>
                        <S.SectionTitle>{isSearchingOrFiltering ? 'Moments' : 'Days'}</S.SectionTitle>
                        <S.SectionSubtitle>
                            {isSearchingOrFiltering
                                ? 'Track memorable moments during your day.'
                                : 'Write your daily journal.'}
                        </S.SectionSubtitle>
                    </S.SectionHeader>

                    <S.FilterContainer>
                        <S.SearchInputWrapper>
                            <i className="fa-solid fa-magnifying-glass"></i>
                            <input
                                type="text"
                                placeholder="제목 검색..."
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                            />
                        </S.SearchInputWrapper>

                        {!keyword && (
                            <S.Tabs>
                                <S.Tab
                                    $active={selectedColors.length === 0}
                                    onClick={() => selectedColors.forEach(c => toggleColorFilter(c))}
                                >
                                    <i className="fa-regular fa-calendar-check"></i> All
                                </S.Tab>
                                {Object.entries(EMOTION_GROUPS).map(([name, color]) => (
                                    <S.Tab
                                        key={name}
                                        $active={selectedColors.includes(color)}
                                        onClick={() => toggleColorFilter(color)}
                                    >
                                        <S.ColorDot $color={color} /> {name}
                                    </S.Tab>
                                ))}
                            </S.Tabs>
                        )}
                    </S.FilterContainer>
                </S.StickyHeaderContainer>

                <S.ScrollableContent>
                    {!isSearchingOrFiltering ? (
                        <S.GridContainer>
                            {daysList.map((item) => (
                                <S.DayCard key={item.day} onClick={() => handleDayClick(item)}>
                                    <S.CardHeader>
                                        <i className="fa-regular fa-calendar"></i>
                                        <span>@{year}년 {month}월 {item.day}일</span>
                                    </S.CardHeader>
                                    <S.CardBody $isEmpty={!item.diary}>
                                        {item.diary ? (
                                            <S.CardTitle $hasDiary={true}>{item.diary.title}</S.CardTitle>
                                        ) : (
                                            <S.PlusIcon>
                                                <i className="fa-solid fa-plus"></i>
                                            </S.PlusIcon>
                                        )}
                                    </S.CardBody>
                                    <S.CardFooter>
                                        {item.diary && (
                                            <S.EmotionTag>
                                                <S.ColorDot $color={item.diary.emotionColor} />
                                                {getEmotionName(item.diary.emotionColor)}
                                            </S.EmotionTag>
                                        )}
                                    </S.CardFooter>
                                </S.DayCard>
                            ))}
                        </S.GridContainer>
                    ) : (
                        <S.ListContainer>
                            {keyword.trim() ? (
                                searchResults.length > 0 ? (
                                    searchResults.map((result) => (
                                        <S.ListItem key={result.diaryNo} onClick={() => handleResultClick(result.diaryNo)}>
                                            <S.ItemLeft>
                                                <i className="fa-regular fa-clock"></i>
                                                <S.ItemTitle>{result.title}</S.ItemTitle>
                                            </S.ItemLeft>
                                            <S.ItemRight>
                                                <S.ItemDate>@{result.displayDate}</S.ItemDate>
                                                <S.EmotionTag>
                                                    <S.ColorDot $color={result.emotionColor || '#e0e0e0'} />
                                                    {getEmotionName(result.emotionColor)}
                                                </S.EmotionTag>
                                            </S.ItemRight>
                                        </S.ListItem>
                                    ))
                                ) : (
                                    <S.EmptyState>검색 결과가 없습니다.</S.EmptyState>
                                )
                            ) : filterResults.length > 0 ? (
                                filterResults.map((result) => (
                                    <S.ListItem key={result.diaryNo} onClick={() => handleResultClick(result.diaryNo)}>
                                        <S.ItemLeft>
                                            <i className="fa-regular fa-clock"></i>
                                            <S.ItemTitle>{result.title}</S.ItemTitle>
                                        </S.ItemLeft>
                                        <S.ItemRight>
                                            <S.ItemDate>@{result.displayDate}</S.ItemDate>
                                            <S.EmotionTag>
                                                <S.ColorDot $color={result.emotionColor || '#e0e0e0'} />
                                                {getEmotionName(result.emotionColor)}
                                            </S.EmotionTag>
                                        </S.ItemRight>
                                    </S.ListItem>
                                ))
                            ) : (
                                <S.EmptyState>해당 감정의 일기가 없습니다.</S.EmptyState>
                            )}
                        </S.ListContainer>
                    )}
                </S.ScrollableContent>
            </S.ContentWrapper>
        </S.PageContainer>
    );
};

export default DiaryList;