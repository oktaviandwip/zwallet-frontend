import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/elements/Header.jsx';
import Sidebar from '../../components/elements/Sidebar.jsx';
import Footer from '../../components/elements/Footer.jsx';
import Card from '../../components/profile/CardProfile.jsx';
import ProfileHeader from '../../components/profile/ProfileHeader.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from '../../store/reducer/user.js';
import useApi from '../../utils/useApi.js';

function Detail() {
  const api = useApi();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { profile } = useSelector((s) => s.user);
  const [formData, setFormData] = useState(profile);

  // Handle Change
  const handleChange = (e) => {
    // Assure the input are numbers
    if (e.target.name === 'phone_number' && isNaN(e.target.value)) return;

    const data = { ...formData, [e.target.name]: e.target.value };
    setFormData(data);
  };

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    {
      api({
        method: 'PATCH',
        url: '/user/profile',
        data: formData,
      })
        .then((_) => {
          dispatch(getProfile(formData));
          alert('Profile updated successfully!');
          navigate('/profile');
        })
        .catch(({ response }) => {
          console.log(response.data);
          alert(`ERROR: ${response.data.error}`);
        });
    }
  };

  return (
    <div>
      <Header />
      <section className="flex justify-between md:w-[760px] xl:w-[1140px] mx-auto mb-10">
        <Sidebar />
        <div className="relative bg-white w-[375px] sm:w-[470px] xl:w-[850px] rounded-3xl shadow-lg px-7 pt-7 pb-12 mx-auto">
          <ProfileHeader
            title={'Personal Information'}
            content={
              'We got your personal information from the sign up proccess. If you want to make changes on your information, contact our support.'
            }
          />
          <form
            className="mt-24 xl:mt-10 grid gap-y-5"
            onSubmit={(e) => handleSubmit(e)}
          >
            <Card
              title={'Username'}
              placeholder="putra10"
              name={'username'}
              content={formData.username}
              handleChange={handleChange}
            />
            <Card
              title={'Name'}
              placeholder="Robert Chandelier"
              name={'name'}
              content={formData.name}
              handleChange={handleChange}
            />
            <Card
              title={'Verified Email'}
              placeholder="example@gmail.com"
              name={'email'}
              content={formData.email}
              handleChange={handleChange}
            />
            <Card
              title={'Phone Number'}
              placeholder="08xxxxxxxxxx"
              name={'phone_number'}
              content={formData.phone_number || ''}
              handleChange={handleChange}
            />
            <div className="absolute top-[210px] sm:top-[180px] xl:top-[80px] xl:right-7">
              <button className="w-[100px] bg-primary text-white font-bold rounded-[8px] p-4 mr-4">
                Save
              </button>
              <button
                className="w-[100px] bg-[#88888f3f] text-[#88888F] font-bold rounded-[8px] p-4"
                onClick={() => window.location.reload()}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Detail;
