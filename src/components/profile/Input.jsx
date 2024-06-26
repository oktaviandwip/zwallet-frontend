import React from 'react';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { useEffect } from 'react';

export default function Input({
  type,
  name,
  id,
  value,
  placeholder,
  icon,
  icon2,
  icon3,
  onChange,
  isError,
}) {
  const [focus, setFocus] = useState(false);
  const [error, setError] = useState(isError);
  const [showPw, setShowPw] = useState(false);

  const showPwHandler = (e) => {
    setShowPw(!showPw);
  };

  useEffect(() => {
    setError(isError);
  }, [isError]);

  return (
    <div
      className={`relative border-b-[1.5px] ${
        focus ? 'border-primary' : 'border-[#A9A9A999]'
      } ${error ? 'border-error' : ''}`}
    >
      <Icon
        icon={icon}
        className={`absolute text-2xl top-3 ${
          focus ? 'text-primary' : 'text-[#A9A9A999]'
        } ${error ? 'text-error' : ''}`}
      />
      <Icon
        icon={showPw ? icon3 : icon2}
        onClick={showPwHandler}
        className={`absolute text-2xl right-0 top-3 ${
          focus ? 'text-primary' : 'text-[#A9A9A999]'
        } ${error ? 'text-error' : ''}`}
      />
      <input
        type={showPw ? 'text' : type}
        name={name}
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onFocus={() => {
          setFocus(true);
          setError(false);
        }}
        onBlur={() => setFocus(false)}
        required
        className="pl-10 py-3 w-full text-dark font-medium placeholder:text-[#A9A9A9CC] placeholder:font-normal focus:outline-none bg-transparent"
      />
    </div>
  );
}
