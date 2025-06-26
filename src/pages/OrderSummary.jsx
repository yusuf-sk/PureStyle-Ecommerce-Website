import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const OrderSummary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { product, quantity, selectedSize } = location.state || {};

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [user, setUser] = useState(() => {
    const storedUser = sessionStorage.getItem("userInfo");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [name, setName] = useState(user?.name || "");
  const [mobile, setMobile] = useState(user?.mobile || "");
  const [address, setAddress] = useState(user?.address || "");
  const [errors, setErrors] = useState({});
  const [showPopup, setShowPopup] = useState(!user);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("userInfo");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser(parsed);
      setName(parsed.name);
      setMobile(parsed.mobile);
      setAddress(parsed.address);
    }
  }, []);

  const isUserSignedIn = !!user;

  const estimatedDate = new Date();
  estimatedDate.setDate(estimatedDate.getDate() + 5);
  const estimatedDelivery = estimatedDate.toDateString();

  const handleSubmit = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Please enter your name";
    if (!/^\d{10}$/.test(mobile))
      newErrors.mobile = "Enter valid 10-digit number";
    if (!address.trim()) newErrors.address = "Please enter your address";
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      navigate("/payment", {
        state: {
          product,
          quantity,
          size: selectedSize,
          name,
          mobile,
          address,
          grandTotal,
        },
      });
    }
  };

  const handleSignOut = () => {
    sessionStorage.clear();
    setUser(null);
    setShowPopup(true);
  };

  if (!product) {
    return (
      <div className="text-center mt-10 text-lg text-red-600 font-poppins">
        No product selected.
      </div>
    );
  }

  const baseTotal = product.price * quantity;
  const subtotal = baseTotal;
  const tax = subtotal * 0.12;
  const shipping = 50;
  const convenienceFee = 30;
  const grandTotal = subtotal + tax + shipping + convenienceFee;

  const discountPercent = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  return (
    <div className="relative md:pt-10 min-h-screen bg-gradient-to-br from-[#f4f0fa] to-[#e0d4f7] py-6 px-2 sm:px-4 flex justify-center items-center font-poppins">
      {showPopup && (
        <div className="absolute md:top-50 top-52 w-full max-w-lg bg-white border border-purple-200 rounded-xl p-6 shadow-xl z-50">
          <h2 className="text-xl font-semibold text-purple-700 mb-3 text-center font-montserrat">
            Please Sign Up to Continue
          </h2>
          <p className="text-gray-600 text-center mb-4 font-poppins">
            You need to create an account to place an order.
          </p>
          <button
            onClick={() =>
              navigate("/signup", {
                state: {
                  fromOrderSummary: true,
                  from: "/ordersummary",
                  product,
                  quantity,
                  selectedSize,
                },
              })
            }
            className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white font-bold py-3 rounded-lg hover:scale-105 transition-transform font-poppins"
          >
            Go to Sign Up
          </button>
        </div>
      )}

      <div
        className={`bg-white rounded-3xl shadow-2xl w-full max-w-6xl md:mt-7 px-6 py-10 md:py-14 md:px-16 flex flex-col md:flex-row items-start transition-opacity duration-300 ${
          showPopup ? "opacity-30 pointer-events-none" : "opacity-100"
        }`}
      >
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start mb-10 md:mb-0 md:mr-8 -mt-6">
          <img
            src={product.image}
            alt={product.name}
            className="w-[380px] h-[320px] object-cover rounded-xl shadow-md"
          />
          <h2 className="text-2xl font-bold mt-5 text-center md:text-left font-montserrat">
            {product.name}
          </h2>
          <p className="text-gray-600 mt-2 font-poppins">
            Size: <span className="font-medium">{selectedSize}</span>
          </p>
          <p className="text-gray-600 font-poppins">
            Quantity: <span className="font-medium">{quantity}</span>
          </p>

          <div className="bg-purple-50 border mt-5 border-purple-200 rounded-xl px-3 sm:px-4 py-4 w-full max-w-sm font-poppins">
            <h3 className="text-lg font-semibold mb-2 text-purple-700 font-montserrat">
              Order Receipt
            </h3>
            <div className="text-gray-800 space-y-1 text-sm">
              {product.originalPrice && (
                <p>
                  Original Price:{" "}
                  <span className="line-through text-gray-400">
                    ₹{product.originalPrice}
                  </span>{" "}
                  <span className="text-green-600 font-semibold">
                    ₹{product.price}
                  </span>{" "}
                  ({discountPercent}% off)
                </p>
              )}
              <p>
                Price: ₹{product.price} × {quantity}
              </p>
              <p>Subtotal: ₹{subtotal.toFixed(2)}</p>
              <p>Tax (12%): ₹{tax.toFixed(2)}</p>
              <p>Shipping: ₹{shipping}</p>
              <p>Convenience Fee: ₹{convenienceFee}</p>
              <p className="text-xl font-semibold mt-2 font-montserrat">
                Total: ₹{grandTotal.toFixed(2)}
              </p>
            </div>
            <p className="text-sm text-gray-600 mt-3">
              📦 Estimated Delivery: <strong>{estimatedDelivery}</strong>
            </p>
          </div>

          <button
            onClick={() => navigate("/shop")}
            className="mt-4 text-sm text-purple-600 underline hover:text-purple-800 transition"
          >
            ← Edit Product or Shop More
          </button>
        </div>

        <div className="w-full md:w-1/2 md:pl-5 font-poppins">
          <p className="text-purple-700 font-semibold mb-2 text-base">
            Step 2 of 3
          </p>

          <div className="mb-3">
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) =>
                setName(e.target.value.replace(/[^a-zA-Z\s]/g, ""))
              }
              disabled={isUserSignedIn}
              className="w-full border-2 border-gray-200 focus:border-purple-500 rounded-xl p-3"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div className="mb-3">
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Mobile Number
            </label>
            <input
              type="text"
              placeholder="Mobile Number"
              maxLength={10}
              value={mobile}
              onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
              disabled={isUserSignedIn}
              className="w-full border-2 border-gray-200 focus:border-purple-500 rounded-xl p-3"
            />
            {errors.mobile && (
              <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>
            )}
          </div>

          <div className="mb-5">
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Delivery Address
            </label>
            <textarea
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows={4}
              disabled={isUserSignedIn}
              className="w-full border-2 border-gray-200 focus:border-purple-500 rounded-xl p-3"
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">{errors.address}</p>
            )}
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white font-bold py-3 rounded-xl hover:scale-105 transition-transform font-poppins"
          >
            Proceed to Payment
          </button>

          {isUserSignedIn && (
            <button
              onClick={handleSignOut}
              className="w-full mt-3 text-purple-700 font-semibold underline hover:text-purple-900 transition font-poppins"
            >
              Sign out and use another account
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
