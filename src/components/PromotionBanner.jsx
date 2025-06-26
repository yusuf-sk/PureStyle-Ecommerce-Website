import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AdidasSponser from "../assets/BannerImages/adidassponsor.jpg";

const PromotionBanner = () => {
  const navigate = useNavigate();

  const handleShopNow = () => {
    navigate("/shop?brand=Adidas");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="relative w-full h-[400px] md:h-[440px] overflow-hidden font-poppins"
    >
      <img
        src={AdidasSponser}
        alt="Adidas Banner"
        className="absolute inset-0 w-full h-full object-cover object-center scale-105"
      />

      <div className="absolute inset-0 bg-black bg-opacity-60" />

      <div className="absolute top-3 sm:top-5 left-2 sm:left-5 bg-white text-black text-xs font-bold px-2 sm:px-4 py-1 rounded-full shadow-md z-20 font-poppins">
        Sponsored
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-wide leading-tight drop-shadow-lg font-montserrat">
          <span className="text-yellow-300">30% OFF</span> on HDFC Credit Cards
        </h1>
        <p className="text-base sm:text-lg md:text-xl mt-4 max-w-2xl leading-relaxed text-gray-200 font-poppins">
          Unlock exclusive savings on all Adidas products when you pay with your
          HDFC Credit Card. Don't miss out on this limited-time offer!
        </p>
        <button
          onClick={handleShopNow}
          className="mt-8 px-5 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold rounded-full hover:bg-purple-800 transition-transform transform hover:scale-105 duration-300 shadow-lg font-poppins"
        >
          Shop Adidas Now
        </button>
      </div>
    </motion.div>
  );
};

export default PromotionBanner;
