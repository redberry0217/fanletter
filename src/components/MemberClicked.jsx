import React from "react";
import AddForm from "./AddForm";
import LetterList from "./LetterList";
import styled from "styled-components";

function MemberClicked({ activeMember, setActiveMember }) {
  return (
    <FanletterBox>
      <AddForm activeMember={activeMember} setActiveMember={setActiveMember} />
      <LetterList activeMember={activeMember} />
    </FanletterBox>
  );
}

/** Styled-components */
const FanletterBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 35px;
  margin-bottom: 35px;
`;
export default MemberClicked;
