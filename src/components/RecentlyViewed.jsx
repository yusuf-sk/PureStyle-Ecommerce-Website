import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useWishlist } from "../context/wishlistContext";
import StarRating from "../components/StarRating";
const RecentlyViewed = () => {
  const [recent, setRecent] = useState([]);
  const scrollRef = useRef(null);
  const navigate = useNavigate();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    const data = JSON.parse(sessionStorage.getItem("recently_viewed")) || [];
    setRecent(data);
  }, []);

  const handleClick = (product) => {
    navigate(`/orderdetails/${product.id}`, { state: { product } });
  };

  useEffect(() => {
    if (!scrollRef.current || recent.length === 0) return;

    const slider = scrollRef.current;
    let isDown = false;
    let startX;
    let scrollLeft;

    const handleMouseDown = (e) => {
      isDown = true;
      slider.classList.add("cursor-grabbing");
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    };

    const handleMouseLeave = () => {
      isDown = false;
      slider.classList.remove("cursor-grabbing");
    };

    const handleMouseUp = () => {
      isDown = false;
      slider.classList.remove("cursor-grabbing");
    };

    const handleMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 2;
      slider.scrollLeft = scrollLeft - walk;
    };

    slider.addEventListener("mousedown", handleMouseDown);
    slider.addEventListener("mouseleave", handleMouseLeave);
    slider.addEventListener("mouseup", handleMouseUp);
    slider.addEventListener("mousemove", handleMouseMove);

    return () => {
      slider.removeEventListener("mousedown", handleMouseDown);
      slider.removeEventListener("mouseleave", handleMouseLeave);
      slider.removeEventListener("mouseup", handleMouseUp);
      slider.removeEventListener("mousemove", handleMouseMove);
    };
  }, [recent]);

  if (recent.length === 0) {
    return (
      <section className="py-10 px-4 md:px-16 bg-white relative font-poppins">
        <div className="flex justify-center items-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-600 font-montserrat">
            No recently viewed products
          </h2>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 sm:py-6 px-4 md:px-14  bg-white relative font-poppins">
      <div className="flex justify-center items-center mb-8">
        <h2 className="text-3xl font-bold text-purple-800 font-montserrat">
          Recently Viewed
        </h2>
      </div>

      <div
        ref={scrollRef}
        className="overflow-x-auto scroll-smooth cursor-grab select-none"
      >
        <div className="flex gap-6 w-max">
          {recent.map((product) => (
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
    </section>
  );
};

export default RecentlyViewed;
