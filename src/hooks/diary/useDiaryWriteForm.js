import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { insertDiary } from '../../api/diaryApi.js';

export const useDiaryWriteForm = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const queryDate = searchParams.get('date');
    const today = new Date();

    const [modal, setModal] = useState({ show: false, title: '', message: '', onConfirm: null });

    const showAlert = (title, message, onConfirm = null) => {
        setModal({ show: true, title, message, onConfirm });
    };

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [date, setDate] = useState(() => {
        if (queryDate) {
            const [y, m, d] = queryDate.split('-').map(Number);
            return { year: y, month: m, day: d };
        }
        return {
            year: today.getFullYear(),
            month: today.getMonth() + 1,
            day: today.getDate()
        };
    });

    const formattedDate = `${date.year}년 ${String(date.month).padStart(2, '0')}월 ${String(date.day).padStart(2, '0')}일`;
    const apiDate = `${date.year}-${String(date.month).padStart(2, '0')}-${String(date.day).padStart(2, '0')}`;

    const handleSubmit = async () => {
        if (!title.trim()) return showAlert('알림', '제목을 입력해주세요.');
        if (!content.trim()) return showAlert('알림', '내용을 입력해주세요.');

        try {
            setIsLoading(true);

            const res = await insertDiary(title, content, apiDate);

            if (res) {
                showAlert('알림', '일기가 작성되었습니다.', () => {
                    window.dispatchEvent(new CustomEvent('diary-updated'));
                    navigate(`/diary/${res}`);
                });
            } else {
                showAlert('오류', '저장에 실패했습니다.');
                setIsLoading(false);
            }
        } catch (error) {
            const errorMsg = error.response?.data?.message || "서버 통신 중 오류가 발생했습니다.";
            showAlert('오류', errorMsg);
            setIsLoading(false);
        }
    };

    return {
        title, setTitle,
        content, setContent,
        date, setDate,
        formattedDate,
        handleSubmit,
        isLoading,
        modal, setModal
    };
};