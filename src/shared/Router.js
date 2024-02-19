import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Detail from '../pages/Detail';
import Home from '../pages/Home';
import Login from 'pages/Login';
import Profile from 'pages/Profile';

const Router = () => {
  const isLoggedIn = true;

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
