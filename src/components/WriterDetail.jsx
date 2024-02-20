import React from 'react';
import styled from 'styled-components';
import { getFormatDate } from 'util/date';

function WriterDetail({ letter }) {
  return (
    <div>
      <WriteInfo>
        <img src={letter.avatar} width="50" alt="사용자 이미지" style={{ borderRadius: '50%' }} />
        <NicknameStyle>{letter.nickname}</NicknameStyle>
        <CreateAtStyle>{getFormatDate(letter.createdAt)}</CreateAtStyle>
      </WriteInfo>
    </div>
  );
}

/** Styled-components */
const WriteInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

const NicknameStyle = styled.div`
  width: 250px;
  margin-left: 20px;
  font-weight: bold;
`;

const CreateAtStyle = styled.div`
  margin-left: 230px;
  font-weight: bold;
  color: gray;
`;

export default WriterDetail;
