import React from 'react';
import { useNavigate } from 'react-router-dom';
import useApi from '../../utils/useApi.js';
import Input from '../../components/profile/Input';

function Email({
  handleChange,
  formData,
  setEmailStatus,
  emailStatus,
  pinStatus,
}) {
  const api = useApi();
  const navigate = useNavigate();

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    {
      api({
        method: 'POST',
        url: '/user/email',
        data: formData,
      })
        .then((_) => {
          setEmailStatus(!emailStatus);
        })
        .catch(({ response }) => {
          console.log(response.data);
          alert(`ERROR: ${response.data.error}`);
        });
    }
  };

  // Input Fields
  const inputs = [
    {
      icon: 'mage:user',
      type: 'text',
      name: 'username',
      placeholder: 'Enter your username',
    },
    {
      icon: 'mage:email',
      type: 'email',
      name: 'email',
      placeholder: 'Enter your e-mail',
      autoComplete: 'email',
    },
    {
      icon: 'codicon:lock',
      type: 'password',
      name: 'password',
      placeholder: 'Enter your password',
    },
  ];

  return (
    <section
      className={`${!emailStatus && !pinStatus ? 'absolute inset-0 mx-auto' : 'hidden'} top-[120px] w-[375px] md:static md:w-1/2 h-[625px] flex flex-col rounded-[20px] md:rounded-none gap-y-7 px-5 md:px-12 py-12 bg-white`}
    >
      <h2 className="md:hidden self-center text-2xl font-bold text-[#3A3D42]">
        Sign Up
      </h2>
      <h2 className="hidden md:flex w-[60%] text-2xl font-bold text-[#3A3D42] leading-normal">
        Start Accessing Banking Needs With All Devices and All Platforms With
        30.000+ Users
      </h2>
      <p className="hidden md:flex w-[60%] text-[#3A3D4299] text-base leading-loose">
        Transfering money is eassier than ever, you can access Zwallet wherever
        you are. Desktop, laptop, mobile phone? we cover all of that for you!
      </p>
      <p className="md:hidden w-[100%] text-center text-[#3A3D4299] text-base leading-loose">
        Create your account to access Zwallet.
      </p>
      <form className="flex flex-col w-[325px] lg:w-[433px] gap-y-[50px]">
        {inputs.map((field, index) => (
          <Input
            key={index}
            name={field.name}
            type={field.type}
            placeholder={field.placeholder}
            icon={field.icon}
            icon2={index === 2 ? 'mage:eye-off' : ''}
            icon3={index === 2 ? 'mage:eye' : ''}
            onChange={handleChange}
          />
        ))}
        <button
          className="bg-primary text-white disabled:text-[#88888F] disabled:bg-[#88888f3f] rounded-[8px] font-bold p-4"
          onClick={handleSubmit}
          disabled={!formData.username || !formData.email || !formData.password}
        >
          Sign Up
        </button>
        <div className="flex justify-center mt-[-20px]">
          <p>
            Already have an account? Let’s{' '}
            <span
              className="text-primary cursor-pointer font-bold"
              onClick={() => navigate('/login')}
            >
              Login
            </span>
          </p>
        </div>
      </form>
    </section>
  );
}

export default Email;
