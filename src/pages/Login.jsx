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
  const [formState, setFormState] = useState({
    id: '',
    password: '',
    nickname: ''
  });
  const { id, password, nickname } = formState;
  const isIdValid = id.length >= 4;
  const isPasswordValid = id.length >= 4;
  const isNicknameValid = id.length >= 1;
  const isValid = isIdValid && isPasswordValid && isNicknameValid;

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  // const accessToken = localStorage.getItem('accessToken');
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /** 이미 로그인 상태가 true인 경우 Home으로 이동 */
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  const toggleForm = () => {
    setShowLoginForm((prevState) => !prevState);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (showLoginForm) {
      try {
        const loginInfo = {
          id: id,
          password: password
        };
        const response = await api.post('/login?expiresIn=1m', loginInfo);
        dispatch(userLogin(response)); //리덕스에 정보를 보내고 로그인
        localStorage.setItem('response', JSON.stringify(response)); //로컬스토리지에도 저장

        toast.success('로그인 되었습니다. 환영합니다!');
        navigate(`/`);
      } catch (error) {
        toast.error(`로그인에 실패했습니다. 다시 시도해주세요.`);
        console.log(error);
      }
    } else {
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
    }
  };

  return (
    <LoginPageContainer>
      <LoginForm onSubmit={onSubmitHandler}>
        <FormTitle>{showLoginForm ? '🗝️Login' : '✨Sign Up'}</FormTitle>
        <StyledInput
          type="text"
          value={id}
          name="id"
          onChange={onChangeHandler}
          placeholder="아이디 (4~10글자)"
          minLength="4"
          maxLength="10"
        />
        <StyledInput
          type="password"
          value={password}
          name="password"
          onChange={onChangeHandler}
          placeholder="비밀번호 (4~15글자)"
          minLength="4"
          maxLength="15"
        />
        {!showLoginForm && (
          <StyledInput
            type="text"
            value={nickname}
            name="nickname"
            onChange={onChangeHandler}
            placeholder="닉네임 (1~10글자)"
            minLength="1"
            maxLength="10"
          />
        )}
        <BlueButton type="submit" style={{ backgroundColor: isValid ? '#4b85d0' : '#c2c2c2' }}>
          {showLoginForm ? '로그인' : '회원가입'}
        </BlueButton>
        <LetsSignup onClick={toggleForm}>{showLoginForm ? '회원가입' : '로그인'}</LetsSignup>
      </LoginForm>
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
  outline: none;
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
  user-select: none;
  &:hover {
    color: #4b85d0;
  }
`;

export default Login;
