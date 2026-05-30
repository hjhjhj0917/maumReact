import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from '../style/pages/NotFound.styles';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <S.NotFoundContainer>
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
        </S.NotFoundContainer>
    );
};

export default NotFound;