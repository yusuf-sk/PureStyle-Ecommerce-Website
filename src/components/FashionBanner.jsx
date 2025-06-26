import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import FashionBanner1 from "../assets/BannerImages/fashionbanner1.jpg";
import FashionBanner2 from "../assets/BannerImages/fashionbanner2.jpg";
import FashionBanner3 from "../assets/BannerImages/fashionbanner3.jpg";
import FashionBanner4 from "../assets/BannerImages/fashionbanner4.jpg";
import FashionBanner5 from "../assets/BannerImages/fashionbanner5.jpg";
import FashionBanner6 from "../assets/BannerImages/fashionbanner6.jpg";

const banners = [
  {
    title: "Exclusive Offer",
    heading: "Double the Style, One Price",
    description: "Discover timeless styles—grab this limited-time deals.",
    button: "Shop Now",
    image: FashionBanner1,
    bg: "bg-gradient-to-r from-yellow-100 via-orange-100 to-red-100",
    textAlign: "left",
    link: "/shop",
  },
  {
    title: "Spring / Summer",
    heading: "Upcoming Season Picks",
    description: "Get ready for the season with fresh and stylish classics.",
    button: "Collection",
    image: FashionBanner3,
    bg: "bg-gradient-to-r from-green-100 to-blue-100",
    textAlign: "left",
    link: "/category/spring-summer",
  },
  {
    title: "Seasonal Sale",
    heading: "Winter Collection -50% OFF",
    image: FashionBanner2,
    bg: "bg-blue-50",
    textAlign: "center",
    link: "/category/winter",
  },
  {
    title: "New Footwear Collection",
    heading: "Spring / Summer 2022",
    image: FashionBanner4,
    bg: "bg-pink-50",
    textAlign: "center",
    link: "/category/footwear",
  },
  {
    title: "T-Shirts",
    heading: "New Trendy Prints",
    image: FashionBanner5,
    bg: "bg-teal-50",
    textAlign: "center",
    link: "/category/tshirts",
  },
  {
    title: "Jeans",
    heading: "Classic & Stylish Fits",
    image: FashionBanner6,
    bg: "bg-purple-50",
    textAlign: "center",
    link: "/category/jeans",
  },
];

export default function FashionBanner() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 p-3 mt-2 sm:mt-0 sm:p-7 font-poppins">
      {banners.map((banner, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.05 }}
        >
          <Link
            to={banner.link}
            className={`relative ${banner.bg} rounded-xl overflow-hidden shadow-md transform transition-transform hover:scale-105 hover:shadow-xl flex flex-col justify-center items-${banner.textAlign} p-6 h-80 sm:h-96`}
          >
            <img
              src={banner.image}
              alt={banner.title}
              className="absolute top-0 left-0 w-full h-full object-cover z-0"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent z-0"></div>
            <div className="relative z-10 text-white">
              <p className="text-sm uppercase font-medium mb-2">
                {banner.title}
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold leading-tight font-montserrat">
                {banner.heading}
              </h2>
              {banner.description && (
                <p className="text-sm mt-1">{banner.description}</p>
              )}
              {banner.button && (
                <button className="mt-4 px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:bg-[#732dd9] transition flex items-center gap-2">
                  {banner.button} <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
