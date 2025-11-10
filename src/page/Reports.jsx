import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../provider/AuthProvider";
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, XAxis, YAxis, Bar, CartesianGrid } from "recharts";
import { motion } from "framer-motion";
import Navber from "../components/Navber";
import Footer from "../components/Footer";
import LoadingAnimation from "../components/LoadingAnimation"; 

const COLORS = ["#4F46E5", "#06B6D4", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];

const Reports = () => {
  const { user } = useContext(AuthContext);
  const [reportData, setReportData] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchReports = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:3000/reports/${user.email}${
            selectedMonth ? `?month=${selectedMonth}` : ""
          }`
        );
        setReportData(res.data);
      } catch (err) {
        // console.error("Error fetching reports:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [user, selectedMonth]);

  if (loading) return <LoadingAnimation />;

  if (!reportData) return <p className="text-center mt-10 text-gray-500">No data found</p>;

  const categoryData = Object.entries(reportData.categorySummary || {}).map(([name, value]) => ({
    name,
    value,
  }));

  const monthlyData = Object.entries(reportData.monthlySummary || {}).map(([month, total]) => ({
    month,
    total,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-950 via-purple-900 to-gray-900 text-white">
      <Navber />

      <div className="max-w-6xl mx-auto px-4 py-10">
        <motion.h1
          className="text-4xl font-bold text-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Financial Reports 📊
        </motion.h1>

        {/* Filter */}
        <div className="flex justify-center mb-8">
          <input
            type="month"
            className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          />
        </div>

        {/* Summary Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="bg-gradient-to-br from-green-600/40 to-green-900/50 p-6 rounded-2xl shadow-lg text-center">
            <h2 className="text-lg font-semibold">Total Income</h2>
            <p className="text-2xl font-bold text-green-400">${reportData.totalIncome}</p>
          </div>
          <div className="bg-gradient-to-br from-red-600/40 to-red-900/50 p-6 rounded-2xl shadow-lg text-center">
            <h2 className="text-lg font-semibold">Total Expenses</h2>
            <p className="text-2xl font-bold text-red-400">${reportData.totalExpenses}</p>
          </div>
          <div className="bg-gradient-to-br from-blue-600/40 to-blue-900/50 p-6 rounded-2xl shadow-lg text-center">
            <h2 className="text-lg font-semibold">Balance</h2>
            <p className="text-2xl font-bold text-blue-400">${reportData.totalBalance}</p>
          </div>
        </motion.div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Pie Chart (Category Distribution) */}
          <motion.div
            className="bg-gray-800/60 p-6 rounded-2xl shadow-lg"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h3 className="text-xl font-semibold mb-4 text-center">Expenses by Category</h3>
            <PieChart width={380} height={320} className="mx-auto">
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </motion.div>

          {/* Bar Chart (Monthly Summary) */}
          <motion.div
            className="bg-gray-800/60 p-6 rounded-2xl shadow-lg"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h3 className="text-xl font-semibold mb-4 text-center">Monthly Totals</h3>
            <BarChart width={420} height={320} data={monthlyData} className="mx-auto">
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="month" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Bar dataKey="total" fill="#06B6D4" barSize={40} />
            </BarChart>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Reports;
