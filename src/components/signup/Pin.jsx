import React, { useState } from 'react';
import Pin from '../../components/signup/InputPin.jsx';
import useApi from '../../utils/useApi.js';

const CreatePin = ({ emailStatus, formData, setPinStatus, pinStatus }) => {
  const api = useApi();
  const [pin, setPin] = useState(new Array(6).fill(''));

  // Handle Submit PIN
  const handleSubmitPin = (e) => {
    e.preventDefault();
    formData = { ...formData, pin: pin.join('') };
    {
      api({
        method: 'POST',
        url: '/user',
        data: formData,
      })
        .then((_) => {
          setPinStatus(!pinStatus);
        })
        .catch(({ response }) => {
          console.log(response.data);
          alert(`ERROR: ${response.data.message}`);
        });
    }
  };

  return (
    <>
      <section
        className={`${emailStatus && !pinStatus ? 'absolute' : 'hidden'} inset-0 mx-auto top-[120px] w-[375px] md:static md:w-1/2 md:min-h-screen flex flex-col rounded-[20px] md:rounded-none px-5 md:px-12 py-12 bg-white`}
      >
        <h2 className="md:hidden self-center text-2xl font-bold text-[#3A3D42]">
          Create Security PIN
        </h2>
        <h2 className="hidden md:flex w-[60%] text-2xl font-bold text-[#3A3D42] leading-normal">
          Secure Your Account, Your Wallet, and Your Data With 6 Digits PIN That
          You Created Yourself.
        </h2>
        <p className="hidden md:flex w-[60%] text-[#3A3D4299] text-base leading-loose">
          Create 6 digits pin to secure all your money and your data in Zwallet
          app. Keep it secret and don’t tell anyone about your Zwallet account
          password and the PIN.
        </p>
        <p className="md:hidden w-[100%] text-center text-[#3A3D4299] text-base leading-loose">
          Create a PIN that’s contain 6 digits number for security purpose in
          Zwallet.
        </p>
        <form
          className="w-full flex flex-col mt-5"
          onSubmit={(e) => handleSubmitPin(e)}
        >
          <Pin pin={pin} setPin={setPin} />;
          <button
            className={`bg-primary text-white disabled:text-[#88888F] disabled:bg-[#88888f3f] rounded-[8px] font-bold p-4`}
            disabled={pin.includes('')}
          >
            Confirm
          </button>
        </form>
      </section>
    </>
  );
};

export default CreatePin;
