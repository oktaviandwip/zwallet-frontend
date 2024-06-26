import React from 'react';

const TransferDetail = ({ detail }) => {
  let formattedValue;

  if (detail.name === 'Balance Left') {
    formattedValue = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(detail.detail);
  }

  return (
    <div className="w-full shadow rounded-[10px] p-[15px] mb-5">
      <div className="text-[#7A7886] mb-[10px]">{detail.name}</div>
      <div className="text-[22px] font-bold text-[#514F5B]">
        {detail.name === 'Balance Left' ? formattedValue : detail.detail}
      </div>
    </div>
  );
};

export default TransferDetail;
