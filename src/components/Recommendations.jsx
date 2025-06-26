import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaShoppingCart, FaHeart, FaRegHeart } from "react-icons/fa";
import { products } from "../Products/Products";
import { useWishlist } from "../context/wishlistContext";
import StarRating from "../components/StarRating";

const Recommendations = ({ currentProductId }) => {
  const navigate = useNavigate();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const currentProduct = products.find((p) => p.id === currentProductId);
  if (!currentProduct) return null;

  const recommendedProducts = products
    .filter(
      (p) =>
        p.category === currentProduct.category && p.id !== currentProduct.id
    )
    .slice(0, 8);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentProductId]);

  return (
    <div className="bg-white sm:py-6 py-3">
      <div className="max-w-7xl mx-auto px-1 sm:px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-purple-800 mb-4 sm:mb-7 text-center">
          You May Also Like
        </h2>

        <div className="grid gap-3 sm:gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {recommendedProducts.length > 0 ? (
            recommendedProducts.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                onClick={() =>
                  navigate(`/orderdetails/${item.id}`, {
                    state: { product: item },
                  })
                }
                className="group bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden relative cursor-pointer transition-all duration-300 hover:shadow-xl"
              >
                {/* Wishlist Heart Icon */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    isInWishlist(item.id)
                      ? removeFromWishlist(item.id)
                      : addToWishlist(item);
                  }}
                  className="absolute top-3 right-3 z-10 text-xl text-red-500 bg-white bg-opacity-90 rounded-full p-1.5 shadow"
                  aria-label="Toggle wishlist"
                >
                  {isInWishlist(item.id) ? <FaHeart /> : <FaRegHeart />}
                </button>

                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full sm:h-60 h-36 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-3 sm:p-4 transition-all duration-300 group-hover:-translate-y-1">
                  {item.brand && (
                    <p className="text-xs sm:text-sm text-gray-500 group-hover:text-purple-600 transition-colors">
                      {item.brand}
                    </p>
                  )}
                  <h3 className="text-sm sm:text-md font-semibold text-gray-800 mb-1 group-hover:text-purple-700 transition-colors">
                    {item.name}
                  </h3>
                  <StarRating rating={item.rating} />

                  <div className="flex items-center justify-between mt-1 sm:mt-2">
                    <span className="text-purple-700 font-bold text-sm sm:text-lg">
                      ₹{item.price}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/orderdetails/${item.id}`, {
                          state: { product: item },
                        });
                      }}
                      className="p-1.5 sm:p-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition duration-300"
                      aria-label="Go to product details"
                    >
                      <FaShoppingCart className="text-sm sm:text-base" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-full">
              No similar products found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Recommendations;
