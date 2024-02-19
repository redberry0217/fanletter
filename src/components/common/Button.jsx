import React from "react";
import styled from "styled-components";

function Button({ onClick, text }) {
  return (
    <SubmitBtnBox>
      <StyledBtn onClick={onClick}>{text}</StyledBtn>
    </SubmitBtnBox>
  );
}

const SubmitBtnBox = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledBtn = styled.button`
  width: 120px;
  margin-top: 20px;
  padding: 5px;
  background-color: #d1d8e0;
  border: 0px;
  border-radius: 7px;
  cursor: pointer;
`;
export default Button;
