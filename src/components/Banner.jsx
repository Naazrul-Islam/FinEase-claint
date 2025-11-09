import React from 'react';
import { motion}  from 'framer-motion';

const BannerSection = () => {
  return (
    <section className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 py-20 px-2 md:px-16 overflow-hidden">
      {/* Background decorative shapes */}
      <div className="absolute min-w-full inset-0 bg-[url('https://aggregate-amethyst-glspnldplv.edgeone.app/close-up-bottle-filled-coins.jpg')] bg-cover  bg-center opacity-50"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-purple-900/60 opacity-20"></div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl ">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}

          className="text-4xl md:text-6xl font-bold "
        >
          FinEase – <br /> Simplify Your Finances, Empower Your Future
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-lg md:text-xl  max-w-2xl mt-6"
        >
          Take control of your money, track your goals, and achieve financial freedom with ease.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-10"
        >
          <button className="bg-white text-indigo-700 font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-gray-100 transition">
            Get Started
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default BannerSection;
