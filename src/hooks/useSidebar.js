import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { logoutUser } from '../api/authApi';
import { getRecentDiaries, updateDiaryTitle, updateDiaryPinned, deleteDiary } from "../api/diaryApi.js";
import {
    getChatRoomsApi, createChatRoomApi, renameChatRoomApi, pinChatRoomApi, deleteChatRoomApi
} from "../api/chatApi.js";
import { useAuth } from '../context/AuthContext';

export const useSidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { setUser } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const handleLogoutClick = (e) => {
        if (e) e.preventDefault();
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

    const isActive = (path) => location.pathname === path;

    const [recentDiaries, setRecentDiaries] = useState([]);

    useEffect(() => {
        const fetchRecent = async () => {
            try {
                const res = await getRecentDiaries();

                if (res) {
                    const data = Array.isArray(res) ? res : [res];
                    setRecentDiaries(data);
                }
            } catch (err) {
                console.error("최신 일기 로드 실패", err);
            }
        };
        fetchRecent();

        window.addEventListener('diary-updated', fetchRecent);

        return () => window.removeEventListener('diary-updated', fetchRecent);
    }, []);

    // 일기 이름변경/고정/삭제 — 성공하면 diary-updated 이벤트로 목록을 다시 불러오게 함
    // ★ 즐겨찾기 이후 추가/수정
    const renameDiary = async (diaryNo, title) => {
        try {
            await updateDiaryTitle(diaryNo, title);
            window.dispatchEvent(new Event('diary-updated'));
        } catch (err) {
            console.error("일기 이름변경 실패", err);
        }
    };

    // ★ 즐겨찾기 이후 추가/수정
    const togglePinDiary = async (diary) => {
        try {
            await updateDiaryPinned(diary.diaryNo, diary.isPinned === 1 ? 0 : 1);
            window.dispatchEvent(new Event('diary-updated'));
        } catch (err) {
            console.error("일기 고정 실패", err);
        }
    };

    // ★ 즐겨찾기 이후 추가/수정
    const removeDiary = async (diaryNo) => {
        try {
            await deleteDiary(diaryNo);
            window.dispatchEvent(new Event('diary-updated'));
            if (location.pathname === `/diary/${diaryNo}`) {
                navigate('/diary/list');
            }
        } catch (err) {
            console.error("일기 삭제 실패", err);
        }
    };

    const [chatRooms, setChatRooms] = useState([]);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const res = await getChatRoomsApi();
                if (res) {
                    setChatRooms(Array.isArray(res) ? res : [res]);
                }
            } catch (err) {
                console.error("채팅방 목록 로드 실패", err);
            }
        };
        fetchRooms();

        window.addEventListener('chat-updated', fetchRooms);

        return () => window.removeEventListener('chat-updated', fetchRooms);
    }, []);

    // ★ 즐겨찾기 이후 추가/수정
    const createNewChat = async (e) => {
        if (e) e.preventDefault();
        try {
            const newRoom = await createChatRoomApi();
            window.dispatchEvent(new Event('chat-updated'));
            navigate(`/chatbot?room=${newRoom.chatRoomNo}`);
        } catch (err) {
            console.error("새 채팅방 생성 실패", err);
        }
    };

    const currentRoomNo = new URLSearchParams(location.search).get('room');

    // ★ 즐겨찾기 이후 추가/수정
    const renameChat = async (chatRoomNo, roomTitle) => {
        try {
            await renameChatRoomApi(chatRoomNo, roomTitle);
            window.dispatchEvent(new Event('chat-updated'));
        } catch (err) {
            console.error("채팅방 이름변경 실패", err);
        }
    };

    // ★ 즐겨찾기 이후 추가/수정
    const togglePinChat = async (room) => {
        try {
            await pinChatRoomApi(room.chatRoomNo, room.isPinned === 1 ? 0 : 1);
            window.dispatchEvent(new Event('chat-updated'));
        } catch (err) {
            console.error("채팅방 고정 실패", err);
        }
    };

    // ★ 즐겨찾기 이후 추가/수정
    const removeChat = async (chatRoomNo) => {
        try {
            await deleteChatRoomApi(chatRoomNo);
            window.dispatchEvent(new Event('chat-updated'));
            if (String(chatRoomNo) === currentRoomNo) {
                navigate('/chatbot');
            }
        } catch (err) {
            console.error("채팅방 삭제 실패", err);
        }
    };

    return {
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
    };
};
