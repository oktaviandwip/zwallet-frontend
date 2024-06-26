import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/elements/Header';
import Sidebar from '../../components/elements/Sidebar';
import Footer from '../../components/elements/Footer';
import { getProfile } from '../../store/reducer/user';
import { getTransferDetails } from '../../store/reducer/transfer';
import ProfileHeader from '../../components/profile/ProfileHeader';
import Receiver from '../../components/transfer/Receiver.jsx';
import Input from '../../components/profile/Input.jsx';
import useApi from '../../utils/useApi';

function SendMoney() {
  const api = useApi();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { profile } = useSelector((s) => s.user);
  const { receiver } = useSelector((s) => s.transfer);
  const { transferDetails } = useSelector((s) => s.transfer);
  const [amountLimit, setAmountLimit] = useState(false);
  const [formData, setFormData] = useState({
    sender_id: profile.id,
    receiver_id: receiver.receiver_id,
    amount: transferDetails.amount || '',
    notes: transferDetails.notes || '',
  });

  // Get Sender Data
  useEffect(() => {
    api({
      method: 'GET',
      url: `/user/${profile.id}`,
    })
      .then(({ data }) => {
        dispatch(getProfile(data.data[0]));
      })
      .catch(({ response }) => {
        console.log(response.data);
        alert(`ERROR: ${response.data.error}`);
      });
  }, []);

  // Handle Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'amount') {
      const rawValue = value.replace(/[^\d]/g, ''); // Remove non-numeric characters
      if (isNaN(rawValue)) {
        return;
      }
      const numericValue = parseInt(rawValue);
      setAmountLimit(numericValue > profile.balance);

      const formattedValue = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(numericValue);

      setFormData({
        ...formData,
        amount: formattedValue,
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle Submit
  const handleSubmit = () => {
    dispatch(getTransferDetails(formData));
    navigate('/transfers/details');
  };

  return (
    <>
      <Header profile={profile} />
      <section className="flex justify-between md:w-[760px] xl:w-[1140px] mx-auto mb-10">
        <Sidebar />
        <main className="relative bg-white w-[375px] sm:w-[470px] xl:w-[850px] h-[737px] rounded-3xl shadow-lg px-7 pt-12 pb-16 mx-auto">
          <ProfileHeader title={'Transfer Money'} />
          <Receiver receiver={receiver} />

          {/* Transfer Input */}
          <div className="text-[#7A7886] mt-10 w-[336px] leading-[28px]">
            Type the amount you want to transfer and then press continue to the
            next steps.
          </div>
          <div className="flex flex-col items-center">
            <input
              name="amount"
              type="text"
              value={formData.amount === 'RpNaN' ? '' : formData.amount}
              placeholder="0.00"
              className="w-full h-[80px] text-[42px] text-primary text-center font-bold rounded-xl outline-primary mt-[50px]"
              style={{ caretColor: 'red' }}
              onChange={(e) => handleChange(e)}
            />
            <div className="w-full text-center text-black font-bold mt-[30px]">{`${new Intl.NumberFormat(
              'id-ID',
              {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }
            ).format(profile.balance)} Available`}</div>

            {/* Amount Limit */}
            <div
              className={`${amountLimit ? 'block mt-[5px]' : 'hidden'} text-red-500 font-semibold`}
            >
              Transfer amount exceed the available balance!
            </div>

            {/* Notes */}
            <div
              className={`w-[320px] sm:w-[415px] ${amountLimit ? 'mt-[34px]' : 'mt-[60px]'}`}
            >
              <Input
                name={'notes'}
                type={'text'}
                value={formData.notes}
                placeholder={'Add some notes'}
                icon={'prime:pencil'}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
          {/* Submit Button */}
          <button
            className="absolute bottom-0 right-7 w-[320px] sm:w-[415px] md:w-[170px] h-[57px] bg-primary text-white disabled:text-[#88888F] disabled:bg-[#DADADA] font-bold rounded-xl mb-[40px] mx-auto"
            disabled={!formData.amount || !formData.notes || amountLimit}
            onClick={handleSubmit}
          >
            Continue
          </button>
        </main>
      </section>
      <Footer />
    </>
  );
}

export default SendMoney;
