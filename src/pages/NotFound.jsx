import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useDraggable } from '../hooks/useIndex.js';
import * as S from '../style/pages/NotFound.styles';

const DraggableEmotion = ({ data, index }) => {
    const draggable = useDraggable(data.x, data.y);

    return (
        <S.DraggableItem {...draggable.dragProps}>
            <S.FloatingElement
                $isDragging={draggable.isDragging}
                $duration={`${5 + (index % 3)}s`}
                $delay={`${index * 0.2}s`}
            >
                <S.HeroPill
                    $color={data.color}
                    $isDark={['#4B0082', '#1E3A8A', '#556B2F'].includes(data.color)}
                >
                    #{data.label}
                </S.HeroPill>
            </S.FloatingElement>
        </S.DraggableItem>
    );
};

const NotFound = () => {
    const navigate = useNavigate();

    const emotionData = [
        { label: "무감정", color: "#9E9E9E", x: -620, y: -270 },
        { label: "신뢰", color: "#66CDAA", x: -480, y: 170 },
        { label: "혐오", color: "#556B2F", x: -750, y: -30 },
        { label: "공포", color: "#4B0082", x: -380, y: -360 },
        { label: "슬픔", color: "#1E3A8A", x: -550, y: 240 },
        { label: "놀람", color: "#00BFFF", x: 580, y: -320 },
        { label: "기대", color: "#FFA500", x: 420, y: 80 },
        { label: "기쁨", color: "#FFD700", x: 700, y: -160 },
        { label: "분노", color: "#FF3B30", x: 630, y: 210 },
    ];

    return (
        <>
            <Header />

            <S.NotFoundContainer>
                <S.InteractiveCanvas>
                    {emotionData.map((data, index) => (
                        <DraggableEmotion key={index} data={data} index={index} />
                    ))}
                </S.InteractiveCanvas>

                <S.ContentWrapper>
                    <S.ErrorCode>404</S.ErrorCode>
                    <S.Title>마음이 잠시 길을 잃었어요</S.Title>
                    <S.Description>
                        찾으시는 페이지의 주소가 잘못 입력되었거나,<br />
                        페이지가 삭제되어 이동할 수 없습니다.<br />
                        따뜻한 대화가 기다리는 곳으로 다시 안내해 드릴게요.
                    </S.Description>
                    <S.HomeButton onClick={() => navigate('/')}>
                        <i className="fa-solid fa-house"></i>
                        메인으로 돌아가기
                    </S.HomeButton>
                </S.ContentWrapper>
            </S.NotFoundContainer>
        </>
    );
};

export default NotFound;