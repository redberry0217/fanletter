import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import Button from './common/Button';
import { __addLetter } from '../redux/modules/letterSlice';
import { toast } from 'react-toastify';
import axios from 'axios';
import { userLogout } from '../redux/modules/authSlice';

function AddForm({ setActiveMember }) {
  const dispatch = useDispatch();
  const [writedTo, setWritedTo] = useState('SOOBIN');
  const [content, setContent] = useState('');
  const { nickname, userId, avatar } = useSelector((state) => state.auth);
  const { accessToken } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    const checkAccessToken = async () => {
      try {
        await axios.get('https://moneyfulpublicpolicy.co.kr/user', {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });

        if (!content) {
          toast.warning(`내용을 입력해주세요.`);
        } else {
          const currentDate = new Date();
          const newLetter = {
            createdAt: currentDate.toISOString(),
            content,
            writedTo,
            id: uuidv4(),
            userId: userId,
            nickname: nickname,
            avatar: avatar
          };
          dispatch(__addLetter(newLetter));
          setContent('');
          setWritedTo('SOOBIN');
          setActiveMember(writedTo);
          toast.success(`게시글이 등록되었습니다.`);
        }
      } catch (error) {
        console.error('로그인 확인 실패:', error);
        toast.warning(`로그인이 만료됐어요. 재로그인 해주세요!`);
        dispatch(userLogout());
      }
    };
    checkAccessToken();
  };
  return (
    <WriteBox>
      <form onSubmit={handleSubmit}>
        <NicknameContainer>
          <label>닉네임</label>
          <UserNickname>{nickname}</UserNickname>
          <label>받는 멤버</label>
          <StyledSelect value={writedTo} onChange={(e) => setWritedTo(e.target.value)}>
            <option value="SOOBIN">SOOBIN</option>
            <option value="YEONJUN">YEONJUN</option>
            <option value="BEOMGYU">BEOMGYU</option>
            <option value="TAEHYUN">TAEHYUN</option>
            <option value="HUENINGKAI">HUENINGKAI</option>
          </StyledSelect>
        </NicknameContainer>
        <div>
          <StyledTextarea
            placeholder="팬레터 내용은 최대 100자 작성 가능합니다."
            maxLength="100"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <Button text="✔️등록하기" />
      </form>
    </WriteBox>
  );
}

/** Styled-Componenets */
const WriteBox = styled.div`
  width: 650px;
  background-color: #e9f7ff;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  padding: 30px;
  font-weight: bold;
  box-sizing: border-box;
`;

const NicknameContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;
const UserNickname = styled.span`
  width: 200px;
  color: #4b85d0;
  margin-left: 10px;
  margin-right: 50px;
`;

const StyledSelect = styled.select`
  width: 190px;
  margin-left: 10px;
  padding: 5px;
  border: 1px solid grey;
  border-radius: 7px;
`;

const StyledTextarea = styled.textarea`
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 5px;
  width: 100%;
  height: 70px;
  border: 1px solid grey;
  border-radius: 7px;
  resize: none;
`;

export default AddForm;
