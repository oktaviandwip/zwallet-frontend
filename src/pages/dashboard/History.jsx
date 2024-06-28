import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import Header from '../../components/elements/Header';
import Sidebar from '../../components/elements/Sidebar';
import Footer from '../../components/elements/Footer.jsx';
import IncompleteProfile from '../../components/elements/IncompleteProfile.jsx';
import History from '../../components/dashboard/History.jsx';
import Modal from '../../components/transfer/Modal.jsx';

import backArrow from '../../assets/back-arrow-transaction.svg';
import incomeIcon from '../../assets/income-icon.svg';
import expenseIcon from '../../assets/expense-icon.svg';
import arrowClicked from '../../assets/white-arrow.svg';
import arrowClickedUp from '../../assets/white-arrow-up.png';

import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';

import useApi from '../../utils/useApi.js';

const HistoryPage = () => {
  const api = useApi();
  const navigate = useNavigate();
  const { profile } = useSelector((s) => s.user);

  const [weekHist, setWeekHist] = useState([]);
  const [monthHist, setMonthHist] = useState([]);
  const [dateHist, setDateHist] = useState([]);
  const [buttonClicked, setButtonClicked] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filterDateRange, setFilterDateRange] = useState(false);

  // All Transaction History
  useEffect(() => {
    getHistory('all');
  }, []);

  // Income/Expense Transaction History
  const getHistory = (type) => {
    setButtonClicked(type);
    api({
      method: 'GET',
      url: `/transaction/history/${type}`,
    })
      .then(({ data }) => {
        if (type.includes('&')) {
          setDateHist(data.data);
        }
        setWeekHist(data.data[0].weekly);
        setMonthHist(data.data[0].monthly);
      })
      .catch(({ response }) => {
        console.log(response.data);
        alert(`ERROR: ${response.data.error}`);
      });
  };

  // Format Date Range
  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('id-ID', options);
  }

  // Currency Format
  const formatCurrency = (value) => {
    const formattedValue = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
    return formattedValue;
  };

  if (!profile.name || !profile.phone_number) {
    return <IncompleteProfile />;
  }

  return (
    <div className="bg-[#fafcff] font-nunito">
      <Header />
      <main className="flex justify-center mb-10">
        <Sidebar />
        <section>
          <button
            className="flex lg:hidden items-center ml-5"
            onClick={() => navigate('/home')}
          >
            <img src={backArrow} alt="back arrow" />
            <div className="text-lg leading-[30px] font-bold text-[#4D4B57] ml-5">
              History
            </div>
          </button>

          <div className="relative bg-white w-[343px] lg:w-[750px] min-[1150px]:w-[850px] min-h-screen ml-4 lg:ml-5 rounded-[20px] shadow-lg px-4 py-[30px] lg:p-[30px] mt-[18px] lg:mt-0">
            <div className="lg:flex hidden font-bold text-lg leading-[25px]">
              Transaction History
            </div>

            {/* History by Date Range */}
            <div className={filterDateRange ? 'flex-col' : 'hidden'}>
              <div className="text-[#7A7886] leading-[27px] my-[30px]">
                {formatDate(`${startDate}`) + ' - ' + formatDate(`${endDate}`)}
              </div>
              {dateHist &&
                dateHist.map((e, i) => (
                  <History key={i} data={e} formatCurrency={formatCurrency} />
                ))}
            </div>

            {/* Weekly & Monthly History */}
            <div className={filterDateRange ? 'hidden' : 'flex-col mb-[100px]'}>
              <div className="text-[#7A7886] leading-[27px] mt-[30px]">
                This Week
              </div>
              {weekHist &&
                weekHist.map((e, i) => (
                  <History key={i} data={e} formatCurrency={formatCurrency} />
                ))}
              <div className="text-[#7A7886] leading-[27px] mt-[30px]">
                This Month
              </div>
              {monthHist &&
                monthHist.map((e, i) => (
                  <History key={i} data={e} formatCurrency={formatCurrency} />
                ))}
            </div>

            {/* Expense/Income */}
            <div className="flex w-full justify-between mt-10">
              <div className="absolute left-7 bottom-10 flex">
                {['expense', 'income'].map((type) => (
                  <button
                    key={type}
                    className={`${
                      buttonClicked === type ? 'bg-primary' : 'bg-white'
                    } flex justify-center items-center size-[57px] rounded-[12px] shadow-md ${
                      type === 'expense' ? 'mr-1 lg:mr-4' : ''
                    }`}
                    onClick={() => {
                      getHistory(buttonClicked === type ? 'all' : type);
                      setButtonClicked(buttonClicked === type ? '' : type);
                      setFilterDateRange(false);
                    }}
                  >
                    <img
                      className="size-[30px]"
                      src={
                        buttonClicked === type && type === 'expense'
                          ? arrowClickedUp
                          : buttonClicked === type && type === 'income'
                            ? arrowClicked
                            : type === 'expense'
                              ? expenseIcon
                              : incomeIcon
                      }
                      alt={`${type} icon`}
                    />
                  </button>
                ))}
              </div>

              {/* Filter by Date */}
              <button
                className="absolute right-7 bottom-10 w-[189px] h-[57px] rounded-[12px] shadow-md text-lg text-[#6379F4] leading-[25px] font-bold"
                onClick={() => setIsModalOpen(!isModalOpen)}
              >
                Filter by Date
              </button>

              <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(!isModalOpen)}
              >
                <div className="flex flex-col items-center w-[242px] mx-auto">
                  <h2 className="text-lg font-bold mb-2">Select Date Range</h2>
                  <DatePicker
                    selected={startDate}
                    onChange={(dates) => {
                      const [start, end] = dates;
                      setStartDate(start);
                      setEndDate(end);
                    }}
                    startDate={startDate}
                    endDate={endDate}
                    selectsRange
                    inline
                  />
                  <button
                    className="mt-3 px-[98px] py-3 bg-primary text-white font-bold tracking-wider rounded-lg"
                    onClick={() => {
                      if (startDate && endDate) {
                        const formattedStartDate = format(
                          startDate,
                          'yyyy-MM-dd'
                        );
                        const formattedEndDate = format(endDate, 'yyyy-MM-dd');
                        getHistory(`${formattedStartDate}&${formattedEndDate}`);
                      }
                      setIsModalOpen(false);
                      setFilterDateRange(true);
                    }}
                  >
                    Apply
                  </button>
                </div>
              </Modal>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HistoryPage;
