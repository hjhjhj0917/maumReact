import React, { useState } from 'react';
import CustomModal from './CustomModal';
import * as S from '../style/components/Sidebar.styles';

// ★ 즐겨찾기 이후 추가/수정
const Sidebar = ({
                     isOpen,
                     toggleSidebar,
                     handleLogoutClick,
                     confirmLogout,
                     showLogoutModal,
                     setShowLogoutModal,
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
                 }) => {
    // 이름변경 중인 항목: { type: 'diary' | 'chat', id, value }
    const [editing, setEditing] = useState(null);
    // 삭제 확인 대기 중인 항목: { type: 'diary' | 'chat', id, title }
    const [deleteTarget, setDeleteTarget] = useState(null);

    // ★ 즐겨찾기 이후 추가/수정
    const startEdit = (e, type, id, currentTitle) => {
        e.stopPropagation();
        setEditing({ type, id, value: currentTitle || '' });
    };

    // ★ 즐겨찾기 이후 추가/수정
    const cancelEdit = () => setEditing(null);

    // ★ 즐겨찾기 이후 추가/수정
    const submitEdit = async (e) => {
        e.preventDefault();
        if (!editing || !editing.value.trim()) {
            cancelEdit();
            return;
        }
        if (editing.type === 'diary') {
            await renameDiary(editing.id, editing.value.trim());
        } else {
            await renameChat(editing.id, editing.value.trim());
        }
        setEditing(null);
    };

    // ★ 즐겨찾기 이후 추가/수정
    const askDelete = (e, type, id, title) => {
        e.stopPropagation();
        setDeleteTarget({ type, id, title });
    };

    // ★ 즐겨찾기 이후 추가/수정
    const confirmDelete = async () => {
        if (!deleteTarget) return;
        if (deleteTarget.type === 'diary') {
            await removeDiary(deleteTarget.id);
        } else {
            await removeChat(deleteTarget.id);
        }
        setDeleteTarget(null);
    };

    // ★ 즐겨찾기 이후 추가/수정
    const renderItemActions = (type, id, title, isPinned, onTogglePin) => (
        <S.ItemActions>
            <S.ItemActionIcon
                title={isPinned === 1 ? '고정 해제' : '상단 고정'}
                $active={isPinned === 1}
                onClick={(e) => { e.stopPropagation(); onTogglePin(); }}
            >
                <i className="fa-solid fa-thumbtack"></i>
            </S.ItemActionIcon>
            <S.ItemActionIcon title="이름변경" onClick={(e) => startEdit(e, type, id, title)}>
                <i className="fa-solid fa-pen"></i>
            </S.ItemActionIcon>
            <S.ItemActionIcon title="삭제" onClick={(e) => askDelete(e, type, id, title)}>
                <i className="fa-solid fa-trash"></i>
            </S.ItemActionIcon>
        </S.ItemActions>
    );

    return (
        <>
            <S.SidebarWrapper $isOpen={isOpen}>
                <S.TopSection>
                    <S.IconButton $isOpen={isOpen} onClick={toggleSidebar}>
                        <i className="fa-solid fa-bars"></i>
                    </S.IconButton>
                    <S.NewPostBtn $isOpen={isOpen} onClick={() => navigate('/account/profile')}>
                        <i className="fa-solid fa-user-gear"></i>
                        <span>마이페이지</span>
                    </S.NewPostBtn>
                </S.TopSection>

                <S.NavSection>
                    <S.MobileOnlyItem $isOpen={isOpen} $active={isActive('/account/profile')}
                                      onClick={() => navigate('/account/profile')}>
                        <i className="fa-solid fa-user-gear"></i>
                        <span>마이페이지</span>
                    </S.MobileOnlyItem>

                    <S.NavItem $isOpen={isOpen} $active={isActive('/diary/list')}
                               onClick={() => navigate('/diary/list')}>
                        <i className="fa-solid fa-bars-staggered"></i>
                        <span>일기 목록</span>
                    </S.NavItem>
                    <S.NavItem $isOpen={isOpen} $active={isActive('/chatbot')}
                               onClick={() => navigate('/chatbot')}>
                        <i className="fa-solid fa-robot"></i>
                        <span>챗봇</span>
                    </S.NavItem>
                    <S.NavItem $isOpen={isOpen} $active={isActive('/map')}
                               onClick={() => navigate('/map')}>
                        <i className="fa-solid fa-map-location-dot"></i>
                        <span>주변 상담소</span>
                    </S.NavItem>

                    <S.RecentDiarySection $show={isOpen}>
                        <S.RecentDiaryTitleRow>
                            <S.RecentDiaryTitle>채팅 내역</S.RecentDiaryTitle>
                            <S.AddChatButton onClick={createNewChat} title="새 채팅">
                                <i className="fa-solid fa-plus"></i>
                            </S.AddChatButton>
                        </S.RecentDiaryTitleRow>
                        {(chatRooms || []).map((room) => (
                            editing && editing.type === 'chat' && editing.id === room.chatRoomNo ? (
                                <S.EditForm key={room.chatRoomNo} onSubmit={submitEdit}>
                                    <S.EditInput
                                        autoFocus
                                        value={editing.value}
                                        onChange={(e) => setEditing({ ...editing, value: e.target.value })}
                                        onBlur={cancelEdit}
                                        onKeyDown={(e) => { if (e.key === 'Escape') cancelEdit(); }}
                                    />
                                </S.EditForm>
                            ) : (
                                <S.RecentDiaryItemRow key={room.chatRoomNo}>
                                    <S.RecentDiaryItem
                                        onClick={() => navigate(`/chatbot?room=${room.chatRoomNo}`)}
                                        title={room.roomTitle || '새 대화'}
                                        $active={String(room.chatRoomNo) === currentRoomNo}
                                    >
                                        {room.isPinned === 1 && <i className="fa-solid fa-thumbtack" style={{ fontSize: '10px', marginRight: '6px' }}></i>}
                                        {room.roomTitle || '새 대화'}
                                    </S.RecentDiaryItem>
                                    {renderItemActions('chat', room.chatRoomNo, room.roomTitle, room.isPinned, () => togglePinChat(room))}
                                </S.RecentDiaryItemRow>
                            )
                        ))}
                    </S.RecentDiarySection>

                    <S.RecentDiarySection $show={isOpen && recentDiaries.length > 0}>
                        <S.RecentDiaryTitle>최근 일기</S.RecentDiaryTitle>
                        {recentDiaries.map((diary) => (
                            editing && editing.type === 'diary' && editing.id === diary.diaryNo ? (
                                <S.EditForm key={diary.diaryNo} onSubmit={submitEdit}>
                                    <S.EditInput
                                        autoFocus
                                        value={editing.value}
                                        onChange={(e) => setEditing({ ...editing, value: e.target.value })}
                                        onBlur={cancelEdit}
                                        onKeyDown={(e) => { if (e.key === 'Escape') cancelEdit(); }}
                                    />
                                </S.EditForm>
                            ) : (
                                <S.RecentDiaryItemRow key={diary.diaryNo}>
                                    <S.RecentDiaryItem
                                        onClick={() => navigate(`/diary/${diary.diaryNo}`)}
                                        title={diary.title}
                                        $active={isActive(`/diary/${diary.diaryNo}`)}
                                    >
                                        {diary.isPinned === 1 && <i className="fa-solid fa-thumbtack" style={{ fontSize: '10px', marginRight: '6px' }}></i>}
                                        {diary.title}
                                    </S.RecentDiaryItem>
                                    {renderItemActions('diary', diary.diaryNo, diary.title, diary.isPinned, () => togglePinDiary(diary))}
                                </S.RecentDiaryItemRow>
                            )
                        ))}
                    </S.RecentDiarySection>
                </S.NavSection>

                <S.BottomSection>
                    <S.NavItem $isOpen={isOpen} onClick={handleLogoutClick}>
                        <i className="fa-solid fa-gear"></i>
                        <span>로그아웃</span>
                    </S.NavItem>
                </S.BottomSection>
            </S.SidebarWrapper>

            <CustomModal
                isOpen={showLogoutModal}
                title="로그아웃"
                message="정말 로그아웃 하시겠습니까?"
                isConfirm={true}
                onConfirm={confirmLogout}
                onCancel={() => setShowLogoutModal(false)}
            />

            <CustomModal
                isOpen={!!deleteTarget}
                title="삭제 확인"
                message={`'${deleteTarget?.title || (deleteTarget?.type === 'chat' ? '새 대화' : '')}'을(를) 삭제하시겠습니까?`}
                isConfirm={true}
                onConfirm={confirmDelete}
                onCancel={() => setDeleteTarget(null)}
            />
        </>
    );
};

export default Sidebar;
