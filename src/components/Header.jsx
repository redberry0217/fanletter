import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { userLogout } from '../redux/modules/authSlice';

function Header() {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(userLogout());
  };
  return (
    <>
      <TitleBox>
        <H1Style>
          from MOA to
          <br />
          <TitlefontColor>TOMORROW X TOGETHER</TitlefontColor>
          <br />
          <Logout onClick={logoutHandler}>로그아웃</Logout>
        </H1Style>
      </TitleBox>
    </>
  );
}

const TitleBox = styled.div`
  margin: 0;
  padding: 10px;
  display: flex;
  align-items: center;
  height: 230px;
  background-image: url(${process.env.PUBLIC_URL}/assets/txt.jpg);
`;

const TitlefontColor = styled.span`
  color: #4b85d0;
`;

const H1Style = styled.h1`
  font-size: 28pt;
  font-weight: bold;
  margin-left: 70px;
`;

const Logout = styled.span`
  color: red;
  font-size: 14pt;
  cursor: pointer;
`;
export default Header;
