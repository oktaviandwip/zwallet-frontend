import { useState, useEffect } from 'react';
import nextCarousel from '../../assets/next-carousel.svg';
import prevCarousel from '../../assets/prev-carousel.svg';

const Carousel = ({
  children: slides,
  autoSlide = false,
  autoSlideInterval = 3000,
}) => {
  const [curr, setCurr] = useState(0);

  const prev = () =>
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
  const next = () =>
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, []);

  return (
    <>
      <div className="overflow-hidden relative">
        <div
          className="w-[1500px] md:w-[2400px] xl:w-[3952px] flex transition-transform ease-out duration-500"
          style={{ transform: `translateX(-${curr * 25}%)` }}
        >
          {slides}
        </div>

        {/* Indicator */}
        <div className="absolute bottom-0 right-0 left-0">
          <div className="flex items-center justify-center gap-2">
            {slides.map((_, i) => (
              <div
                key={i}
                onClick={() => setCurr(i)}
                className={`
              transition-all size-3 bg-primary rounded-full
              ${curr === i ? 'p-2' : 'bg-opacity-50'}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Button Left and Right */}
      <div className="absolute inset-y-[50%] inset-x-[-5px] md:inset-x-[-90px] xl:inset-x-[-120px] flex items-center justify-between p-4">
        <button
          onClick={prev}
          className="size-[30px] md:size-[60px] rounded-[20px] shadow bg-white/80 text-gray-800 hover:bg-white flex justify-center items-center"
        >
          <img src={prevCarousel} alt="prev carousel" />
        </button>
        <button
          onClick={next}
          className="size-[30px] md:size-[60px] rounded-[20px] shadow bg-white/80 text-gray-800 hover:bg-white flex justify-center items-center"
        >
          <img src={nextCarousel} alt="next carousel" />
        </button>
      </div>
    </>
  );
};

export default Carousel;
