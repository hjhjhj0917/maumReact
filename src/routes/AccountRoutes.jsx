import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from '../pages/Account/Login';
import FindId from '../pages/Account/FindId';
import FindPw from '../pages/Account/FindPw';
import Register from '../pages/Account/Register';
import Profile from '../pages/Account/Profile';

// Login은 모달 형태(onClose prop 필요)로 설계돼서, /account/login 경로로 직접 진입했을 때는
// 닫기 동작으로 이전 페이지로 돌아가도록 onClose를 여기서 만들어 넘겨줌
const LoginRoute = () => {
    const navigate = useNavigate();
    return <Login onClose={() => navigate(-1)} />;
};

const AccountRoutes = () => {
    return (
        <Routes>
            <Route path="login" element={<LoginRoute />} />
            <Route path="findId" element={<FindId />} />
            <Route path="findPw" element={<FindPw />} />
            <Route path="register" element={<Register />} />
            <Route path="profile" element={<Profile />} />
        </Routes>
    );
};

export default AccountRoutes;