/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect, useContext } from 'react';
import { getUserStatus } from '../api/authApi';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => { /* 로그인 상태를 전역으로 관리하기 위함 */
        const initAuth = async () => {
            const loginFlag = document.cookie.includes('isLoggedIn=true');

            if (!loginFlag) {
                setIsLoading(false);
                return;
            }

            try {
                const res = await getUserStatus();

                if (res && res.userId) {
                    setUser({
                        no: res.userNo,
                        id: res.userId,
                        name: res.userName,
                        profileImg: res.profileImgUrl
                    });
                }
            } catch (error) {
                console.error("오류 : ", error);
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        };

        initAuth();

        const handleForceLogout = () => {
            setUser(null);
        };
        window.addEventListener('auth_logout', handleForceLogout);

        return () => {
            window.removeEventListener('auth_logout', handleForceLogout);
        };
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);