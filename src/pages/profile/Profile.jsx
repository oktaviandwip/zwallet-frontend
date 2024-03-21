import React, { useState, useEffect } from "react";

import Header from "../../component/Header";
import Sidebar from "../../component/Sidebar";

function Home() {
  return (
    <div className="">
      <Header />
      <section className="container flex">
        <Sidebar />
        <main></main>
      </section>
    </div>
  );
}

export default Home;
