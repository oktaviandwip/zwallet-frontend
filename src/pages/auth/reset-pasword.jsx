import React from 'react';
import imageGroup from '../../assets/double-phone.png';
import iconEmail from '../../assets/mail.svg';
import iconLock from '../../assets/lock.svg';
import iconEyeCrossed from '../../assets/eye-crossed.png';
import iconEye from '../../assets/icon-eye.svg';

function ResetPassword() {
  return (
    <main className="flex flex-row w-screen overflow-y-hidden font-nunito">
      <section className="jumbotron w-full md:w-1/2 h-screen flex flex-col px-20 py-12 bg-primary/[0.2] md:bg-hero-side bg-cover bg-no-repeat overflow-y-hidden">
        <a
          className="self-center md:self-start text-primary md:text-white text-[29px] font-bold"
          href="/"
        >
          Zwallet
        </a>
        <div className="hidden md:block md:pl-16">
          <img
            className="w-[100%] max-w-[385px] h-auto "
            src={imageGroup}
            alt="image hero"
          />
        </div>
        <h2 className="hidden md:inline-block text-2xl text-white font-bold mb-5">
          App that Covering Banking Needs.
        </h2>
        <p className="hidden md:inline-block w-[85%] text-[#FFFFFFCC] text-base">
          Zwallet is an application that focussing in banking needs for all
          users in the world. Always updated and always following world trends.
          5000+ users registered in Zwallet everyday with worldwide users
          coverage.
        </p>
      </section>
      <section className="absolute top-[25%] md:static md:w-1/2 h-screen flex flex-col rounded-[20px] md:rounded-none gap-y-7 px-5 md:px-12 py-12 bg-white">
        <h2 className="md:hidden self-center text-2xl font-bold text-[#3A3D42]">
          Reset Password
        </h2>
        <h2 className="hidden md:flex w-[60%] text-2xl font-bold text-[#3A3D42] leading-normal">
          Did You Forgot Your Password? Don’t Worry, You Can Reset Your Password
          In a Minutes.
        </h2>

        <form className="md:w-[75%] flex flex-col gap-y-5" action="">
          <p className="hidden md:flex w-[100%] text-[#3A3D4299] text-base leading-loose">
            To reset your password, you must type your e-mail and we will send a
            link to your email and you will be directed to the reset password
            screens.
          </p>
          <p className="md:hidden w-[100%] text-center text-[#3A3D4299] text-base leading-loose">
            Enter your Zwallet e-mail so we can send you a password reset link.
          </p>
          <div className="flex flex-row border-b-[1.5px] border-[#A9A9A999] py-2 mt-5">
            <div className="w-[12%] md:w-[8%]">
              <img src={iconEmail} alt="" />
            </div>
            <input
              className="w-[100%] outline-none"
              type="mail"
              name="email"
              required
              placeholder="Enter your e-mail"
              autoComplete="email"
            />
          </div>
          <button
            className="bg-[#88888f3f] hover:bg-primary hover:text-white text-[#88888F] rounded-[8px] p-4 mt-10"
            type="submit"
          >
            Confirm
          </button>
        </form>
        <form className="md:w-[75%] flex flex-col gap-y-5" action="">
          <p className="hidden md:flex w-[100%] text-[#3A3D4299] text-base leading-loose">
            Now you can create a new password for your Zwallet account. Type
            your password twice so we can confirm your new passsword.
          </p>
          <p className="md:hidden w-[100%] text-center text-[#3A3D4299] text-base leading-loose">
            Create and confirm your new password so you can login to Zwallet.
          </p>
          <div className="flex flex-row border-b-[1.5px] border-[#A9A9A999] py-2 mt-5">
            <div className="w-[12%] md:w-[8%]">
              <img src={iconLock} alt="" />
            </div>
            <input
              className="w-[100%] outline-none"
              type="password"
              name="new-password"
              id=""
              placeholder="Create new password"
            />
            <button type="button">
              <img src={iconEyeCrossed} alt="" />
            </button>
          </div>
          <div className="flex flex-row border-b-[1.5px] border-[#A9A9A999] py-2 mt-5">
            <div className="w-[12%] md:w-[8%]">
              <img src={iconLock} alt="" />
            </div>
            <input
              className="w-[100%] outline-none"
              type="password"
              name="confirm-new-password"
              id=""
              placeholder="Create new password"
            />
            <button type="button">
              <img src={iconEyeCrossed} alt="" />
            </button>
          </div>
          <button
            className="bg-[#88888f3f] hover:bg-primary hover:text-white text-[#88888F] rounded-[8px] p-4 mt-10"
            type="submit"
          >
            Reset Password
          </button>
        </form>
      </section>
    </main>
  );
}

export default ResetPassword;
