import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { products } from "../Products/Products";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import CartIcon from "./CartIcon";
import "./Navbar.css";
const placeholders = [
  "Search Formal Shirt",
  "Search T-shirt",
  "Search Adidas",
  "Search Jeans",
  "Search Nike shoes",
  "Search Puma",
  "Search Denim Jackets",
  "Search Sneakers",
  "Search Zara",
];

const Navbar2 = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [animatePlaceholder, setAnimatePlaceholder] = useState(true);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [placeholderStyle, setPlaceholderStyle] = useState("slide-in");
  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = useRef(null);

  useEffect(() => {
    if (searchQuery !== "") return;

    const interval = setInterval(() => {
      setPlaceholderStyle("slide-out");

      setTimeout(() => {
        setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
        setPlaceholderStyle("slide-in");
      }, 300);
    }, 2500);

    return () => clearInterval(interval);
  }, [searchQuery]);

  useEffect(() => {
    if (location.pathname !== "/search") {
      setAnimatePlaceholder(true);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setRecommendations([]);
    } else {
      const queryWords = searchQuery.trim().toLowerCase().split(/\s+/);
      const matched = products.filter((product) =>
        queryWords.every(
          (word) =>
            product.name.toLowerCase().includes(word) ||
            product.brand.toLowerCase().includes(word)
        )
      );
      setRecommendations(matched.slice(0, 6));
    }
  }, [searchQuery]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
      setRecommendations([]);
      setAnimatePlaceholder(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleRecommendationClick = (text) => {
    setRecommendations([]);
    navigate(`/search?query=${encodeURIComponent(text)}`);
    setAnimatePlaceholder(false);
  };

  const clearSearch = () => {
    setSearchQuery("");
    inputRef.current.focus();
  };

  return (
    <nav className="md:fixed md:top-0 md:left-0 md:right-0 z-50 bg-white shadow-md md:px-4 px-2 py-2 w-full flex items-center justify-between">
      <div className="flex items-center gap-4 ">
        <Link
          to="/"
          className="font-bold md:text-2xl text-base mr-2 md:mr-00 text-[#8e44ed] font-montserrat"
        >
          PureStyle
        </Link>
      </div>

      <div className="flex-1 flex justify-center relative">
        <div className="relative w-full max-w-[250px] md:max-w-[550px]">
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              animatePlaceholder ? placeholders[placeholderIndex] : ""
            }
            className={`w-full border border-[#e0e0e0] focus:border-[#8e44ed] bg-[#ffffff] text-[#2c2c2c] rounded-full px-4 py-2 outline-none placeholder-[#757575] placeholder-transition ${placeholderStyle} font-poppins`}
          />

          {searchQuery && (
            <FaTimes
              className="absolute right-9 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
              onClick={clearSearch}
            />
          )}
          <FaSearch
            onClick={handleSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-[#8e44ed]"
          />
          {recommendations.length > 0 && (
            <ul className="absolute top-12 left-0 bg-white border w-full rounded shadow z-50 font-poppins">
              {recommendations.map((item, idx) => (
                <li
                  key={idx}
                  onClick={() => handleRecommendationClick(item.name)}
                  className="flex justify-between items-center px-2 sm:px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  <div className="flex flex-col">
                    <span className="font-medium text-md">{item.name}</span>
                    <span className="text-gray-600 text-sm">{item.brand}</span>
                  </div>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded-md ml-4"
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="hidden md:flex justify-center items-center gap-6 font-montserrat">
        <Link to="/" className="text-[#8e44ed] font-bold hover:text-[#732dd9]">
          Home
        </Link>
        <Link
          to="/shop"
          className="text-[#8e44ed] font-bold hover:text-[#732dd9]"
        >
          Shop
        </Link>
        <Link
          to="/signup"
          className="text-[#8e44ed] font-bold hover:text-[#732dd9]"
        >
          Account
        </Link>
        <Link
          to="/wishlist"
          className="text-[#8e44ed] font-bold hover:text-[#732dd9]"
        >
          Wishlist
        </Link>
        <div className="flex items-center">
          <CartIcon />
        </div>
      </div>

      <div className="md:hidden flex items-center ml-2">
        <FaBars
          className="text-xl cursor-pointer"
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
        />
      </div>

      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 bg-white w-full px-4 py-4 rounded-b-md shadow-md md:hidden z-50 font-montserrat">
          <Link
            to="/"
            className="block py-2 text-[#8e44ed] hover:text-[#732dd9] font-semibold"
          >
            Home
          </Link>
          <Link
            to="/signup"
            className="block py-2 text-[#8e44ed] hover:text-[#732dd9] font-semibold"
          >
            Account
          </Link>
          <Link
            to="/shop"
            className="block py-2 text-[#8e44ed] hover:text-[#732dd9] font-semibold"
          >
            Shop
          </Link>
          <Link
            to="/contact"
            className="block py-2 text-[#8e44ed] hover:text-[#732dd9] font-semibold"
          >
            Contact
          </Link>
          <Link
            to="/my-orders"
            className="block py-2 text-[#8e44ed] hover:text-[#732dd9] font-semibold"
          >
            My Orders
          </Link>
          <Link
            to="/wishlist"
            className="block py-2 text-[#8e44ed] hover:text-[#732dd9] font-semibold"
          >
            WishList
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar2;