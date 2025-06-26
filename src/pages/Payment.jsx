import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaCreditCard,
  FaUniversity,
  FaMobileAlt,
  FaArrowLeft,
} from "react-icons/fa";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { product, quantity, name, grandTotal, address, lastPaymentMethod } =
    location.state || {};

  const getInitialMethod = () => {
    return (
      sessionStorage.getItem("selectedPaymentMethod") || lastPaymentMethod || ""
    );
  };

  const [selectedMethod, setSelectedMethod] = useState(getInitialMethod);
  const [processing, setProcessing] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardErrors, setCardErrors] = useState({});

  const [upiId, setUpiId] = useState("");
  const [upiError, setUpiError] = useState("");

  const [accNumber, setAccNumber] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [bankErrors, setBankErrors] = useState({});
  const [bankName, setBankName] = useState("");
  const [bankHolder, setBankHolder] = useState("");

  const steps = [
    "Initializing secure payment...",
    "Fetching Your Bank Details Securely.",
    `Paying ₹${grandTotal?.toFixed(2)}...`,
  ];

  useEffect(() => {
    if (processing) {
      let index = 0;
      const interval = setInterval(() => {
        setStepIndex(index);
        index++;
        if (index >= steps.length) {
          clearInterval(interval);
        }
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [processing]);

  useEffect(() => {
    if (selectedMethod) {
      sessionStorage.setItem("selectedPaymentMethod", selectedMethod);
    }
  }, [selectedMethod]);

  const handleBack = () => {
    setSelectedMethod("");
    sessionStorage.removeItem("selectedPaymentMethod");
  };

  const formatCardNumber = (value) => {
    return value
      .replace(/\s?/g, "")
      .replace(/(\d{4})/g, "$1 ")
      .trim();
  };

  const handleExpiryChange = (e) => {
    let input = e.target.value.replace(/\D/g, "").slice(0, 4);

    let formatted = input;

    if (input.length >= 2) {
      let month = input.slice(0, 2);

      if (parseInt(month) > 12) month = "12";
      if (parseInt(month) === 0) month = "01";

      const year = input.slice(2, 4);
      formatted = month + (year ? "/" + year : "");
    }

    setExpiry(formatted);
  };

  const validateCard = () => {
    const errors = {};

    if (!cardName.trim()) {
      errors.cardName = "Please enter cardholder name.";
    }

    const plainCardNumber = cardNumber.replace(/\s/g, "");
    if (plainCardNumber.length !== 16) {
      errors.cardNumber = "Enter valid 16-digit card number.";
    }

    if (expiry.length !== 5 || !/^\d{2}\/\d{2}$/.test(expiry)) {
      errors.expiry = "Enter valid expiry in MM/YY format.";
    } else {
      const [mm, yy] = expiry.split("/").map(Number);

      if (mm < 1 || mm > 12) {
        errors.expiry = "Enter valid month between 01 and 12.";
      } else {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear() % 100;
        const currentMonth = currentDate.getMonth() + 1;

        if (yy < currentYear || (yy === currentYear && mm < currentMonth)) {
          errors.expiry = "Card expired.";
        }
      }
    }

    if (cvv.length !== 3 || !/^\d{3}$/.test(cvv)) {
      errors.cvv = "Enter valid 3-digit CVV.";
    }

    setCardErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const validateUPI = () => {
    if (!upiId.trim() || !upiId.includes("@")) {
      setUpiError("Enter valid UPI ID.");
      return false;
    }
    setUpiError("");
    return true;
  };

  const validateBank = () => {
    const errors = {};
    if (!bankHolder.trim()) errors.bankHolder = "Enter account holder name.";
    if (!bankName.trim()) errors.bankName = "Enter bank name.";
    if (!accNumber.trim() || accNumber.length < 8)
      errors.accNumber = "Enter valid account number.";
    if (!ifsc.trim() || ifsc.length < 8) errors.ifsc = "Enter valid IFSC code.";
    setBankErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    let isValid = false;
    if (selectedMethod === "card") isValid = validateCard();
    if (selectedMethod === "upi") isValid = validateUPI();
    if (selectedMethod === "bank") isValid = validateBank();

    if (isValid) {
      setProcessing(true);
      setTimeout(() => {
        navigate("/successpopup", {
          state: {
            product,
            quantity,
            name,
            address,
            grandTotal,
            lastPaymentMethod: selectedMethod,
          },
        });
      }, 6000);
    }
  };

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen font-poppins">
        <h1 className="text-2xl font-bold text-gray-600 font-montserrat">
          No Payment Details!
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-28 sm:pb-8 font-poppins flex flex-col items-center justify-center bg-gradient-to-br from-[#f3e5f5] to-[#e1bee7] p-3 sm:p-6 md:pt-20">
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-4 sm:p-6 max-w-lg w-full transition-all duration-300">
        <p className="text-purple-700 font-semibold mb-2 text-sm text-center">
          Step 3 of 3
        </p>
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-5 font-montserrat">
          Secure Payment
        </h1>

        {selectedMethod && (
          <p className="text-center font-semibold text-purple-600 mb-6 font-montserrat">
            Selected Method - {selectedMethod.toUpperCase()}
          </p>
        )}

        {processing ? (
          <div className="flex flex-col items-center justify-center py-16 space-y-6 font-montserrat">
            <div className="relative">
              <div className="h-20 w-20 rounded-full border-4 border-t-purple-600 border-b-purple-300 border-l-transparent border-r-transparent animate-spin shadow-lg"></div>
            </div>

            <div className="text-center">
              <p className="text-lg font-semibold text-purple-700 fade-in-slide">
                {steps[stepIndex]}
              </p>
            </div>
          </div>
        ) : (
          <>
            {!selectedMethod ? (
              <div className="flex flex-col gap-4">
                <button
                  onClick={() => setSelectedMethod("card")}
                  className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl shadow hover:scale-105 transition"
                >
                  <FaCreditCard className="text-purple-500 text-lg" />
                  <span className="font-semibold text-gray-700">
                    Pay with Card
                  </span>
                </button>
                <button
                  onClick={() => setSelectedMethod("upi")}
                  className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl shadow hover:scale-105 transition"
                >
                  <FaMobileAlt className="text-purple-500 text-lg" />
                  <span className="font-semibold text-gray-700">
                    Pay with UPI ID
                  </span>
                </button>
                <button
                  onClick={() => setSelectedMethod("bank")}
                  className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl shadow hover:scale-105 transition"
                >
                  <FaUniversity className="text-purple-500 text-lg" />
                  <span className="font-semibold text-gray-700">
                    Bank Transfer
                  </span>
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={handleBack}
                  className="mb-4 text-purple-600 hover:text-purple-800 flex items-center"
                >
                  <FaArrowLeft className="mr-1" />
                </button>

                {selectedMethod === "card" && (
                  <>
                    <input
                      type="text"
                      placeholder="Cardholder Name"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      className="w-full mb-2 p-3 rounded-lg border"
                    />
                    {cardErrors.cardName && (
                      <p className="text-red-500 text-sm mb-2">
                        {cardErrors.cardName}
                      </p>
                    )}

                    <input
                      type="text"
                      placeholder="Card Number"
                      value={cardNumber}
                      onChange={(e) =>
                        setCardNumber(formatCardNumber(e.target.value))
                      }
                      maxLength="19"
                      className="w-full mb-2 p-3 rounded-lg border"
                    />
                    {cardErrors.cardNumber && (
                      <p className="text-red-500 text-sm mb-2">
                        {cardErrors.cardNumber}
                      </p>
                    )}

                    <div className="flex gap-4 mb-2">
                      <div className="w-1/2">
                        <input
                          type="text"
                          placeholder="Expiry (MM/YY)"
                          value={expiry}
                          onChange={handleExpiryChange}
                          maxLength="5"
                          className="w-full p-3 rounded-lg border"
                        />

                        {cardErrors.expiry && (
                          <p className="text-red-500 text-sm mt-1">
                            {cardErrors.expiry}
                          </p>
                        )}
                      </div>
                      <div className="w-1/2">
                        <input
                          type="password"
                          placeholder="CVV"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value)}
                          maxLength="3"
                          className="w-full p-3 rounded-lg border"
                        />
                        {cardErrors.cvv && (
                          <p className="text-red-500 text-sm mt-1">
                            {cardErrors.cvv}
                          </p>
                        )}
                      </div>
                    </div>
                  </>
                )}

                {selectedMethod === "upi" && (
                  <>
                    <input
                      type="text"
                      placeholder="Enter UPI ID"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="w-full mb-2 p-3 rounded-lg border"
                    />
                    {upiError && (
                      <p className="text-red-500 text-sm mb-2">{upiError}</p>
                    )}
                  </>
                )}

                {selectedMethod === "bank" && (
                  <>
                    <input
                      type="text"
                      placeholder="Account Holder Name"
                      value={bankHolder}
                      onChange={(e) => setBankHolder(e.target.value)}
                      className="w-full mb-2 p-3 rounded-lg border"
                    />
                    {bankErrors.bankHolder && (
                      <p className="text-red-500 text-sm mb-2">
                        {bankErrors.bankHolder}
                      </p>
                    )}

                    <input
                      type="text"
                      placeholder="Bank Name"
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                      className="w-full mb-2 p-3 rounded-lg border"
                    />
                    {bankErrors.bankName && (
                      <p className="text-red-500 text-sm mb-2">
                        {bankErrors.bankName}
                      </p>
                    )}

                    <input
                      type="text"
                      placeholder="Account Number"
                      value={accNumber}
                      onChange={(e) => setAccNumber(e.target.value)}
                      className="w-full mb-2 p-3 rounded-lg border"
                    />
                    {bankErrors.accNumber && (
                      <p className="text-red-500 text-sm mb-2">
                        {bankErrors.accNumber}
                      </p>
                    )}

                    <input
                      type="text"
                      placeholder="IFSC Code"
                      value={ifsc}
                      onChange={(e) => setIfsc(e.target.value)}
                      className="w-full mb-2 p-3 rounded-lg border"
                    />
                    {bankErrors.ifsc && (
                      <p className="text-red-500 text-sm mb-2">
                        {bankErrors.ifsc}
                      </p>
                    )}
                  </>
                )}

                <div className="bg-white rounded-xl p-4 my-4 shadow-md">
                  <p className="font-bold text-gray-800 mb-2 font-montserrat">
                    Order Summary
                  </p>
                  <p className="text-gray-600 text-sm">
                    Product: {product?.name}
                  </p>
                  <p className="text-gray-600 text-sm">Quantity: {quantity}</p>
                  <p className="text-gray-800 font-semibold mt-2 font-montserrat">
                    Total: ₹{grandTotal?.toFixed(2)}
                  </p>
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-pink-400 to-purple-500 text-white font-bold py-3 rounded-2xl hover:scale-105 hover:shadow-lg transition-all"
                >
                  Pay ₹{grandTotal?.toFixed(2)}
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Payment;
