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
        text: "added successfully 🎉",
        icon: "success",
        confirmButtonColor: "#4F46E5",
      });
      setFormData({
        type: "Income",
        category: "",
        amount: "",
        description: "",
        date: "",
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonColor: "#EF4444",
      });
    }
  };

  
  const categories =
    formData.type === "Income" ? incomeCategories : expenseCategories;

  return (
    <>
    
    <div className=" from-blue-700 to-purple-400">
      <Navber></Navber>
      
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-lg mx-auto my-12 bg-gradient-to-br from-blue-900/70 to-purple-900/70 p-8 rounded-2xl shadow-2xl backdrop-blur-md text-white"
    >
      <h2 className="text-3xl font-bold mb-6 text-center">Add Transaction</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Type */}
        <div>
          <label className="block text-sm font-semibold mb-2">Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option className="text-black" value="Income">Income</option>
            <option className="text-black" value="Expense">Expense</option>
          </select>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-semibold mb-2">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option className="text-black" key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Amount */}
        <div>
          <label className="block text-sm font-semibold mb-2">Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Enter amount"
            required
            className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Write details..."
            required
            className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
          ></textarea>
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-semibold mb-2">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* User Email */}
        <div>
          <label className="block text-sm font-semibold mb-2">User Email</label>
          <input
            type="email"
            value={user?.email}
            readOnly
            className="w-full px-3 py-2 rounded-md bg-white/20 border border-white/20 text-gray-300"
          />
        </div>

        {/* User Name */}
        <div>
          <label className="block text-sm font-semibold mb-2">User Name</label>
          <input
            type="text"
            value={user?.displayName}
            readOnly
            className="w-full px-3 py-2 rounded-md bg-white/20 border border-white/20 text-gray-300"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-primary rounded-md font-semibold hover:bg-purple-600 transition-colors"
        >
          Add Transaction
        </button>
      </form>
    </motion.div>
    <Footer></Footer>
    </div>
    </>
  );
};

export default AddTransaction;
