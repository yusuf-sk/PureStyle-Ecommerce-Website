import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useWishlist } from "../context/wishlistContext";
import { FaTrash } from "react-icons/fa";
import StarRating from "../components/StarRating";
const Wishlist = () => {
  const navigate = useNavigate();
  const { wishlistItems, removeFromWishlist } = useWishlist();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const safeWishlist = wishlistItems || [];

  const handleCardClick = (product) => {
    navigate(`/orderdetails/${product.id}`, { state: { product } });
  };

  return (
    <div className="bg-white min-h-screen py-6 md:pt-24 font-poppins">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-purple-800 mb-7 md:mb-12 text-center font-montserrat">
          Your Wishlist
        </h2>

        {safeWishlist.length === 0 ? (
          <p className="text-center text-purple-500 text-lg font-poppins">
            Your wishlist is empty.
          </p>
        ) : (
          <div className="grid gap-3 sm:gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {safeWishlist.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                onClick={() => handleCardClick(product)}
                className="group bg-white rounded-2xl shadow-md overflow-hidden relative cursor-pointer transition-all duration-300 hover:shadow-xl"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full sm:h-60 h-36 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-3 sm:p-4 transition-all duration-300 group-hover:-translate-y-1">
                  <p className="text-xs sm:text-sm text-gray-400 group-hover:text-purple-500 transition-colors">
                    {product.brand}
                  </p>
                  <h3 className="text-sm sm:text-md font-semibold text-gray-700 mb-1 group-hover:text-purple-700 transition-colors">
                    {product.name}
                  </h3>
                  <StarRating rating={product.rating} />
                  <div className="flex items-center justify-between mt-1 sm:mt-2">
                    <span className="text-purple-700 font-semibold text-sm sm:text-lg font-montserrat">
                      ₹{product.price}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFromWishlist(product.id);
                      }}
                      className="p-1.5 sm:p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 hover:text-red-800 transition duration-300"
                    >
                      <FaTrash className="text-sm sm:text-base" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
