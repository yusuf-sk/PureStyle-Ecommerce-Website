import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-0.5 text-[15px]">
      {[...Array(fullStars)].map((_, i) => (
        <FaStar
          key={`full-${i}`}
          className="text-[gold] drop-shadow-[0_1px_1px_rgba(0,0,0,0.2)]"
        />
      ))}
      {hasHalfStar && (
        <FaStarHalfAlt className="text-[gold] drop-shadow-[0_1px_1px_rgba(0,0,0,0.2)]" />
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <FaRegStar key={`empty-${i}`} className="text-gray-400" />
      ))}
    </div>
  );
};

export default StarRating;
