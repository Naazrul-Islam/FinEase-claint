import React from "react";
import Navber from "../components/Navber";
import Banner from "../components/Banner";
import { ThemeProvider } from "../context/ThemeContext";
import WhyFinancialPlanningMatters from "../components/WhyFinancialPlanningMatters";
import BudgetingTips from "../components/BudgetingTips";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <ThemeProvider>
      {" "}
      <div className="">
        <Navber></Navber>
        <Banner></Banner>
        <BudgetingTips />
        <WhyFinancialPlanningMatters />
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Home;
