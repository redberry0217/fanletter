import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { userLogout } from '../redux/modules/authSlice';

function Header() {
  return (
    <>
      <TitleBox></TitleBox>
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
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;
export default Header;
