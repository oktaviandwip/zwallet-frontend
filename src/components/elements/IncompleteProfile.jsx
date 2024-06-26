import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

const IncompleteProfile = () => {
  const navigate = useNavigate();
  return (
    <div className="flex-col">
      <Header />
      <main className="w-[1140px] flex justify-between items-center mb-10 mx-auto">
        <Sidebar />
        <div
          className="w-[850px] text-3xl text-center font-bold hover:text-primary cursor-pointer underline italic"
          onClick={() => navigate('/profile/detail')}
        >
          Please complete your profile data!
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default IncompleteProfile;
