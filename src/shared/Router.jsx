import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Detail from '../pages/Detail';
import Home from '../pages/Home';
import Login from 'pages/Login';
import Profile from 'pages/Profile';
import Layout from 'pages/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { userLogin } from '../redux/modules/authSlice';

const Router = () => {
  const { isLoggedIn, nickname, avatar } = useSelector((state) => state.auth);
  const storedData = JSON.parse(localStorage.getItem('response'));
  const accessToken = storedData.accessToken;

  console.log('렌더링시 로그인 여부', isLoggedIn);
  console.log('렌더링시 닉네임', nickname);
  console.log('렌더링시 아바타', avatar);

  const dispatch = useDispatch();

  // redux persist로 바꾸기
  // useEffect(() => {
  //   const Storedresponse = JSON.parse(localStorage.getItem('response'));
  //   if (Storedresponse) {
  //     dispatch(userLogin(Storedresponse));
  //   }
  // }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        {isLoggedIn ? (
          <>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/detail/:id" element={<Detail />} />
            </Route>
          </>
        ) : null}
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate replace to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
