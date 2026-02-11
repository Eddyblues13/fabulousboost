import React from 'react';
import { Link } from 'react-router-dom';

const GetStarted = () => {
  return (
    <div className="py-20 bg-gradient-to-b from-[#faf5ff] to-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl p-10 border border-purple-100 shadow-sm">
          <h4 className="text-3xl font-bold text-purple-900 mb-4">Ready To Grow Your Socials?</h4>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Fabulousboost.com gives you instant access to real social media growth.
            Whether you are boosting a personal brand or running client campaigns, our panel offers fast, affordable services that get results with no stress and no guesswork.
          </p>
          <div className="flex justify-center">
            <Link
              to="/signup"
              className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white font-semibold px-8 py-3.5 rounded-xl shadow-lg shadow-purple-500/20 transition-all duration-300"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
