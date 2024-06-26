import React from 'react';
import { useNavigate } from 'react-router-dom';

function Success({ emailStatus, pinStatus }) {
  const navigate = useNavigate();
  return (
    <section
      className={`${emailStatus && pinStatus ? 'absolute' : 'hidden'} inset-0 mx-auto top-[120px] w-[375px] md:static md:w-1/2 md:min-h-screen flex-col rounded-[20px] md:rounded-none gap-y-7 px-5 md:px-12 md:py-20 bg-white overflow-hidden`}
    >
      <div className="md:w-[65%] flex flex-col text-center md:text-left gap-y-7 py-8 md:py-0">
        <span className="w-fit self-center md:self-start text-white text-2xl font-bold bg-[#1EC15F] px-6 py-4 rounded-full rotate-12">
          &#10003;
        </span>
        <h2 className="hidden md:block text-[#3A3D42] font-bold text-2xl mt-3">
          Your PIN Was Successfully Created
        </h2>
        <h2 className="md:hidden text-[#3A3D42] font-bold text-2xl mt-3">
          PIN Successfully Created
        </h2>
        <p className="text-[#3A3D4299] font-normal text-base">
          Your PIN was successfully created and you can now access all the
          features in Zwallet. Login to your new account and start exploring!
        </p>
        <button
          className="bg-[#88888f3f] hover:bg-primary hover:text-white text-[#88888F] text-center font-bold text-[18px] rounded-[12px] p-3 mt-10"
          onClick={() => navigate('/login')}
        >
          Login Now
        </button>
      </div>
    </section>
  );
}

export default Success;
