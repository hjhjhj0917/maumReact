import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const useHeader = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    const { user, isLoading } = useAuth();

    const [prevPath, setPrevPath] = useState(location.pathname);

    if (location.pathname !== prevPath) {
        setPrevPath(location.pathname);
        setIsMobileMenuOpen(false);
    }

    const isLoginPage = location.pathname === '/account/login';
    const isRegisterPage = location.pathname === '/account/register';

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    return {
        isMobileMenuOpen,
        user,
        isLoading,
        toggleMobileMenu,
        isLoginPage,
        isRegisterPage
    };
};