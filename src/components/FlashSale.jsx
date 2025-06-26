import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { products } from "../Products/Products";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useWishlist } from "../context/wishlistContext";
import StarRating from "../components/StarRating";
import { motion } from "framer-motion";

const FlashSale = () => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [secondsLeft, setSecondsLeft] = useState(3 * 3600 + 45 * 60 + 21);
  const [discounts, setDiscounts] = useState([]);

  const flashSaleProducts = products.slice(34, 43);

  useEffect(() => {
    const generated = flashSaleProducts.map(
      () => Math.floor(Math.random() * 21) + 30
    );
    setDiscounts(generated);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (secs) => {
    const h = String(Math.floor(secs / 3600)).padStart(2, "0");
    const m = String(Math.floor((secs % 3600) / 60)).padStart(2, "0");
    const s = String(secs % 60).padStart(2, "0");
    return `${h}h : ${m}m : ${s}s`;
  };

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
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="py-6 px-4 md:px-16 bg-gradient-to-b from-purple-50 to-white relative font-poppins"
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <Clock className="text-purple-700" />
          <h2 className="text-2xl sm:text-3xl font-bold text-purple-800 font-montserrat">
            Flash Sale
          </h2>
        </div>
        <div className="text-xs sm:text-sm font-medium text-red-600">
          ⏰ Ends in {formatTime(secondsLeft)}
        </div>
      </div>

      <div className="hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 z-10">
        <button
          onClick={scrollLeft}
          className="bg-white border border-purple-300 text-purple-700 hover:bg-purple-100 rounded-full p-2 shadow font-poppins"
        >
          <ChevronLeft />
        </button>
      </div>
      <div className="hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 z-10">
        <button
          onClick={scrollRight}
          className="bg-white border border-purple-300 text-purple-700 hover:bg-purple-100 rounded-full p-2 shadow font-poppins"
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
          {flashSaleProducts.map((product, index) => {
            const discount = discounts[index];
            const originalPrice = Math.round(
              product.price / (1 - discount / 100)
            );

            return (
              <div
                key={index}
                onClick={() => handleClick(product)}
                className="md:min-w-[250px] min-w-[210px] bg-white rounded-2xl shadow-lg hover:shadow-xl transition-transform duration-300 transform hover:-translate-y-1 group cursor-pointer relative overflow-hidden"
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    isInWishlist(product.id)
                      ? removeFromWishlist(product.id)
                      : addToWishlist(product);
                  }}
                  className="absolute top-3 right-3 z-10 text-xl text-red-500 bg-white bg-opacity-90 rounded-full p-1.5 shadow font-poppins"
                >
                  {isInWishlist(product.id) ? <FaHeart /> : <FaRegHeart />}
                </button>

                <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full font-poppins">
                  -{discount}%
                </div>

                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-t-2xl"
                />
                <div className="p-4">
                  <p className="text-sm text-gray-700 mb-1 font-poppins">
                    {product.brand}
                  </p>
                  <h3 className="font-semibold text-gray-800 mb-1 line-clamp-2 font-montserrat">
                    {product.name}
                  </h3>
                  <StarRating rating={product.rating} />

                  <div className="flex items-center justify-between font-poppins mt-2">
                    <span className="text-lg font-bold text-purple-700">
                      ₹{product.price}
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                      ₹{originalPrice}
                    </span>
                  </div>

                  <div className="mt-3 text-xs text-red-600 font-medium font-poppins">
                    ⏰ Time Left: {formatTime(secondsLeft)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};

export default FlashSale;
