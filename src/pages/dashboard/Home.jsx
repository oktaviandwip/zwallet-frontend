import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/elements/Footer.jsx';
import Header from '../../components/elements/Header';
import History from '../../components/dashboard/History';
import Sidebar from '../../components/elements/Sidebar.jsx';
import IncompleteProfile from '../../components/elements/IncompleteProfile.jsx';
import BalanceChart from '../../components/dashboard/BalanceChart.jsx';

import backArrow from '../../assets/back-arrow-transaction.svg';
import expenseIcon from '../../assets/expense-icon.svg';
import incomeIcon from '../../assets/income-icon.svg';
import topUpIconPurple from '../../assets/top-up-icon-purple.svg';
import topUpIcon from '../../assets/top-up-icon.svg';
import transferIconPurple from '../../assets/transfer-icon-purple.svg';
import transferIcon from '../../assets/transfer-icon.svg';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import useApi from '../../utils/useApi.js';

function Home() {
  const api = useApi();
  const navigate = useNavigate();
  const { profile } = useSelector((s) => s.user);

  const [balances, setBalances] = useState([]);
  const [history, setHistory] = useState([]);
  const [clickedBarIndex, setClickedBarIndex] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [detailTrans, setDetailTrans] = useState(false);

  // Window Screen
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth > 900) {
        setDetailTrans(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Get Balance
  useEffect(() => {
    api({
      method: 'GET',
      url: `/transaction/balance`,
    })
      .then(({ data }) => {
        setBalances(data.data);
      })
      .catch(({ response }) => {
        console.log(response.data);
        alert(`ERROR: ${response.data.error}`);
      });
  }, []);

  // Get History
  useEffect(() => {
    api({
      method: 'GET',
      url: `/transaction/history/latest`,
    })
      .then(({ data }) => {
        setHistory(data.data);
      })
      .catch(({ response }) => {
        console.log(response.data);
        alert(`ERROR: ${response.data.error}`);
      });
  }, []);

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
    <div className="bg-[#fafcff]" onClick={() => setClickedBarIndex(null)}>
      <Header />
      <main className="flex justify-center mb-10">
        <Sidebar />
        <section>
          <div className="w-[343px] min-[900px]:w-[700px] min-[1150px]:w-[850px] ml-4 lg:ml-5">
            <div
              className={`${detailTrans ? 'flex' : 'hidden'} mb-[52px]`}
              onClick={() => setDetailTrans(!detailTrans)}
            >
              <img src={backArrow} alt="back arrow" />
              <div className="text-xl leading-[30px] font-bold text-[#4D4B57] ml-5">
                Transaction
              </div>
            </div>

            {/* Top Section */}
            <div
              className="w-full h-[141px] min-[900px]:h-[190px] bg-primary rounded-[20px] p-[25px] min-[900px]:p-[30px] mb-[5px]"
              onClick={
                windowWidth >= 900 ? null : () => setDetailTrans(!detailTrans)
              }
            >
              <div
                className={`${
                  detailTrans && windowWidth < 900 ? 'hidden' : 'flex'
                } flex-col min-[900px]:flex-row justify-between`}
              >
                <div>
                  <div className="text-sm min-[900px]:text-lg text-[#DFDCDC] leading-[19px] min-[900px]:leading-[31px]">
                    Balance
                  </div>
                  <div className="text-2xl min-[900px]:text-[40px] text-white leading-[33px] min-[900px]:leading-[55px] font-bold mt-[10px] mb-[15px]">
                    {formatCurrency(profile.balance) ||
                      (balances[6] && formatCurrency(balances[6].balance))}
                  </div>
                  <div className="text-sm text-[#DFDCDC] leading-[19px] font-semibold">
                    {profile.phone_number || '+62'}
                  </div>
                </div>

                {/* Button */}
                <div className="w-[343px] min-[900px]:w-[162px] flex flex-row justify-between min-[900px]:flex-col min-[900px]:block mt-[55px] min-[900px]:mt-0 ml-[-25px]">
                  <button
                    className={`flex justify-center items-center w-[162px] h-[57px] ${
                      windowWidth >= 900
                        ? 'bg-white bg-opacity-[20%] text-white'
                        : 'bg-[#EAEDFF] text-[#514F5B]'
                    } rounded-[10px] border-[1px] border-white border-solid mb-4`}
                    onClick={() => navigate('/transfers')}
                  >
                    <img
                      src={
                        windowWidth >= 900 ? transferIcon : transferIconPurple
                      }
                      alt="transfer icon"
                    />
                    <div className="font-bold text-lg ml-[10px]">Transfer</div>
                  </button>
                  <button
                    className={`flex justify-center items-center w-[162px] h-[57px] ${
                      windowWidth >= 900
                        ? 'bg-white bg-opacity-[20%] text-white'
                        : 'bg-[#EAEDFF] text-[#514F5B]'
                    } rounded-[10px] border-[1px] border-white border-solid mb-4`}
                    onClick={() => navigate('/topup')}
                  >
                    <img
                      src={windowWidth >= 900 ? topUpIcon : topUpIconPurple}
                      alt="top up icon"
                    />
                    <div className="font-bold text-lg ml-[10px]">Top Up</div>
                  </button>
                </div>
              </div>
            </div>

            <div
              className={`relative flex flex-col min-[900px]:flex-row justify-between min-[900px]:mt-5 ${
                detailTrans ? '' : 'mt-[127px]'
              }`}
            >
              <div
                className={`${detailTrans ? 'flex' : 'hidden'} min-[900px]:flex`}
              >
                {/* Income/Expense */}
                <div
                  className={`w-[463px] min-[900px]:w-[320px] min-[1150px]:w-[463px] rounded-[20px] py-10 ${
                    detailTrans ? 'bg-transparent' : 'bg-white shadow-lg'
                  }`}
                >
                  <div
                    className={`${
                      detailTrans
                        ? 'absolute top-[-150px] w-[343px] text-white'
                        : 'flex text-[#6A6A6A]'
                    } flex justify-between text-sm min-[1150px]:text-lg font-bold p-[30px]`}
                  >
                    <div>
                      <img src={incomeIcon} alt="income icon" />
                      <div className="text-sm font-normal my-[8px]">Income</div>
                      <div>
                        {balances[6] && formatCurrency(balances[6].income)}
                      </div>
                    </div>
                    <div className="mr-[10px]">
                      <img src={expenseIcon} alt="expense icon" />
                      <div className="text-sm font-normal my-[8px]">
                        Expense
                      </div>
                      <div>
                        {balances[6] && formatCurrency(balances[6].expense)}
                      </div>
                    </div>
                  </div>

                  {/* Balance Chart */}
                  <div className="h-[268px] mx-auto">
                    <div className="min-[900px]:hidden w-full font-bold text-lg">
                      In This Week
                    </div>
                    <BalanceChart
                      balances={balances}
                      formatCurrency={formatCurrency}
                      clickedBarIndex={clickedBarIndex}
                      setClickedBarIndex={setClickedBarIndex}
                    />
                  </div>
                </div>
              </div>

              {/* Transaction History */}
              <div
                className={`min-[900px]:w-[367px] rounded-[20px] shadow-lg bg-white px-4 py-[30px] min-[900px]:p-[30px]`}
              >
                <div className="w-full flex justify-between items-center mb-[20px]">
                  <div className="font-bold text-lg leading-[25px]">
                    Transaction History
                  </div>
                  <Link
                    to="/history"
                    className="font-bold text-sm text-[#6379F4] hover:text-[#6379F4]"
                    style={{ textDecoration: 'none' }}
                  >
                    See all
                  </Link>
                </div>
                {history &&
                  history.map((d, i) => (
                    <History key={i} data={d} formatCurrency={formatCurrency} />
                  ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Home;
