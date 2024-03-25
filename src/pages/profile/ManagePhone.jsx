import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";

import Header from "../../component/Header";
import Sidebar from "../../component/Sidebar";
import MainHeader from "../../component/ProfileHead";

function Manage() {
  const [user, setUser] = useState(true);
  return (
    <div className="">
      <Header />
      <section className=" bg-primary bg-opacity-20 p-12 flex gap-8">
        <Sidebar />
        <main className="bg-white w-full rounded-3xl shadow-lg px-7 pt-7 pb-12">
          <MainHeader
            title={"Manage Phone"}
            content={
              "You can only delete the phone number and then you must add another phone number."
            }
          />
          <section className="mt-10 shadow-md rounded-lg p-4 flex justify-between items-center">
            <div className=" space-y-2 ">
              <h3 className="text-[#7A7886] ">Primary</h3>
              <p className="text-[#514F5B] font-semibold text-xl">
                08638279167
              </p>
            </div>
            <Icon icon={"iconamoon:trash-simple-thin"} className={"text-lg"} />
          </section>
        </main>
      </section>
    </div>
  );
}

export default Manage;
