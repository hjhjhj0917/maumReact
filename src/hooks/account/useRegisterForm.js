import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkEmailExists, checkUserIdExists, registerUser, verifyEmailCode } from '../../api/authApi.js';

export const useRegisterForm = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        email: '', code: '', userId: '', password: '', passwordConfirm: '',
        userName: '', birthDate: '', addr: '', detailAddr: ''
    });
    const [messages, setMessages] = useState({});
    const [flags, setFlags] = useState({ emailVerified: false, userIdChecked: false });
    const [modal, setModal] = useState({ show: false, title: '', message: '', onConfirm: null });

    const messageTimers = useRef({});
    const inputRefs = useRef([]);

    const guideText = {
        password: "영문, 숫자, 특수문자를 모두 포함하여 8~20자리로 조합해주세요."
    };

    const patterns = {
        password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/,
        userName: /^[가-힣a-zA-Z]{2,10}$/,
        birthDate: /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/
    };

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
        script.async = true;
        document.body.appendChild(script);
        return () => document.body.removeChild(script);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        clearMessage(name + 'Msg');

        if (name === 'userId') {
            setFlags(prev => ({ ...prev, userIdChecked: false }));
        }
    };

    const handleOtpChange = (e, index) => {
        const value = e.target.value;
        if (!/^[0-9]*$/.test(value)) return;

        const currentCode = formData.code || "";
        const codeArray = currentCode.split("");
        while (codeArray.length < 6) codeArray.push("");

        codeArray[index] = value.slice(-1);
        const finalCode = codeArray.join("");

        setFormData(prev => ({ ...prev, code: finalCode }));
        clearMessage('codeMsg');

        if (value !== "" && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !formData.code?.[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, 6);
        if (!pasteData) return;

        setFormData(prev => ({ ...prev, code: pasteData }));
        clearMessage('codeMsg');
        const nextIndex = pasteData.length === 6 ? 5 : pasteData.length;
        inputRefs.current[nextIndex]?.focus();
    };

    const clearMessage = (id) => {
        if (messageTimers.current[id]) clearTimeout(messageTimers.current[id]);
        setMessages(prev => {
            const newMsgs = { ...prev };
            delete newMsgs[id];
            return newMsgs;
        });
    };

    const setMessage = (id, message, type) => {
        if (messageTimers.current[id]) clearTimeout(messageTimers.current[id]);
        setMessages(prev => ({ ...prev, [id]: { text: message, type } }));
        messageTimers.current[id] = setTimeout(() => {
            clearMessage(id);
        }, type === 'success' ? 2000 : 3000);
    };

    useEffect(() => {
        let stepTimer;

        if (step === 2 && formData.password && formData.passwordConfirm) {
            if (formData.password === formData.passwordConfirm) {
                if (!patterns.password.test(formData.password)) {
                    setTimeout(() => {
                        setMessage('passwordConfirmMsg', guideText.password, 'error');
                    }, 0);
                    return;
                }

                const checkTimer = setTimeout(() => {
                    if (!flags.userIdChecked) {
                        setMessage('userIdMsg', '아이디 중복 체크를 완료해 주세요.', 'error');
                    } else {
                        setMessage('passwordConfirmMsg', '비밀번호가 일치합니다.', 'success');

                        stepTimer = setTimeout(() => {
                            setStep(3);
                        }, 1000);
                    }
                }, 0);

                return () => {
                    clearTimeout(checkTimer);
                    if (stepTimer) clearTimeout(stepTimer);
                };
            }
        }
    }, [formData.password, formData.passwordConfirm, flags.userIdChecked, step]);

    const showAlert = (title, message, onConfirm = null) => {
        setModal({ show: true, title, message, onConfirm });
    };

    const validateEmail = (email) => /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/.test(email);

    const handleEmailSend = async () => {
        if (!formData.email.trim()) return setMessage('emailMsg', '이메일을 입력하세요.', 'error');
        if (formData.email.length > 255) return setMessage('emailMsg', '이메일은 최대 255글자까지 입력 가능합니다.', 'error');
        if (!validateEmail(formData.email)) return setMessage('emailMsg', '유효한 이메일 형식이 아닙니다.', 'error');

        try {
            const res = await checkEmailExists(formData.email);
            if (res && res.exists) {
                setMessage('emailMsg', '이미 가입된 이메일 주소가 존재합니다.', 'error');
            } else {
                showAlert("인증번호 발송", "이메일로 인증번호가 발송되었습니다.");
            }
        } catch (e) {
            const errorMsg = e.response?.data?.message || "서버 통신 중 오류가 발생했습니다.";
            showAlert("서버 오류", errorMsg);
        }
    };

    const handleCodeVerify = async () => {
        const code = formData.code?.replace(/\s/g, '');
        if (!code || code.length < 6) return setMessage('codeMsg', '인증번호 6자리를 모두 입력하세요.', 'error');

        try {
            const res = await verifyEmailCode(formData.email, code);

            if (res && res.result === 1) {
                setMessage('codeMsg', '인증번호가 확인되었습니다.', 'success');
                setFlags(prev => ({ ...prev, emailVerified: true }));
                setTimeout(() => setStep(2), 800);
            } else {
                setMessage('codeMsg', res?.msg || '잘못된 인증번호입니다.', 'error');
            }
        } catch (error) {
            console.error("오류 : ", error)
            setMessage('codeMsg', error.response?.data?.message || '서버 통신 중 오류가 발생했습니다.', 'error');
        }
    };

    const handleUserIdCheck = async () => {
        if (!formData.userId.trim()) return setMessage('userIdMsg', '아이디를 입력하세요.', 'error');
        if (formData.userId.length < 4 || formData.userId.length > 20) {
            return setMessage('userIdMsg', '아이디는 4~20자리로 입력해 주세요.', 'error');
        }

        try {
            const res = await checkUserIdExists(formData.userId);
            const isExists = res && res.existsYn === 'Y';

            if (isExists) {
                setMessage('userIdMsg', '이미 가입된 아이디가 존재합니다.', 'error');
                setFlags(prev => ({ ...prev, userIdChecked: false }));
            } else {
                setMessage('userIdMsg', '사용 가능한 아이디입니다.', 'success');
                setFlags(prev => ({ ...prev, userIdChecked: true }));
            }
        } catch (e) {
            console.error("오류 : ", e)
            setMessage('userIdMsg', e.response?.data?.message || '서버 통신 중 오류가 발생했습니다.', 'error');
        }
    };

    const handleKakaoPost = () => {
        new window.daum.Postcode({
            oncomplete: (data) => {
                setFormData(prev => ({ ...prev, addr: `(${data.zonecode}) ${data.address}` }));
                clearMessage('addrMsg');
            }
        }).open();
    };

    const validateStep1 = () => {
        if (!formData.email.trim()) {
            setMessage('emailMsg', '이메일을 입력해 주세요.', 'error');
            return false;
        }
        if (!flags.emailVerified) {
            setMessage('emailMsg', '이메일 인증을 완료해 주세요.', 'error');
            return false;
        }
        return true;
    };

    const validateStep2 = () => {
        let isValid = true;

        if (!formData.userId.trim()) {
            setMessage('userIdMsg', '아이디를 입력하세요.', 'error');
            isValid = false;
        } else if (formData.userId.length < 4 || formData.userId.length > 20) {
            setMessage('userIdMsg', '아이디는 4~20자리로 입력해 주세요.', 'error');
            isValid = false;
        } else if (!flags.userIdChecked) {
            setMessage('userIdMsg', '아이디 중복 체크를 완료해 주세요.', 'error');
            isValid = false;
        }

        if (!formData.password.trim()) {
            setMessage('passwordMsg', '비밀번호를 입력하세요.', 'error');
            isValid = false;
        } else if (!patterns.password.test(formData.password)) {
            setMessage('passwordMsg', guideText.password, 'error');
            isValid = false;
        }

        if (!formData.passwordConfirm.trim()) {
            setMessage('passwordConfirmMsg', '비밀번호 확인을 입력하세요.', 'error');
            isValid = false;
        } else if (formData.password !== formData.passwordConfirm) {
            setMessage('passwordConfirmMsg', '비밀번호가 일치하지 않습니다.', 'error');
            isValid = false;
        }
        return isValid;
    };

    const validateStep3 = () => {
        let isValid = true;

        if (!formData.userName.trim()) {
            setMessage('userNameMsg', '이름을 입력하세요.', 'error');
            isValid = false;
        } else if (!patterns.userName.test(formData.userName)) {
            setMessage('userNameMsg', '이름은 2~10자의 한글 또는 영문만 가능합니다.', 'error');
            isValid = false;
        }

        if (!formData.birthDate.trim()) {
            setMessage('birthDateMsg', '생년월일을 입력하세요.', 'error');
            isValid = false;
        } else if (!patterns.birthDate.test(formData.birthDate)) {
            setMessage('birthDateMsg', '달력을 이용하여 정확한 생년월일을 선택해 주세요.', 'error');
            isValid = false;
        }

        if (!formData.addr.trim()) {
            setMessage('addrMsg', '주소를 입력하세요.', 'error');
            isValid = false;
        }
        return isValid;
    };

    const handleStepClick = (target) => {
        if (target === step) return;
        if (target < step) {
            setStep(target);
        } else {
            if (target === 2 && validateStep1()) {
                setStep(2);
            } else if (target === 3 && validateStep1() && validateStep2()) {
                setStep(3);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateStep1() || !validateStep2() || !validateStep3()) return;

        try {
            const res = await registerUser(formData);

            if (res && res.result === 1) {
                showAlert("회원가입 성공", res.msg, () => navigate('/'));
            } else {
                showAlert("회원가입 실패", res?.msg || "알 수 없는 오류가 발생했습니다.");
            }
        } catch (err) {
            const errorMsg = err.response?.data?.message || "서버 통신 중 오류가 발생했습니다.";
            showAlert("서버 오류", errorMsg);
        }
    };

    return {
        step, handleStepClick,
        formData, setFormData, handleChange, handleOtpChange, handleKeyDown, handlePaste,
        messages, flags,
        modal, setModal, inputRefs, guideText,
        handleEmailSend, handleCodeVerify, handleUserIdCheck, handleKakaoPost, handleSubmit
    };
};