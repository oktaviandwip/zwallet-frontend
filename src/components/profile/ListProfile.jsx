import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getProfile } from '../../store/reducer/user.js';
import { logout } from '../../store/reducer/auth.js';
import arrowLeft from '../../assets/arrow-left.png';

export default function ListProfile({ content }) {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const handleNavigate = () => {
    switch (content) {
      case 'Personal Information':
        navigate('/profile/detail');
        break;
      case 'Change Password':
        navigate('/profile/change-password');
        break;
      case 'Change PIN':
        navigate('/profile/change-pin');
        break;
      case 'Logout':
        dispatch(getProfile({}));
        dispatch(logout());
        navigate('/login');
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <button
        className="text-list text-[18px] font-bold bg-[#E5E8ED] flex justify-between items-center py-5 px-5 rounded-lg w-[300px] sm:w-[350px] xl:w-[433px]"
        onClick={handleNavigate}
      >
        <p>{content}</p>
        {content === 'Logout' ? null : <img src={arrowLeft} alt="Arrow left" />}
      </button>
    </div>
  );
}
