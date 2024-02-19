import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Detail from '../pages/Detail';
import Home from '../pages/Home';
import Login from 'pages/Login';
import Profile from 'pages/Profile';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { userLogin } from '../redux/modules/authSlice';

const Router = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const token = useSelector((state) => state.auth.accessToken);
  console.log('처음 들어왔을 때 로그인 여부', isLoggedIn);
  console.log('처음 들어왔을 때 토큰', token);

  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      dispatch(userLogin({ accessToken }));
      console.log(`이미 로그인됨`);
    } else {
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        {isLoggedIn ? (
          <>
            <Route path="/profile" element={<Profile />} />
            <Route path="detail/:id" element={<Detail />} />
          </>
        ) : null}
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
