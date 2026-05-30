import React from 'react';
import { Link } from 'react-router-dom';
import LoginSlider from '../../components/LoginSlider';
import { useLoginForm } from '../../hooks/account/useLoginForm';
import * as S from '../../style/pages/Account/Login.styles';

const Login = ({ onClose }) => {
    const {
        userId, setUserId,
        password, setPassword,
        showPassword, setShowPassword,
        messages, clearMessage,
        handleLogin, handleKeyDown
    } = useLoginForm();

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();        }
    };

    return (
        <S.ModalOverlay onClick={handleOverlayClick}>
            <S.ModalContainer>
                <S.CloseButton onClick={onClose}>
                    <i className="fa-solid fa-xmark"></i>
                </S.CloseButton>
                <S.Container>
                    <LoginSlider />
                    <S.LoginSection>
                        <S.LoginCard>
                            <form id="loginForm" onSubmit={handleLogin} noValidate>
                                <S.InputGroup>
                                    <S.LabelRow>
                                        <label htmlFor="userId">User ID</label>
                                        <S.FieldMessage $show={!!messages.userId} $type={messages.userId?.type}>
                                            {messages.userId?.text}
                                        </S.FieldMessage>
                                    </S.LabelRow>
                                    <S.Input
                                        type="text"
                                        id="userId"
                                        name="userId"
                                        placeholder="아이디를 입력하세요"
                                        required
                                        autoComplete="off"
                                        value={userId}
                                        onChange={(e) => {
                                            setUserId(e.target.value);
                                            clearMessage('userId');
                                        }}
                                    />
                                </S.InputGroup>

                                <S.InputGroup>
                                    <S.LabelRow>
                                        <label htmlFor="password">Password</label>
                                        <S.FieldMessage $show={!!messages.password} $type={messages.password?.type}>
                                            {messages.password?.text}
                                        </S.FieldMessage>
                                    </S.LabelRow>
                                    <S.PasswordWrapper>
                                        <S.Input
                                            type={showPassword ? "text" : "password"}
                                            id="password"
                                            name="password"
                                            placeholder="비밀번호를 입력하세요"
                                            required
                                            value={password}
                                            onChange={(e) => {
                                                setPassword(e.target.value);
                                                clearMessage('password');
                                            }}
                                            onKeyDown={handleKeyDown}
                                        />
                                        <S.ToggleIcon
                                            className={`fa-regular ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
                                            $active={showPassword}
                                            onClick={() => setShowPassword(!showPassword)}
                                        />
                                    </S.PasswordWrapper>
                                </S.InputGroup>

                                <S.BtnLogin type="button" onClick={handleLogin}>로그인</S.BtnLogin>
                            </form>

                            <S.FindLinks>
                                <S.FindRow>
                                    <Link to="/account/findId" onClick={onClose}>아이디 찾기</Link>
                                    <S.Separator>|</S.Separator>
                                    <Link to="/account/findPw" onClick={onClose}>비밀번호 찾기</Link>
                                </S.FindRow>
                            </S.FindLinks>
                        </S.LoginCard>
                    </S.LoginSection>
                </S.Container>
            </S.ModalContainer>
        </S.ModalOverlay>
    );
};

export default Login;