import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { FaArrowRight } from "react-icons/fa";
import Header1 from "../assets/Header/header1.jpg";
import Header2 from "../assets/Header/header2.webp";
import Header3 from "../assets/Header/header3.jpg";
import Header4 from "../assets/Header/header4.jpg";
import Header5 from "../assets/Header/header5.jpg";
import Header6 from "../assets/Header/header6.avif";
const slides = [
  {
    offer: "New Arrival",
    heading: "Upgrade Your Style",
    subheading: "with Premium Wear",
    description:
      "Explore the latest trends in fashion & lifestyle. Curated for you.",
    image: Header1,
  },
  {
    offer: "Limited Time Offer",
    heading: "Get Flat 50% Off",
    subheading: "on Accessories",
    description: "Grab stylish bags, sunglasses, and more while stocks last!",
    image: Header2,
  },
  {
    heading: "Latest Fashion Picks",
    subheading: "New Arrivals",
    offer: "Just Landed",
    description: "Check out the newest trends in town!",
    image: Header3,
  },
  {
    heading: "Style Up Today",
    subheading: "With Fresh Looks",
    offer: "Hot Styles",
    description: "Make every outfit count — shop now and Get Amazing Offers!",
    image: Header4,
  },
  {
    heading: "Step Into Comfort",
    subheading: "Feel the Difference",
    offer: "New Arrivals",
    description: "Discover footwear designed for your lifestyle",
    image: Header5,
  },
  {
    heading: "Essentials That Fit",
    subheading: "Your Everyday Life",
    offer: "New Drop",
    description: "Minimal looks, maximum comfort. Shop now.",
    image: Header6,
  },
];

const Hero2 = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);
  const slideDuration = 4000;

  useEffect(() => {
    const interval = setInterval(() => {
      if (sliderRef.current) {
        const nextSlide = (currentSlide + 1) % slides.length;
        sliderRef.current.slickGoTo(nextSlide);
        setCurrentSlide(nextSlide);
      }
    }, slideDuration);
    return () => clearInterval(interval);
  }, [currentSlide]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: false,
    afterChange: (index) => setCurrentSlide(index),
  };

  return (
    <div className="w-full overflow-hidden md:mt-16 bg-purple-50 pt-4 pb-2 sm:pb-4">
      <Slider ref={sliderRef} {...settings}>
        {slides.map((slide, index) => (
          <div key={index}>
            <div
              key={currentSlide === index ? "active" : "inactive"}
              className="flex flex-col-reverse md:flex-row items-center justify-between px-4 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-6 max-w-[1500px] mx-auto md:gap-8 lg:gap-12"
            >
              <div className="w-full md:w-1/2 text-center md:text-left space-y-4 animate-slideFromRightFade">
                <p className="mt-5 text-sm inline-block px-3 py-1 bg-white text-purple-700 rounded-full uppercase tracking-wide font-semibold font-poppins">
                  {slide.offer}
                </p>
                <h1 className="text-3xl md:text-6xl font-bold leading-tight text-purple-800 drop-shadow-md font-montserrat">
                  {slide.heading}
                  <br />
                  <span className="text-purple-700">{slide.subheading}</span>
                </h1>
                <p className="text-gray-700 text-base font-poppins">
                  {slide.description}
                </p>
                <button
                  onClick={() => navigate("/shop")}
                  className="mt-4 inline-flex font-bold items-center gap-2 px-6 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-full shadow-md hover:bg-purple-700 transition-all duration-300 font-montserrat"
                >
                  Shop Now <FaArrowRight />
                </button>
              </div>

              <div className="w-full md:w-1/2 h-[300px] md:h-[500px] rounded-xl overflow-hidden shadow-md relative animate-slideFromRightFade">
                <img
                  src={slide.image}
                  loading="lazy"
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-10"></div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
      <div className="flex items-center justify-center md:mt-4 mt-2 gap-2">
        {slides.map((_, idx) => (
          <div
            key={idx}
            className="relative w-6 h-2 bg-gray-300 rounded overflow-hidden"
          >
            <div
              className={`absolute left-0 top-0 h-full bg-purple-600 ${
                idx === currentSlide ? "dot-progress-animation" : ""
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero2;
