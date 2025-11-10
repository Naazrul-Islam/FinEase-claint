import React, { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import Navber from "../components/Navber";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

const AddTransaction = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    type: "Income",
    category: "",
    amount: "",
    description: "",
    date: "",
  });

  const incomeCategories = ["Salary", "Bonus", "Investment", "Freelance", "Savings"];
  const expenseCategories = ["Food", "Shopping", "Bills", "Rent", "Travel", "Health"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const transactionData = {
      ...formData,
      amount: parseFloat(formData.amount),
      userEmail: user?.email,
      userName: user?.displayName,
    };

    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/add-transactions`, transactionData);
      Swal.fire({
        title: "✅ Success!",
        text: "Your transaction has been added successfully 🎉",
        icon: "success",
        background: "#1f1f2e",
        color: "#fff",
        confirmButtonColor: "#8B5CF6",
      });
      setFormData({ type: "Income", category: "", amount: "", description: "", date: "" });
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "❌ Error!",
        text: "Something went wrong. Please try again.",
        icon: "error",
        background: "#1f1f2e",
        color: "#fff",
        confirmButtonColor: "#EF4444",
      });
    }
  };

  const categories = formData.type === "Income" ? incomeCategories : expenseCategories;

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-blue-950 overflow-hidden text-white">
      {/* Animated background glow */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-3xl animate-ping"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.05),transparent_70%)]"></div>
      </div>

      <Navber />

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 max-w-2xl mx-auto my-20 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[2rem] p-10 shadow-[0_0_60px_rgba(168,85,247,0.25)] hover:shadow-[0_0_90px_rgba(168,85,247,0.4)] transition-all duration-700"
      >
        <h2 className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent tracking-wide">
          Add New Transaction
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Transaction Type */}
          <motion.div whileHover={{ scale: 1.02 }} className="relative">
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-5 pt-5 pb-3 rounded-2xl bg-white/10 border border-white/30 text-white focus:ring-2 focus:ring-purple-400 outline-none backdrop-blur-sm"
            >
              <option className="text-black" value="Income">Income</option>
              <option className="text-black" value="Expense">Expense</option>
            </select>
            <label className="absolute left-5 top-2 text-gray-300 text-sm">Transaction Type</label>
          </motion.div>

          {/* Category */}
          <motion.div whileHover={{ scale: 1.02 }} className="relative">
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-5 pt-5 pb-3 rounded-2xl bg-white/10 border border-white/30 text-white focus:ring-2 focus:ring-purple-400 outline-none backdrop-blur-sm"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} className="text-black" value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <label className="absolute left-5 top-2 text-gray-300 text-sm">Category</label>
          </motion.div>

          {/* Amount */}
          <motion.div whileHover={{ scale: 1.02 }} className="relative">
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Enter Amount"
              required
              className="w-full px-5 pt-5 pb-3 rounded-2xl bg-white/10 border border-white/30 text-white placeholder-white/50 focus:ring-2 focus:ring-purple-400 outline-none backdrop-blur-sm"
            />
            <label className="absolute left-5 top-2 text-gray-300 text-sm">Amount</label>
          </motion.div>

          {/* Description */}
          <motion.div whileHover={{ scale: 1.02 }} className="relative">
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Write a short note..."
              required
              className="w-full px-5 pt-5 pb-3 rounded-2xl bg-white/10 border border-white/30 text-white placeholder-white/50 focus:ring-2 focus:ring-purple-400 outline-none backdrop-blur-sm h-24 resize-none"
            />
            <label className="absolute left-5 top-2 text-gray-300 text-sm">Description</label>
          </motion.div>

          {/* Date */}
          <motion.div whileHover={{ scale: 1.02 }} className="relative">
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full px-5 pt-5 pb-3 rounded-2xl bg-white/10 border border-white/30 text-white focus:ring-2 focus:ring-purple-400 outline-none backdrop-blur-sm"
            />
            <label className="absolute left-5 top-2 text-gray-300 text-sm">Date</label>
          </motion.div>

          {/* User Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <input
              type="email"
              value={user?.email}
              readOnly
              className="w-full px-5 py-3 rounded-2xl bg-white/20 border border-white/30 text-gray-300 cursor-not-allowed"
            />
            <input
              type="text"
              value={user?.displayName}
              readOnly
              className="w-full px-5 py-3 rounded-2xl bg-white/20 border border-white/30 text-gray-300 cursor-not-allowed"
            />
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full py-3 mt-8 rounded-2xl font-semibold text-lg bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 hover:shadow-[0_0_30px_rgba(236,72,153,0.5)] transition-all duration-500"
          >
            ➕ Add Transaction
          </motion.button>
        </form>
      </motion.div>

      <Footer />
    </div>
  );
};

export default AddTransaction;
