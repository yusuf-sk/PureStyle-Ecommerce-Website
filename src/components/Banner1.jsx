import { useNavigate } from "react-router-dom";
import ShopBanner from "../assets/BannerImages/shopbanner.jpg";
import { motion } from "framer-motion";

const Banner1 = () => {
  const navigate = useNavigate();

  const handleShopNow = () => {
    navigate("/shop");
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="relative w-full h-[40vh] md:h-[50vh] overflow-hidden shadow-lg"
    >
      <img
        src={ShopBanner}
        alt="Fashion Model"
        className="absolute w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
        <div className="text-left text-white px-6 md:px-16 z-10 font-poppins">
          <h1 className="text-2xl md:text-4xl font-extrabold leading-tight drop-shadow-md font-montserrat">
            Elevate Your Fashion Game
          </h1>
          <p className="text-sm md:text-base mt-3 max-w-md leading-relaxed">
            Style is a way to say who you are without having to speak. Explore
            bold looks, timeless classics, and the freshest trends curated just
            for you.
          </p>
          <button
            onClick={handleShopNow}
            className="mt-6 px-6 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:bg-[#732dd9] font-semibold rounded-full shadow transition"
          >
            Shop Now
          </button>
        </div>
      </div>
    </motion.section>
  );
};

export default Banner1;
