import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin: 12px 0;
`;

const Thumb = styled.div`
    position: relative;
    width: 90px;
    height: 90px;
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid #e5e5e5;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        cursor: pointer;
        transition: transform 0.15s ease;
    }

    img:hover {
        transform: scale(1.05);
    }
`;

const RemoveButton = styled.button`
    position: absolute;
    top: 4px;
    right: 4px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: none;
    background: rgba(0, 0, 0, 0.6);
    color: #ffffff;
    font-size: 11px;
    line-height: 1;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
`;

const AddButton = styled.button`
    width: 90px;
    height: 90px;
    border-radius: 12px;
    border: 1px dashed #cccccc;
    background: #fafafa;
    color: #888888;
    font-size: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    cursor: pointer;

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    i {
        font-size: 18px;
    }
`;

const LightboxOverlay = styled.div`
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.85);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2000;
`;

const LightboxImage = styled.img`
    max-width: 88vw;
    max-height: 85vh;
    object-fit: contain;
    border-radius: 8px;
    user-select: none;
`;

const LightboxCloseButton = styled.button`
    position: absolute;
    top: 24px;
    right: 24px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: none;
    background: rgba(255, 255, 255, 0.15);
    color: #ffffff;
    font-size: 18px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        background: rgba(255, 255, 255, 0.3);
    }
`;

const LightboxNavButton = styled.button`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    ${({ $side }) => ($side === 'left' ? 'left: 24px;' : 'right: 24px;')}
    width: 44px;
    height: 44px;
    border-radius: 50%;
    border: none;
    background: rgba(255, 255, 255, 0.15);
    color: #ffffff;
    font-size: 18px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        background: rgba(255, 255, 255, 0.3);
    }
`;

const LightboxCounter = styled.div`
    position: absolute;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%);
    color: #ffffff;
    font-size: 13px;
    background: rgba(255, 255, 255, 0.15);
    padding: 4px 12px;
    border-radius: 12px;
`;

// 일기 이미지를 최대 maxCount장까지 첨부/삭제하는 공용 UI.
// images: 이미 업로드되어 서버에 저장된 이미지 [{ imageNo, imageUrl }]
// pendingFiles: 아직 서버에 올리지 않고 브라우저에만 있는 파일 [{ file, previewUrl }] (일기 작성 중 diaryNo가 없을 때 사용)
// 썸네일을 클릭하면 화면 중앙에 크게 보여주는 라이트박스가 뜨고, 좌우 화살표로 다른 이미지로 넘어갈 수 있음
// ★ 즐겨찾기 이후 추가/수정
const DiaryImageUploader = ({
    images = [],
    pendingFiles = [],
    maxCount = 3,
    disabled = false,
    onSelectFiles,
    onRemoveExisting,
    onRemovePending
}) => {
    const fileInputRef = useRef(null);
    const [lightboxIndex, setLightboxIndex] = useState(null);

    const totalCount = images.length + pendingFiles.length;
    const canAddMore = totalCount < maxCount && !disabled;

    // 라이트박스에서는 기존 업로드 이미지 + 아직 첨부 대기 중인 이미지를 하나의 목록으로 합쳐서 넘겨봄
    const allSlides = [
        ...images.map(img => ({ url: img.imageUrl })),
        ...pendingFiles.map(item => ({ url: item.previewUrl }))
    ];

    const closeLightbox = () => setLightboxIndex(null);

    const showPrev = () => {
        setLightboxIndex(prev => (prev === null ? prev : (prev - 1 + allSlides.length) % allSlides.length));
    };

    const showNext = () => {
        setLightboxIndex(prev => (prev === null ? prev : (prev + 1) % allSlides.length));
    };

    useEffect(() => {
        if (lightboxIndex === null) return undefined;

        const slideCount = allSlides.length;

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') setLightboxIndex(null);
            if (e.key === 'ArrowLeft') {
                setLightboxIndex(prev => (prev === null ? prev : (prev - 1 + slideCount) % slideCount));
            }
            if (e.key === 'ArrowRight') {
                setLightboxIndex(prev => (prev === null ? prev : (prev + 1) % slideCount));
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [lightboxIndex, allSlides.length]);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files || []);
        e.target.value = '';
        if (files.length === 0) return;

        const remaining = maxCount - totalCount;
        if (remaining <= 0) return;

        onSelectFiles?.(files.slice(0, remaining));
    };

    return (
        <Wrapper>
            {images.map((img, idx) => (
                <Thumb key={img.imageNo}>
                    <img src={img.imageUrl} alt="일기 첨부 이미지" loading="lazy" onClick={() => setLightboxIndex(idx)} />
                    {!disabled && (
                        <RemoveButton onClick={() => onRemoveExisting?.(img.imageNo)} title="이미지 삭제">
                            <i className="fa-solid fa-xmark"></i>
                        </RemoveButton>
                    )}
                </Thumb>
            ))}

            {pendingFiles.map((item, idx) => (
                <Thumb key={`pending-${idx}`}>
                    <img
                        src={item.previewUrl}
                        alt="첨부 예정 이미지"
                        onClick={() => setLightboxIndex(images.length + idx)}
                    />
                    {!disabled && (
                        <RemoveButton onClick={() => onRemovePending?.(idx)} title="첨부 취소">
                            <i className="fa-solid fa-xmark"></i>
                        </RemoveButton>
                    )}
                </Thumb>
            ))}

            {canAddMore && (
                <>
                    <AddButton type="button" onClick={() => fileInputRef.current?.click()} disabled={disabled}>
                        <i className="fa-solid fa-plus"></i>
                        {totalCount}/{maxCount}
                    </AddButton>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        hidden
                        onChange={handleFileChange}
                    />
                </>
            )}

            {lightboxIndex !== null && allSlides[lightboxIndex] && (
                <LightboxOverlay onClick={closeLightbox}>
                    <LightboxCloseButton onClick={closeLightbox} title="닫기">
                        <i className="fa-solid fa-xmark"></i>
                    </LightboxCloseButton>

                    {allSlides.length > 1 && (
                        <LightboxNavButton
                            $side="left"
                            onClick={(e) => { e.stopPropagation(); showPrev(); }}
                            title="이전 이미지"
                        >
                            <i className="fa-solid fa-chevron-left"></i>
                        </LightboxNavButton>
                    )}

                    <LightboxImage
                        src={allSlides[lightboxIndex].url}
                        alt="확대된 이미지"
                        onClick={(e) => e.stopPropagation()}
                    />

                    {allSlides.length > 1 && (
                        <LightboxNavButton
                            $side="right"
                            onClick={(e) => { e.stopPropagation(); showNext(); }}
                            title="다음 이미지"
                        >
                            <i className="fa-solid fa-chevron-right"></i>
                        </LightboxNavButton>
                    )}

                    {allSlides.length > 1 && (
                        <LightboxCounter>
                            {lightboxIndex + 1} / {allSlides.length}
                        </LightboxCounter>
                    )}
                </LightboxOverlay>
            )}
        </Wrapper>
    );
};

export default DiaryImageUploader;
