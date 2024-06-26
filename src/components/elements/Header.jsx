import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileHeader from './HeaderProfile';

const Header = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [focus, setFocus] = useState(false);

  // Window Screen
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setFocus(false);
      }
      setMenuOpen(false);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 h-[140px] flex justify-center items-center bg-white font-nunito rounded-b-3xl drop-shadow-md">
        <div className="max-w-[1188px] w-screen flex justify-between px-6">
          <p
            className="text-primary text-[29px] font-bold cursor-pointer"
            onClick={() => navigate('/home')}
          >
            Zwallet
          </p>

          {/* Hamburger Menu Button */}
          <div className="sm:hidden flex items-center">
            <button
              className="text-dark text-[29px] font-bold"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              ☰
            </button>
          </div>

          <div className="hidden sm:flex items-center cursor-pointer">
            <ProfileHeader
              menuOpen={menuOpen}
              focus={focus}
              setFocus={setFocus}
            />
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={`sm:hidden fixed top-0 bottom-0 right-0 w-[230px] ${
          menuOpen ? 'translate-x-0' : 'translate-x-64'
        } flex-col bg-white rounded-l-xl px-6 z-50 shadow-md transition-transform duration-300`}
      >
        <button
          className="absolute top-3 right-6 text-dark text-[29px] font-bold"
          onClick={() => {
            setFocus(false);
            setMenuOpen(false);
          }}
        >
          X
        </button>
        <div className="flex items-center cursor-pointer">
          <ProfileHeader
            menuOpen={menuOpen}
            focus={focus}
            setFocus={setFocus}
          />
        </div>
      </aside>
    </>
  );
};

export default Header;
