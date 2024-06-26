import React from 'react';
import success from '../../assets/success.png';
import failed from '../../assets/failed.png';

const Status = ({ isStatus, isSuccess }) => {
  return (
    <div
      className={`${isStatus ? 'block' : 'hidden'} flex flex-col justify-center items-center`}
    >
      <img
        src={isSuccess ? success : failed}
        alt="Status icon"
        className="my-[30px]"
      />
      <div className="text-dark text-[22px] font-bold">
        Transfer {isSuccess ? 'Success' : 'Failed'}
      </div>
      <div
        className={`${isSuccess ? 'hidden' : 'block'} w-[350px] xl:w-[591px] text-[#7A7886] text-center leading-7 mt-5`}
      >
        We can’t transfer your money at the moment, we recommend you to check
        your internet connection and try again.
      </div>
    </div>
  );
};

export default Status;
