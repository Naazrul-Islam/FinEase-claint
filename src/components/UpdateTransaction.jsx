import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";
import Navber from "../components/Navber";
import Footer from "../components/Footer";

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

  // ✅ Fetch existing transaction data
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
          date: data.date,
        });
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to fetch transaction data", "error");
      }
    };
    fetchData();
  }, [id]);

  // ✅ Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/transactions/update/${id}`, formData);
      Swal.fire({
        icon: "success",
        title: "Updated Successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate(`/transactions/${id}`); // Navigate to details page
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to update transaction", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-900/70 to-purple-900/70 text-white">
      <Navber />
      <div className="max-w-lg mx-auto mt-20 bg-white/10 p-8 rounded-2xl backdrop-blur-md shadow-xl">
        <h2 className="text-2xl font-semibold mb-6 text-center text-white">
          Update Transaction
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Type */}
          <div>
            <label className="block mb-1 font-medium">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full p-2 rounded-md text-black"
              required
            >
              <option value="">Select Type</option>
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>
          </div>

          {/* Category */}
          <div>
            <label className="block mb-1 font-medium">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 rounded-md text-black"
              required
            />
          </div>

          {/* Amount */}
          <div>
            <label className="block mb-1 font-medium">Amount</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="w-full p-2 rounded-md text-black"
              required
            />
          </div>

          {/* Date */}
          <div>
            <label className="block mb-1 font-medium">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-2 rounded-md text-black"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 rounded-md text-black"
              rows="3"
            ></textarea>
          </div>

          {/* Update Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 py-2 rounded-md font-semibold text-white hover:opacity-90 transition"
          >
            Update
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default UpdateTransaction;
