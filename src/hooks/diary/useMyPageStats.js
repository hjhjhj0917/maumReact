import { useState, useEffect } from 'react';
import { getDiaryStats, getDepressionTrend, getTopMusic, getFavoriteDiaries, getWeeklyReport } from '../../api/diaryApi';

const FAVORITE_PREVIEW_COUNT = 3;

export const useMyPageStats = () => {
    const [diaryStats, setDiaryStats] = useState({ totalCount: 0, currentStreak: 0, longestStreak: 0 });
    const [depressionTrend, setDepressionTrend] = useState([]);
    const [topMusic, setTopMusic] = useState([]);
    const [favoriteDiaries, setFavoriteDiaries] = useState([]);
    const [weeklyReport, setWeeklyReport] = useState(null);
    const [isReportLoading, setIsReportLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [statsRes, trendRes, musicRes, favoritesRes] = await Promise.all([
                    getDiaryStats(),
                    getDepressionTrend(),
                    getTopMusic(),
                    getFavoriteDiaries()
                ]);

                if (statsRes) setDiaryStats(statsRes);
                if (trendRes) setDepressionTrend(trendRes);
                if (musicRes) setTopMusic(musicRes);
                if (favoritesRes) setFavoriteDiaries(favoritesRes.slice(0, FAVORITE_PREVIEW_COUNT));
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        // Gemini 호출이 포함돼 상대적으로 느릴 수 있어 나머지 위젯과 분리해서 별도로 로딩
        const fetchWeeklyReport = async () => {
            try {
                const res = await getWeeklyReport();
                if (res) setWeeklyReport(res);
            } catch (error) {
                console.error(error);
            } finally {
                setIsReportLoading(false);
            }
        };

        fetchStats();
        fetchWeeklyReport();
    }, []);

    return { diaryStats, depressionTrend, topMusic, favoriteDiaries, weeklyReport, isLoading, isReportLoading };
};
