import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function SignUpSection() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center py-12 mt-2 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white font-poppins"
    >
      <h3 className="text-2xl font-bold mb-2 font-montserrat">
        Limited Time Offer!
      </h3>
      <p className="mb-4">Sign up today and get 10% off your first order.</p>
      <button
        onClick={() => navigate("/signup")}
        className="px-6 py-2 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transition-all duration-300"
      >
        Sign Up
      </button>
    </motion.div>
  );
}
