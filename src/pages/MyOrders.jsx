import { useOrder } from "../context/OrderContext";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const MyOrders = () => {
  const { orders, deleteOrder } = useOrder();
  const navigate = useNavigate();

  const [showPopup, setShowPopup] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getShortOrderId = (index) => `#${104527897 + index}`;

  const handleCardClick = (product) => {
    navigate(`/orderdetails/${product.id}`, { state: product });
  };

  const confirmDelete = (id) => {
    setOrderToDelete(id);
    setShowPopup(true);
  };

  const handleDeleteConfirmed = () => {
    deleteOrder(orderToDelete);
    setShowPopup(false);
    setOrderToDelete(null);
  };

  const handleCancelDelete = () => {
    setShowPopup(false);
    setOrderToDelete(null);
  };

  return (
    <div className="min-h-screen bg-white py-3 sm:py-6 md:mt-0 mt-4 px-4 sm:px-6 lg:px-8 md:pt-24 md:pb-0 pb-20 font-poppins">
      <h1 className="md:text-4xl text-3xl font-extrabold text-center text-purple-800 mb-2 font-montserrat">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <div className="text-center text-gray-600 text-lg">
          <p className="max-w-lg mx-auto">
            You haven’t placed any orders yet. Start shopping to fill your cart!
          </p>
          <button
            onClick={() => navigate("/shop")}
            className="mt-6 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold py-2 px-5 rounded-lg transition-all "
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {orders.map((order, index) => (
            <div
              key={order.id}
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-800 font-montserrat">
                    Order ID:{" "}
                    <span className="text-sm text-gray-500 font-poppins">
                      {getShortOrderId(index)}
                    </span>
                  </h2>
                  <span
                    className={`bg-${
                      order.paymentStatus === "success" ? "green" : "red"
                    }-100 text-${
                      order.paymentStatus === "success" ? "green" : "red"
                    }-700 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1`}
                  >
                    {order.paymentStatus === "success" ? (
                      <FaCheckCircle />
                    ) : (
                      <FaTimesCircle />
                    )}
                    {order.paymentStatus}
                  </span>
                </div>

                <p className="text-sm text-gray-500 mb-4">{order.date}</p>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-700 mb-2 font-montserrat">
                    Buyer Information
                  </h4>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Name: </span>
                    {order.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Address: </span>
                    {order.address}
                  </p>
                </div>

                <div className="border-t pt-4">
                  {order.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-4 mb-4 cursor-pointer"
                      onClick={() => handleCardClick(item)}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg border border-gray-200 hover:scale-105 transition-transform duration-200"
                      />
                      <div className="flex flex-col">
                        <h3 className="text-md font-semibold text-gray-700 font-montserrat">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Qty: {item.quantity}
                        </p>
                        <p className="text-sm text-gray-600">
                          ₹{item.price * item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-800 font-montserrat">
                      Grand Total Paid:
                    </span>
                    <span className="text-xl font-bold text-gray-800 font-montserrat">
                      ₹{order.grandTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="flex justify-center gap-4 mt-6">
                  <button
                    onClick={() => navigate("/shop")}
                    className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold py-2 px-3 rounded-lg transition-all duration-300 hover:scale-105"
                  >
                    Shop More
                  </button>

                  <button
                    onClick={() => confirmDelete(order.id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-3 rounded-lg transition-all duration-300 hover:scale-105"
                  >
                    Delete Order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl p-8 w-[90%] max-w-md shadow-2xl text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 font-montserrat">
              Are you sure?
            </h2>
            <p className="text-gray-600 text-sm mb-6">
              This action will permanently delete your order. You cannot undo
              this.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleCancelDelete}
                className="px-5 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirmed}
                className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
