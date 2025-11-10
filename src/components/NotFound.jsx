import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-800 to-sky-700 text-white overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center p-6"
      >
        <motion.h1
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-8xl font-extrabold tracking-tight"
        >
          404
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xl mt-4 text-slate-200"
        >
          Oops! The page you’re looking for doesn’t exist.
        </motion.p>

        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="mt-8"
        >
          <Link
            to="/"
            className="inline-block px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white text-lg font-medium hover:bg-white/20 transition"
          >
            Go Back Home
          </Link>
        </motion.div>

        {/* Floating circles */}
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -30, 0] }}
          transition={{ repeat: Infinity, duration: 5 }}
          className="absolute w-64 h-64 bg-purple-400/30 rounded-full blur-3xl top-10 left-20"
        />
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
          transition={{ repeat: Infinity, duration: 6 }}
          className="absolute w-72 h-72 bg-sky-400/30 rounded-full blur-3xl bottom-10 right-20"
        />
      </motion.div>
    </div>
  );
};

export default NotFound;
