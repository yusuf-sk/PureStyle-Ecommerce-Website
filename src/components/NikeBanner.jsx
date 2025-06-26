import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import NikePoster from "../assets/BannerImages/nikebanner.avif";

const NikeBanner = () => {
  const navigate = useNavigate();

  const handleShopNow = () => {
    navigate("/shop?brand=Nike");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="relative w-full h-[420px] md:h-[450px] overflow-hidden font-poppins"
    >
      <img
        src={NikePoster}
        alt="Nike Banner"
        className="absolute inset-0 w-full h-full object-cover object-center scale-105"
      />

      <div className="absolute inset-0 bg-black bg-opacity-60" />

      <div className="absolute top-3 sm:top-5 left-2 sm:left-5 bg-white text-black text-xs font-bold px-2 py-1 sm:px-4 rounded-full shadow-md z-20 font-poppins">
        Ad
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-wide leading-tight drop-shadow-lg font-montserrat">
          Unleash Your Greatness with{" "}
          <span className="text-yellow-300">Nike</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl mt-4 max-w-2xl leading-relaxed text-gray-200 font-poppins">
          Step into performance, power, and passion. From training grounds to
          street style — Nike helps you push boundaries and chase greatness.
        </p>
        <button
          onClick={handleShopNow}
          className="mt-8 px-5 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold rounded-full hover:bg-purple-800 transition-transform transform hover:scale-105 duration-300 shadow-lg font-poppins"
        >
          Shop Now
        </button>
      </div>
    </motion.div>
  );
};

export default NikeBanner;
