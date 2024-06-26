import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProfileHeader from '../../components/profile/ProfileHeader';
import Header from '../../components/elements/Header';
import Sidebar from '../../components/elements/Sidebar';
import Footer from '../../components/elements/Footer';
import useApi from '../../utils/useApi';
import { useNavigate } from 'react-router-dom';
import { getProfile } from '../../store/reducer/user.js';

export default function ChangePass() {
  const api = useApi();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { profile } = useSelector((s) => s.user);
  const [checkPin, setCheckPin] = useState(false);
  const [pin, setPin] = useState(new Array(6).fill(''));

  // Handle Input PIN
  const handleInputPin = (element, index) => {
    // Make sure the input is a number
    if (isNaN(element.value)) return;

    setPin([...pin.map((d, i) => (i === index ? element.value : d))]);

    // Focus to the next PIN
    if (element.nextSibling) {
      element.nextElementSibling.focus();
    }
  };

  // Confirm Pin
  const confirmPin = (e) => {
    e.preventDefault();
    if (pin.join('') === profile.pin) {
      setPin(new Array(6).fill(''));
      setCheckPin(true);
    } else {
      console.log(pin);
      alert('Incorrect PIN!');
    }
  };

  // Update Pin
  const updatePin = (e) => {
    e.preventDefault();
    {
      api({
        method: 'PATCH',
        url: '/user/updatepin',
        data: { ...profile, pin: pin.join('') },
      })
        .then(({ data }) => {
          dispatch(getProfile({ ...profile, pin: data.data }));
          alert('Pin update successful!');
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
      <section className=" flex justify-between w-[1140px] mx-auto mb-10">
        <Sidebar />

        <main className="relative bg-white w-[850px] h-[678px] rounded-3xl shadow-lg px-7 pt-7 pb-12">
          <ProfileHeader
            title={'Change Pin'}
            content={
              'You must enter your current password and then type your new password twice.'
            }
          />
          <form
            className="w-[100%] md:w-[433px] flex flex-col overflow-x-hidden mx-auto"
            onSubmit={checkPin ? updatePin : confirmPin}
          >
            <div className="flex flex-row justify-between gap-x-1 overflow-x-hidden mt-[100px] mb-[70px]">
              {pin.map((data, index) => {
                return (
                  <input
                    className="md:w-[53px] md:h-[65px] w-[47px] h-[58px] text-center text-[#3A3D42] text-[30px] font-bold p-2 border border-[#A9A9A999] rounded-[10px] outline-none"
                    type="text"
                    maxLength={1}
                    key={index}
                    value={data}
                    placeholder="_"
                    onChange={(e) => handleInputPin(e.target, index)}
                    onFocus={(e) => e.target.select()}
                    required
                  />
                );
              })}
            </div>
            {checkPin ? (
              <button
                className={`bg-[#6457570D] ${pin.includes('') ? 'bg-[#6457570D] text-[#88888F]' : 'bg-primary text-white'} text-[18px] font-bold  rounded-[10px] p-4`}
                disabled={pin.includes('')}
              >
                Change Pin
              </button>
            ) : (
              <button
                className={`bg-[#6457570D] ${pin.includes('') ? 'bg-[#6457570D] text-[#88888F]' : 'bg-primary text-white'} text-[18px] font-bold  rounded-[10px] p-4`}
                disabled={pin.includes('')}
              >
                Confirm Pin
              </button>
            )}
          </form>
        </main>
      </section>
      <Footer />
    </div>
  );
}
