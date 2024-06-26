import { useSelector } from 'react-redux';
import incomeIcon from '../../assets/income-icon.svg';
import expenseIcon from '../../assets/expense-icon.svg';

const History = ({ data, formatCurrency }) => {
  const { profile } = useSelector((s) => s.user);

  return (
    <div className="w-full rounded-xl shadow-md px-5 py-3 sm:p-5 mt-2">
      <div className="flex">
        <div
          className="size-[30px] rounded-[10px] bg-cover bg-center bg-no-repeat my-auto"
          style={{
            backgroundImage: `url(${data.receiver_id === profile.id ? incomeIcon : expenseIcon})`,
          }}
        ></div>
        <div className="flex flex-col justify-between ml-[15px]">
          <div className="text-sm leading-[19px] text-[#7A7886] truncate">
            {data.notes}
          </div>
          <div className="font-bold leading-[22px] mt-2">
            {formatCurrency(data.amount)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
