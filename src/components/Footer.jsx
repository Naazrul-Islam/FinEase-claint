import React from "react";
import { motion } from "framer-motion";
import { FaFacebookF,  FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="relative bg-[#050816] text-gray-300 overflow-hidden border-t border-cyan-500/20 backdrop-blur-xl">
      {/* Neon aura background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-violet-500/10 to-pink-500/10 blur-3xl -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-6 py-14 grid md:grid-cols-3 gap-10"
      >
        {/* Logo + Brand */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="flex items-center space-x-2 mb-3"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-violet-500 rounded-xl shadow-[0_0_15px_rgba(0,255,255,0.4)]" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
              FinEase
            </h1>
          </motion.div>
          <p className="text-sm text-gray-400 max-w-xs">
            Your smart companion for managing budgets, tracking expenses, and achieving financial goals effortlessly.
          </p>
        </div>

        {/* Contact Info */}
        <div className="text-center md:text-left">
          <h2 className="text-lg font-semibold mb-3 text-cyan-400">Contact Us</h2>
          <ul className="space-y-2 text-gray-400">
            <li>Email: <a href="mailto:support@finease.com" className="hover:text-cyan-300">support@finease.com</a></li>
            <li>Phone: <a href="tel:+8801700000000" className="hover:text-cyan-300">+880 1700-000000</a></li>
            <li>Address: Dhaka, Bangladesh</li>
          </ul>
        </div>

        {/* Terms & Socials */}
        <div className="text-center md:text-right flex flex-col items-center md:items-end">
          <h2 className="text-lg font-semibold mb-3 text-cyan-400">Quick Links</h2>
          <ul className="space-y-2 mb-4 text-gray-400">
            <li>
              <a href="/terms" className="hover:text-cyan-300 transition-colors">Terms & Conditions</a>
            </li>
            <li>
              <a href="/privacy" className="hover:text-cyan-300 transition-colors">Privacy Policy</a>
            </li>
          </ul>

          {/* Social icons */}
          <div className="flex space-x-4 mt-2">
            {[
              { icon: <FaFacebookF />, href: "https://facebook.com" },
              { icon: <FaXTwitter />, href: "https://twitter.com" },
              { icon: <FaInstagram />, href: "https://instagram.com" },
              { icon: <FaLinkedinIn />, href: "https://linkedin.com" },
            ].map((item, i) => (
              <motion.a
                key={i}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 5 }}
                className="p-2 rounded-lg bg-gradient-to-br from-cyan-400/10 to-violet-400/10 border border-cyan-400/20 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(0,255,255,0.3)] transition-all"
              >
                {item.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Bottom bar */}
      <div className="text-center text-gray-500 text-sm border-t border-gray-700/30 py-5">
        © {new Date().getFullYear()} <span className="text-cyan-400 font-semibold">FinEase</span> — All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
