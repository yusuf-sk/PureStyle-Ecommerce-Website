import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <>
      <motion.footer
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-white text-gray-800 relative border-t border-gray-200 font-poppins sm:pb-0 pb-12"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm"
        >
          <div>
            <h2 className="text-xl font-bold mb-4 text-purple-600 font-montserrat">
              PureStyle
            </h2>
            <p className="text-gray-600">
              Elevate your lifestyle with fashion-forward clothing and everyday
              essentials.
            </p>
            <div className="flex space-x-4 mt-4 text-purple-600 text-lg">
              <a href="#">
                <FaFacebookF className="hover:text-purple-800" />
              </a>
              <a href="#">
                <FaInstagram className="hover:text-purple-800" />
              </a>
              <a href="#">
                <FaTwitter className="hover:text-purple-800" />
              </a>
              <a href="#">
                <FaYoutube className="hover:text-purple-800" />
              </a>
            </div>
            <div className="mt-4">
              <label className="block mb-1 text-sm text-gray-500">
                Select Currency
              </label>
              <select className="bg-gray-100 text-gray-800 p-2 rounded">
                <option>INR (₹)</option>
                <option>USD ($)</option>
                <option>EUR (€)</option>
              </select>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-900 font-montserrat">
              Quick Links
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>
                <Link to="/" className="hover:text-purple-800">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-purple-800">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-purple-800">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-purple-800">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="hover:text-purple-800">
                  Your Wishlist
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-900 font-montserrat">
              Customer Care
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="hover:text-purple-800">Help Center</li>
              <li className="hover:text-purple-800">Track Order</li>
              <li className="hover:text-purple-800">Returns</li>
              <li className="hover:text-purple-800">Shipping Info</li>
              <li className="hover:text-purple-800">Payment Options</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-900 font-montserrat">
              Newsletter
            </h3>
            <p className="text-gray-600 mb-3">
              Subscribe to get exclusive offers and trends.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 rounded-l-md text-black bg-gray-100 focus:outline-none"
                required
              />
              <button
                type="submit"
                className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-r-md font-semibold"
              >
                Subscribe
              </button>
            </form>

            <div className="mt-6 space-y-2">
              <div className="flex items-center space-x-2 text-sm text-gray-700">
                <img
                  src="https://thumbs.dreamstime.com/b/secure-checkout-logo-sign-vector-outline-icon-black-white-color-326040254.jpg"
                  className="h-5 filter-purple"
                  alt="Secure Checkout"
                />
                <span>Secure Checkout</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-700">
                <img
                  src="https://static.vecteezy.com/system/resources/previews/019/857/317/non_2x/genuine-product-security-badges-with-grunge-texture-effect-isolated-on-white-background-vector.jpg"
                  className="h-5 filter-purple"
                  alt="Genuine Products"
                />
                <span>100% Genuine Products</span>
              </div>
            </div>

            <div className="flex space-x-4 mt-6">
              <img
                src="https://d28wu8o6itv89t.cloudfront.net/images/Visadebitcardpng-1599584312349.png"
                alt="Visa"
                className="h-6 filter-purple"
              />
              <img
                src="https://images.seeklogo.com/logo-png/8/1/master-card-logo-png_seeklogo-89117.png"
                alt="MasterCard"
                className="h-6 filter-purple"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/UPI-Logo-vector.svg/2560px-UPI-Logo-vector.svg.png"
                alt="UPI"
                className="h-6 filter-purple"
              />
              <img
                src="https://cdn.pixabay.com/photo/2015/05/26/09/37/paypal-784404_1280.png"
                alt="PayPal"
                className="h-6 filter-purple"
              />
            </div>
          </div>
        </motion.div>

        <div className="border-t border-gray-200 text-center text-gray-500 text-sm py-4">
          © {new Date().getFullYear()} Purestyle. All rights reserved.
        </div>
      </motion.footer>
    </>
  );
};

export default Footer;
