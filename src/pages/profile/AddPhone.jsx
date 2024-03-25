import React, { useState, useEffect } from "react";

import MainHeader from "../../component/ProfileHead";
import Card from "../../component/CardProfile";

// import { useSelector } from "react-redux";
import Header from "../../component/Header";
import Sidebar from "../../component/Sidebar";
import Input from "../../component/Input";
import Button from "../../component/Button";

export default function ChangePass() {
  const [user, setUser] = useState(true);
  const [form, setForm] = useState({});

  //   const user = useSelector((state) => state.user.data);

  const handleOnChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  console.log(form);
  return (
    <div className="">
      <Header />
      <section className=" bg-primary bg-opacity-20 p-12 flex gap-8">
        <Sidebar />

        <main className="w-full bg-white rounded-3xl shadow-lg px-7 pt-7 pb-36">
          <MainHeader
            title={"Add Phone Number"}
            content={
              "Add at least one phone number for the transfer ID so you can start transfering your money to another user."
            }
          />

          <form
            action=""
            className="w-full sm:w-[431px] mx-auto text-center space-y-5 mt-24"
            // onSubmit={handleSubmit}
          >
            <Input
              id={"noTelp"}
              type={"text"}
              name={"phone_number"}
              placeholder={"Enter your phone number"}
              icon={"akar-icons:phone"}
              onChange={handleOnChange}
            />

            <Button
              content={"Add Phone Number"}
              disable={Object.keys(form).length < 1 ? true : false}
            />
          </form>
        </main>
      </section>
    </div>
  );
}
