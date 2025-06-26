import { useEffect } from "react";

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white min-h-screen font-poppins">
      <section className="py-20 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <h1
            className="text-5xl font-extrabold leading-tight"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            About Us
          </h1>
          <p
            className="mt-4 text-xl max-w-2xl mx-auto"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            We're a lifestyle e-commerce brand committed to offering trendy and
            sustainable products with a focus on quality and customer
            satisfaction.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white text-gray-900 font-poppins">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2
            className="text-4xl font-semibold text-purple-800"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Our Mission
          </h2>
          <p className="mt-6 text-lg max-w-2xl mx-auto leading-relaxed">
            At our core, we aim to provide an unparalleled shopping experience
            that seamlessly blends quality, affordability, and style. We are
            passionate about curating the latest trends and sustainable products
            for all lifestyles.
          </p>
        </div>
      </section>

      <section className="py-16 bg-gray-100 font-poppins">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2
            className="text-4xl font-semibold text-purple-800"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Our Core Values
          </h2>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
            <div className="bg-white p-8 rounded-lg shadow-xl transform transition duration-300 hover:scale-105 hover:shadow-2xl">
              <h3
                className="text-2xl font-bold text-purple-600"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Sustainability
              </h3>
              <p className="mt-4 text-lg text-black">
                We prioritize eco-friendly products and practices in every step
                of our operations. Our goal is to reduce our environmental
                impact and promote sustainability through both product design
                and business operations.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-xl transform transition duration-300 hover:scale-105 hover:shadow-2xl">
              <h3
                className="text-2xl font-bold text-purple-600"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Innovation
              </h3>
              <p className="mt-4 text-lg text-black">
                Staying ahead of trends and always looking for new ways to
                innovate, we bring fresh and unique solutions to our customers.
                We embrace change and continuously work towards enhancing the
                shopping experience.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-xl transform transition duration-300 hover:scale-105 hover:shadow-2xl">
              <h3
                className="text-2xl font-bold text-purple-600"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Customer First
              </h3>
              <p className="mt-4 text-lg text-black">
                Our customers are the foundation of everything we do. We strive
                to provide exceptional service, personalized experiences, and
                high-quality products to meet their needs and exceed
                expectations.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white font-poppins">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2
            className="text-4xl font-semibold text-purple-800"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Meet Our Team
          </h2>
          <p className="mt-6 text-lg max-w-2xl mx-auto">
            Our team is comprised of dynamic individuals from diverse
            backgrounds, each bringing their expertise to make this vision a
            reality.
          </p>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
            <div className="bg-white p-8 rounded-lg shadow-xl">
              <img
                src="https://randomuser.me/api/portraits/men/1.jpg"
                alt="Team Member"
                className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-purple-600"
              />
              <h3
                className="text-xl font-semibold mt-4 text-purple-700"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Justin Langer
              </h3>
              <p className="mt-2 text-lg text-purple-500">Founder & CEO</p>
              <p className="mt-4 text-gray-700">
                Justin is passionate about revolutionizing the lifestyle
                industry, bringing the latest fashion trends with an emphasis on
                sustainability.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-xl">
              <img
                src="https://randomuser.me/api/portraits/women/2.jpg"
                alt="Team Member"
                className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-purple-600"
              />
              <h3
                className="text-xl font-semibold mt-4 text-purple-700"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Jane Smith
              </h3>
              <p className="mt-2 text-lg text-purple-500">Head of Marketing</p>
              <p className="mt-4 text-gray-700">
                Jane is the mastermind behind our marketing strategies and
                ensures that our brand connects with customers on a deeper
                level.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-xl">
              <img
                src="https://randomuser.me/api/portraits/men/3.jpg"
                alt="Team Member"
                className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-purple-600"
              />
              <h3
                className="text-xl font-semibold mt-4 text-purple-700"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Mike Johnson
              </h3>
              <p className="mt-2 text-lg text-purple-500">Product Manager</p>
              <p className="mt-4 text-gray-700">
                Mike manages our product selection process, ensuring that we
                always offer top-quality, trendy, and eco-conscious items.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-purple-600 to-purple-800 text-white text-center font-poppins">
        <div className="max-w-7xl mx-auto px-4">
          <h2
            className="text-4xl font-semibold"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Let's Connect
          </h2>
          <p className="mt-4 text-lg max-w-2xl mx-auto">
            Have any questions or just want to chat? We'd love to hear from you!
          </p>
          <a
            href="mailto:contact@mystyle.com"
            className="mt-6 inline-block bg-yellow-400 text-gray-900 py-3 px-8 rounded-full font-semibold text-lg hover:bg-yellow-500 transition duration-300"
          >
            Email Us
          </a>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
