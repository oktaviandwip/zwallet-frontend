import React from 'react';

export default function MainHeader({ title, content }) {
  return (
    <>
      <div className="text-dark text-[18px] font-bold">{title}</div>
      <div className="text-[#7A7886] mt-6 w-[325px] sm:w-[342px] leading-[28px]">
        {content}
      </div>
    </>
  );
}
