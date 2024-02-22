import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Detail from '../pages/Detail';
import Home from '../pages/Home';
import Login from 'pages/Login';
import Profile from 'pages/Profile';
import Layout from 'pages/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { userLogin } from '../redux/modules/authSlice';

/** 라우터 레벨에서는 useNavigate 사용 불가능 */
const Router = () => {
  const dispatch = useDispatch();
  const storedResponse = JSON.parse(localStorage.getItem('response'));

  useEffect(() => {
    if (storedResponse) {
      dispatch(userLogin(storedResponse));
    }
  }, []);

  const { isLoggedIn } = useSelector((state) => state.auth);

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
