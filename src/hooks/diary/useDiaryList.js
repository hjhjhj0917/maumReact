import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMonthlyDiaries, searchDiaries, filterDiariesByColors, updateFavorite, getFavoriteDiaries } from '../../api/diaryApi.js';

export const EMOTION_GROUPS = {
    "기쁨": "#FFD700",
    "신뢰": "#66CDAA",
    "공포": "#4B0082",
    "놀람": "#00BFFF",
    "슬픔": "#1E3A8A",
    "혐오": "#556B2F",
    "분노": "#FF3B30",
    "기대": "#FFA500",
    "무감정": "#9E9E9E"
};

export const useDiaryList = () => {
    const navigate = useNavigate();

    const [currentDate, setCurrentDate] = useState(new Date());

    const [keyword, setKeyword] = useState(() => {
        return sessionStorage.getItem('diary-keyword') || '';
    });

    const [selectedColors, setSelectedColors] = useState(() => {
        const savedColors = sessionStorage.getItem('diary-colors');
        return savedColors ? JSON.parse(savedColors) : [];
    });

    const [showFavorites, setShowFavorites] = useState(() => {
        const savedFavorites = sessionStorage.getItem('diary-favorites');
        return savedFavorites ? JSON.parse(savedFavorites) : false;
    });

    const [diaries, setDiaries] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [filterResults, setFilterResults] = useState([]);
    const [favoriteResults, setFavoriteResults] = useState([]);

    useEffect(() => {
        sessionStorage.setItem('diary-keyword', keyword);
    }, [keyword]);

    useEffect(() => {
        sessionStorage.setItem('diary-colors', JSON.stringify(selectedColors));
    }, [selectedColors]);

    useEffect(() => {
        sessionStorage.setItem('diary-favorites', JSON.stringify(showFavorites));
    }, [showFavorites]);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const dateQuery = `${year}-${String(month).padStart(2, '0')}`;

    const processDiaryData = (data) => {
        if (!data || !Array.isArray(data)) return [];

        return [...data]
            .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
            .map(item => ({
                ...item,
                displayDate: item.createdAt
                    ? `${item.createdAt.substring(2, 4)}년 ${item.createdAt.substring(5, 7)}월 ${item.createdAt.substring(8, 10)}일`
                    : ''
            }));
    };

    const handleSetKeyword = (value) => {
        setKeyword(value);
        if (!value.trim()) {
            setSearchResults([]);
        }
    };

    const toggleColorFilter = (color) => {
        setSelectedColors(prev => {
            const newColors = prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color];
            if (newColors.length === 0) {
                setFilterResults([]);
            }
            return newColors;
        });
    };

    const clearFilters = () => {
        setSelectedColors([]);
        setFilterResults([]);
        setShowFavorites(false);
    };

    useEffect(() => {
        if (!keyword.trim() && selectedColors.length === 0) {
            const fetchDiaries = async () => {
                try {
                    const data = await getMonthlyDiaries(dateQuery);
                    setDiaries(data || []);
                } catch (error) {
                    console.error(error)
                    setDiaries([]);
                }
            };
            fetchDiaries();
        }
    }, [dateQuery, keyword, selectedColors]);

    useEffect(() => {
        if (keyword.trim()) {
            const delayDebounceFn = setTimeout(async () => {
                try {
                    const data = await searchDiaries(keyword);
                    setSearchResults(processDiaryData(data));
                } catch (error) {
                    console.error(error)
                    setSearchResults([]);
                }
            }, 300);
            return () => clearTimeout(delayDebounceFn);
        }
    }, [keyword]);

    useEffect(() => {
        if (selectedColors.length > 0) {
            const fetchFilterResults = async () => {
                try {
                    const data = await filterDiariesByColors(selectedColors);
                    setFilterResults(processDiaryData(data));
                } catch (error) {
                    console.error(error)
                    setFilterResults([]);
                }
            };
            fetchFilterResults();
        }
    }, [selectedColors]);

    // 키워드/색상 필터 없이 "즐겨찾기만" 켜진 경우, 월과 무관하게 전체 즐겨찾기 목록을 서버에서 가져온다.
    useEffect(() => {
        if (showFavorites && !keyword.trim() && selectedColors.length === 0) {
            const fetchFavoriteDiaries = async () => {
                try {
                    const data = await getFavoriteDiaries();
                    setFavoriteResults(processDiaryData(data));
                } catch (error) {
                    console.error(error)
                    setFavoriteResults([]);
                }
            };
            fetchFavoriteDiaries();
        }
    }, [showFavorites, keyword, selectedColors]);

    const daysInMonth = new Date(year, month, 0).getDate();

    const daysList = useMemo(() => {
        return Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1;
            const fullDateStr = `${dateQuery}-${String(day).padStart(2, '0')}`;

            const diary = diaries.find(d => {
                const serverDate = d.createdAt ? d.createdAt.substring(0, 10) : '';
                return serverDate === fullDateStr;
            });

            return {
                day,
                dateStr: fullDateStr,
                diary: diary || null
            };
        });
    }, [diaries, daysInMonth, dateQuery]);

    const finalList = useMemo(() => {
        let list = [];
        if (keyword.trim()) {
            list = searchResults;
            if (showFavorites) {
                list = list.filter(diary => diary.isFavorite === 1);
            }
        } else if (selectedColors.length > 0) {
            list = filterResults;
            if (showFavorites) {
                list = list.filter(diary => diary.isFavorite === 1);
            }
        } else if (showFavorites) {
            // 즐겨찾기만 켜진 경우: 현재 달(diaries)이 아니라 서버에서 받아온 전체 즐겨찾기 목록을 사용
            list = favoriteResults;
        } else {
            list = processDiaryData(diaries);
        }

        return list;
    }, [keyword, searchResults, selectedColors, filterResults, diaries, showFavorites, favoriteResults, processDiaryData]);

    const emptyMessage = useMemo(() => {
        if (keyword.trim()) return "검색 결과가 없습니다.";
        if (selectedColors.length > 0 && showFavorites) return "해당 감정이면서 즐겨찾기한 일기가 없습니다.";
        if (selectedColors.length > 0) return "해당 감정의 일기가 없습니다.";
        if (showFavorites) return "즐겨찾기한 일기가 없습니다.";
        return "일기가 없습니다.";
    }, [keyword, selectedColors, showFavorites]);

    const handlePrevMonth = () => setCurrentDate(new Date(year, month - 2, 1));
    const handleNextMonth = () => setCurrentDate(new Date(year, month, 1));

    const handleDayClick = (item) => {
        if (item.diary) {
            navigate(`/diary/${item.diary.diaryNo}`);
        } else {
            navigate(`/diary/write?date=${item.dateStr}`);
        }
    };

    const handleResultClick = (diaryNo) => {
        navigate(`/diary/${diaryNo}`);
    };

    const handleToggleFavorite = async (e, diaryNo, currentStatus) => {
        e.stopPropagation();

        const newStatus = currentStatus === 1 ? 0 : 1;

        try {
            await updateFavorite(diaryNo, newStatus);

            const updateList = (list) =>
                list.map(diary =>
                    diary.diaryNo === diaryNo
                        ? { ...diary, isFavorite: newStatus }
                        : diary
                );

            setDiaries(prev => updateList(prev));
            setSearchResults(prev => updateList(prev));
            setFilterResults(prev => updateList(prev));
            // 즐겨찾기 해제 시 즐겨찾기 전용 목록에서는 아예 제거, 추가 시에는 상태만 갱신
            setFavoriteResults(prev =>
                newStatus === 0
                    ? prev.filter(diary => diary.diaryNo !== diaryNo)
                    : updateList(prev)
            );

        } catch (error) {
            console.error(error)
            alert("즐겨찾기 상태 변경에 실패했습니다.");
        }
    };

    return {
        year, month, daysList,
        handlePrevMonth, handleNextMonth, handleDayClick,
        keyword, setKeyword: handleSetKeyword, handleResultClick,
        selectedColors, toggleColorFilter, clearFilters,
        showFavorites, setShowFavorites,
        handleToggleFavorite, finalList, emptyMessage
    };
};