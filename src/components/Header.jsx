import React from 'react';
import styled from 'styled-components';
import txtImage from 'assets/txt.jpg';

function Header() {
  return (
    <>
      <TitleBox />
    </>
  );
}

const TitleBox = styled.div`
  margin: 0;
  padding: 10px;
  display: flex;
  align-items: center;
  height: 230px;
  background-image: url(${txtImage});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;
export default Header;
