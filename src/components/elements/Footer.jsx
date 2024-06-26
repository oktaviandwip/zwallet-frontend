import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-primary text-[#EFEFEF] py-6 ">
      <section className="max-w-[1188px] w-[350px] sm:w-screen flex flex-col sm:flex-row justify-between items-start sm:items-center px-6 mx-auto">
        <div className="opacity-90 text-[16px]">
          <div>2020 FazzPay. All right reserved.</div>
        </div>
        <div className="flex flex-col sm:flex-row gap-x-10 items-center">
          <div>+62 5637 8882 9901</div>
          <div>contact@fazzpay.com</div>
        </div>
      </section>
    </footer>
  );
}
