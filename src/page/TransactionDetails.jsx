import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";
import Navber from "../components/Navber";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

const TransactionDetails = () => {
  const { id } = useParams();
  const [transaction, setTransaction] = useState(null);
  const [categoryTotal, setCategoryTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        
        const res = await axios.get(`http://localhost:3000/transactions/${id}`);
        const data = res.data;
        setTransaction(data);

        
        const allRes = await axios.get("http://localhost:3000/my-transactions");
        const allData = allRes.data;
        const total = allData
          .filter((t) => t.category === data.category)
          .reduce((sum, t) => sum + Number(t.amount || 0), 0);
        setCategoryTotal(total);

        setLoading(false);
      } catch (err) {
        // console.error(err);
        Swal.fire("Error", "Failed to fetch transaction details", "error");
      }
    };

    fetchTransaction();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-white text-xl">
        Loading Transaction Details...
      </div>
    );
  }

  if (!transaction) {
    return (
      <div className="min-h-screen flex justify-center items-center text-red-500 text-xl">
        Transaction not found!
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-900/70 to-purple-900/70 text-white">
      <Navber />

      <div className="max-w-2xl mx-auto mt-20 bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center mb-6"
        >
          Transaction Details
        </motion.h2>

        <div className="space-y-4 text-lg">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="flex justify-between border-b border-white/30 pb-2"
          >
            <span>💰 Type:</span>
            <span>{transaction.type}</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-between border-b border-white/30 pb-2"
          >
            <span>📄 Description:</span>
            <span>{transaction.description || "No description"}</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex justify-between border-b border-white/30 pb-2"
          >
            <span>📦 Category:</span>
            <span>{transaction.category}</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="flex justify-between border-b border-white/30 pb-2"
          >
            <span>💵 Amount:</span>
            <span>${transaction.amount}</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="flex justify-between border-b border-white/30 pb-2"
          >
            <span>📅 Date:</span>
            <span>{transaction.date}</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-6 p-4 bg-gradient-to-r from-purple-600/50 to-blue-600/50 rounded-lg shadow-lg text-center"
          >
            <h3 className="text-xl font-semibold">Total in this Category</h3>
            <p className="text-2xl font-bold mt-1">${categoryTotal}</p>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TransactionDetails;
