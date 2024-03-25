import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useNavigate, Link } from "react-router-dom";

import Header from "../../component/Header";
import Sidebar from "../../component/Sidebar";
import ListProfile from "../../component/ListProfile";

import defaultProfile from "../../assets/profile-default.png";

function Home() {
  const [user, setUser] = useState(true);
  return (
    <div className="">
      <Header />
      <section className=" bg-primary bg-opacity-20 p-12 flex gap-8">
        <Sidebar />
        <main className="container bg-white w-full rounded-3xl shadow-lg px-7 pt-12 pb-16">
          <div className="flex flex-col items-center  text-center ">
            <div className="rounded-lg mx-auto mb-3 overflow-hidden">
              <img src={defaultProfile} className="w-[80px] h-[80px]" />
            </div>

            <label
              htmlFor="image"
              className={`mx-auto ${user ? "mb-3" : "mb-4"}`}
            >
              <input
                type="file"
                name="image"
                id="image"
                className="hidden w-full h-full"
                // onChange={handleInputImage}
              />
              <div className="flex gap-x-2 items-center text-[#7A7886]">
                <Icon icon={"prime:pencil"} className={"text-lg"} />
                <p>Edit</p>
              </div>
            </label>

            <h3 className="text-[#4D4B57] font-semibold text-2xl mb-3">
              Roy Kiyoshi
            </h3>

            <Link to={"/profile/add-phone"} className="text-[#7A7886] mb-12">
              Add Phone
            </Link>

            <div className="flex flex-col p-2 items-center gap-y-4 w-full">
              <ListProfile content={"Personal Information"} />
              <ListProfile content={"Change Password"} />
              <ListProfile content={"Change PIN"} />
              <ListProfile content={"Logout"} />
            </div>
          </div>
        </main>
      </section>
    </div>
  );
}

export default Home;
