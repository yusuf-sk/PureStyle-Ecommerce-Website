import { motion } from "framer-motion";
import {
  Truck,
  RotateCcw,
  ShieldCheck,
  Headphones,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    icon: (
      <Truck className="w-12 h-12 text-purple-600 group-hover:scale-110 transition-transform" />
    ),
    title: "Fast Delivery",
    description:
      "Get your orders delivered swiftly and safely across the country.",
  },
  {
    icon: (
      <RotateCcw className="w-12 h-12 text-purple-600 group-hover:rotate-12 transition-transform" />
    ),
    title: "Easy Returns",
    description:
      "Not satisfied? Enjoy hassle-free 7-day returns and exchanges.",
  },
  {
    icon: (
      <ShieldCheck className="w-12 h-12 text-purple-600 group-hover:scale-105 transition-transform" />
    ),
    title: "Secure Payment",
    description:
      "Shop with confidence through our encrypted, secure payment system.",
  },
  {
    icon: (
      <Headphones className="w-12 h-12 text-purple-600 group-hover:animate-bounce transition-transform" />
    ),
    title: "24/7 Support",
    description: "We’re here to help anytime you need, day or night.",
  },
];

export default function ChooseUs() {
  return (
    <section className="relative py-12  px-6 bg-gradient-to-b from-white to-gray-50 text-center overflow-hidden font-poppins">
      <div className="absolute top-[-100px] right-[-100px] w-[300px] h-[300px] bg-white rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse" />

      <motion.h2
        className="text-4xl font-bold mb-14 text-purple-800 font-montserrat"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Why Choose Us
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto z-10 relative">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 flex flex-col items-center text-center gap-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.5 }}
            viewport={{ once: true }}
          >
            {feature.icon}
            <h3 className="text-xl font-semibold text-gray-800 font-montserrat">
              {feature.title}
            </h3>
            <p className="text-gray-600">{feature.description}</p>
            <button className="mt-3 text-purple-600 flex items-center gap-1 hover:underline">
              Learn More <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
