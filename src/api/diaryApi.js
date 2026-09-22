import apiClient from './apiClient';

/* [Diary Management] */
export const insertDiary = (title, content, createdAt) =>
    apiClient.post('/diary/diaryInsert', { title, content, createdAt });

// ★ 즐겨찾기 이후 추가/수정
// 일기 임시저장 (AI 분석 없이 제목/내용만 저장) - diaryNo가 없으면 새로 생성하고,
// 있으면 그 자리에 덮어씀. 작성 중 주기적으로 자동 호출됨
export const draftSaveDiary = (diaryNo, title, content, createdAt) =>
    apiClient.post('/diary/draftSave', { diaryNo, title, content, createdAt });

export const updateDiary = (diaryNo, title, content) =>
    apiClient.post('/diary/diaryUpdate', { diaryNo, title, content });

export const deleteDiary = (diaryNo) =>
    apiClient.post('/diary/diaryDelete', { diaryNo });

// ★ 즐겨찾기 이후 추가/수정
export const updateFavorite = (diaryNo, isFavorite) =>
    apiClient.post('/diary/favorite', { diaryNo, isFavorite });

// ★ 즐겨찾기 이후 추가/수정
export const updateDiaryTitle = (diaryNo, title) =>
    apiClient.post('/diary/title', { diaryNo, title });

// ★ 즐겨찾기 이후 추가/수정
export const updateDiaryPinned = (diaryNo, isPinned) =>
    apiClient.post('/diary/pin', { diaryNo, isPinned });

// ★ 즐겨찾기 이후 추가/수정
// 일기 이미지 업로드 (GCS, 최대 3장) - apiClient 기본 Content-Type(application/json)을 지워서
// 브라우저가 FormData용 multipart boundary를 자동으로 채우게 함 (STT 업로드와 동일한 패턴)
export const uploadDiaryImages = (diaryNo, files) => {
    const formData = new FormData();
    files.forEach(file => formData.append('images', file));

    return apiClient.post(`/diary/${diaryNo}/images/upload`, formData, {
        headers: { 'Content-Type': undefined }
    });
};

// ★ 즐겨찾기 이후 추가/수정
export const deleteDiaryImage = (imageNo) =>
    apiClient.post('/diary/images/delete', { imageNo });


/* [Diary Retrieval] */
export const getMonthlyDiaries = (createdAt) =>
    apiClient.get('/diary/monthly', { params: { createdAt } });

// ★ 즐겨찾기 이후 추가/수정
export const getDiaryDetail = (diaryNo) =>
    apiClient.get(`/diary/${diaryNo}`);

export const searchDiaries = (keyword) =>
    apiClient.get('/diary/search', { params: { keyword } });

export const filterDiariesByColors = (colors) =>
    apiClient.get('/diary/filter', { params: { colors: colors.join(',') } });

export const getRecentDiaries = () =>
    apiClient.get('/diary/recent');

// ★ 즐겨찾기 이후 추가/수정
export const getFavoriteDiaries = () =>
    apiClient.get('/diary/favorites');

export const getEmotionStats = () =>
    apiClient.get('/diary/emotions/stats');

/* [MyPage Stats] */
// ★ 즐겨찾기 이후 추가/수정
export const getDiaryStats = () =>
    apiClient.get('/diary/stats/summary');

// ★ 즐겨찾기 이후 추가/수정
export const getDepressionTrend = () =>
    apiClient.get('/diary/stats/trend');

// ★ 즐겨찾기 이후 추가/수정
export const getTopMusic = () =>
    apiClient.get('/diary/stats/top-music');

// ★ 즐겨찾기 이후 추가/수정
export const getWeeklyReport = () =>
    apiClient.get('/diary/stats/report');