import React from 'react';

export default function Card({
  title,
  name,
  placeholder,
  content,
  handleChange,
}) {
  return (
    <div className="flex-col justify-between items-center relative shadow-md rounded-lg p-4">
      <div className="mb-2">{title}</div>
      <input
        className="w-full font-bold text-[22px] outline-none"
        placeholder={placeholder}
        name={name}
        type="text"
        value={content}
        onChange={handleChange}
        required
      />
    </div>
  );
}
