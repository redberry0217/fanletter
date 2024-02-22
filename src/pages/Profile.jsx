import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'components/common/Button';
import { useRef } from 'react';
import api from '../axios/api';
import { editUserInfo } from '../redux/modules/authSlice';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import axios from 'axios';

function Profile() {
  const { userId, nickname: initialNickname, avatar: initialAvatar, accessToken } = useSelector((state) => state.auth);
  const fileInputRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [avatar, setAvatar] = useState(initialAvatar);
  const [nickname, setNickname] = useState(initialNickname);
  const [myFile, setMyFile] = useState(null);
  const dispatch = useDispatch();

  /** 수정하기 버튼 클릭시 */
  const handleEditClick = () => {
    setIsEditing(true);
  };

  /** 수정화면에서 취소하기 버튼 클릭시 */
  const handleCancelClick = () => {
    setIsEditing(false);
  };

  /** 수정하기 기능 */
  // 아바타 이미지 클릭 이벤트
  const handleClickAvatar = () => {
    fileInputRef.current.click();
  };

  // 아바타 이미지 업로드
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setAvatar(fileUrl);
      setMyFile(file);
    }
  };

  // 정보 수정하기 버튼
  const EditCompleteHandler = async () => {
    try {
      const formData = new FormData();
      formData.append('avatar', myFile);
      formData.append('nickname', nickname);

      const response = await api.patch(`/profile`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`
        }
      });

      const lettersResponse = await axios.get('http://localhost:5000/letters');
      const letters = lettersResponse.data;

      const userLetters = letters.filter((letter) => letter.userId === userId);
      userLetters.forEach((letter) => {
        letter.nickname = response.nickname;
        letter.avatar = response.avatar;
      });

      const storedResponse = JSON.parse(localStorage.getItem('response'));
      if (storedResponse) {
        const updatedResponse = {
          ...storedResponse,
          nickname: response.nickname,
          avatar: response.avatar
        };
        localStorage.setItem('response', JSON.stringify(updatedResponse));
        dispatch(editUserInfo({ nickname: response.nickname, avatar: response.avatar }));
      }

      const storedLetters = await axios.get(`http://localhost:5000/letters/?userId=${userId}`);
      const storedUserLetters = storedLetters.data;

      storedUserLetters.forEach(async (letter) => {
        try {
          await axios.patch(`http://localhost:5000/letters/${letter.id}`, {
            nickname: response.nickname,
            avatar: response.avatar
          });
        } catch (error) {
          console.error(`게시글 수정 실패 - ID: ${letter.id}`, error);
        }
      });

      toast.success(`정보가 수정되었습니다.`);
      setIsEditing(false);
    } catch (error) {
      toast.error(`정보 수정에 실패했습니다.`);
      console.log(error);
    }
  };

  return (
    <ProfileContainer>
      <ProfileTitle>
        <Txt>MOA</Txt>'S PROFILE
      </ProfileTitle>
      <ProfileCard>
        <MyAvatar onClick={handleClickAvatar}>
          <img src={avatar} alt="사용자 아바타" style={{ width: '150px', height: '150px', borderRadius: '50%' }} />
          <input
            type="file"
            id="fileInput"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </MyAvatar>
        {isEditing ? (
          <input value={nickname} onChange={(e) => setNickname(e.target.value)} />
        ) : (
          <MyNickname>{nickname}</MyNickname>
        )}
        <MyId>login id : {userId}</MyId>
        <Btn>
          {isEditing ? <Button onClick={handleCancelClick} text="✖️취소하기" /> : null}
          {isEditing ? (
            <Button text="✔️저장하기" onClick={EditCompleteHandler} />
          ) : (
            <Button onClick={handleEditClick} text="✏️수정하기" />
          )}
        </Btn>
      </ProfileCard>
    </ProfileContainer>
  );
}

const ProfileContainer = styled.div`
  background-color: #e9f7ff;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ProfileTitle = styled.p`
  font-size: 23pt;
  font-weight: bold;
  text-align: left;
`;

const Txt = styled.span`
  color: #4b85d0;
`;
const ProfileCard = styled.div`
  background-color: #ffffff;
  border-radius: 15px;
  width: 700px;
  height: 400px;
  margin: 35px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const MyAvatar = styled.div`
  height: 150px;
  margin: 20px;
`;

const MyNickname = styled.div`
  font-size: 20pt;
  font-weight: 600;
  color: #4b85d0;
`;

const MyId = styled.div``;

const Btn = styled.div`
  display: flex;
  gap: 10px;
`;

export default Profile;
