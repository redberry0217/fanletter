import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../redux/modules/authSlice';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import api from '../axios/api';

function Login() {
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');

  const accessToken = localStorage.getItem('accessToken');
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  /** 이미 로그인 상태가 true인 경우 Home으로 이동 */
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleForm = () => {
    setShowLoginForm((prevState) => !prevState);
  };

  const handleIdInput = (e) => {
    const idValue = e.target.value;
    setId(idValue);
    idValue.length >= 4 ? setIsValid(true) : setIsValid(false);
  };

  const handlePasswordInput = (e) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);
    passwordValue.length >= 4 ? setIsValid(true) : setIsValid(false);
  };

  const handleNicknameInput = (e) => {
    const nicknameValue = e.target.value;
    setNickname(nicknameValue);
    nicknameValue.length >= 1 ? setIsValid(true) : setIsValid(false);
  };

  const loginHandler = async () => {
    try {
      const loginInfo = {
        id: id,
        password: password
      };
      await api.post('/login', loginInfo);
      dispatch(userLogin(accessToken));
      const loginCompleteMsg = () => {
        toast.success('로그인 되었습니다. 환영합니다!');
      };
      loginCompleteMsg();
      navigate(`/`);
    } catch (error) {
      toast.error(`로그인에 실패했습니다. 다시 시도해주세요.`);
      console.log(error);
    }
  };

  const sineupHandler = async () => {
    try {
      const newMember = {
        id: id,
        password: password,
        nickname: nickname
      };
      await api.post('/register', newMember);
      const signupCompleteMsg = () => {
        toast.success('회원가입 완료!');
        toast.success('이제 로그인해주세요 :)');
      };
      signupCompleteMsg();
      setShowLoginForm((prevState) => !prevState);
    } catch (error) {
      toast.error(`회원가입에 실패했습니다. 다시 시도해주세요.`);
      console.log(error);
    }
  };

  return (
    <LoginPageContainer>
      {showLoginForm ? (
        <LoginForm
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <FormTitle>🗝️Login</FormTitle>
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
          <BlueButton type="submit" onClick={loginHandler} style={{ backgroundColor: isValid ? '#4b85d0' : '#c2c2c2' }}>
            로그인
          </BlueButton>
          <LetsSignup onClick={toggleForm}>회원가입</LetsSignup>
        </LoginForm>
      ) : (
        <SignupForm
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <FormTitle>✨Sign Up</FormTitle>
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
          <StyledInput
            type="text"
            value={nickname}
            onChange={handleNicknameInput}
            placeholder="닉네임 (1~10글자)"
            minLength="1"
            maxLength="10"
          />
          <BlueButton
            type="submit"
            onClick={sineupHandler}
            style={{ backgroundColor: isValid ? '#4b85d0' : '#c2c2c2' }}
          >
            회원가입
          </BlueButton>
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
  padding-top: 50px;
  padding-bottom: 50px;
  gap: 10px;
`;

const FormTitle = styled.span`
  font-size: 20pt;
  color: #4b85d0;
  font-weight: 600;
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
  padding-top: 50px;
  padding-bottom: 50px;
  gap: 10px;
`;
export default Login;
