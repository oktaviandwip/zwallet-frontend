import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/reducer/auth.js';

import { getProfile } from '../../store/reducer/user.js';
import { Icon } from '@iconify/react';

import Notification from './Notification.jsx';
import photoProfile from '../../assets/photo-profile.svg';
import useApi from '../../utils/useApi.js';

const ProfileHeader = ({ menuOpen, focus, setFocus }) => {
  const api = useApi();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { profile } = useSelector((s) => s.user);

  const [todayHist, setTodayHist] = useState([]);
  const [weekHist, setWeekHist] = useState([]);

  // Today & Weekly History Transaction
  const getHistory = () => {
    api({
      method: 'GET',
      url: `/transaction/history/notif`,
    })
      .then(({ data }) => {
        console.log(data.data);
        setTodayHist(data.data[0].today);
        setWeekHist(data.data[0].weekly);
      })
      .catch(({ response }) => {
        console.log(response.data);
        alert(`ERROR: ${response.data.error}`);
      });
  };

  // Currency Format
  const formatCurrency = (value) => {
    const formattedValue = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
    return formattedValue;
  };

  // Handle Logout
  const handleLogout = () => {
    dispatch(getProfile({}));
    dispatch(logout());
  };

  // Handle Notif Click
  const handleNotifClick = () => {
    setFocus(!focus);
    getHistory();
  };

  return (
    <div className="flex flex-col sm:flex-row items-center mt-[40px] sm:mt-0 gap-y-3">
      {/* Profile */}
      <div
        className="size-[52px] rounded-[10px] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${profile.photo_profile || photoProfile})`,
        }}
        onClick={() => navigate('/profile')}
      ></div>
      <div
        className="w-[140px] font-nunito text-center sm:text-left mx-5"
        onClick={() => navigate('/profile/detail')}
      >
        <p className="font-bold text-[18px] truncate">
          {profile.name || 'Your Name'}
        </p>
        <p className="text-[13px] truncate">
          {profile.phone_number || 'Phone Number'}
        </p>
      </div>

      {/* Notification Button */}
      <div className="relative">
        <button
          className={`w-[180px] ${menuOpen ? 'block' : 'hidden'} font-bold bg-primary tracking-wider text-white text-sm rounded-[12px] mb-2 py-3`}
          onClick={() => {
            focus ? setFocus(!focus) : handleNotifClick();
          }}
        >
          Notification
        </button>
        <button
          className={`w-[180px] ${menuOpen ? 'block' : 'hidden'} font-bold bg-primary bg-opacity-20 text-dark text-sm rounded-[12px] mb-2 py-3`}
          onClick={handleLogout}
        >
          Logout
        </button>
        <Icon
          icon={'feather:bell'}
          className={`size-[24px] ${menuOpen ? 'hidden' : 'block'} ${focus ? 'text-primary' : 'text-[#4D4B57]'}`}
          onClick={() => {
            focus ? setFocus(!focus) : handleNotifClick();
          }}
        />

        {/* Notification Result */}
        <div
          className={`${focus ? 'flex-col' : 'hidden'} absolute top-12 right-[-20px] sm:right-0 w-[367px] sm:w-[403px] p-[30px] bg-white shadow-lg rounded-xl`}
        >
          <div className="text-[#7A7886]">Today</div>
          {todayHist &&
            todayHist.map((e, i) => (
              <Notification key={i} data={e} formatCurrency={formatCurrency} />
            ))}
          <div className="text-[#7A7886] mt-[30px]">This Week</div>
          {weekHist &&
            weekHist.map((e, i) => (
              <Notification key={i} data={e} formatCurrency={formatCurrency} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
