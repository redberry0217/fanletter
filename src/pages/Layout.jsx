import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

function Layout() {
  return (
    <>
      <LayoutContainer>내 프로필 / 로그아웃</LayoutContainer>
      <Outlet />
    </>
  );
}

const LayoutContainer = styled.div`
  background-color: gray;
`;
export default Layout;
