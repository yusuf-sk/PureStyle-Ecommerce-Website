import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import NikeLogo from "../assets/BannerImages/nikelogo.webp";
import AdidasLogo from "../assets/BannerImages/adidaslogo.jpg";
import PumaLogo from "../assets/BannerImages/pumalogo.png";
import ZaraLogo from "../assets/BannerImages/zaralogo.webp";
import ReebokLogo from "../assets/BannerImages/reeboklogo.jpg";

const ShopByBrand = () => {
  const navigate = useNavigate();

  const selectedBrands = ["Nike", "Adidas", "Puma", "Zara", "Reebok"];

  const brandImages = {
    Nike: NikeLogo,
    Adidas: AdidasLogo,
    Puma: PumaLogo,
    Zara: ZaraLogo,
    Reebok: ReebokLogo,
  };

  const handleBrandClick = (brand) => {
    navigate(`/shop?brand=${brand}`);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="py-12 bg-gradient-to-b from-purple-50 to-white font-poppins"
    >
      <h2 className="text-4xl font-bold text-center text-purple-800 mb-10 font-montserrat">
        Shop by your Favourite Brand
      </h2>
      <div className="flex gap-6 px-4 max-w-7xl mx-auto sm:grid sm:grid-cols-3 md:grid-cols-5 sm:overflow-x-visible overflow-x-auto scrollbar-hide">
        {selectedBrands.map((brand, index) => (
          <div
            key={index}
            onClick={() => handleBrandClick(brand)}
            className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition duration-300 bg-white min-w-[120px]"
          >
            <img
              src={brandImages[brand]}
              alt={brand}
              className="w-full h-32 sm:h-44 object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-white text-lg sm:text-xl font-bold tracking-wide uppercase">
                Explore {brand}
              </span>
            </div>
            <div className="text-center py-3 text-lg font-semibold text-gray-700 bg-white border-t">
              {brand}
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
};

export default ShopByBrand;
