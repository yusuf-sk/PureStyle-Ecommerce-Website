import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import categories from "../Products/categories";

const TopCategories = () => {
  const navigate = useNavigate();
  const topFour = categories.slice(0, 4);

  return (
    <section className="py-8 md:py-12 px-4 md:px-16 bg-gradient-to-b from-purple-50 to-white font-poppins">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-center text-purple-800 mb-10 font-montserrat"
      >
        Top Categories
      </motion.h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {topFour.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onClick={() =>
              navigate(
                `/categoryproducts?category=${encodeURIComponent(
                  category.name
                )}`
              )
            }
            className="relative group rounded-3xl overflow-hidden shadow-xl cursor-pointer transition-transform hover:-translate-y-2"
          >
            <div className="absolute inset-0 z-10 rounded-3xl"></div>

            <img
              src={category.image}
              alt={category.name}
              className="w-full h-48 sm:h-60 md:h-72 object-cover rounded-3xl group-hover:scale-105 transition-transform duration-500"
            />

            <div className="absolute bottom-4 left-4 z-20">
              <p className="text-2xl font-bold text-white drop-shadow-lg font-montserrat">
                {category.name}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TopCategories;
