import React from "react";
import { useEffect, useState } from "react";
import iconBell from "../assets/icon-bell.png";
import { useSelector } from "react-redux";
import defaultProfile from "../assets/profile-default.png";

function Header() {
  const { profile } = useSelector((s) => s.profile);

  const [showBellNotif, setShowBellNotif] = useState(false);
  const showBellNotifHandler = (e) => {
    e.preventDefault();
    setShowBellNotif(!showBellNotif);
  };
  return (
    <header className="bg-white  py-4">
      <div className="container mx-auto  px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="hidden sm:flex items-center justify-center sm:justify-start">
            <h1 className="text-primary px-3 text-[29px]">Zwallet</h1>
          </div>
          <div className="flex gap-2 items-center justify-between w-full sm:w-fit px-2">
            <div className="flex items-center gap-3">
              <img
                className="h-[48px] w-[48px] rounded-lg"
                src={
                  profile.image && profile.image
                    ? profile.image
                    : defaultProfile
                }
                alt=""
              />
              <div>
                <span className="sm:hidden text-[#3A3D42E5]">Hello,</span>

                <p className="bold">
                  {profile.username ? profile.username : "Your Name"}
                </p>
                <span className="hidden sm:block text-[#3A3D42E5]">
                  {profile.phone ? profile.phone : "Phone Not Set"}
                </span>
              </div>
            </div>
            <div className="relative ml-3 ">
              <img src={iconBell} alt="" onClick={showBellNotifHandler} />

              <div
                className={`${
                  showBellNotif ? " block" : " hidden"
                } absolute right-0 z-10 mt-2 w-48 origin-top-right p-3 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
                tabIndex="-1"
              >
                <p>Transaction History</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
export default Header;
