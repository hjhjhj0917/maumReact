import apiClient from './apiClient';

/* [Diary Management] */
export const insertDiary = (title, content, createdAt) =>
    apiClient.post('/diary/diaryInsert', { title, content, createdAt });

export const updateDiary = (diaryNo, title, content) =>
    apiClient.post('/diary/diaryUpdate', { diaryNo, title, content });

export const deleteDiary = (diaryNo) =>
    apiClient.post('/diary/diaryDelete', { diaryNo });


/* [Diary Retrieval] */
export const getMonthlyDiaries = (createdAt) =>
    apiClient.get('/diary/monthly', { params: { createdAt } });

export const getDiaryDetail = (diaryNo) =>
    apiClient.get('/diary/detail', { params: { diaryNo } });

export const searchDiaries = (keyword) =>
    apiClient.get('/diary/search', { params: { keyword } });

export const filterDiariesByColors = (colors) =>
    apiClient.get('/diary/filter', { params: { colors: colors.join(',') } });

export const getRecentDiaries = () =>
    apiClient.get('/diary/recent');