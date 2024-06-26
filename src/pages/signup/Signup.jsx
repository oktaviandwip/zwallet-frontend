import { useState } from 'react';
import Email from '../../components/signup/Email.jsx';
import Pin from '../../components/signup/Pin.jsx';
import Success from '../../components/signup/Success.jsx';
import background from '../../assets/background.png';
import imageGroup from '../../assets/double-phone.png';

function Signup() {
  const [formData, setFormData] = useState({});
  const [emailStatus, setEmailStatus] = useState(false);
  const [pinStatus, setPinStatus] = useState(false);

  // Handle Change
  const handleChange = (e) => {
    const data = { ...formData, [e.target.name]: e.target.value };
    setFormData(data);
  };

  return (
    <main className="flex flex-row w-screen font-nunito mt-[-180px]">
      <section
        className="w-full md:w-1/2 h-[800px] md:h-[1000px] lg:h-[900px] xl:h-[800px] px-20 py-12 bg-primary/[0.2] bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${background})` }}
      >
        <a
          className="flex justify-center md:self-start text-primary md:text-white text-[29px] font-bold"
          href="/"
        >
          Zwallet
        </a>
        <div className="hidden md:block md:pl-16">
          <img
            className="w-[100%] max-w-[385px]"
            src={imageGroup}
            alt="image hero"
          />
        </div>
        <h2 className="hidden md:inline-block text-2xl text-white font-bold mb-5">
          App that Covering Banking Needs.
        </h2>
        <p className="hidden md:inline-block w-[85%] text-[#FFFFFFCC]">
          Zwallet is an application that focussing in banking needs for all
          users in the world. Always updated and always following world trends.
          5000+ users registered in Zwallet everyday with worldwide users
          coverage.
        </p>
      </section>

      <Email
        handleChange={handleChange}
        formData={formData}
        setEmailStatus={setEmailStatus}
        emailStatus={emailStatus}
        pinStatus={pinStatus}
      />

      <Pin
        setEmailStatus={setEmailStatus}
        emailStatus={emailStatus}
        formData={formData}
        setPinStatus={setPinStatus}
        pinStatus={pinStatus}
      />
      <Success emailStatus={emailStatus} pinStatus={pinStatus} />
    </main>
  );
}

export default Signup;
