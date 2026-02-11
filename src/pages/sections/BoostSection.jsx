import React from 'react';
import { Link } from 'react-router-dom';

const BoostSection = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-[#faf5ff] to-white">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 items-center gap-10">
          {/* Left Image */}
          <div className="flex justify-center">
            <img
              src="https://i.23robo.info/projects/smexploits/img/boost-account.webp"
              alt="Boost Account"
              className="rounded-2xl w-full max-w-md shadow-lg"
            />
          </div>

          {/* Right Text */}
          <div>
            <h3 className="text-3xl font-bold text-purple-900 mb-4">
              Boost your SocialMedia Accounts
            </h3>
            <p className="text-gray-600 mb-6">
              Welcome to our SMM Panel. In the rapidly evolving world of digital marketing,
              businesses are leveraging the power of social media to reach their target audience
              more effectively than ever before. This has given rise to a powerful tool in the
              marketer's arsenal known as Social Media Marketing or SMM. Among the various
              platforms that offer SMM services, one that stands out is
              <strong className="text-purple-700"> Fabulousboost</strong>.
            </p>
            <Link
              to="/signup"
              className="inline-block bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white font-semibold py-3 px-6 rounded-xl shadow-lg shadow-purple-500/20 transition duration-300"
            >
              Register Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BoostSection;
