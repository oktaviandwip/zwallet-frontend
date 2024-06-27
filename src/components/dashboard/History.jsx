import { useSelector } from 'react-redux';
import photoProfile from '../../assets/photo-profile.png';

const History = ({ data, formatCurrency }) => {
  const { profile } = useSelector((s) => s.user);
  return (
    <div className="w-full h-[96px] flex justify-between items-center">
      <div className="flex">
        <div
          className="size-[56px] rounded-[10px] bg-cover bg-center bg-no-repeat mx-auto cursor-pointer"
          style={{
            backgroundImage: `url(${data.receiver_id === profile.id ? data.sender_photo || photoProfile : data.receiver_photo || photoProfile})`,
          }}
        ></div>
        <div className="flex flex-col justify-between w-[112px] ml-[15px] my-[3px]">
          <div className="font-bold leading-[22px] truncate">
            {data.receiver_id === profile.id
              ? data.sender_name
              : data.receiver_name}
          </div>
          <div className="text-sm leading-[19px] text-[#7A7886] truncate">
            {data.notes}
          </div>
        </div>
      </div>
      <div
        className={`${
          data.receiver_id === profile.id ? 'text-[#1EC15F]' : 'text-[#FF5B37]'
        } font-bold leading-[22px]`}
      >
        {data.receiver_id === profile.id ? '+' : '-'}
        {formatCurrency(data.amount)}
      </div>
    </div>
  );
};

export default History;
