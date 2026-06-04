import React from 'react';
import CustomModal from './CustomModal';
import * as S from '../style/components/Sidebar.styles';

const Sidebar = ({
                     isOpen,
                     toggleSidebar,
                     handleLogoutClick,
                     confirmLogout,
                     showLogoutModal,
                     setShowLogoutModal,
                     isActive,
                     recentDiaries,
                     navigate
                 }) => {
    return (
        <>
            <S.SidebarWrapper $isOpen={isOpen}>
                <S.TopSection>
                    <S.IconButton $isOpen={isOpen} onClick={toggleSidebar}>
                        <i className="fa-solid fa-bars"></i>
                    </S.IconButton>
                    <S.NewPostBtn $isOpen={isOpen} onClick={() => navigate('/account/profile')}>
                        <i className="fa-solid fa-user-gear"></i>
                        <span>마이페이지</span>
                    </S.NewPostBtn>
                </S.TopSection>

                <S.NavSection>
                    <S.MobileOnlyItem $isOpen={isOpen} $active={isActive('/account/profile')}
                                      onClick={() => navigate('/account/profile')}>
                        <i className="fa-solid fa-user-gear"></i>
                        <span>마이페이지</span>
                    </S.MobileOnlyItem>

                    <S.NavItem $isOpen={isOpen} $active={isActive('/chatbot')}
                               onClick={() => navigate('/chatbot')}>
                        <i className="fa-solid fa-robot"></i>
                        <span>챗봇</span>
                    </S.NavItem>
                    <S.NavItem $isOpen={isOpen} $active={isActive('/map')}
                               onClick={() => navigate('/map')}>
                        <i className="fa-solid fa-map-location-dot"></i>
                        <span>주변 상담소</span>
                    </S.NavItem>
                    <S.NavItem $isOpen={isOpen} $active={isActive('/diary/list')}
                               onClick={() => navigate('/diary/list')}>
                        <i className="fa-solid fa-bars-staggered"></i>
                        <span>일기 목록</span>
                    </S.NavItem>

                    <S.RecentDiarySection $show={isOpen && recentDiaries.length > 0}>
                        <S.RecentDiaryTitle>최근 일기</S.RecentDiaryTitle>
                        {recentDiaries.map((diary) => (
                            <S.RecentDiaryItem
                                key={diary.diaryNo}
                                onClick={() => navigate(`/diary/${diary.diaryNo}`)}
                                title={diary.title}
                            >
                                {diary.title}
                            </S.RecentDiaryItem>
                        ))}
                    </S.RecentDiarySection>
                </S.NavSection>

                <S.BottomSection>
                    <S.NavItem $isOpen={isOpen} onClick={handleLogoutClick}>
                        <i className="fa-solid fa-gear"></i>
                        <span>로그아웃</span>
                    </S.NavItem>
                </S.BottomSection>
            </S.SidebarWrapper>

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

export default Sidebar;