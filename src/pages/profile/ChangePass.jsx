import React, { useState, useEffect } from 'react';
import ProfileHeader from '../../components/profile/ProfileHeader';
import useApi from '../../utils/useApi';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/elements/Header';
import Sidebar from '../../components/elements/Sidebar';
import Footer from '../../components/elements/Footer';
import Input from '../../components/profile/Input';
import { getProfile } from '../../store/reducer/user.js';

export default function ChangePass() {
  const api = useApi();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { profile } = useSelector((s) => s.user);
  const [formData, setFormData] = useState({ email: profile.email });

  // Handle Change
  const handleChange = (e) => {
    const data = { ...formData, [e.target.name]: e.target.value };
    setFormData(data);
  };

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.newpassword !== formData.confirmnewpassword) {
      return alert('New password confirmation fail!');
    }
    {
      api({
        method: 'PATCH',
        url: '/user/updatepass',
        data: formData,
      })
        .then(({ data }) => {
          console.log(data.data);
          dispatch(getProfile({ ...profile, password: data.data }));
          alert('Password updated successfully!');
          navigate('/home');
        })
        .catch(({ response }) => {
          console.log(response.data);
          alert(`ERROR: ${response.data.error}`);
        });
    }
  };

  return (
    <div>
      <Header profile={profile} />
      <section className="flex justify-between w-[1140px] mx-auto mb-10">
        <Sidebar />

        <div className="relative bg-white w-[850px] h-[678px] rounded-3xl shadow-lg px-7 pt-7 pb-12">
          <ProfileHeader
            title={'Change Password'}
            content={
              'You must enter your current password and then type your new password twice.'
            }
          />

          <form
            className="w-full sm:w-[431px] mx-auto text-center space-y-8 mt-24"
            onSubmit={handleSubmit}
          >
            <div className="grid gap-y-10">
              <Input
                id={'oldPassword'}
                name="password"
                type={'Password'}
                placeholder={'Current Password'}
                icon={'codicon:lock'}
                icon2={'mage:eye-off'}
                icon3={'mage:eye'}
                onChange={handleChange}
              />
              <Input
                id={'newPassword'}
                name="newpassword"
                type={'Password'}
                placeholder={'New Password'}
                icon={'codicon:lock'}
                icon2={'mage:eye-off'}
                icon3={'mage:eye'}
                onChange={handleChange}
              />
              <Input
                id={'confirmPassword'}
                name="confirmnewpassword"
                type={'Password'}
                placeholder={'Repeat New Password'}
                icon={'codicon:lock'}
                icon2={'mage:eye-off'}
                icon3={'mage:eye'}
                onChange={handleChange}
              />
            </div>

            <button
              className="w-full bg-primary text-white font-bold rounded-xl py-3 disabled:cursor-not-allowed disabled:text-[#88888F] disabled:bg-[#DADADA]"
              disabled={
                !formData.password ||
                !formData.newpassword ||
                !formData.confirmnewpassword
              }
            >
              Change Password
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </div>
  );
}
