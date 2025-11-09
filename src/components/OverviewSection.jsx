import React, { useEffect, useState } from "react";
import axios from "axios";
import LoadingAnimation from "./LoadingAnimation";
import { motion } from "framer-motion";
import { FaArrowTrendUp, FaArrowTrendDown, FaWallet } from "react-icons/fa6";

const OverviewSection = () => {
  const [data, setData] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    totalBalance: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const res = await axios.get("http://localhost:3000/transactions");
        setData(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchOverview();
  }, []);

  if (loading) return <LoadingAnimation />;

  const cards = [
    {
      title: "Total Income",
      value: `৳${data.totalIncome}`,
      icon: <FaArrowTrendUp className="text-green-400 text-4xl mb-3" />,
      color: "from-green-400/20 to-emerald-600/10",
      border: "border-green-400/40",
      glow: "shadow-[0_0_40px_rgba(34,197,94,0.25)]",
    },
    {
      title: "Total Expenses",
      value: `৳${data.totalExpenses}`,
      icon: <FaArrowTrendDown className="text-red-400 text-4xl mb-3" />,
      color: "from-red-400/20 to-rose-600/10",
      border: "border-red-400/40",
      glow: "shadow-[0_0_40px_rgba(248,113,113,0.25)]",
    },
    {
      title: "Total Balance",
      value: `৳${data.totalBalance}`,
      icon: <FaWallet className="text-blue-400 text-4xl mb-3" />,
      color: "from-blue-400/20 to-cyan-600/10",
      border: "border-blue-400/40",
      glow: "shadow-[0_0_40px_rgba(59,130,246,0.25)]",
    },
  ];

  return (
    <section className="relative py-16 bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden">
      {/* Subtle animated background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.15),transparent_60%)] blur-3xl -z-10"></div>

      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl md:text-5xl font-extrabold text-center mb-10"
      >
        <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Financial Overview
        </span>
      </motion.h1>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
        {cards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2, duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className={`relative p-8 rounded-3xl backdrop-blur-xl bg-gradient-to-br ${card.color} border ${card.border} ${card.glow} hover:scale-105 transition-transform duration-500 hover:shadow-[0_0_50px_rgba(255,255,255,0.1)]`}
          >
            <div className="flex flex-col items-center justify-center text-center">
              {card.icon}
              <h2 className="text-xl font-semibold mb-2">{card.title}</h2>
              <p className="text-3xl font-bold tracking-wide">{card.value}</p>
            </div>

            {/* glowing border animation */}
            <div className="absolute inset-0 rounded-3xl border border-white/10 pointer-events-none"></div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default OverviewSection;
