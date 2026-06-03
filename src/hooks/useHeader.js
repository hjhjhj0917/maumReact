import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { logoutUser } from '../api/authApi';

export const useHeader = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { user, setUser, isLoading } = useAuth();

    const [prevPath, setPrevPath] = useState(location.pathname);

    if (location.pathname !== prevPath) {
        setPrevPath(location.pathname);
        setIsMobileMenuOpen(false);
        setIsProfileModalOpen(false);
    }

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    const toggleProfileModal = () => setIsProfileModalOpen(!isProfileModalOpen);

    const goToMyPage = () => {
        setIsProfileModalOpen(false);
        navigate('/account/profile');
    };

    const handleLogoutClick = () => {
        setIsProfileModalOpen(false);
        setShowLogoutModal(true);
    };

    const confirmLogout = async () => {
        try {
            const res = await logoutUser();
            if (res && res.result === 1) {
                setUser(null);
                setShowLogoutModal(false);
                navigate('/');
            } else {
                console.error("로그아웃 실패:", res?.msg || "알 수 없는 오류");
                navigate('/');
            }
        } catch (error) {
            console.error("로그아웃 통신 에러:", error);
            navigate('/');
        }
    };

    return {
        isMobileMenuOpen,
        isProfileModalOpen,
        showLogoutModal,
        setShowLogoutModal,
        user,
        isLoading,
        toggleMobileMenu,
        toggleProfileModal,
        goToMyPage,
        handleLogoutClick,
        confirmLogout
    };
};