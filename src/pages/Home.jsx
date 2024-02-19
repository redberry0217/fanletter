import React, { useState } from 'react';
import Header from 'components/Header';
import { useLocation } from 'react-router-dom';
import HeaderMenu from 'components/HeaderMenu';
import MemberClicked from 'components/MemberClicked';

function Home() {
  const location = useLocation();
  const toWhom = location.state && location.state.previousValue;
  const [activeMember, setActiveMember] = useState(toWhom || 'SOOBIN');

  return (
    <>
      <Header />
      <HeaderMenu activeMember={activeMember} setActiveMember={setActiveMember} toWhom={toWhom} />
      <MemberClicked activeMember={activeMember} setActiveMember={setActiveMember} toWhom={toWhom} />
    </>
  );
}

export default Home;
