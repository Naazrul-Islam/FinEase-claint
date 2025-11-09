import React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";

const WhyFinancialPlanningMatters = () => {
  const slides = [
    {
      text: "Gives peace of mind and reduces money stress.",
      color: "from-pink-500/20 to-purple-500/20",
      glow: "shadow-[0_0_30px_rgba(236,72,153,0.4)]",
    },
    {
      text: "Helps you achieve milestones like travel or home buying.",
      color: "from-cyan-500/20 to-blue-500/20",
      glow: "shadow-[0_0_30px_rgba(6,182,212,0.4)]",
    },
    {
      text: "Prepares you for emergencies and unexpected costs.",
      color: "from-purple-500/20 to-pink-500/20",
      glow: "shadow-[0_0_30px_rgba(192,38,211,0.4)]",
    },
    {
      text: "Encourages smarter, long-term decision-making.",
      color: "from-blue-500/20 to-cyan-500/20",
      glow: "shadow-[0_0_30px_rgba(59,130,246,0.4)]",
    },
    {
      text: "Builds lasting wealth through consistent habits.",
      color: "from-green-500/20 to-teal-500/20",
      glow: "shadow-[0_0_30px_rgba(34,197,94,0.4)]",
    },
    {
      text: "Creates clarity — know what truly matters.",
      color: "from-yellow-500/20 to-orange-500/20",
      glow: "shadow-[0_0_30px_rgba(234,179,8,0.4)]",
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black text-white">
      {/* Gradient aura background */}
      <div className="absolute inset-0 bg-gradient-to-tl from-purple-900/20 via-pink-900/10 to-cyan-900/20 blur-3xl -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto px-6 py-12 text-center"
      >
        <h2 className="text-4xl font-extrabold mb-4 tracking-wide">
          <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            🌟 Why Financial Planning Matters
          </span>
        </h2>
        <p className="text-gray-300 text-lg mb-12">
          Financial planning isn’t about limitation — it’s about liberation.
          It gives your dreams a roadmap and your goals a heartbeat.
        </p>

        {/* Swiper with 3D effect */}
        <Swiper
          modules={[Autoplay, EffectCoverflow]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 40,
            stretch: 0,
            depth: 120,
            modifier: 2,
            slideShadows: true,
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          className="w-full max-w-4xl"
        >
          {slides.map((slide, index) => (
            <SwiperSlide
              key={index}
              className="w-72 h-60 flex items-center justify-center"
            >
              <motion.div
                whileHover={{ scale: 1.05, rotateY: 10 }}
                transition={{ duration: 0.5 }}
                className={`p-8 text-lg font-medium rounded-2xl bg-gradient-to-br ${slide.color} backdrop-blur-xl border border-white/10 ${slide.glow} hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all duration-300`}
              >
                <span className="text-pink-400 text-2xl mr-2">✦</span>
                {slide.text}
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </section>
  );
};

export default WhyFinancialPlanningMatters;
