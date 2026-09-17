import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HeaderContainer = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 40px;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1000;
    background-color: transparent;
    box-shadow: none;
    border-bottom: none;
    transition: all 0.3s ease;
    box-sizing: border-box;

    @media (max-width: 768px) {
        padding: 20px;
    }
`;

export const LogoContainer = styled(Link)`
    display: flex;
    align-items: center;
    text-decoration: none;
    z-index: 1001;
    font-size: 22px;
    font-weight: 500;
    color: #000000;
`;

export const LogoImage = styled.img`
    height: 40px;
    width: auto;
    object-fit: contain;
    display: block;
    margin-right: 8px;
`;

export const NavMenu = styled.ul`
    display: flex;
    list-style: none;
    align-items: center;
    gap: 30px;
    margin: 0;
    padding: 0;

    @media (max-width: 768px) {
        gap: 15px;
    }
`;

export const NavItem = styled.li`
    display: flex;
    align-items: center;
`;

export const NavLink = styled(Link)`
    text-decoration: none;
    color: #333333;
    font-weight: 500;
    font-size: 14px;
    transition: color 0.3s;

    &:hover {
        color: #c37975;
    }
`;

export const UserProfileContainer = styled.div`
    display: flex;
    align-items: center;
    border-radius: 40px;
    height: 44px;
    padding: 4px 17px 4px 4px;
    width: fit-content;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
        background-color: rgba(0, 0, 0, 0.05);
    }

    @media (max-width: 768px) {
        padding: 4px;
    }
`;

export const ProfileImg = styled.img`
    width: 37px;
    height: 37px;
    border-radius: 50%;
    border: 2px solid #FFE3A2;
    object-fit: cover;
`;

export const UserName = styled.span`
    font-size: 14px;
    font-weight: 500;
    color: #000000;
    margin-left: 10px;

    @media (max-width: 768px) {
        display: none;
    }
`;

export const ProfileModalContainer = styled.div`
    position: absolute;
    top: 70px;
    right: 40px;
    width: 300px;
    background-color: #f4f7f9;
    border-radius: 24px;
    padding: 20px 24px 24px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    color: #333;
    z-index: 1002;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;

    @media (max-width: 768px) {
        top: 70px;
        right: 20px;
        width: 280px;
    }
`;

export const ModalCloseBtn = styled.button`
    align-self: flex-end;
    background: none;
    border: none;
    color: #9aa0a6;
    font-size: 18px;
    cursor: pointer;
    padding: 5px;
    margin-bottom: 8px;

    &:hover {
        color: #333;
    }
`;

export const ModalLargeImg = styled.img`
    width: 110px;
    height: 110px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 16px;
    border: 2px solid #FFE3A2;
`;

export const ModalGreeting = styled.div`
    font-size: 16px;
    font-weight: 700;
    color: #333;
    margin-bottom: 16px;
`;

export const StreakBadge = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background-color: #fff3d6;
    color: #a8710a;
    font-size: 13px;
    font-weight: 600;
    padding: 6px 14px;
    border-radius: 20px;
    margin-bottom: 20px;
`;

export const ModalButtonGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
`;

export const PrimaryActionBtn = styled.button`
    width: 100%;
    background-color: #333333;
    border: 1px solid #333333;
    color: #fff;
    padding: 12px;
    border-radius: 14px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    box-sizing: border-box;
    transition: background-color 0.2s ease;

    &:hover {
        background-color: #000;
    }
`;

export const SecondaryActionBtn = styled.button`
    width: 100%;
    background-color: transparent;
    border: 1px solid #d8dce0;
    color: #333333;
    padding: 12px;
    border-radius: 14px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    box-sizing: border-box;
    transition: background-color 0.2s ease;

    &:hover {
        background-color: rgba(0, 0, 0, 0.04);
    }
`;

export const ModalDivider = styled.hr`
    width: 100%;
    border: none;
    border-top: 1px solid #e2e6ea;
    margin: 18px 0 12px;
`;

export const LogoutLink = styled.button`
    background: none;
    border: none;
    color: #8a8f96;
    font-size: 13px;
    cursor: pointer;
    padding: 4px;
    transition: color 0.2s ease;

    &:hover {
        color: #333;
    }
`;