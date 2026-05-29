import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMonthlyDiaries, searchDiaries, filterDiariesByColors } from '../../api/diaryApi.js';

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

    // 1. 상태의 초기값을 sessionStorage에서 가져오도록 변경 (없으면 기본값)
    const [currentDate, setCurrentDate] = useState(() => {
        const savedDate = sessionStorage.getItem('diary-currentDate');
        return savedDate ? new Date(savedDate) : new Date();
    });

    const [keyword, setKeyword] = useState(() => {
        return sessionStorage.getItem('diary-keyword') || '';
    });

    const [selectedColors, setSelectedColors] = useState(() => {
        const savedColors = sessionStorage.getItem('diary-colors');
        return savedColors ? JSON.parse(savedColors) : [];
    });

    const [diaries, setDiaries] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [filterResults, setFilterResults] = useState([]);

    // 2. 상태가 변경될 때마다 sessionStorage에 실시간으로 업데이트
    useEffect(() => {
        sessionStorage.setItem('diary-currentDate', currentDate.toISOString());
    }, [currentDate]);

    useEffect(() => {
        sessionStorage.setItem('diary-keyword', keyword);
    }, [keyword]);

    useEffect(() => {
        sessionStorage.setItem('diary-colors', JSON.stringify(selectedColors));
    }, [selectedColors]);


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

    useEffect(() => {
        if (!keyword.trim() && selectedColors.length === 0) {
            const fetchDiaries = async () => {
                try {
                    const data = await getMonthlyDiaries(dateQuery);
                    setDiaries(data || []);
                } catch (error) {
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
                    setSearchResults([]);
                }
            }, 300);
            return () => clearTimeout(delayDebounceFn);
        } else {
            setSearchResults([]);
        }
    }, [keyword]);

    useEffect(() => {
        if (selectedColors.length > 0) {
            const fetchFilterResults = async () => {
                try {
                    const data = await filterDiariesByColors(selectedColors);
                    setFilterResults(processDiaryData(data));
                } catch (error) {
                    setFilterResults([]);
                }
            };
            fetchFilterResults();
        } else {
            setFilterResults([]);
        }
    }, [selectedColors]);

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

    const toggleColorFilter = (color) => {
        setSelectedColors(prev =>
            prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
        );
    };

    return {
        year, month, daysList,
        handlePrevMonth, handleNextMonth, handleDayClick,
        keyword, setKeyword, searchResults, handleResultClick,
        selectedColors, toggleColorFilter, filterResults
    };
};