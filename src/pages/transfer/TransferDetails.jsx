import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getProfile } from '../../store/reducer/user.js';
import Header from '../../components/elements/Header';
import Sidebar from '../../components/elements/Sidebar';
import Footer from '../../components/elements/Footer';
import useApi from '../../utils/useApi.js';
import ProfileHeader from '../../components/profile/ProfileHeader';
import Receiver from '../../components/transfer/Receiver';
import TransferDetails from '../../components/transfer/Details.jsx';
import Modal from '../../components/transfer/Modal';
import InputPin from '../../components/signup/InputPin';
import Status from '../../components/transfer/Status';
import share from '../../assets/share.png';
import download from '../../assets/download.png';

function Confirmation() {
  const api = useApi();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { profile } = useSelector((s) => s.user);
  const { receiver } = useSelector((s) => s.transfer);
  const { transferDetails } = useSelector((s) => s.transfer);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pin, setPin] = useState(new Array(6).fill(''));
  const [isStatus, setIsStatus] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Format Date
  function formatDate(date) {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    const formattedHours = hours < 10 ? '0' + hours : hours;
    const time = `${formattedHours}.${formattedMinutes}`;

    return `${month} ${day}, ${year} - ${time}`;
  }

  // Details Input
  const amount = transferDetails.amount.replace(/[^\d]/g, '');
  const details = [
    {
      name: 'Amount',
      detail: transferDetails.amount,
    },
    {
      name: 'Balance Left',
      detail: profile.balance - amount,
    },
    {
      name: 'Date & Time',
      detail: formatDate(new Date()),
    },
    {
      name: 'Notes',
      detail: transferDetails.notes,
    },
  ];

  // Handle Submit
  const handleSubmit = () => {
    if (pin.join('') !== profile.pin) {
      alert('Incorrect PIN!');
      return;
    }

    // Change Amount to Integer
    const formData = {
      ...transferDetails,
      amount: parseInt(transferDetails.amount.replace(/[^\d]/g, '')),
    };

    api({
      method: 'POST',
      url: `/transaction`,
      data: formData,
    })
      .then(({ data }) => {
        setIsModalOpen(!isModalOpen);
        setIsStatus(true);
        setIsSuccess(true);
        dispatch(getProfile(data.data[0]));
        alert('Transfer successful!');
      })
      .catch(({ response }) => {
        setIsModalOpen(!isModalOpen);
        setPin(new Array(6).fill(''));
        setIsStatus(true);
        setIsSuccess(false);
        alert(`ERROR: ${response.data.error}`);
      });
  };

  return (
    <>
      <Header profile={profile} />
      <section
        className={`flex justify-between md:w-[760px] xl:w-[1140px] ${isStatus ? 'h-[1035px]' : 'h-[850px]'} text-base mx-auto mb-10`}
      >
        <Sidebar />
        <main className="relative bg-white w-[375px] sm:w-[470px] xl:w-[850px] rounded-3xl shadow-lg px-7 pt-12 pb-16 mx-auto">
          <Status isStatus={isStatus} isSuccess={isSuccess} />
          <div
            className={`absolute ${isStatus && isSuccess ? 'bottom-48' : isStatus ? 'bottom-28 xl:bottom-32' : 'top-[30px]'} inset-x-0 px-7`}
          >
            <ProfileHeader title={'Transfer To'} />
            <Receiver receiver={receiver} />
          </div>

          {/* Transfer Details */}
          <div className={isStatus ? 'mt-[40px]' : 'mt-44'}>
            <div className={isStatus ? 'hidden' : 'block'}>
              <ProfileHeader title={'Details'} />
            </div>
            {details.map((detail, index) => (
              <TransferDetails key={index} detail={detail} />
            ))}
          </div>

          {/* Button */}
          <div className="flex absolute bottom-0 right-7 gap-x-5">
            <button
              className={`${isSuccess ? 'flex' : 'hidden'} size-[57px] justify-center items-center bg-primary bg-opacity-15 rounded-xl`}
            >
              <img src={share} alt="Share icon" />
            </button>
            <button
              className={`${isSuccess ? 'flex' : 'hidden'} absolute xl:static top-[-70px] right-0 w-[320px] sm:w-[415px] xl:w-[243px] h-[57px] justify-center items-center bg-primary bg-opacity-15 rounded-xl`}
            >
              <img src={download} alt="Download icon" />
              <div className="text-base text-primary font-bold ml-[15px]">
                Download PDF
              </div>
            </button>
            <button
              className={`${isStatus ? 'hidden' : 'block'} w-[150px] sm:w-[200px] xl:w-[170px] h-[57px] text-[#88888F] bg-[#DADADA] font-bold rounded-xl tracking-wider mb-[40px]`}
              onClick={() => navigate('/transfers/send')}
            >
              Back
            </button>
            <button
              className={` ${isSuccess ? 'w-[245px] sm:w-[340px]' : 'w-[150px] sm:w-[195px]'} xl:w-[170px] h-[57px] bg-primary text-white font-bold rounded-xl tracking-wide mb-[40px]`}
              onClick={(e) => {
                if (e.currentTarget.innerText === 'Back to Transfer') {
                  navigate('/transfers');
                } else if (e.currentTarget.innerText === 'Try Again') {
                  navigate('/transfers/send');
                } else {
                  setIsModalOpen(!isModalOpen);
                  setPin(new Array(6).fill(''));
                }
              }}
            >
              {isSuccess
                ? 'Back to Transfer'
                : isStatus
                  ? 'Try Again'
                  : 'Continue'}
            </button>
          </div>
        </main>

        {/* ModalPin */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(!isModalOpen)}
        >
          <div className="font-bold">Enter PIN to Transfer</div>
          <div className="text-dark text-opacity-60 w-[302px] mt-5">
            Enter your 6 digits PIN for confirmation to continue transferring
            money.
          </div>
          <InputPin pin={pin} setPin={setPin} />
          <button
            className="absolute right-[35px] w-[170px] h-[57px] bg-primary text-white font-bold rounded-xl tracking-wider"
            onClick={() => handleSubmit()}
          >
            Continue
          </button>
        </Modal>
      </section>
      <Footer />
    </>
  );
}

export default Confirmation;
