import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { login } from '../../store/reducer/auth';
import { getProfile } from '../../store/reducer/user.js';

import Input from '../../components/profile/Input';
import imageGroup from '../../assets/double-phone.png';
import background from '../../assets/background.png';
import useApi from '../../utils/useApi';

function Login() {
  const api = useApi();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuth } = useSelector((s) => s.auth);
  const [formData, setFormData] = useState({});

  // Check Login
  useEffect(() => {
    if (isAuth) {
      navigate('/home');
    }
  }, [isAuth]);

  // Handle Change
  const handleChange = (e) => {
    const data = { ...formData, [e.target.name]: e.target.value };
    setFormData(data);
  };

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    {
      api({
        method: 'POST',
        url: '/auth',
        data: formData,
      })
        .then(({ data }) => {
          dispatch(getProfile(data.profile));
          dispatch(login(data.token));
          alert('Login succesful!');
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
    <main className="flex flex-row w-screen font-nunito mt-[-180px]">
      <section
        className="w-full md:w-1/2 h-[750px] md:h-[900px] lg:h-[800px] xl:h-[700px] px-20 py-12 bg-primary/[0.2] bg-cover bg-no-repeat"
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
        <p className="hidden md:inline-block w-[85%] text-[#FFFFFFCC] text-base">
          Zwallet is an application that focussing in banking needs for all
          users in the world. Always updated and always following world trends.
          5000+ users registered in Zwallet everyday with worldwide users
          coverage.
        </p>
      </section>
      <section className="absolute inset-0 mx-auto top-[120px] md:static w-[375px] h-[600px] md:w-1/2 flex flex-col rounded-[20px] md:rounded-none gap-y-7 px-5 md:px-12 py-12 bg-white">
        <h2 className="md:hidden self-center text-2xl font-bold text-[#3A3D42]">
          Login
        </h2>
        <h2 className="hidden md:flex w-[60%] text-2xl font-bold text-[#3A3D42] leading-normal">
          Start Accessing Banking Needs With All Devices and All Platforms With
          30.000+ Users
        </h2>
        <p className="hidden md:flex w-[60%] text-[#3A3D4299] text-base leading-loose">
          Transfering money is eassier than ever, you can access Zwallet
          wherever you are. Desktop, laptop, mobile phone? we cover all of that
          for you!
        </p>
        <p className="md:hidden w-[100%] text-center text-[#3A3D4299] text-base leading-loose">
          Login to your existing account to access all the features in Zwallet.
        </p>
        <form className="flex flex-col w-[325px] lg:w-[433px] gap-y-[50px]">
          {inputs.map((field, index) => (
            <Input
              key={index}
              name={field.name}
              type={field.type}
              placeholder={field.placeholder}
              icon={field.icon}
              icon2={field.name === 'password' ? 'mage:eye-off' : ''}
              icon3={field.name === 'password' ? 'mage:eye' : ''}
              onChange={handleChange}
            />
          ))}
          <button
            className="bg-primary text-white disabled:text-[#88888F] disabled:bg-[#88888f3f] rounded-[8px] font-bold p-4"
            onClick={handleSubmit}
            disabled={!formData.email || !formData.password}
          >
            Login
          </button>
          <div className="flex justify-center mt-[-20px]">
            <p>
              Don’t have an account? Let’s{' '}
              <span
                className="text-primary font-bold cursor-pointer"
                onClick={() => navigate('/signup')}
              >
                Sign Up
              </span>
            </p>
          </div>
        </form>
      </section>
    </main>
  );
}

export default Login;
