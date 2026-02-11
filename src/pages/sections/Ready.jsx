import { Link } from 'react-router-dom';

const RiseSocial = () => {
  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 rise-social bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left Image */}
        <div className="rise-social__image">
          <img
            className="w-full h-auto rounded-2xl shadow-lg"
            src="https://i.23robo.info/projects/smexploits/img/social.webp"
            alt="Social Media"
          />
        </div>

        {/* Right Content */}
        <div>
          <h3 className="text-3xl sm:text-4xl font-bold text-purple-900 mb-4">
            Get Ready to Resell Social Media
          </h3>
          <p className="text-gray-600 leading-relaxed mb-6">
            Our reseller panel allows influencers, marketing enthusiasts, and digital marketing agencies to
            buy our services at wholesale prices. Whether it's Twitter followers, Soundcloud likes, or
            YouTube views, you can resell them at a profit. With us, you have a chance to start a profitable
            online business with minimal investment.
          </p>

         <div className="text-left sm:text-start">
         <Link to="/services"
          className="inline-block bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-purple-500/20 transition duration-300"
         >
         See All Services
       </Link>
       </div>
        </div>
      </div>
    </div>
  );
};

export default RiseSocial;
