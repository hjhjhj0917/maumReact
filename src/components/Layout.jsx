import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import { useSidebar } from '../hooks/useSidebar';
import * as S from '../style/components/AppLayout.styles';

// ★ 즐겨찾기 이후 추가/수정
const Layout = () => {
    const {
        isSidebarOpen,
        showLogoutModal,
        setShowLogoutModal,
        toggleSidebar,
        handleLogoutClick,
        confirmLogout,
        isActive,
        recentDiaries,
        renameDiary,
        togglePinDiary,
        removeDiary,
        chatRooms,
        currentRoomNo,
        createNewChat,
        renameChat,
        togglePinChat,
        removeChat,
        navigate
    } = useSidebar();

    return (
        <S.LayoutWrapper>
            <Sidebar
                isOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
                handleLogoutClick={handleLogoutClick}
                confirmLogout={confirmLogout}
                showLogoutModal={showLogoutModal}
                setShowLogoutModal={setShowLogoutModal}
                isActive={isActive}
                navigate={navigate}
                recentDiaries={recentDiaries}
                renameDiary={renameDiary}
                togglePinDiary={togglePinDiary}
                removeDiary={removeDiary}
                chatRooms={chatRooms}
                currentRoomNo={currentRoomNo}
                createNewChat={createNewChat}
                renameChat={renameChat}
                togglePinChat={togglePinChat}
                removeChat={removeChat}
            />

            <S.MainWrapper>
                <Header />
                <S.LayoutContent>
                    <Outlet />
                </S.LayoutContent>
            </S.MainWrapper>
        </S.LayoutWrapper>
    );
};

export default Layout;