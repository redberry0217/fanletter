import React from "react";
import styled from "styled-components";

const Members = ["SOOBIN", "YEONJUN", "BEOMGYU", "TAEHYUN", "HUENINGKAI"];

function HeaderMenu({ activeMember, setActiveMember }) {
  return (
    <>
      <MenuBackground>
        {Members.map((member, index) => (
          <React.Fragment key={index}>
            <MemberBox
              onClick={() => setActiveMember(member)}
              $isActive={activeMember === member}
            >
              {member}
            </MemberBox>
            {index !== Members.length - 1 && <span>ㅣ</span>}
          </React.Fragment>
        ))}
      </MenuBackground>
    </>
  );
}

/** Sytled-Components */
const MenuBackground = styled.div`
  background: linear-gradient(90deg, #b0d0ff, #d1eee0);
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MemberBox = styled.div`
  height: 20px;
  margin-left: 10px;
  margin-right: 10px;
  font-weight: bold;
  letter-spacing: 2px;
  cursor: pointer;
  color: ${(props) => (props.$isActive ? "#4b85d0" : "black")};
`;

export default HeaderMenu;
