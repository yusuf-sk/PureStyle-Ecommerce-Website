import { useState } from "react";
import allReviews from "../Products/allReviews";
import { motion } from "framer-motion";

const Star = ({ filled, onClick }) => (
  <span
    onClick={onClick}
    className={`cursor-pointer text-2xl transition-colors ${
      filled ? "text-yellow-400" : "text-gray-300"
    }`}
  >
    ★
  </span>
);

const ReviewSection = () => {
  const [newReview, setNewReview] = useState("");
  const [selectedRating, setSelectedRating] = useState(0);
  const [reviews, setReviews] = useState(allReviews);
  const [visibleCount, setVisibleCount] = useState(3);
  const [showPopup, setShowPopup] = useState(false);

  const handleReviewSubmit = () => {
    if (!newReview.trim() || selectedRating === 0) return;

    const newReviewObj = {
      name: "You",
      rating: selectedRating,
      review: newReview.trim(),
      date: new Date().toISOString().split("T")[0],
    };

    setReviews([newReviewObj, ...reviews]);
    setNewReview("");
    setSelectedRating(0);
    setShowPopup(true);

    setTimeout(() => setShowPopup(false), 3000);
  };

  const toggleView = () => {
    setVisibleCount((prev) => (prev === 3 ? reviews.length : 3));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="max-w-7xl pb-12 sm:pb-0 mx-auto sm:p-6 p-4 bg-white rounded-lg shadow-md relative"
    >
      <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>

      {showPopup && (
        <div className="absolute top-4 right-4 bg-green-100 text-green-800 px-4 py-2 rounded shadow-lg transition">
          Your review has been submitted successfully!
        </div>
      )}

      <div className="mb-8">
        <div className="mb-3 flex items-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              filled={star <= selectedRating}
              onClick={() => setSelectedRating(star)}
            />
          ))}
        </div>

        <textarea
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
          rows="3"
          placeholder="Write your review here..."
        ></textarea>

        <button
          onClick={handleReviewSubmit}
          className="mt-3 bg-purple-600 text-white px-5 py-2 rounded hover:bg-purple-700 transition"
        >
          Submit Review
        </button>
      </div>

      <div className="space-y-6">
        {reviews.slice(0, visibleCount).map((rev, idx) => (
          <div key={idx} className="border-t pt-4">
            <div className="flex items-center mb-2">
              <img
                src={rev.avatar}
                alt={rev.name}
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <p className="font-semibold">{rev.name}</p>
                <div className="text-yellow-400 text-sm">
                  {"★".repeat(rev.rating)}
                  <span className="text-gray-300">
                    {"★".repeat(5 - rev.rating)}
                  </span>
                </div>
                <p className="text-gray-500 text-xs">{rev.date}</p>
              </div>
            </div>
            <p className="text-gray-700 mt-3">{rev.review}</p>
          </div>
        ))}
      </div>

      {reviews.length > 3 && (
        <div className="mt-6 text-center">
          <button
            onClick={toggleView}
            className="text-purple-600 font-semibold hover:underline"
          >
            {visibleCount === 3 ? "View More Reviews" : "View Less"}
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default ReviewSection;
