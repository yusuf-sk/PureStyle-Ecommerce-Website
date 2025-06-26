import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { useOrder } from "../context/OrderContext";
import { v4 as uuidv4 } from "uuid";
import successSound from '../assets/paymentalert.mp3';

const SuccessPopup = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addOrder } = useOrder();

  const audioRef = useRef(null);
  const hasAddedOrder = useRef(false);
  const [showBox, setShowBox] = useState(false);

  const { product, quantity, grandTotal, name, address } = location.state || {};

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    audioRef.current = new Audio(successSound);
    audioRef.current.preload = "auto";
  }, []);

  useEffect(() => {
    if (!product || !quantity || !grandTotal || !name || !address) {
      navigate("/shop", { replace: true });
      return;
    }

    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch((err) => {
        console.warn("Audio playback failed:", err);
      });
    }

    if (!hasAddedOrder.current) {
      const newOrder = {
        id: uuidv4(),
        name,
        address,
        paymentStatus: "success",
        items: [
          {
            ...product,
            quantity,
          },
        ],
        grandTotal,
        date: new Date().toLocaleString(),
      };

      addOrder(newOrder);
      hasAddedOrder.current = true;
      setShowBox(true);
    }
  }, [product, quantity, grandTotal, name, address, navigate, addOrder]);

  useEffect(() => {
    window.history.replaceState({}, document.title);
  }, []);

  const handleBackToShop = () => navigate("/shop");
  const handleViewOrders = () => navigate("/my-orders");

  return (
    <div className="min-h-screen font-poppins flex justify-center items-center bg-gradient-to-br from-green-50 to-blue-50 p-4 sm:p-6 md:pt-24 pb-32 sm:pb-6">
      {showBox && (
        <div className="bg-white/70 backdrop-blur-lg p-6 sm:p-8 md:p-10 rounded-3xl shadow-2xl flex flex-col items-center w-full max-w-md sm:max-w-lg animate-popup-slide-in">
          <FaCheckCircle className="text-green-500 text-5xl sm:text-7xl mb-4 sm:mb-6 animate-bounce" />
          <h1 className="text-2xl sm:text-4xl font-bold text-green-700 mb-2 text-center font-montserrat">
            Payment Successful!
          </h1>
          <p className="text-gray-700 mb-6 text-center text-base sm:text-lg">
            Thank you, <span className="font-semibold">{name}</span>! Your order
            for <span className="font-semibold">{product?.name}</span> has been
            successfully placed.
          </p>

          <div className="w-full bg-white p-4 sm:p-6 rounded-2xl shadow-inner mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 text-center font-montserrat">
              Order Summary
            </h2>
            <div className="space-y-2 text-gray-600 text-sm sm:text-base">
              <p>
                <span className="font-semibold">Product:</span> {product?.name}
              </p>
              <p>
                <span className="font-semibold">Quantity:</span> {quantity}
              </p>
              <p>
                <span className="font-semibold">Total Paid:</span> ₹
                {grandTotal.toFixed(2)}
              </p>
              <p>
                <span className="font-semibold">Order Status:</span>{" "}
                <span className="text-green-600 font-bold">Confirmed</span>
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full">
            <button
              onClick={handleViewOrders}
              className="flex-1 bg-white text-green-600 border border-green-500 hover:bg-green-100 font-bold py-2 px-4 rounded-full shadow transition-all duration-300 hover:scale-105"
            >
              View My Orders
            </button>
            <button
              onClick={handleBackToShop}
              className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuccessPopup;
