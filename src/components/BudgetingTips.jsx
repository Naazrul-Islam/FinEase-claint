import React from "react";
import { motion } from "framer-motion";

const BudgetingTips = () => {
  return (
    <section
      className="relative py-20 overflow-hidden  text-white"
    >
      {/* Animated gradient aura */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-purple-900/60 opacity-90 blur-2xl -z-10" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto px-6 py-12 rounded-3xl relative border border-cyan-400/30 bg-black/60 backdrop-blur-2xl shadow-[0_0_30px_rgba(0,255,255,0.1)]"
      >
        {/* Title */}
        <h2 className="text-4xl font-extrabold mb-6 text-center">
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-500 bg-clip-text text-transparent">
            💰 Budgeting Tips
          </span>
        </h2>

        <p className="text-gray-300 mb-10 text-center text-lg">
          Create a roadmap for your money. Budgeting helps you take control of
          spending and build a confident financial future.
        </p>

        {/* Tips List */}
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            "Track every expense — know where your money goes.",
            "Apply the 50/30/20 rule for needs, wants & savings.",
            "Review your budget monthly for small improvements.",
            "Avoid impulse purchases — pause before buying.",
            "Automate savings and let time grow your wealth.",
            "Cut unnecessary subscriptions — save smartly.",
          ].map((tip, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="p-5 rounded-xl bg-gradient-to-br from-cyan-500/10 to-violet-500/10 border border-cyan-400/20 shadow-[0_0_20px_rgba(0,255,255,0.1)] hover:shadow-[0_0_25px_rgba(0,255,255,0.3)] transition-all"
            >
              <span className="text-cyan-400 font-semibold mr-2">•</span>
              {tip}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default BudgetingTips;
