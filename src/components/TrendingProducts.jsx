import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { products } from "../Products/Products";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useWishlist } from "../context/wishlistContext";
import StarRating from "../components/StarRating";
import { motion } from "framer-motion";

const TrendingProducts = () => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const trendingProducts = products.slice(20, 29);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  const handleClick = (product) => {
    navigate(`/orderdetails/${product.id}`, { state: { product } });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="py-10 px-4 md:px-16 bg-gradient-to-b from-purple-50 to-white relative font-poppins"
    >
      <div className="flex justify-center items-center mb-8">
        <h2 className="text-3xl font-bold text-purple-800 font-montserrat">
          Trending Products
        </h2>
      </div>

      <div className="hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 z-10">
        <button
          onClick={scrollLeft}
          className="bg-white border border-purple-300 text-purple-700 hover:bg-purple-100 rounded-full p-2 shadow"
        >
          <ChevronLeft />
        </button>
      </div>
      <div className="hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 z-10">
        <button
          onClick={scrollRight}
          className="bg-white border border-purple-300 text-purple-700 hover:bg-purple-100 rounded-full p-2 shadow"
        >
          <ChevronRight />
        </button>
      </div>

      <div
        ref={scrollRef}
        className="overflow-x-auto scroll-smooth"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <div className="flex gap-6 w-max">
          {trendingProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => handleClick(product)}
              className="md:min-w-[250px] min-w-[210px] bg-white rounded-2xl shadow-lg hover:shadow-xl transition-transform duration-300 transform hover:-translate-y-1 group cursor-pointer relative overflow-hidden font-poppins"
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  isInWishlist(product.id)
                    ? removeFromWishlist(product.id)
                    : addToWishlist(product);
                }}
                className="absolute top-3 right-3 z-10 text-xl text-red-500 bg-white p-1.5 shadow rounded-full opacity-90"
              >
                {isInWishlist(product.id) ? <FaHeart /> : <FaRegHeart />}
              </button>

              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-t-2xl"
              />
              <div className="p-4">
                <p className="text-sm text-gray-700 mb-1">{product.brand}</p>
                <h3 className="font-semibold text-gray-800 line-clamp-2 leading-snug mb-1">
                  {product.name}
                </h3>
                <StarRating rating={product.rating} />
                <div className="text-lg font-bold text-purple-700">
                  ₹{product.price}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default TrendingProducts;
