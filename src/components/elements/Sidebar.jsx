import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/reducer/auth.js';
import { getProfile } from '../../store/reducer/user.js';
import {
  ArrowUpIcon,
  DashboardIcon,
  LogoutIcon,
  PersonIcon,
  PlusIcon,
} from './Icons';

const SidebarLink = ({ title, icon, route }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isActiveRoute = location.pathname.startsWith(route);
  const [isHovered, setIsHovered] = useState(false);

  const handleLogout = () => {
    dispatch(getProfile({}));
    dispatch(logout());
  };

  return (
    <li>
      <Link
        to={route}
        style={{
          textDecoration: 'none',
        }}
        className={`flex items-center h-[35px] text-dark hover:text-primary group border-l-[5px] px-8 ${title === 'Logout' ? 'absolute bottom-[50px]' : 'mt-[52px]'} ${
          isActiveRoute
            ? 'text-primary border-primary font-bold'
            : 'hover:border-primary border-transparent'
        }`}
        onClick={title === 'Logout' ? handleLogout : null}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {React.cloneElement(icon, {
          color: isActiveRoute || isHovered ? '#6379F4' : '',
        })}
        <span className="ms-5">{title}</span>
      </Link>
    </li>
  );
};

function Sidebar() {
  const { profile } = useSelector((s) => s.user);
  const isProfileComplete =
    profile.username && profile.name && profile.email && profile.phone_number;

  const sidebarLinks = [
    {
      title: 'Dashboard',
      icon: <DashboardIcon className="size-7" />,
      route: '/home',
    },
    {
      title: 'Transfer',
      icon: <ArrowUpIcon className="size-7" />,
      route: '/transfers',
    },
    {
      title: 'Top Up',
      icon: <PlusIcon className="size-7" />,
      route: '/topup',
    },
    {
      title: 'Profile',
      icon: <PersonIcon className="size-7" />,
      route: `${isProfileComplete ? '/profile' : '/profile/detail'}`,
    },
    {
      title: 'Logout',
      icon: <LogoutIcon className="size-7" />,
      route: '/login',
    },
  ];

  return (
    <aside
      className={`hidden md:block w-52 md:w-[270px] rounded-3xl drop-shadow-xl transition-transform -translate-x-full sm:translate-x-0`}
    >
      <nav
        className={`flex flex-col justify-between ${isProfileComplete ? 'h-full' : 'h-screen'} rounded-2xl overflow-y-auto bg-white`}
      >
        <ul className="font-nunito text-[18px]">
          {sidebarLinks.map((link, i) => (
            <SidebarLink key={i} {...link} />
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
