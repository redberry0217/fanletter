import { BrowserRouter, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Detail from '../pages/Detail';
import Home from '../pages/Home';
import Login from 'pages/Login';
import Profile from 'pages/Profile';
import Layout from 'pages/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { userLogin } from '../redux/modules/authSlice';

const Router = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const token = useSelector((state) => state.auth.accessToken);
  console.log('렌더링시 로그인 여부', isLoggedIn);
  console.log('렌더링시 토큰', token);

  const dispatch = useDispatch();

  useEffect(() => {
    const Storedresponse = JSON.parse(localStorage.getItem('response'));
    if (Storedresponse) {
      dispatch(userLogin(Storedresponse));
      console.log(`이미 로그인됨`);
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        {isLoggedIn ? (
          <>
            <Route element={<Layout />} path="/">
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
