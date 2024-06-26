import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useApi from '../../utils/useApi';
import IncompleteProfile from '../../components/elements/IncompleteProfile';
import Header from '../../components/elements/Header';
import Sidebar from '../../components/elements/Sidebar';
import Footer from '../../components/elements/Footer';
import ProfileHeader from '../../components/profile/ProfileHeader';
import { Icon } from '@iconify/react';
import ReceiverList from '../../components/transfer/ReceiverList';

function Transfer() {
  const api = useApi();
  const navigate = useNavigate();
  const { profile } = useSelector((s) => s.user);

  const [search, setSearch] = useState('');
  const [isSearch, setIsSearch] = useState(false);
  const [receivers, setReceivers] = useState([]);

  // Search
  const handleInputSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setIsSearch(true);
    api({
      method: 'GET',
      url: `/user/search/?name=${search}`,
    })
      .then(({ data }) => {
        console.log(data.data);
        setReceivers(data.data);
      })
      .catch(({ response }) => {
        console.log(response.data);
        alert(`ERROR: ${response.data.error}`);
      });
  };

  // Get All Receivers
  useEffect(() => {
    const getReceivers = () => {
      api({
        method: 'GET',
        url: `/user/?id=${profile.id}`,
      })
        .then(({ data }) => {
          setReceivers(data.data);
        })
        .catch(({ response }) => {
          console.log(response.data);
          alert(`ERROR: ${response.data.error}`);
        });
    };

    getReceivers();
  }, []);

  // Handle Delete
  const handleDelete = (id, name) => {
    const confirm = window.confirm(`Are you sure you want delete ${name}?`);
    if (confirm) {
      api({
        method: 'DELETE',
        url: `/user/receiver/?id=${id}`,
      })
        .then(({ data }) => {
          console.log(data.data);
          window.location.reload();
        })
        .catch(({ response }) => {
          console.log(response.data);
          alert(`ERROR: ${response.data.error}`);
        });
    }
  };

  if (!profile.name || !profile.phone_number) {
    return <IncompleteProfile />;
  }

  return (
    <>
      <Header profile={profile} />
      <section className="flex justify-between md:w-[760px] xl:w-[1140px] mx-auto mb-10">
        <Sidebar />
        <main className="bg-white w-[375px] sm:w-[470px] xl:w-[850px] rounded-3xl shadow-lg px-7 pt-12 pb-16 mx-auto">
          <div className="flex justify-between items-center font-bold mb-6">
            <ProfileHeader title={'Search Receiver'} />
            <button
              className="flex items-center w-[800px] sm:w-[350px] xl:w-[180px] h-14 bg-primary text-white text-lg rounded-lg tracking-wide p-4"
              onClick={() => navigate('/transfers/add-receiver')}
            >
              <Icon icon={'feather:plus'} className="size-6 mr-2" />
              <div>Add Receiver</div>
            </button>
          </div>

          {/* Search */}
          <form
            className="relative w-full h-[54px] mb-[20px]"
            onSubmit={handleSearch}
          >
            <Icon
              icon="mage:search"
              className="absolute size-[22px] text-gray top-[15px] left-[18px]"
              onClick={handleSearch}
            />
            <input
              type="search"
              placeholder="Search receiver here"
              className="size-full bg-dark bg-opacity-10 px-[54px] rounded-[10px] outline-primary tracking-wide"
              onChange={handleInputSearch}
            />
          </form>

          {/* Receiver List */}
          <div
            className={`${receivers.length === 0 ? 'block' : 'hidden'} w-[850px] text-3xl text-center font-bold hover:text-primary mt-[20%] cursor-pointer underline italic`}
            onClick={() => navigate(isSearch ? '' : '/transfers/add-receiver')}
          >
            {isSearch ? 'Receivers not found!' : 'Add Your Receivers'}
          </div>
          <div className="flex flex-col gap-y-4">
            <ReceiverList receivers={receivers} handleDelete={handleDelete} />
          </div>
        </main>
      </section>
      <Footer />
    </>
  );
}

export default Transfer;
