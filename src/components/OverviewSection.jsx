import React, { useEffect, useState } from "react";
import axios from "axios";
import LoadingAnimation from "./LoadingAnimation";

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
        const res = await axios.get("http://localhost:3000/api/overview");
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

  return (
    <>
      <div className="bg-black shadow-lg shadow-blue-500/20">
        <h1 className="text-3xl md:text-4xl font-bold md:font-extrabold pt-10 mb-6 text-white underline text-center">
          Financial Overview
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          <div className="bg-green-500/80 p-6 rounded-2xl text-center">
            <h2 className="text-white font-semibold">Total Income</h2>
            <p className="text-white text-2xl font-bold">৳{data.totalIncome}</p>
          </div>
          <div className="bg-red-500/80 p-6 rounded-2xl text-center">
            <h2 className="text-white font-semibold">Total Expenses</h2>
            <p className="text-white text-2xl font-bold">
              ৳{data.totalExpenses}
            </p>
          </div>
          <div className="bg-blue-500/80 p-6 rounded-2xl text-center">
            <h2 className="text-white font-semibold">Total Balance</h2>
            <p className="text-white text-2xl font-bold">
              ৳{data.totalBalance}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default OverviewSection;
