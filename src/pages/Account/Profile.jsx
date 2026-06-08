import React from 'react';
import * as S from '../../style/pages/Account/Profile.styles';
import { useProfile } from '../../hooks/account/useProfileForm';
import logo from '../../assets/images/includes/logo.webp';
import CustomModal from '../../components/CustomModal';
import EmotionGraph from '../../components/EmotionGraph';
import InputField from '../../components/InputField';

const ProfilePage = () => {
    const {
        userInfo,
        characters,
        isModalOpen,
        selectedCharacterUrl,
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
    } = useProfile();

    const handleModalConfirm = () => {
        if (modal.onConfirm) modal.onConfirm();
        setModal(prev => ({ ...prev, show: false }));
    };

    const handleModalCancel = () => {
        setModal(prev => ({ ...prev, show: false }));
    };

    const withdrawSteps = [
        { num: 1, label: '비밀번호 확인' },
        { num: 2, label: '이메일 인증' },
        { num: 3, label: '탈퇴 확인' }
    ];

    return (
        <S.PageWrapper>
            <CustomModal
                isOpen={modal.show}
                title={modal.title}
                message={modal.message}
                isConfirm={false}
                onConfirm={handleModalConfirm}
                onCancel={handleModalCancel}
            />

            <S.ProfileContainer>
                <S.ProfileHeaderSection>
                    <S.AvatarWrapper onClick={openModal}>
                        <S.AvatarImage src={userInfo.profileImgUrl} alt="Profile" />
                        <S.EditIcon className="fa-solid fa-pencil" />
                    </S.AvatarWrapper>

                    <S.RightColumn>
                        <S.InfoCard>
                            <S.UserName>{userInfo.userName || 'User'}님</S.UserName>
                            <S.UserId>@{userInfo.userId}</S.UserId>

                            <S.ContactInfo>
                                <S.ContactItem>
                                    <span><i className="fa-solid fa-envelope"></i></span> {userInfo.email}
                                </S.ContactItem>
                                <S.ContactItem>
                                    <span><i className="fa-solid fa-location-dot"></i></span> {userInfo.addr + (userInfo.detailAddr ? ' ' + ` (${userInfo.detailAddr})` : '') || '등록된 주소가 없습니다'}
                                </S.ContactItem>
                            </S.ContactInfo>
                        </S.InfoCard>

                        <S.ActionCard>
                            <S.CardTitle>Account Options</S.CardTitle>
                            <S.ActionGrid>
                                <S.ActionButton onClick={() => openActionModal('edit')}>
                                    <i className="fa-regular fa-pen-to-square"></i> 프로필 수정
                                </S.ActionButton>
                                <S.ActionButton onClick={() => openActionModal('withdraw')}>
                                    회원 탈퇴
                                </S.ActionButton>
                            </S.ActionGrid>
                        </S.ActionCard>
                    </S.RightColumn>
                </S.ProfileHeaderSection>

                <S.MainContent>
                    <S.MainTitle>나의 감정 통계</S.MainTitle>
                    <S.GraphScrollArea>
                        <EmotionGraph />
                    </S.GraphScrollArea>
                </S.MainContent>
            </S.ProfileContainer>

            {isModalOpen && (
                <S.ModalOverlay>
                    <S.ModalContent onClick={e => e.stopPropagation()}>
                        <S.ModalHeader>
                            <h2>
                                <img src={logo} alt="logo" />
                                마음 캐릭터
                            </h2>
                            <S.CloseIcon onClick={cancelModal}>&times;</S.CloseIcon>
                        </S.ModalHeader>

                        <S.CharacterGrid>
                            {characters.map((url, index) => (
                                <S.CharacterItem
                                    key={index}
                                    $isSelected={url === selectedCharacterUrl}
                                    onClick={() => selectCharacter(url)}
                                >
                                    <img src={url} alt={`Character ${index + 1}`} />
                                </S.CharacterItem>
                            ))}
                        </S.CharacterGrid>

                        <S.ModalFooter>
                            <S.CancelButton onClick={cancelModal}>취소</S.CancelButton>
                            <S.ConfirmButton onClick={closeModal}>완료</S.ConfirmButton>
                        </S.ModalFooter>
                    </S.ModalContent>
                </S.ModalOverlay>
            )}

            {activeModalType === 'edit' && (
                <S.ModalOverlay>
                    <S.ModalContent onClick={e => e.stopPropagation()}>
                        <S.CloseIcon
                            style={{ position: 'absolute', top: '24px', right: '24px', zIndex: 10 }}
                            onClick={closeActionModal}
                        >
                            &times;
                        </S.CloseIcon>

                        <S.StepTitle style={{ marginTop: '10px' }}>프로필 수정</S.StepTitle>
                        <S.StepSubTitle>변경할 정보를 입력해 주세요.</S.StepSubTitle>

                        <S.ModalScrollContent>
                            <InputField
                                label="비밀번호"
                                isPassword
                                name="currentPassword"
                                value={editForm.currentPassword}
                                onChange={handleEditChange}
                                errorMsg={messages.currentPasswordMsg}
                                actionBtn={{
                                    text: verifyState.isPasswordVerified ? '인증완료' : '인증',
                                    onClick: verifyCurrentPasswordAction,
                                    disabled: verifyState.isPasswordVerified
                                }}
                                placeholder="현재 비밀번호를 입력하세요."
                                readOnly={verifyState.isPasswordVerified}
                            />

                            {verifyState.isPasswordVerified && (
                                <InputField
                                    label="새 비밀번호"
                                    isPassword
                                    name="newPassword"
                                    value={editForm.newPassword}
                                    onChange={handleEditChange}
                                    errorMsg={messages.newPasswordMsg}
                                    placeholder="변경할 새 비밀번호를 입력하세요."
                                />
                            )}

                            <InputField
                                label="이메일 변경"
                                type="email"
                                name="newEmail"
                                value={editForm.newEmail}
                                onChange={handleEditChange}
                                errorMsg={messages.newEmailMsg}
                                actionBtn={{
                                    text: verifyState.isEmailVerified ? '완료' : '발송',
                                    onClick: sendEmailCodeAction,
                                    disabled: verifyState.isEmailVerified
                                }}
                                placeholder="새 이메일 주소를 입력하세요."
                                readOnly={verifyState.isEmailVerified}
                            />

                            {verifyState.isEmailCodeSent && !verifyState.isEmailVerified && (
                                <InputField
                                    label="인증번호"
                                    type="text"
                                    name="emailCode"
                                    value={editForm.emailCode}
                                    onChange={handleEditChange}
                                    errorMsg={messages.emailCodeMsg}
                                    actionBtn={{
                                        text: '확인',
                                        onClick: verifyEmailCodeAction
                                    }}
                                    placeholder="인증번호를 입력하세요."
                                />
                            )}

                            <InputField
                                label="우편번호"
                                type="text"
                                name="newAddr"
                                value={editForm.newAddr}
                                errorMsg={messages.newAddrMsg}
                                actionBtn={{
                                    text: '검색',
                                    onClick: searchAddressAction
                                }}
                                placeholder="주소를 검색하세요."
                                readOnly
                            />

                            <InputField
                                label="상세 주소"
                                type="text"
                                name="newDetailAddr"
                                value={editForm.newDetailAddr}
                                onChange={handleEditChange}
                                placeholder="상세 주소를 입력하세요."
                            />
                        </S.ModalScrollContent>

                        <S.BtnConfirm
                            onClick={updateAccountAction}
                            disabled={!isProfileModified}
                        >
                            수정 완료
                        </S.BtnConfirm>
                    </S.ModalContent>
                </S.ModalOverlay>
            )}

            {activeModalType === 'withdraw' && (
                <S.ModalOverlay>
                    <S.ModalContent onClick={e => e.stopPropagation()}>
                        <S.CloseIcon
                            style={{ position: 'absolute', top: '24px', right: '24px', zIndex: 10 }}
                            onClick={closeActionModal}
                        >
                            &times;
                        </S.CloseIcon>

                        <S.StepperWrapper>
                            {withdrawSteps.map((s, idx) => (
                                <React.Fragment key={s.num}>
                                    <S.StepperItem $active={withdrawStep === s.num} $completed={withdrawStep > s.num}>
                                        <div className="step-label">{s.label}</div>
                                        <div className="step-circle">
                                            {withdrawStep > s.num ? <i className="fa-solid fa-check"></i> : s.num}
                                        </div>
                                    </S.StepperItem>
                                    {idx < withdrawSteps.length - 1 && <S.StepLine />}
                                </React.Fragment>
                            ))}
                        </S.StepperWrapper>

                        <S.SlideViewport>
                            <S.SlideTrack $step={withdrawStep}>
                                <S.FormStep $active={withdrawStep === 1}>
                                    <S.StepTitle>비밀번호 확인</S.StepTitle>
                                    <S.StepSubTitle>안전한 처리를 위해 현재 비밀번호를 입력해 주세요.</S.StepSubTitle>

                                    <InputField
                                        label="현재 비밀번호"
                                        isPassword
                                        name="password"
                                        value={withdrawForm.password}
                                        onChange={handleWithdrawChange}
                                        errorMsg={messages.withdrawPasswordMsg}
                                        placeholder="현재 비밀번호를 입력하세요."
                                    />

                                    <S.BtnConfirm onClick={verifyWithdrawPasswordAction}>다음</S.BtnConfirm>
                                </S.FormStep>

                                <S.FormStep $active={withdrawStep === 2}>
                                    <S.StepTitle>이메일 인증</S.StepTitle>
                                    <S.StepSubTitle>
                                        아래 메일로 인증 코드를 발송합니다.<br />
                                        <span>{userInfo.email}</span>
                                    </S.StepSubTitle>

                                    <InputField
                                        label="이메일"
                                        name="withdrawEmail"
                                        value={userInfo.email}
                                        readOnly
                                        errorMsg={messages.withdrawEmailMsg}
                                        actionBtn={{
                                            text: verifyState.isWithdrawEmailCodeSent ? '재발송' : '발송',
                                            onClick: sendWithdrawEmailCodeAction
                                        }}
                                        placeholder="이메일 주소"
                                    />

                                    {verifyState.isWithdrawEmailCodeSent && (
                                        <InputField
                                            label="인증번호"
                                            type="text"
                                            name="emailCode"
                                            value={withdrawForm.emailCode}
                                            onChange={handleWithdrawChange}
                                            errorMsg={messages.withdrawEmailCodeMsg}
                                            actionBtn={{
                                                text: '확인',
                                                onClick: verifyWithdrawEmailCodeAction
                                            }}
                                            placeholder="인증번호 6자리"
                                        />
                                    )}
                                </S.FormStep>

                                <S.FormStep $active={withdrawStep === 3}>
                                    <S.StepTitle>탈퇴 확인</S.StepTitle>
                                    <S.StepSubTitle>
                                        탈퇴를 위해 현재 아이디를 입력해 주세요.<br />
                                        <span>{userInfo.userId}</span>
                                    </S.StepSubTitle>

                                    <InputField
                                        label="아이디 확인"
                                        type="text"
                                        name="confirmUserId"
                                        value={withdrawForm.confirmUserId}
                                        onChange={handleWithdrawChange}
                                        errorMsg={messages.withdrawConfirmUserIdMsg}
                                        placeholder={`현재 아이디: ${userInfo.userId}`}
                                    />
                                    <div style={{ fontSize: '13px', color: '#ff4d4f', lineHeight: '1.4', marginTop: '-10px', marginBottom: '20px' }}>
                                        탈퇴 시 모든 데이터가 삭제되며 복구할 수 없습니다.
                                    </div>

                                    <S.BtnConfirm
                                        onClick={processWithdrawalAction}
                                        style={{ backgroundColor: '#ff4d4f', color: '#fff', marginTop: 0 }}
                                    >
                                        탈퇴하기
                                    </S.BtnConfirm>
                                </S.FormStep>
                            </S.SlideTrack>
                        </S.SlideViewport>
                    </S.ModalContent>
                </S.ModalOverlay>
            )}
        </S.PageWrapper>
    );
};

export default ProfilePage;