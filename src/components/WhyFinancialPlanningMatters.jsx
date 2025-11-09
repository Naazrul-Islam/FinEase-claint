import React from "react";
import { motion } from "framer-motion";

const WhyFinancialPlanningMatters = () => {
  return (
    <section className="relative py-20 overflow-hidden bg-black text-white">
      {/* Background aura */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#f472b61a] via-[#9333ea1a] to-[#06b6d41a] blur-3xl -z-10" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto px-6 py-12 rounded-3xl relative border border-pink-400/30 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-2xl shadow-[0_0_30px_rgba(255,0,255,0.1)]"
      >
        {/* Title */}
        <h2 className="text-4xl font-extrabold mb-6 text-center">
          <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            💡 Why Financial Planning Matters
          </span>
        </h2>

        <p className="text-gray-300 mb-10 text-center text-lg">
          Financial planning turns your goals into actionable steps.
          It’s not about restriction — it’s about direction.
        </p>

        {/* Animated Cards */}
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            "Gives peace of mind and reduces money stress.",
            "Helps you achieve milestones like travel or home buying.",
            "Prepares you for emergencies and unexpected costs.",
            "Encourages smarter, long-term decision-making.",
            "Builds lasting wealth through consistent habits.",
            "Creates clarity — know what truly matters.",
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="p-5 rounded-xl bg-gradient-to-br from-pink-500/10 to-cyan-500/10 border border-pink-400/20 shadow-[0_0_20px_rgba(255,0,255,0.1)] hover:shadow-[0_0_25px_rgba(255,0,255,0.3)] transition-all"
            >
              <span className="text-pink-400 font-semibold mr-2">•</span>
              {item}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default WhyFinancialPlanningMatters;
