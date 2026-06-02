/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect, useContext } from 'react';
import { getUserStatus } from '../api/authApi';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // 핵심: 초기 로딩 상태를 true로 설정

    useEffect(() => {
        const initAuth = async () => {
            const loginFlag = document.cookie.includes('isLoggedIn=true');

            if (!loginFlag) {
                setIsLoading(false);
                return;
            }

            try {
                const res = await getUserStatus();
                if (res.data && res.data.userId) {
                    setUser({
                        no: res.data.userNo,
                        id: res.data.userId,
                        name: res.data.userName,
                        profileImg: res.data.profileImgUrl
                    });
                }
            } catch (error) {
                console.error("오류 : ", error);
                setUser(null);
            } finally {
                // 검증이 성공하든 실패하든(재발급 포함) 완료되면 로딩 종료
                setIsLoading(false);
            }
        };

        initAuth();

        // apiClient에서 Refresh 실패 시 강제 로그아웃을 처리하기 위한 이벤트 리스너
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