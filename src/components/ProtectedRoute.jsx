import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = () => {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return <div>인증 정보 확인 중...</div>;
    }

    if (!user) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};