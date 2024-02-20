import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userLogout } from '../redux/modules/authSlice';

function Layout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    dispatch(userLogout());
    navigate(`/`);
  };
  return (
    <>
      <LayoutContainer>
        <GoHome to="/" title="HOME">
          💚From MOA to TXT
        </GoHome>
        <MyInfoContainer>
          <MyProfile to="/profile">내 프로필</MyProfile>
          <Logout onClick={logoutHandler}>로그아웃</Logout>
        </MyInfoContainer>
      </LayoutContainer>
      <Outlet />
    </>
  );
}

const LayoutContainer = styled.div`
  border-bottom: 1px solid black;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const GoHome = styled(Link)`
  color: #4b85d0;
  font-weight: 600;
  text-decoration: none;
  margin-left: 50px;
`;

const MyInfoContainer = styled.div`
  display: flex;
  gap: 30px;
  margin-right: 50px;
`;
const MyProfile = styled(Link)`
  color: black;
  font-weight: 600;
  text-decoration: none;
`;

const Logout = styled.span`
  cursor: pointer;
  font-weight: 600;
`;
export default Layout;
