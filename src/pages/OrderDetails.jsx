import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { products } from "../Products/Products";
import ReviewSection from "../components/ReviewSection";
import Recommendations from "../components/Recommendations";
import { useWishlist } from "../context/wishlistContext";
import FeaturesSection from "../components/FeaturesSection";
import RecentlyViewed from "../components/RecentlyViewed";
import StarRating from "../components/StarRating";
import { motion } from "framer-motion";

const OrderDetails = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");

  const { addToWishlist, isInWishlist } = useWishlist();

  const product =
    location.state?.product || products.find((p) => p.id === parseInt(id));

  useEffect(() => {
    if (product) {
      let items = JSON.parse(sessionStorage.getItem("recently_viewed")) || [];
      items = items.filter((item) => item.id !== product.id);
      items.unshift(product);
      sessionStorage.setItem("recently_viewed", JSON.stringify(items));
    }
  }, [product]);

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 font-poppins">
        <h1 className="text-2xl font-bold text-gray-600">Product not found!</h1>
      </div>
    );
  }

  const isAlreadyWishlisted = isInWishlist(product.id);

  const handleQuantityChange = (amount) => {
    if (quantity + amount >= 1) {
      setQuantity(quantity + amount);
    }
  };

  const handleProceed = () => {
    const sizeToUse = selectedSize || "S";
    navigate("/ordersummary", {
      state: { product, quantity, selectedSize: sizeToUse },
    });
  };

  return (
    <div className="min-h-screen bg-white py-6 md:pt-24 text-gray-800 font-poppins">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:gap-16 gap-8"
        >
          <div className="md:w-1/2 flex justify-center items-center">
            <div className="relative group w-full max-w-md">
              <img
                src={product.image}
                alt={product.name}
                className="rounded-2xl shadow-lg object-cover w-full h-[280px] md:h-[430px] transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] md:text-xs font-semibold px-2 py-1 rounded-full shadow-md font-poppins">
                Bestseller
              </div>
            </div>
          </div>

          <div className="md:w-1/2 flex flex-col justify-between space-y-3 md:space-y-0">
            <p className="text-purple-700 font-semibold text-sm md:text-base">
              Step 1 of 3
            </p>

            <div>
              <h1 className="text-2xl md:text-4xl font-extrabold mb-2 font-montserrat">
                {product.name}
              </h1>

              <p className="text-sm md:text-base mb-2 font-poppins">
                Brand:{" "}
                <span className="font-semibold text-gray-900 font-poppins">
                  {product.brand}
                </span>
              </p>

              <StarRating rating={product.rating} />

              <p className="text-2xl md:text-3xl font-extrabold text-green-700 mb-4 mt-4 font-montserrat">
                ₹{product.price * quantity}
              </p>

              <div className="bg-purple-50 border border-purple-200 p-3 md:p-4 rounded-lg text-xs md:text-sm text-purple-800 mb-6 shadow-inner font-poppins">
                <p>
                  <span className="font-semibold">Get it Delivered</span> as
                  early as{" "}
                  <span className="text-green-700 font-semibold">Tomorrow</span>
                </p>
                <p>
                  Place your order in the next{" "}
                  <span className="text-red-600 font-semibold">
                    4 hrs 30 mins
                  </span>{" "}
                  to receive it by tomorrow!
                </p>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="size"
                  className="block text-sm md:text-base font-semibold text-gray-900 mb-2 font-poppins"
                >
                  Select Size
                </label>
                <select
                  id="size"
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="w-full border border-purple-300 rounded-lg px-4 py-2 md:px-5 md:py-3 text-sm md:text-lg focus:ring-2 focus:ring-purple-400 focus:outline-none transition font-poppins"
                >
                  <option value="">-- Select Size --</option>
                  <option value="S">S - Small</option>
                  <option value="M">M - Medium</option>
                  <option value="L">L - Large</option>
                  <option value="XL">XL - Extra Large</option>
                  <option value="XXL">XXL - Double Extra Large</option>
                </select>
                <button
                  onClick={() => navigate("/sizeguide")}
                  className="mt-4 md:mt-4 text-purple-600 hover:text-purple-900 font-semibold text-base md:text-sm font-poppins"
                >
                  View Size Guide
                </button>
              </div>

              <div className="flex items-center gap-4 md:gap-5 mb-6 font-poppins">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="w-10 h-10 md:w-12 md:h-12 text-xl md:text-2xl font-bold rounded-full bg-purple-200 text-purple-700 hover:bg-purple-300 transition-shadow shadow-md"
                >
                  −
                </button>
                <span className="text-xl md:text-2xl font-semibold">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="w-10 h-10 md:w-12 md:h-12 text-xl md:text-2xl font-bold rounded-full bg-purple-200 text-purple-700 hover:bg-purple-300 transition-shadow shadow-md"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <button
                onClick={handleProceed}
                className="w-full py-3 md:py-4 rounded-xl text-lg md:text-xl font-bold transition-all duration-300 bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:scale-[1.04] hover:shadow-lg font-poppins"
              >
                Proceed to Buy
              </button>
              <button
                onClick={() => addToWishlist(product)}
                disabled={isAlreadyWishlisted}
                className={`w-full py-3 md:py-4 rounded-xl text-lg md:text-xl font-bold transition-all duration-300 font-poppins ${
                  isAlreadyWishlisted
                    ? "bg-pink-200 text-white cursor-not-allowed"
                    : "bg-pink-500 text-white hover:bg-pink-600 hover:scale-[1.04] hover:shadow-lg"
                }`}
              >
                {isAlreadyWishlisted ? "Wishlisted" : "Add to Wishlist"}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Recommendations */}
        <div className="mt-9">
          <Recommendations currentProductId={product.id} />
        </div>

        {/* Features */}
        <div className="mt-6 sm:mt-4 ">
          <FeaturesSection productId={product.id} />
        </div>

        {/* Recently Viewed */}
        <div className="mt-4">
          <RecentlyViewed />
        </div>

        {/* Reviews */}
        <div className="mt-4">
          <ReviewSection />
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
