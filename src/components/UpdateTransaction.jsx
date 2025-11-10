import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";
import Navber from "../components/Navber";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

const UpdateTransaction = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    type: "",
    description: "",
    category: "",
    amount: "",
    date: "",
  });

  // 🔹 Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/transactions/${id}`);
        const data = res.data;
        setFormData({
          type: data.type,
          description: data.description,
          category: data.category,
          amount: data.amount,
          date: data.date?.split("T")[0] || "",
        });
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to fetch transaction data", "error");
      }
    };
    fetchData();
  }, [id]);

  // 🔹 Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/transactions/update/${id}`, formData);
      Swal.fire({
        icon: "success",
        title: "✅ Transaction Updated Successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/mytransactions");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to update transaction", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-950 via-purple-900 to-indigo-950 text-white flex flex-col">
      <Navber />

      {/* Main Form Container */}
      <motion.div
        className="flex-grow flex items-center justify-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-3xl p-8 w-full max-w-lg"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            ✏️ Update Transaction
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Type */}
            <div>
              <label className="block mb-1 font-medium text-gray-200">Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full p-3 rounded-xl bg-white/90 text-gray-800 focus:ring-2 focus:ring-purple-500 outline-none"
                required
              >
                <option value="">Select Type</option>
                <option value="Income">💰 Income</option>
                <option value="Expense">💸 Expense</option>
              </select>
            </div>

            {/* Category */}
            <div>
              <label className="block mb-1 font-medium text-gray-200">Category</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="e.g. Salary, Groceries, Rent"
                className="w-full p-3 rounded-xl bg-white/90 text-gray-800 focus:ring-2 focus:ring-purple-500 outline-none"
                required
              />
            </div>

            {/* Amount */}
            <div>
              <label className="block mb-1 font-medium text-gray-200">Amount ($)</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className="w-full p-3 rounded-xl bg-white/90 text-gray-800 focus:ring-2 focus:ring-purple-500 outline-none"
                required
              />
            </div>

            {/* Date */}
            <div>
              <label className="block mb-1 font-medium text-gray-200">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full p-3 rounded-xl bg-white/90 text-gray-800 focus:ring-2 focus:ring-purple-500 outline-none"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block mb-1 font-medium text-gray-200">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Write a short note..."
                rows="3"
                className="w-full p-3 rounded-xl bg-white/90 text-gray-800 focus:ring-2 focus:ring-purple-500 outline-none"
              ></textarea>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-500 font-semibold text-white shadow-lg hover:shadow-purple-500/30 transition-all"
            >
              💾 Update Transaction
            </motion.button>
          </form>
        </motion.div>
      </motion.div>

      <Footer />
    </div>
  );
};

export default UpdateTransaction;

