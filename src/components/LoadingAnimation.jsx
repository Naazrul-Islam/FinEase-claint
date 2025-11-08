import React from "react";
// import { motion } from "framer-motion";

const LoadingAnimation = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
      <motion.div
        className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 1,
          ease: "linear",
        }}
      />
      <motion.p
        className="mt-4 text-gray-600 font-semibold text-lg"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        Loading...
      </motion.p>
    </div>
  );
};

export default LoadingAnimation;
