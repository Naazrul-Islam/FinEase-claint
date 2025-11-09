import React, { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import Navber from "../components/Navber";
import Footer from "../components/Footer";

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
      email: user?.email,
      name: user?.displayName,
    };
    try {
      await axios.post("http://localhost:3000/transactions", transactionData);
      Swal.fire({
        title: "Success!",
        text: "Transaction added successfully 🎉",
        icon: "success",
        confirmButtonColor: "#8B5CF6",
      });
      setFormData({ type: "Income", category: "", amount: "", description: "", date: "" });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonColor: "#EF4444",
      });
    }
  };

  const categories = formData.type === "Income" ? incomeCategories : expenseCategories;

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 overflow-hidden">
      {/* Background Image + Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://romantic-violet-ggozkl8svj.edgeone.app/portrait-minded-man-pointing-his-mind-about-money.jpg"
          alt="Background"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/70 via-purple-900/70 to-blue-900/70"></div>
      </div>

      <Navber />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-xl mx-auto my-16 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-10 shadow-[0_0_40px_rgba(255,255,255,0.1)]"
      >
        <h2 className="text-3xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400">
          Add Transaction
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Type */}
          <div className="relative w-full">
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="peer w-full px-5 pt-5 pb-2 rounded-2xl bg-gradient-to-r from-white/10 to-white/5 border border-white/30 text-white placeholder-transparent outline-none focus:ring-2 focus:ring-purple-400 backdrop-blur-md shadow-[inset_0_0_10px_rgba(255,255,255,0.1)] transition-all duration-300"
            >
              <option className="text-black" value="Income">Income</option>
              <option className="text-black" value="Expense">Expense</option>
            </select>
            <label className="absolute left-5 top-2 text-gray-400 text-sm transition-all peer-focus:top-1 peer-focus:text-gray-300 peer-focus:text-sm">
              Type
            </label>
          </div>

          {/* Category */}
          <div className="relative w-full">
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="peer w-full px-5 pt-5 pb-2 rounded-2xl bg-gradient-to-r from-white/10 to-white/5 border border-white/30 text-white placeholder-transparent outline-none focus:ring-2 focus:ring-purple-400 backdrop-blur-md shadow-[inset_0_0_10px_rgba(255,255,255,0.1)] transition-all duration-300"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} className="text-black" value={cat}>{cat}</option>
              ))}
            </select>
            <label className="absolute left-5 top-2 text-gray-400 text-sm transition-all peer-focus:top-1 peer-focus:text-gray-300 peer-focus:text-sm">
              Category
            </label>
          </div>

          {/* Amount */}
          <div className="relative w-full">
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Amount"
              required
              className="peer w-full px-5 pt-5 pb-2 rounded-2xl bg-gradient-to-r from-white/10 to-white/5 border border-white/30 text-white placeholder-transparent outline-none focus:ring-2 focus:ring-purple-400 backdrop-blur-md shadow-[inset_0_0_10px_rgba(255,255,255,0.1)] transition-all duration-300"
            />
            <label className="absolute left-5 top-2 text-gray-400 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-white/50 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-gray-300 peer-focus:text-sm">
              Amount
            </label>
          </div>

          {/* Description */}
          <div className="relative w-full">
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              required
              className="peer w-full px-5 pt-5 pb-2 rounded-2xl bg-gradient-to-r from-white/10 to-white/5 border border-white/30 text-white placeholder-transparent outline-none focus:ring-2 focus:ring-purple-400 backdrop-blur-md shadow-[inset_0_0_10px_rgba(255,255,255,0.1)] transition-all duration-300"
            />
            <label className="absolute left-5 top-2 text-gray-400 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-white/50 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-gray-300 peer-focus:text-sm">
              Description
            </label>
          </div>

          {/* Date */}
          <div className="relative w-full">
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="peer w-full px-5 pt-5 pb-2 rounded-2xl bg-gradient-to-r from-white/10 to-white/5 border border-white/30 text-white placeholder-transparent outline-none focus:ring-2 focus:ring-purple-400 backdrop-blur-md shadow-[inset_0_0_10px_rgba(255,255,255,0.1)] transition-all duration-300"
            />
            <label className="absolute left-5 top-2 text-gray-400 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-white/50 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-gray-300 peer-focus:text-sm">
              Date
            </label>
          </div>

          {/* User Email */}
          <div className="relative w-full">
            <input
              type="email"
              value={user?.email}
              readOnly
              className="w-full px-5 py-3 rounded-2xl bg-white/30 border border-white/30 text-gray-200 cursor-not-allowed"
            />
          </div>

          {/* User Name */}
          <div className="relative w-full">
            <input
              type="text"
              value={user?.displayName}
              readOnly
              className="w-full px-5 py-3 rounded-2xl bg-white/30 border border-white/30 text-gray-200 cursor-not-allowed"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl font-semibold text-lg bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 hover:scale-105 transition-transform shadow-lg"
          >
            Add Transaction
          </button>
        </form>
      </motion.div>

      <Footer />
    </div>
  );
};

export default AddTransaction;

