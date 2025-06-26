import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { useEffect } from "react";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  message: yup.string().required("Message is required"),
});

const ContactUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    toast.success("Message sent successfully!");
    reset();
  };

  return (
    <div className="bg-white text-gray-800 md:pt-20 font-poppins">
      <ToastContainer position="top-right" />

      <div className="bg-violet-100 py-12 text-center">
        <h1 className="text-4xl font-bold mb-2 text-gray-800 font-montserrat">
          Get in Touch
        </h1>
        <p className="text-lg text-purple-600 font-poppins">
          We’d love to hear from you!
        </p>
      </div>

      <div className="container mx-auto px-6 py-12 grid lg:grid-cols-2 gap-10">
        <motion.div
          className="bg-white p-8 shadow-lg rounded-2xl font-poppins"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold mb-6 text-gray-700 font-montserrat">
            Send Us a Message
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm mb-1 text-gray-700 font-poppins">
                Full Name
              </label>
              <input
                {...register("name")}
                className="w-full px-4 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring focus:ring-purple-300 font-poppins"
                placeholder="Your name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1 font-poppins">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm mb-1 text-gray-700 font-poppins">
                Email
              </label>
              <input
                {...register("email")}
                className="w-full px-4 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring focus:ring-purple-300 font-poppins"
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1 font-poppins">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm mb-1 text-gray-700 font-poppins">
                Message
              </label>
              <textarea
                {...register("message")}
                rows="5"
                className="w-full px-4 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring focus:ring-purple-300 font-poppins"
                placeholder="Write your message..."
              />
              {errors.message && (
                <p className="text-red-500 text-sm mt-1 font-poppins">
                  {errors.message.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 font-poppins"
            >
              Send Message
            </button>
          </form>
        </motion.div>

        <motion.div
          className="bg-violet-50 p-8 rounded-2xl shadow-md flex flex-col justify-between font-poppins"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <Phone className="text-purple-600" />
              <div>
                <p className="font-medium font-montserrat">Phone</p>
                <p className="text-sm text-gray-600 font-poppins">
                  +91 98765 43210
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Mail className="text-purple-600" />
              <div>
                <p className="font-medium font-montserrat">Email</p>
                <p className="text-sm text-gray-600 font-poppins">
                  support@yourstore.com
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <MapPin className="text-purple-600" />
              <div>
                <p className="font-medium font-montserrat">Location</p>
                <p className="text-sm text-gray-600 font-poppins">
                  123 E-Shop Street, Pune, Maharashtra, India
                </p>
              </div>
            </div>

            <div>
              <p className="font-medium font-montserrat">Office Hours</p>
              <p className="text-sm text-gray-600 font-poppins">
                Mon - Fri: 9 AM – 6 PM
              </p>
            </div>

            <div>
              <p className="font-medium mb-1 font-montserrat">
                Connect with us
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-purple-600 hover:text-purple-800">
                  <Facebook />
                </a>
                <a href="#" className="text-purple-500 hover:text-purple-700">
                  <Instagram />
                </a>
                <a href="#" className="text-purple-700 hover:text-purple-900">
                  <Linkedin />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <iframe
              className="w-full h-64 rounded-md"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.9371783708196!2d73.85674381489343!3d18.520430187404994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c08338e595d1%3A0xe4434795e9a735b6!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1618911342163!5m2!1sen!2sin"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Store Location"
            ></iframe>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactUs;
