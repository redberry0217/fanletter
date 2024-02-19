import React, { useState } from 'react';
import styled from 'styled-components';

function Login() {
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');

  const toggleForm = () => {
    setShowLoginForm((prevState) => !prevState);
  };

  const handleIdInput = (e) => {
    const idValue = e.target.value;
    setId(idValue);
    idValue.length >= 4 ? setIsValid(true) : setIsValid(false);
  };

  const handlePasswordInput = (e) => {
    const passworldValue = e.target.value;
    setPassword(passworldValue);
    passworldValue.length >= 4 ? setIsValid(true) : setIsValid(false);
  };

  return (
    <LoginPageContainer>
      {showLoginForm ? (
        <LoginForm>
          <FormTitle>🗝️Login</FormTitle>
          <FormComment>로그인하시면 From MOA to TXT의 모든 기능을 이용하실 수 있습니다.</FormComment>
          <StyledInput
            type="text"
            value={id}
            onChange={handleIdInput}
            placeholder="아이디 (4~10글자)"
            minLength="4"
            maxLength="10"
          />
          <StyledInput
            type="password"
            value={password}
            onChange={handlePasswordInput}
            placeholder="비밀번호 (4~15글자)"
            minLength="4"
            maxLength="15"
          />
          <BlueButton style={{ backgroundColor: isValid ? '#4b85d0' : '#c2c2c2' }}>로그인</BlueButton>
          <LetsSignup onClick={toggleForm}>회원가입</LetsSignup>
        </LoginForm>
      ) : (
        <SignupForm>
          <FormTitle>✨Sign Up</FormTitle>
          <FormComment>From MOA to TXT의 새로운 회원으로 가입합니다.</FormComment>
          <StyledInput type="text" value={id} placeholder="아이디 (4~10글자)" minLength="4" maxLength="10" />
          <StyledInput
            type="password"
            value={password}
            placeholder="비밀번호 (4~15글자)"
            minLength="4"
            maxLength="15"
          />
          <StyledInput type="text" value={nickname} placeholder="닉네임 (1~10글자)" minLength="1" maxLength="10" />
          <BlueButton style={{ backgroundColor: isValid ? '#4b85d0' : '#c2c2c2' }}>회원가입</BlueButton>
          <LetsSignup onClick={toggleForm}>로그인</LetsSignup>
        </SignupForm>
      )}
    </LoginPageContainer>
  );
}

const LoginPageContainer = styled.div`
  background-color: #e9f7ff;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
`;

const LoginForm = styled.form`
  background-color: white;
  width: 600px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  padding: 30px;
  gap: 10px;
`;

const FormTitle = styled.span`
  font-size: 20pt;
  color: #4b85d0;
  font-weight: 600;
`;

const FormComment = styled.span`
  font-size: 12pt;
  margin-top: 10px;
  margin-bottom: 40px;
`;
const StyledInput = styled.input`
  height: 40px;
  width: 80%;
  margin: auto;
  padding-left: 10px;
  border-width: 0 0 1px;
  font-size: 13pt;
`;

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

const LetsSignup = styled.span`
  margin-top: 5px;
  text-align: center;
  font-weight: 600;
  color: gray;
  cursor: pointer;
`;

const SignupForm = styled.form`
  background-color: white;
  width: 600px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  padding: 30px;
  gap: 10px;
`;
export default Login;
