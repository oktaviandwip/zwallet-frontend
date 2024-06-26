import React from 'react';
import { useSelector } from 'react-redux';
import IncompleteProfile from '../../components/elements/IncompleteProfile';
import Header from '../../components/elements/Header';
import Sidebar from '../../components/elements/Sidebar';
import Footer from '../../components/elements/Footer';
import Card from '../../components/topup/CardTopup';
import ProfileHeader from '../../components/profile/ProfileHeader';

function Topup() {
  const { profile } = useSelector((s) => s.user);

  if (!profile.username || !profile.phone_number) {
    return <IncompleteProfile />;
  }

  return (
    <div>
      <Header profile={profile} />
      <section className="flex justify-between md:w-[760px] xl:w-[1140px] mx-auto mb-10">
        <Sidebar />
        <main className="bg-white w-[375px] sm:w-[470px] xl:w-[850px] rounded-3xl shadow-lg px-7 pt-7 pb-12 mx-auto">
          <ProfileHeader title={'How to Top-Up'} />

          <div className="mt-5 grid gap-y-5">
            <Card
              step="1"
              content="Go to the nearest ATM or you can use E-Banking."
            />
            <Card
              step="2"
              content="Type your security number on the ATM or E-Banking."
            />
            <Card step="3" content="Select “Transfer” in the menu" />
            <Card
              step="4"
              content="Type the virtual account number that we provide you at the top."
            />
            <Card
              step="5"
              content="Type the amount of the money you want to top up."
            />
            <Card step="6" content="Read the summary details" />
            <Card step="7" content="Press transfer / top up" />
            <Card
              step="8"
              content="You can see your money in Zwallet within 3 hours."
            />
          </div>
        </main>
      </section>
      <Footer />
    </div>
  );
}

export default Topup;
