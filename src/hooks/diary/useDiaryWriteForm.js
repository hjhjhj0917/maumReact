import { useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { insertDiary, updateDiary, draftSaveDiary, uploadDiaryImages } from '../../api/diaryApi.js';

const MAX_DIARY_IMAGE_COUNT = 3;

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

    // 일기가 아직 생성되기 전(diaryNo가 없는 상태)이라 이미지는 브라우저에만 들고 있다가,
    // 작성 완료 시점에 diaryNo를 받은 후에 한꺼번에 업로드함
    const [pendingImages, setPendingImages] = useState([]); // [{ file, previewUrl }]

    const handleAddImages = (files) => {
        const newItems = files.map(file => ({ file, previewUrl: URL.createObjectURL(file) }));
        setPendingImages(prev => [...prev, ...newItems].slice(0, MAX_DIARY_IMAGE_COUNT));
    };

    const handleRemovePendingImage = (index) => {
        setPendingImages(prev => {
            const target = prev[index];
            if (target) URL.revokeObjectURL(target.previewUrl);
            return prev.filter((_, i) => i !== index);
        });
    };

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

    // 임시저장으로 이미 만들어진 일기가 있으면 그 diaryNo를 들고 있다가, 다음 임시저장/작성완료 때
    // 새로 만들지 않고 그 자리에 계속 덮어씀
    const draftDiaryNoRef = useRef(null);
    const [isDraftSaving, setIsDraftSaving] = useState(false);

    // 버튼을 눌렀을 때만 임시저장함 (AI 분석 없이 제목/내용만 저장)
    const handleDraftSave = async () => {
        if (!title.trim() && !content.trim()) {
            return showAlert('알림', '저장할 내용이 없습니다.');
        }

        try {
            setIsDraftSaving(true);
            const diaryNo = await draftSaveDiary(draftDiaryNoRef.current, title, content, apiDate);

            if (diaryNo) {
                draftDiaryNoRef.current = diaryNo;
                showAlert('알림', '임시저장되었습니다.');
            } else {
                showAlert('오류', '임시저장에 실패했습니다.');
            }
        } catch (error) {
            const errorMsg = error.response?.data?.message || "서버 통신 중 오류가 발생했습니다.";
            showAlert('오류', errorMsg);
        } finally {
            setIsDraftSaving(false);
        }
    };

    const handleSubmit = async () => {
        if (!title.trim()) return showAlert('알림', '제목을 입력해주세요.');
        if (!content.trim()) return showAlert('알림', '내용을 입력해주세요.');

        try {
            setIsLoading(true);

            // 임시저장으로 이미 diaryNo가 있으면 그 일기를 수정(재분석)하고, 없으면 새로 등록함
            const res = draftDiaryNoRef.current
                ? await updateDiary(draftDiaryNoRef.current, title, content).then(() => draftDiaryNoRef.current)
                : await insertDiary(title, content, apiDate);

            if (res) {
                if (pendingImages.length > 0) {
                    try {
                        await uploadDiaryImages(res, pendingImages.map(item => item.file));
                    } catch (imageError) {
                        console.error("일기 이미지 업로드 실패:", imageError);
                    }
                }

                setIsLoading(false);
                showAlert('알림', '일기가 작성되었습니다.', () => {
                    window.dispatchEvent(new CustomEvent('diary-updated'));
                    navigate(`/diary/${res}`);
                });
            } else {
                setIsLoading(false);
                showAlert('오류', '저장에 실패했습니다.');
            }
        } catch (error) {
            setIsLoading(false);
            const errorMsg = error.response?.data?.message || "서버 통신 중 오류가 발생했습니다.";
            showAlert('오류', errorMsg);
        }
    };

    return {
        title, setTitle,
        content, setContent,
        date, setDate,
        formattedDate,
        handleSubmit,
        isLoading,
        handleDraftSave,
        isDraftSaving,
        modal, setModal,
        pendingImages, handleAddImages, handleRemovePendingImage,
        maxImageCount: MAX_DIARY_IMAGE_COUNT
    };
};