import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Icon } from '@iconify/react';
import { getProfile } from '../../store/reducer/user.js';

import photoProfile from '../../assets/photo-profile.png';
import ListProfile from '../../components/profile/ListProfile';
import IncompleteProfile from '../../components/elements/IncompleteProfile.jsx';
import Header from '../../components/elements/Header';
import Sidebar from '../../components/elements/Sidebar';
import Footer from '../../components/elements/Footer';
import useApi from '../../utils/useApi';

function Profile() {
  const api = useApi();
  const dispatch = useDispatch();
  const { profile } = useSelector((s) => s.user);

  // Update Photo Profile
  const submitPhoto = (e) => {
    if (e.target.files.length === 0) {
      return;
    }

    // File Handler
    const file = e.target.files[0];
    const maxFileSize = 1 * 1024 * 1024;

    if (file.size > maxFileSize) {
      alert('File size must be under 1 MB!');
      return;
    }

    const newProfile = { ...profile };
    newProfile['photo_profile'] = file;

    // Make Form Data
    const formData = new FormData();
    formData.append('photo_profile', file);

    // Append Other Fields
    for (const key in newProfile) {
      if (key !== 'photo_profile') {
        formData.append(key, newProfile[key]);
      }
    }

    // Send API Request
    api({
      method: 'PATCH',
      url: 'user/photo-profile',
      headers: { 'Content-Type': 'multipart/form-data' },
      data: formData,
    })
      .then(({ data }) => {
        dispatch(getProfile(data.rows[0]));
        alert('Photo profile updated!');
      })
      .catch(({ response }) => {
        console.log(response.data);
        alert(response.data.error);
      });
  };

  if (!profile.name || !profile.phone_number) {
    return <IncompleteProfile />;
  }

  return (
    <div>
      <Header />
      <section className="flex justify-center md:justify-between md:w-[760px] xl:w-[1140px] mx-auto mb-10">
        <Sidebar />
        <main className="bg-white w-[375px] sm:w-[470px] xl:w-[850px] rounded-3xl shadow-lg px-7 pt-12 pb-16">
          <div className="flex flex-col items-center text-center">
            <label
              className="size-[80px] rounded-[10px] bg-cover bg-center bg-no-repeat mx-auto cursor-pointer"
              style={{
                backgroundImage: `url(${profile.photo_profile || photoProfile})`,
              }}
            >
              <input
                className="size-[100px] opacity-0 cursor-pointer"
                name="photo_profile"
                type="file"
                onChange={submitPhoto}
              />
              <div className="flex gap-x-3 mt-[-8px] cursor-pointer">
                <Icon icon="prime:pencil" className="text-lg ml-2" />
                <span>Edit</span>
              </div>
            </label>
            <h3 className="text-[#4D4B57] font-bold text-2xl mt-12 mb-[10px]">
              {profile.username ? profile.username : 'Your Name'}
            </h3>
            <div className="text-[#7A7886] mb-[40px]">
              {profile.phone_number}
            </div>

            <div className="flex flex-col p-2 items-center gap-y-4 w-full">
              <ListProfile content={'Personal Information'} />
              <ListProfile content={'Change Password'} />
              <ListProfile content={'Change PIN'} />
              <ListProfile content={'Logout'} />
            </div>
          </div>
        </main>
      </section>
      <Footer />
    </div>
  );
}

export default Profile;
