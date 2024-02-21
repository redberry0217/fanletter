import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'components/common/Button';
import { useRef } from 'react';
import api from '../axios/api';
import { userInfoEdit } from '../redux/modules/authSlice';

function Profile() {
  const { userId, nickname: initialNickname, avatar: initialAvatar, accessToken } = useSelector((state) => state.auth);
  const fileInputRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [avatar, setMyAvatar] = useState(initialAvatar);
  const [nickname, setNickname] = useState(initialNickname);
  const [myfile, setMyfile] = useState(null);

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
      console.log('선택한 파일', file);
      const fileUrl = URL.createObjectURL(file);
      setMyAvatar(fileUrl);
      setMyfile(file);
    }
  };

  const EditCompleteHandler = async () => {
    try {
      const formData = new FormData();
      formData.append('avatar', myfile);
      formData.append('nickname', nickname);

      const response = await api.patch('/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`
        }
      });
      console.log('수정되었을까?', response);
      dispatch(userInfoEdit({ nickname: nickname, avatar: avatar }));
      localStorage.setItem('response', JSON.stringify(response));
      setIsEditing(false);
      console.log('변경된닉네임', nickname);
      console.log('변경된아바타', avatar);
    } catch (error) {}
  };

  return (
    <ProfileContainer>
      <ProfileTitle>
        <Txt>MOA</Txt>'S PROFILE
      </ProfileTitle>
      <ProfileCard>
        <MyAvatar onClick={handleClickAvatar}>
          <img src={avatar} alt="사용자 아바타" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
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
        <MyId>id : {userId}</MyId>
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
  height: 350px;
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

const BlueButton = styled.button`
  height: 40px;
  width: 80%;
  border: none;
  border-radius: 15px;
  background-color: #4b85d0;
  color: white;
  margin: auto;
  margin-top: 20px;
  font-size: 13pt;
  font-weight: 600;
  cursor: pointer;
`;

const Btn = styled.div`
  display: flex;
  gap: 10px;
`;

export default Profile;
