import React from 'react';
import styled from 'styled-components';

function Header() {
  return (
    <>
      <TitleBox>
        <H1Style>
          from MOA to
          <br />
          <TitlefontColor>TOMORROW X TOGETHER</TitlefontColor>
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

export default Header;
