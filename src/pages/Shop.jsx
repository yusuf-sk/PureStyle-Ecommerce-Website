import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaHeart, FaRegHeart } from "react-icons/fa";
import { products } from "../Products/Products";
import { useWishlist } from "../context/wishlistContext";
import { motion } from "framer-motion";
import StarRating from "../components/StarRating";
const Shop = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const selectedBrand = params.get("brand");
  const selectedCategory = params.get("category");

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 16;

  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCardClick = (product) => {
    navigate(`/orderdetails/${product.id}`, { state: { product } });
  };

  const filteredProducts = selectedBrand
    ? products.filter(
        (p) =>
          p.brand &&
          p.brand.trim().toLowerCase() === selectedBrand.trim().toLowerCase()
      )
    : selectedCategory
    ? products.filter(
        (p) =>
          p.category &&
          p.category.trim().toLowerCase() ===
            selectedCategory.trim().toLowerCase()
      )
    : products.slice(9);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const goToPage = (page) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setCurrentPage(page);
  };

  return (
    <div className="bg-white min-h-screen py-4 sm:pb-8 pb-20 md:pt-24 font-poppins">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl sm:text-4xl font-bold text-purple-800 md:mb-10 mb-5 text-center font-montserrat">
          {selectedBrand
            ? `Products by ${selectedBrand}`
            : selectedCategory
            ? `${selectedCategory} Collection`
            : "Explore Our Collection"}
        </h2>

        <div className="grid gap-3 sm:gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {currentProducts.map((product, index) => {
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                onClick={() => handleCardClick(product)}
                className="group bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden relative cursor-pointer transition-all duration-300 hover:shadow-xl"
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    isInWishlist(product.id)
                      ? removeFromWishlist(product.id)
                      : addToWishlist(product);
                  }}
                  className="absolute top-3 right-3 z-10 text-xl text-red-500 bg-white rounded-full bg-opacity-90 p-1.5 shadow"
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
                    <span className="text-purple-700 font-bold text-sm sm:text-lg ">
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
            );
          })}
        </div>

        {!selectedBrand && !selectedCategory && totalPages > 1 && (
          <div className="flex justify-center mt-10 space-x-2 sm:space-y-0 space-y-4 flex-wrap">
            <button
              className={`px-4 py-2 rounded-lg ${
                currentPage === 1
                  ? "bg-gray-300 text-gray-600"
                  : "bg-purple-600 text-white hover:bg-purple-700"
              } font-poppins`}
              onClick={() => currentPage > 1 && goToPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i + 1)}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === i + 1
                    ? "bg-purple-800 text-white"
                    : "bg-purple-100 text-purple-600 hover:bg-purple-200"
                } font-poppins`}
              >
                {i + 1}
              </button>
            ))}

            <button
              className={`px-4 py-2 rounded-lg ${
                currentPage === totalPages
                  ? "bg-gray-300 text-gray-600"
                  : "bg-purple-600 text-white hover:bg-purple-700"
              } font-poppins`}
              onClick={() =>
                currentPage < totalPages && goToPage(currentPage + 1)
              }
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
