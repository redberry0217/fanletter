import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import NoLettersYet from "./NoLettersYet";
import { useSelector } from "react-redux";
import { getFormatDate } from "util/date";

function LetterList({ activeMember }) {
  const navigate = useNavigate();
  const letterData = useSelector((state) => state.updateLetter);

  /** 클릭한 멤버에게 쓴 팬레터만 필터링 */
  const filteredLetters = letterData.letters.filter(
    (letter) => letter.writedTo === activeMember
  );
  const handleCardClick = (id) => {
    navigate(`/detail/${id}`);
  };

  return (
    <section>
      {filteredLetters.length === 0 ? (
        <NoLettersYet activeMember={activeMember} />
      ) : (
        filteredLetters.map((letter) => (
          <LetterCard
            key={letter.id}
            onClick={() =>
              handleCardClick(letter.id, letterData.letters, activeMember)
            }
          >
            <div>
              <img
                src={letter.avatar}
                alt="사용자 아바타"
                width="50"
                style={{ borderRadius: "50%" }}
              />
            </div>
            <CardContent>
              <NickName>{letter.nickname}</NickName>
              <Letter>{letter.content}</Letter>
              <WriteDate>{getFormatDate(letter.createdAt)}</WriteDate>
            </CardContent>
          </LetterCard>
        ))
      )}
    </section>
  );
}

/** Styled-Componenets */
const LetterCard = styled.div`
  border: 1px solid gray;
  border-radius: 15px;
  margin-top: 35px;
  width: 650px;
  display: flex;
  flex-direction: row;
  padding: 30px;
  cursor: pointer;
  &:hover {
    transform: scale(1.02);
  }
  transition: all 0.2s;
`;

const CardContent = styled.div`
  margin-left: 30px;
  width: 100%;
  overflow: hidden;
`;
const NickName = styled.p`
  font-weight: bold;
  line-height: 1;
`;

const Letter = styled.p`
  font-size: 20pt;
  line-height: 1.2;
  margin-top: 15px;
  margin-bottom: 15px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const WriteDate = styled.p`
  text-align: right;
  line-height: 1;
  margin-top: 35px;
`;

export default LetterList;
