import React from "react";
import styled from "styled-components";

function NoLettersYet({ activeMember }) {
  return (
    <NoLettersMsg>
      <p>💚💚💚</p>
      <p>
        아직 <TxT>{activeMember}</TxT>에게 등록된 팬레터가 없습니다.
      </p>
      <p>지금 첫 번째 팬레터를 작성해보세요!</p>
      <p>💚💚💚</p>
    </NoLettersMsg>
  );
}

/** Styled-components */
const NoLettersMsg = styled.div`
  margin: 35px;
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 2;
`;

const TxT = styled.span`
  color: #4b85d0;
  font-weight: bold;
`;
export default NoLettersYet;
