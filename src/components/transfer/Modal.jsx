import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="relative bg-white rounded-[20px] shadow-xl w-[503px] h-[417px] p-[35px] z-51">
        <button className="absolute top-[27px] right-[42px]" onClick={onClose}>
          <div className="text-[28px]">&times;</div>
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
