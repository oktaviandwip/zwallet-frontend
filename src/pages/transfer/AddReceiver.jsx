import React, { useState, useEffect } from 'react';
import ProfileHeader from '../../components/profile/ProfileHeader.jsx';
import useApi from '../../utils/useApi.js';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/elements/Header.jsx';
import Sidebar from '../../components/elements/Sidebar.jsx';
import Footer from '../../components/elements/Footer.jsx';
import Input from '../../components/profile/Input.jsx';

export default function ChangePass() {
  const api = useApi();
  const navigate = useNavigate();
  const { profile } = useSelector((s) => s.user);
  const [formData, setFormData] = useState({
    user_id: profile.id,
    phone_number: '',
  });

  // Handle Change
  const handleChange = (e) => {
    // Assure the input are numbers
    if (isNaN(e.target.value)) {
      setFormData((prev) => ({
        ...formData,
        [e.target.name]: prev.phone_number,
      }));
      return;
    }
    const data = { ...formData, [e.target.name]: e.target.value };
    setFormData(data);
  };

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    {
      api({
        method: 'POST',
        url: '/user/receiver',
        data: formData,
      })
        .then(({ data }) => {
          console.log(data);
          alert('Receiver added successfully!');
          navigate('/transfers');
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
      <section className="flex justify-between md:w-[760px] xl:w-[1140px] mx-auto mb-10">
        <Sidebar />

        <div className="relative bg-white w-[375px] sm:w-[470px] xl:w-[850px] rounded-3xl shadow-lg px-7 pt-7 pb-12 mx-auto">
          <ProfileHeader
            title={'Add Receiver'}
            content={
              'Add another phone number that uses Zwallet so you can start transferring your money to other users.'
            }
          />

          <form
            className="w-full sm:w-[431px] mx-auto text-center space-y-8 mt-24"
            onSubmit={handleSubmit}
          >
            <div className="grid gap-y-10">
              <Input
                name="phone_number"
                type={'text'}
                value={formData.phone_number}
                placeholder={'08xxxxxxxx'}
                icon={'feather:phone'}
                onChange={(e) => handleChange(e)}
              />
            </div>

            <button
              className="w-full bg-primary text-white font-bold rounded-xl py-3 disabled:cursor-not-allowed disabled:text-[#88888F] disabled:bg-[#DADADA]"
              disabled={!formData.phone_number}
            >
              Add Phone Number
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </div>
  );
}
