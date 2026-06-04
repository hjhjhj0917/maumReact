import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
    getUserStatus,
    updateProfileImg,
    checkEmailExists,
    verifyEmailCode,
    verifyCurrentPassword,
    updateAccount,
    sendWithdrawEmailCode,
    deleteUser
} from '../../api/authApi';

const characterData = [
    { url: '/images/account/profile1.png' },
    { url: '/images/account/profile2.png' },
    { url: '/images/account/profile3.png' },
    { url: '/images/account/profile4.png' },
    { url: '/images/account/profile5.png' },
    { url: '/images/account/profile6.png' },
    { url: '/images/account/profile7.png' },
    { url: '/images/account/profile8.png' },
    { url: '/images/account/profile9.png' },
    { url: '/images/account/profile10.png' },
    { url: '/images/account/profile11.png' },
    { url: '/images/account/profile12.png' }
];

const characters = characterData.map(c => c.url);

export const useProfile = () => {
    const navigate = useNavigate();
    const { setUser } = useAuth();
    const [modal, setModal] = useState({ show: false, title: '', message: '', onConfirm: null });

    const showAlert = (title, message, onConfirm = null) => {
        setModal({ show: true, title, message, onConfirm });
    };

    const [userInfo, setUserInfo] = useState({
        userId: '',
        userName: '',
        email: '',
        birthDate: '',
        addr: '',
        detailAddr: '',
        profileImgUrl: characters[0]
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCharacterUrl, setSelectedCharacterUrl] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [activeModalType, setActiveModalType] = useState(null);
    const [withdrawStep, setWithdrawStep] = useState(1);

    const [editForm, setEditForm] = useState({
        currentPassword: '',
        newPassword: '',
        newEmail: '',
        emailCode: '',
        newAddr: '',
        newDetailAddr: ''
    });

    const [withdrawForm, setWithdrawForm] = useState({
        password: '',
        emailCode: '',
        confirmUserId: ''
    });

    const [verifyState, setVerifyState] = useState({
        isPasswordVerified: false,
        isEmailCodeSent: false,
        isEmailVerified: false,
        isWithdrawEmailCodeSent: false,
        isWithdrawEmailVerified: false
    });

    const [messages, setMessages] = useState({});
    const messageTimers = useRef({});

    const validateEmail = (email) => /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/.test(email);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const res = await getUserStatus();
                if (res) {
                    setUserInfo({
                        userId: res.userId || '',
                        userName: res.userName || '',
                        email: res.email || '',
                        birthDate: res.birthDate || '',
                        addr: res.addr || '',
                        detailAddr: res.detailAddr || '',
                        profileImgUrl: res.profileImgUrl || characters[0]
                    });
                }
            } catch (error) {
                showAlert("오류", error.response?.data?.message || "회원 정보를 불러오는데 실패했습니다.", () => {
                    navigate('/');
                });
            }
        };

        fetchUserInfo();

        const script = document.createElement('script');
        script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, [navigate]);

    const isProfileModified =
        (verifyState.isPasswordVerified && editForm.newPassword.trim() !== '') ||
        (verifyState.isEmailVerified && editForm.newEmail.trim() !== '' && editForm.newEmail !== userInfo.email) ||
        ((editForm.newAddr || '').trim() !== (userInfo.addr || '').trim()) ||
        ((editForm.newDetailAddr || '').trim() !== (userInfo.detailAddr || '').trim());

    const setMessage = (id, message, type) => {
        if (messageTimers.current[id]) clearTimeout(messageTimers.current[id]);
        setMessages(prev => ({ ...prev, [id]: { text: message, type } }));
        messageTimers.current[id] = setTimeout(() => clearMessage(id), 3000);
    };

    const clearMessage = (id) => {
        if (messageTimers.current[id]) clearTimeout(messageTimers.current[id]);
        setMessages(prev => {
            const newMsgs = { ...prev };
            delete newMsgs[id];
            return newMsgs;
        });
    };

    const openModal = () => {
        setSelectedCharacterUrl(userInfo.profileImgUrl);
        setIsModalOpen(true);
    };

    const selectCharacter = (url) => {
        setSelectedCharacterUrl(url);
    };

    const closeModal = async () => {
        try {
            const res = await updateProfileImg(selectedCharacterUrl);
            if (res && res.result === 1) {
                setUserInfo(prev => ({ ...prev, profileImgUrl: selectedCharacterUrl }));
                setUser(prev => ({ ...prev, profileImg: selectedCharacterUrl }));
                setIsModalOpen(false);
                showAlert("알림", "프로필 이미지가 변경되었습니다.");
            } else {
                showAlert("오류", res?.msg || "프로필 이미지 변경에 실패했습니다.");
            }
        } catch (error) {
            console.error("오류:", error);
            showAlert("오류", error.response?.data?.message || "서버 연결에 실패했습니다.");
        }
    };

    const cancelModal = () => {
        setIsModalOpen(false);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(prev => !prev);
    };

    const openActionModal = (type) => {
        setMessages({});
        if (type === 'edit') {
            setEditForm({
                currentPassword: '',
                newPassword: '',
                newEmail: '',
                emailCode: '',
                newAddr: userInfo.addr || '',
                newDetailAddr: userInfo.detailAddr || ''
            });
            setVerifyState(prev => ({
                ...prev,
                isPasswordVerified: false,
                isEmailCodeSent: false,
                isEmailVerified: false
            }));
        } else if (type === 'withdraw') {
            setWithdrawStep(1);
            setWithdrawForm({
                password: '',
                emailCode: '',
                confirmUserId: ''
            });
            setVerifyState(prev => ({
                ...prev,
                isWithdrawEmailCodeSent: false,
                isWithdrawEmailVerified: false
            }));
        }
        setActiveModalType(type);
        setIsDropdownOpen(false);
    };

    const closeActionModal = () => {
        setActiveModalType(null);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditForm(prev => ({ ...prev, [name]: value }));
        clearMessage(name + 'Msg');
    };

    const handleWithdrawChange = (e) => {
        const { name, value } = e.target;
        setWithdrawForm(prev => ({ ...prev, [name]: value }));
        clearMessage('withdraw' + name.charAt(0).toUpperCase() + name.slice(1) + 'Msg');
    };

    const verifyCurrentPasswordAction = async () => {
        if (!editForm.currentPassword) {
            setMessage('currentPasswordMsg', '현재 비밀번호를 입력하세요.', 'error');
            return;
        }
        try {
            const res = await verifyCurrentPassword(editForm.currentPassword);
            if (res && res.result === 1) {
                setVerifyState(prev => ({ ...prev, isPasswordVerified: true }));
                setMessage('currentPasswordMsg', '비밀번호가 확인되었습니다.', 'success');
            } else {
                setMessage('currentPasswordMsg', res?.msg || '비밀번호가 일치하지 않습니다.', 'error');
            }
        } catch (error) {
            console.error("오류:", error);
            setMessage('currentPasswordMsg', error.response?.data?.message || '인증 중 오류가 발생했습니다.', 'error');
        }
    };

    const sendEmailCodeAction = async () => {
        if (!editForm.newEmail) {
            setMessage('newEmailMsg', '새 이메일을 입력하세요.', 'error');
            return;
        }

        if (!validateEmail(editForm.newEmail)) {
            setMessage('newEmailMsg', '유효한 이메일 형식이 아닙니다.', 'error');
            return;
        }

        try {
            const res = await checkEmailExists(editForm.newEmail);
            if (res && res.exists === false) {
                setVerifyState(prev => ({ ...prev, isEmailCodeSent: true }));
                setMessage('newEmailMsg', '인증 코드가 발송되었습니다.', 'success');
            } else {
                setMessage('newEmailMsg', '이미 사용중인 이메일입니다.', 'error');
            }
        } catch (error) {
            console.error("오류:", error);
            setMessage('newEmailMsg', error.response?.data?.message || '인증 코드 발송 중 오류가 발생했습니다.', 'error');
        }
    };

    const verifyEmailCodeAction = async () => {
        if (!editForm.emailCode) {
            setMessage('emailCodeMsg', '인증번호를 입력하세요.', 'error');
            return;
        }
        try {
            const res = await verifyEmailCode(editForm.newEmail, editForm.emailCode);
            if (res && res.result === 1) {
                setVerifyState(prev => ({ ...prev, isEmailVerified: true }));
                setMessage('emailCodeMsg', '이메일 인증이 완료되었습니다.', 'success');
            } else {
                setMessage('emailCodeMsg', res?.msg || '인증 코드가 일치하지 않습니다.', 'error');
            }
        } catch (error) {
            console.error("오류:", error);
            setMessage('emailCodeMsg', error.response?.data?.message || '이메일 인증 중 오류가 발생했습니다.', 'error');
        }
    };

    const searchAddressAction = () => {
        if (window.daum && window.daum.Postcode) {
            new window.daum.Postcode({
                oncomplete: function (data) {
                    setEditForm(prev => ({ ...prev, newAddr: data.address }));
                    clearMessage('newAddrMsg');
                }
            }).open();
        }
    };

    const updateAccountAction = async () => {
        try {
            const payload = {
                password: verifyState.isPasswordVerified ? editForm.newPassword : '',
                email: verifyState.isEmailVerified ? editForm.newEmail : '',
                addr: editForm.newAddr,
                detailAddr: editForm.newDetailAddr
            };

            const res = await updateAccount(payload);
            if (res && res.result === 1) {
                showAlert('알림', '프로필이 성공적으로 수정되었습니다.', () => {
                    window.location.reload();
                });
            } else {
                showAlert('오류', res?.msg || '수정에 실패했습니다.');
            }
        } catch (error) {
            console.error("오류:", error);
            showAlert('오류', error.response?.data?.message || '수정 처리 중 오류가 발생했습니다.');
        }
    };

    const verifyWithdrawPasswordAction = async () => {
        if (!withdrawForm.password) {
            setMessage('withdrawPasswordMsg', '비밀번호를 입력하세요.', 'error');
            return;
        }
        try {
            const res = await verifyCurrentPassword(withdrawForm.password);
            if (res && res.result === 1) {
                setWithdrawStep(2);
            } else {
                setMessage('withdrawPasswordMsg', res?.msg || '비밀번호가 일치하지 않습니다.', 'error');
            }
        } catch (error) {
            console.error("오류:", error);
            setMessage('withdrawPasswordMsg', error.response?.data?.message || '인증 중 오류가 발생했습니다.', 'error');
        }
    };

    const sendWithdrawEmailCodeAction = async () => {
        try {
            const res = await sendWithdrawEmailCode(userInfo.email);
            if (res && res.result === 1) {
                setVerifyState(prev => ({ ...prev, isWithdrawEmailCodeSent: true }));
                setMessage('withdrawEmailMsg', '인증 코드가 발송되었습니다.', 'success');
            } else {
                setMessage('withdrawEmailMsg', res?.msg || '코드 발송에 실패했습니다.', 'error');
            }
        } catch (error) {
            console.error("오류:", error);
            setMessage('withdrawEmailMsg', error.response?.data?.message || '인증 코드 발송 중 오류가 발생했습니다.', 'error');
        }
    };

    const verifyWithdrawEmailCodeAction = async () => {
        if (!withdrawForm.emailCode) {
            setMessage('withdrawEmailCodeMsg', '인증번호를 입력하세요.', 'error');
            return;
        }
        try {
            const res = await verifyEmailCode(userInfo.email, withdrawForm.emailCode);
            if (res && res.result === 1) {
                setVerifyState(prev => ({ ...prev, isWithdrawEmailVerified: true }));
                setWithdrawStep(3);
            } else {
                setMessage('withdrawEmailCodeMsg', res?.msg || '인증 코드가 일치하지 않습니다.', 'error');
            }
        } catch (error) {
            console.error("오류:", error);
            setMessage('withdrawEmailCodeMsg', error.response?.data?.message || '이메일 인증 중 오류가 발생했습니다.', 'error');
        }
    };

    const processWithdrawalAction = async () => {
        if (withdrawForm.confirmUserId !== userInfo.userId) {
            setMessage('withdrawConfirmUserIdMsg', '아이디가 일치하지 않습니다.', 'error');
            return;
        }
        try {
            await deleteUser();
            showAlert('알림', '회원 탈퇴가 완료되었습니다.', () => {
                setUser(null);
                navigate('/');
            });
        } catch (error) {
            console.error("오류:", error);
            showAlert('오류', error.response?.data?.message || '탈퇴 처리에 실패했습니다.');
        }
    };

    return {
        userInfo,
        characters,
        isModalOpen,
        selectedCharacterUrl,
        isDropdownOpen,
        activeModalType,
        withdrawStep,
        editForm,
        withdrawForm,
        verifyState,
        isProfileModified,
        modal,
        messages,
        setModal,
        openModal,
        selectCharacter,
        closeModal,
        cancelModal,
        toggleDropdown,
        openActionModal,
        closeActionModal,
        handleEditChange,
        handleWithdrawChange,
        verifyCurrentPasswordAction,
        sendEmailCodeAction,
        verifyEmailCodeAction,
        searchAddressAction,
        updateAccountAction,
        verifyWithdrawPasswordAction,
        sendWithdrawEmailCodeAction,
        verifyWithdrawEmailCodeAction,
        processWithdrawalAction
    };
};