import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDiaryDetail, updateDiary, deleteDiary } from '../../api/diaryApi.js';

export const useDiaryDetail = () => {
    const { diaryNo } = useParams();
    const navigate = useNavigate();

    const [modal, setModal] = useState({ show: false, title: '', message: '', isConfirm: false, onConfirm: null, onCancel: null });

    const showAlert = (title, message, onConfirm = null) => {
        setModal({ show: true, title, message, isConfirm: false, onConfirm, onCancel: null });
    };

    const showConfirm = (title, message, onConfirm) => {
        setModal({
            show: true,
            title,
            message,
            isConfirm: true,
            onConfirm,
            onCancel: () => setModal(prev => ({ ...prev, show: false }))
        });
    };

    const [diary, setDiary] = useState(null);
    const [loading, setLoading] = useState(true);

    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState('');
    const [editContent, setEditContent] = useState('');

    const fetchDiaryDetail = useCallback(async () => {
        try {
            const data = await getDiaryDetail(diaryNo);
            const diaryData = data.data || data;

            if (diaryData) {
                setDiary(diaryData);
            } else {
                showAlert("오류", "일기 정보를 찾을 수 없습니다.", () => {
                    navigate('/diary/list', { replace: true });
                });
            }
        } catch (error) {
            const errorMsg = error.response?.data?.message || "일기를 불러오는 중 오류가 발생했습니다.";
            showAlert("오류", errorMsg, () => {
                navigate('/diary/list', { replace: true });
            });
        } finally {
            setLoading(false);
        }
    }, [diaryNo, navigate]);

    useEffect(() => {
        if (diaryNo) {
            fetchDiaryDetail();
        }
    }, [diaryNo, fetchDiaryDetail]);

    const handleGoBack = () => {
        navigate('/diary/list');
    };

    const handleEditClick = () => {
        setEditTitle(diary.title);
        setEditContent(diary.content);
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
    };

    const handleSaveClick = async () => {
        if (!editTitle.trim() || !editContent.trim()) {
            showAlert('알림', '제목과 내용을 모두 입력해주세요.');
            return;
        }

        try {
            setLoading(true);
            const res = await updateDiary(diaryNo, editTitle, editContent);

            if (res && res.data) {
                showAlert('알림', res.message || "일기가 수정 및 재분석 되었습니다.", async () => {
                    setIsEditing(false);
                    window.dispatchEvent(new CustomEvent('diary-updated'));
                    await fetchDiaryDetail();
                });
            } else {
                showAlert('오류', res.message || "수정에 실패했습니다.");
                setLoading(false);
            }
        } catch (error) {
            showAlert('오류', error.response?.data?.message || "서버 통신 중 오류가 발생했습니다.");
            setLoading(false);
        }
    };

    const handleDeleteClick = () => {
        showConfirm("삭제 확인", "정말 이 일기를 삭제하시겠습니까? 삭제 후에는 복구할 수 없습니다.", async () => {
            try {
                setLoading(true);
                const res = await deleteDiary(diaryNo);

                if (res && res.data) {
                    showAlert("알림", res.message || "일기가 삭제되었습니다.", () => {
                        window.dispatchEvent(new CustomEvent('diary-updated'));
                        navigate('/diary/list', { replace: true });
                    });
                } else {
                    showAlert("오류", res.message || "삭제에 실패했습니다.");
                    setLoading(false);
                }
            } catch (error) {
                showAlert("오류", error.response?.data?.message || "서버 통신 중 오류가 발생했습니다.");
                setLoading(false);
            }
        });
    };

    return {
        diary,
        loading,
        handleGoBack,
        isEditing,
        editTitle, setEditTitle,
        editContent, setEditContent,
        handleEditClick,
        handleCancelEdit,
        handleSaveClick,
        handleDeleteClick,
        modal, setModal
    };
};