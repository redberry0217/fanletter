import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Button from 'components/common/Button';

function Profile() {
  const { userId, nickname, avatar } = useSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };
  return (
    <ProfileContainer>
      <ProfileTitle>
        <Txt>MOA</Txt>'S PROFILE
      </ProfileTitle>
      <ProfileCard>
        <MyAvatar>
          <img src={avatar} alt="사용자 아바타" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
        </MyAvatar>
        {isEditing ? <input value={nickname} /> : <MyNickname>{nickname}</MyNickname>}
        <MyId>id : {userId}</MyId>
        <Btn>
          {isEditing ? <Button onClick={handleCancelClick} text="✖️취소하기" /> : null}
          {isEditing ? <Button text="✔️저장하기" /> : <Button onClick={handleEditClick} text="✏️수정하기" />}
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

const LineStyle = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  height: 1px;
  background-color: gray;
`;

const MyAvatar = styled.div`
  height: 100px;
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
