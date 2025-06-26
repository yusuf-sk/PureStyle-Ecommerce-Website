import { FaShoppingCart, FaHeart, FaRegHeart } from "react-icons/fa";
import { motion } from "framer-motion";
import { products } from "../Products/Products";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "../context/wishlistContext";
import StarRating from "../components/StarRating";
const NewArrivals = () => {
  const navigate = useNavigate();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const handleCardClick = (product) => {
    navigate(`/orderdetails/${product.id}`, { state: { product } });
  };

  return (
    <div className="bg-white min-h-screen py-4 mt-4 sm:mt-0 md:py-10 font-poppins">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-purple-800 md:mb-12 mb-6 text-center font-montserrat">
          New Arrivals
        </h2>

        <div className="grid sm:gap-6 gap-3 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.slice(50, 58).map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              onClick={() => handleCardClick(product)}
              className="group bg-white rounded-2xl shadow-md overflow-hidden relative cursor-pointer transition-all duration-300 hover:shadow-xl font-poppins"
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  isInWishlist(product.id)
                    ? removeFromWishlist(product.id)
                    : addToWishlist(product);
                }}
                className="absolute top-3 right-3 z-10 text-xl text-red-500 bg-white bg-opacity-90 rounded-full p-1.5 shadow"
              >
                {isInWishlist(product.id) ? <FaHeart /> : <FaRegHeart />}
              </button>

              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-36 sm:h-60 object-cover transition-transform duration-300 group-hover:scale-110"
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
                  <span className="text-purple-700 font-bold text-sm sm:text-lg">
                    ₹{product.price}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCardClick(product);
                    }}
                    className="p-1.5 sm:p-2 bg-purple-600 text-white rounded-full hover:bg-purple-200 hover:text-purple-800 transition duration-300"
                  >
                    <FaShoppingCart className="text-sm sm:text-base" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewArrivals;
