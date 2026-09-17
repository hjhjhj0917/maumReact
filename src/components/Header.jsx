import React from 'react';
import { useHeader } from '../hooks/useHeader';
import logoImg from '../assets/images/includes/logo.webp';
import CustomModal from './CustomModal';
import * as S from '../style/components/Header.styles';

const Header = () => {
    const {
        isProfileModalOpen,
        showLogoutModal,
        setShowLogoutModal,
        user,
        currentStreak,
        toggleProfileModal,
        goToMyPage,
        goToTodayWrite,
        handleLogoutClick,
        confirmLogout
    } = useHeader();

    return (
        <>
            <S.HeaderContainer>
                {user ? (
                    <S.LogoContainer as="div">
                        <S.LogoImage src={logoImg} alt="MAUM" />MauM
                    </S.LogoContainer>
                ) : (
                    <S.LogoContainer to="/">
                        <S.LogoImage src={logoImg} alt="MAUM" />MauM
                    </S.LogoContainer>
                )}

                <S.NavMenu>
                    {user && (
                        <S.NavItem>
                            <S.UserProfileContainer onClick={toggleProfileModal}>
                                <S.ProfileImg src={user.profileImg} alt="프로필" />
                                <S.UserName>{user.name}님</S.UserName>
                            </S.UserProfileContainer>
                        </S.NavItem>
                    )}
                </S.NavMenu>

                {isProfileModalOpen && user && (
                    <S.ProfileModalContainer>
                        <S.ModalCloseBtn onClick={toggleProfileModal}>✕</S.ModalCloseBtn>
                        <S.ModalLargeImg src={user.profileImg} alt="프로필" />
                        <S.ModalGreeting>안녕하세요, {user.name}님</S.ModalGreeting>

                        {currentStreak > 0 && (
                            <S.StreakBadge>🔥 {currentStreak}일 연속 작성 중</S.StreakBadge>
                        )}

                        <S.ModalButtonGroup>
                            <S.PrimaryActionBtn onClick={goToTodayWrite}>오늘 일기 쓰기</S.PrimaryActionBtn>
                            <S.SecondaryActionBtn onClick={goToMyPage}>마이페이지</S.SecondaryActionBtn>
                        </S.ModalButtonGroup>

                        <S.ModalDivider />

                        <S.LogoutLink onClick={handleLogoutClick}>로그아웃</S.LogoutLink>
                    </S.ProfileModalContainer>
                )}
            </S.HeaderContainer>

            <CustomModal
                isOpen={showLogoutModal}
                title="로그아웃"
                message="정말 로그아웃 하시겠습니까?"
                isConfirm={true}
                onConfirm={confirmLogout}
                onCancel={() => setShowLogoutModal(false)}
            />
        </>
    );
};

export default Header;