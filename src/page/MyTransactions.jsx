import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../provider/AuthProvider";
import Navber from "../components/Navber";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";
import LoadingAnimation from "../components/LoadingAnimation";

const MyTransaction = () => {
  const { user } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.email) {
      fetchTransactions();
    }
  }, [user]);

  const fetchTransactions = async () => {
    try {
      const res = await axios.get("http://localhost:3000/my-transactions");
      const userTransactions = res.data.filter(
        (t) => t.userEmail === user.email
      );
      setTransactions(userTransactions);
      setLoading(false);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Transactions not found!", "error");
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the transaction!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      confirmButtonColor: "#ef4444",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:3000/transactions/${id}`);
          setTransactions(transactions.filter((t) => t._id !== id));
          Swal.fire("Deleted!", "Transaction has been deleted.", "success");
        } catch (err) {
          console.error(err);
          Swal.fire("Error", "Transaction could not be deleted.", "error");
        }
      }
    });
  };

  // const handleUpdate = (id) => navigate(`/MyTransactions/${id}`);
  const handleView = (id) => navigate(`/transactions/${id}`);

  if (loading)
    return (
      <LoadingAnimation />
    );

  return (
    <>
      <Navber />
      <div className="min-h-screen  py-10 px-6">
        <h1 className="text-3xl font-bold text-center  mb-8">
          💳 My Transactions
        </h1>

        {transactions.length === 0 ? (
          <div className="text-center text-gray-600 text-lg">
            No transactions found 😔
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {transactions.map((t, index) => (
              <motion.div
                key={t._id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="backdrop-blur-xl bg-white/70 shadow-xl border border-gray-200 rounded-2xl p-6 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
              >
                <div className="flex justify-between items-center mb-3">
                  <span
                    className={`px-3 py-1 text-sm font-semibold rounded-full ${
                      t.type === "Income"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {t.type}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(t.date).toLocaleDateString()}
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-gray-800 mb-1">
                  {t.category}
                </h3>
                <p className="text-gray-600 mb-4">
                  Amount:{" "}
                  <span className="font-bold text-gray-800">
                    ${t.amount.toFixed(2)}
                  </span>
                </p>

                <div className="flex justify-between items-center mt-4">
                  <Link to={`/MyTransactions/${t._id}`}><button
                    className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                  >
                    <FaEdit /> Update
                  </button></Link>
                  <button
                    onClick={() => handleDelete(t._id)}
                    className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                  >
                    <FaTrashAlt /> Delete
                  </button>
                  <button
                    onClick={() => handleView(t._id)}
                    className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                  >
                    <FaEye /> View
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default MyTransaction;
