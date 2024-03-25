import React, { useState, useEffect } from "react";

import Header from "../../component/Header";
import Sidebar from "../../component/Sidebar";
import Card from "../../component/CardProfile";
import MainHeader from "../../component/ProfileHead";

import defaultProfile from "../../assets/profile-default.png";

function Home() {
  const [user, setUser] = useState(true);
  return (
    <div className="">
      <Header />
      <section className=" bg-primary bg-opacity-20 p-12 flex gap-8">
        <Sidebar />
        <main className="bg-white w-full rounded-3xl shadow-lg px-7 pt-7 pb-12">
          <MainHeader
            title={"Personal Information"}
            content={
              "We got your personal information from the sign up proccess. If you want to make changes on your information, contact our support."
            }
          />

          <div className="mt-10 grid gap-y-5">
            <Card title={"First Name"} content="{user.firstName}" />
            <Card title={"Last Name"} content="{user.lastName}" />
            <Card
              title={"Verified Email"}
              content="{user.email}"
              email={true}
            />
            <Card
              title={"Phone Number"}
              content={user.noTelp ? user.noTelp : "Phone Not Set"}
              phone={true}
            />
          </div>
        </main>
      </section>
    </div>
  );
}

export default Home;
