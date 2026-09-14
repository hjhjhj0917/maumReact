import React, { useRef } from 'react';
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

// 일기 이미지를 최대 maxCount장까지 첨부/삭제하는 공용 UI.
// images: 이미 업로드되어 서버에 저장된 이미지 [{ imageNo, imageUrl }]
// pendingFiles: 아직 서버에 올리지 않고 브라우저에만 있는 파일 [{ file, previewUrl }] (일기 작성 중 diaryNo가 없을 때 사용)
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

    const totalCount = images.length + pendingFiles.length;
    const canAddMore = totalCount < maxCount && !disabled;

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
            {images.map((img) => (
                <Thumb key={img.imageNo}>
                    <img src={img.imageUrl} alt="일기 첨부 이미지" />
                    {!disabled && (
                        <RemoveButton onClick={() => onRemoveExisting?.(img.imageNo)} title="이미지 삭제">
                            <i className="fa-solid fa-xmark"></i>
                        </RemoveButton>
                    )}
                </Thumb>
            ))}

            {pendingFiles.map((item, idx) => (
                <Thumb key={`pending-${idx}`}>
                    <img src={item.previewUrl} alt="첨부 예정 이미지" />
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
        </Wrapper>
    );
};

export default DiaryImageUploader;
