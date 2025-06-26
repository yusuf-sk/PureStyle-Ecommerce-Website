import { useState, useRef, useEffect } from "react";
import { products } from "../Products/Products";
import { FaAngleDown, FaPlus, FaBars, FaLockOpen } from "react-icons/fa";
import { motion } from "framer-motion";

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(open ? contentRef.current.scrollHeight : 0);
    }
  }, [open]);

  return (
    <div
      className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 cursor-pointer select-none"
      onClick={() => setOpen(!open)}
      role="button"
      tabIndex={0}
      aria-expanded={open}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          setOpen(!open);
          e.preventDefault();
        }
      }}
    >
      <div
        className="flex items-center justify-between font-semibold text-gray-900 text-lg"
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      >
        {question}
        <FaAngleDown
          className={`w-6 h-6 text-purple-600 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </div>
      <div
        ref={contentRef}
        style={{
          maxHeight: height,
          transition: "max-height 0.3s ease, opacity 0.3s ease",
          opacity: open ? 1 : 0,
          overflow: "hidden",
        }}
      >
        <p
          className="mt-3 text-gray-600 text-base leading-relaxed font-poppins"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          {answer}
        </p>
      </div>
    </div>
  );
}

export default function FeaturesSection({ productId }) {
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return (
      <p className="text-center text-red-500 mt-10">
        Product not found. Please check the product ID.
      </p>
    );
  }

  const isFootwear = product.category.toLowerCase() === "footwear";

  const features = isFootwear
    ? [
        {
          title: "Product Highlights",
          items: [
            "Durable Rubber Sole with Excellent Grip",
            "Lightweight & Comfortable Fit",
            "Breathable Mesh Upper",
            "Water-resistant and Easy to Clean",
          ],
          icon: <FaPlus className="w-6 h-6 text-purple-600" />,
        },
        {
          title: "Material & Care",
          content:
            "Material: Synthetic Mesh & Rubber\nCare: Wipe with a damp cloth, air dry. Avoid machine washing.",
          icon: <FaBars className="w-6 h-6 text-purple-600" />,
        },
        {
          title: "Return & Exchange",
          content: "30-day return and exchange policy with original packaging.",
          icon: <FaLockOpen className="w-6 h-6 text-purple-600" />,
        },
      ]
    : [
        {
          title: "Product Highlights",
          items: [
            "100% Cotton, Best Fabric",
            "Regular Fit – Fits true to size",
            "Machine washable",
            "Imported – Quality Assured",
          ],
          icon: <FaPlus className="w-6 h-6 text-purple-600" />,
        },
        {
          title: "Material & Care",
          content:
            "Material: Cotton Blend\nCare: Machine wash cold, tumble dry low, do not bleach.",
          icon: <FaBars className="w-6 h-6 text-purple-600" />,
        },
        {
          title: "Return & Exchange",
          content: "Easy 7-day return and exchange policy. No questions asked.",
          icon: <FaLockOpen className="w-6 h-6 text-purple-600" />,
        },
      ];

  const faqs = isFootwear
    ? [
        {
          question: "Are these shoes waterproof?",
          answer: "They are water-resistant, but not fully waterproof.",
        },
        {
          question: "What sizes are available?",
          answer:
            "Available in sizes 6 to 12 US for men and 5 to 10 US for women.",
        },
        {
          question: "How do I clean the shoes?",
          answer: "Wipe with a damp cloth and air dry. Avoid machine washing.",
        },
        {
          question: "Is there a warranty?",
          answer: "Yes, a 6-month manufacturer warranty against defects.",
        },
        {
          question: "Can I return if they don't fit?",
          answer: "Yes, 30-day easy return and exchange policy applies.",
        },
      ]
    : [
        {
          question: "What is the return policy?",
          answer: "You can return the product within 7 days of delivery.",
        },
        {
          question: "Does it shrink after wash?",
          answer: "No, the fabric is pre-shrunk and machine safe.",
        },
        {
          question: "Is the fabric breathable?",
          answer: "Yes, 100% cotton fabric ensures breathability and comfort.",
        },
        {
          question: "Can I exchange if the size doesn't fit?",
          answer:
            "Absolutely! Easy 7-day exchange policy with no questions asked.",
        },
        {
          question: "Is the product imported?",
          answer: "Yes, this product is imported and quality assured.",
        },
        {
          question: "How should I care for this fabric?",
          answer:
            "Machine wash cold, tumble dry low, and avoid bleach to maintain quality.",
        },
      ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="max-w-7xl mx-auto px-2 sm:p-6 font-poppins grid md:grid-cols-2 gap-12"
    >
      <div className="space-y-4">
        {features.map(({ title, items, content, icon }) => (
          <div
            key={title}
            className="bg-white shadow-md rounded-lg sm:p-6 p-4 border border-gray-200 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex items-center space-x-4 mb-4">
              {icon}
              <h2
                className="text-2xl font-semibold text-gray-900"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {title}
              </h2>
            </div>
            {items && (
              <ul className="list-disc ml-3 list-inside space-y-2 text-gray-700 text-base font-poppins">
                {items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}
            {content && (
              <p
                className="whitespace-pre-line text-gray-700 text-base leading-relaxed font-poppins"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                {content}
              </p>
            )}
          </div>
        ))}
      </div>

      <div>
        <h2
          className="sm:text-3xl text-xl font-bold text-gray-900 mb-6 border-b border-purple-600 pb-2"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map(({ question, answer }, i) => (
            <FAQItem key={i} question={question} answer={answer} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}