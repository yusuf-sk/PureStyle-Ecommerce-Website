import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaUser, FaPhoneAlt, FaHome } from "react-icons/fa";

const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { fromOrderSummary, from, product, quantity, selectedSize } =
    location.state || {};

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState({});
  const [alreadySignedUp, setAlreadySignedUp] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("userInfo");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setName(user.name);
      setMobile(user.mobile);
      setAddress(user.address);
      setAlreadySignedUp(true);
    }
  }, []);

  const handleSignup = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Please enter your name";
    if (!/^\d{10}$/.test(mobile))
      newErrors.mobile = "Enter valid 10-digit number";
    if (!address.trim()) newErrors.address = "Please enter your address";
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const newUser = {
        name: name.trim(),
        mobile,
        address: address.trim(),
      };
      sessionStorage.setItem("userInfo", JSON.stringify(newUser));
      setShowPopup(true);
      setAlreadySignedUp(true);

      if (fromOrderSummary && from === "/ordersummary") {
        setTimeout(() => {
          navigate("/ordersummary", {
            state: { product, quantity, selectedSize },
          });
        }, 4000);
      }
    }
  };

  const handleSignout = () => {
    sessionStorage.removeItem("userInfo");
    setName("");
    setMobile("");
    setAddress("");
    setErrors({});
    setAlreadySignedUp(false);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-50 px-4 pb-28 sm:pb-0 font-poppins">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md relative">
        {!alreadySignedUp && (
          <h2 className="text-2xl font-bold mb-4 text-puple-700 font-montserrat">
            Create an Account
          </h2>
        )}

        {alreadySignedUp && (
          <p className="text-green-600 text-sm mb-4 font-semibold">
            You have already signed up. Your details are pre-filled below.
          </p>
        )}

        <label className="text-sm font-semibold mb-1 flex items-center text-gray-700">
          <FaUser className="mr-2" /> Full Name
        </label>
        <input
          type="text"
          placeholder="Enter your full name"
          value={name}
          onChange={(e) =>
            !alreadySignedUp &&
            setName(e.target.value.replace(/[^a-zA-Z\s]/g, ""))
          }
          className="w-full border rounded-lg p-3 mb-2"
          disabled={alreadySignedUp}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mb-2">{errors.name}</p>
        )}

        <label className="text-sm font-semibold mb-1 flex items-center text-gray-700">
          <FaPhoneAlt className="mr-2" /> Mobile Number
        </label>
        <input
          type="text"
          placeholder="Enter your mobile number"
          maxLength={10}
          value={mobile}
          onChange={(e) =>
            !alreadySignedUp && setMobile(e.target.value.replace(/\D/g, ""))
          }
          className="w-full border rounded-lg p-3 mb-2"
          disabled={alreadySignedUp}
        />
        {errors.mobile && (
          <p className="text-red-500 text-sm mb-2">{errors.mobile}</p>
        )}

        <label className="text-sm font-semibold mb-1 flex items-center text-gray-700">
          <FaHome className="mr-2" /> Address
        </label>
        <textarea
          placeholder="Enter your address"
          value={address}
          onChange={(e) => !alreadySignedUp && setAddress(e.target.value)}
          rows={4}
          className="w-full border rounded-lg p-3 mb-2"
          disabled={alreadySignedUp}
        />
        {errors.address && (
          <p className="text-red-500 text-sm mb-2">{errors.address}</p>
        )}

        {!alreadySignedUp ? (
          <button
            onClick={handleSignup}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white font-bold py-3 rounded-lg hover:scale-105 transition-transform mt-2 font-montserrat"
          >
            Sign Up
          </button>
        ) : (
          <button
            onClick={handleSignout}
            className="w-full bg-red-500 text-white font-bold py-2 rounded-lg transition-colors mt-2 font-montserrat"
          >
            Sign Out and Use Other Account
          </button>
        )}

        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300">
            <div className="bg-gradient-to-br from-white via-gray-50 to-white p-8 rounded-3xl shadow-2xl max-w-md w-full text-center font-montserrat animate-popupZoom border border-gray-200">
              {fromOrderSummary && from === "/ordersummary" ? (
                <>
                  <div className="text-green-500 text-4xl mb-2">✅</div>
                  <h3 className="text-2xl font-extrabold text-gray-800 mb-3">
                    You’re Signed In!
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Your login was successful. We’re getting everything ready
                    for you.
                  </p>
                  <p className="text-purple-600 font-semibold text-sm animate-pulse">
                    Redirecting to your orders...
                  </p>
                </>
              ) : (
                <>
                  <div className="text-purple-600 text-4xl mb-2">🎉</div>
                  <h3 className="text-2xl font-extrabold text-gray-800 mb-2">
                    Account Created Successfully!
                  </h3>
                  <p className="text-gray-500 text-sm mb-6">
                    Thanks for signing up. Your new account is all set. Explore
                    and enjoy shopping with us!
                  </p>
                  <button
                    onClick={closePopup}
                    className=" bg-gradient-to-r from-purple-500 to-indigo-500 font-bold text-white px-6 py-2 rounded-full shadow-lg hover:shadow-xl hover:bg-purple-700 transition-all duration-200 hover:scale-105"
                  >
                    OK
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUp;
