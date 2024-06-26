import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useDispatch } from 'react-redux';
import { getReceiver, getTransferDetails } from '../../store/reducer/transfer';
import { useNavigate } from 'react-router-dom';
import useApi from '../../utils/useApi.js';

const ReceiverList = ({ receivers, handleDelete }) => {
  const api = useApi();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  // Handle Receiver
  const handleReceiver = (receiver_id) => {
    const receiver = receivers.find((r) => r.receiver_id === receiver_id);
    dispatch(getTransferDetails({}));
    dispatch(getReceiver(receiver));
    navigate('/transfers/send');
  };

  return (
    <>
      {receivers &&
        receivers.map((r, i) => (
          <div
            key={r.receiver_id}
            className="flex items-center justify-between w-full h-[100px] bg-white rounded-[10px] shadow p-5"
            onMouseEnter={() => setIsHovered(i)}
            onMouseLeave={() => setIsHovered(-1)}
          >
            <div
              className="flex items-center w-full h-full"
              onClick={() => handleReceiver(r.receiver_id)}
            >
              <div
                className="flex size-[70px] rounded-[10px] bg-cover bg-center bg-no-repeat mr-5"
                style={{
                  backgroundImage: `url(${r.photo_profile})`,
                }}
              ></div>
              <div>
                <div className="text-lg font-bold mb-[10px] truncate">
                  {r.name}
                </div>
                <div className="text-[#7A7886] truncate">{r.phone_number}</div>
              </div>
            </div>
            {isHovered === i && (
              <Icon
                icon={'feather:trash'}
                className="size-[25px]"
                onClick={() => handleDelete(r.receiver_id, r.name)}
              />
            )}
          </div>
        ))}
    </>
  );
};

export default ReceiverList;
