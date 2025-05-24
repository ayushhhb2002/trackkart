import React from "react";
import MainCarousel from "../components/MainCarousel";
import FeatureCard from "../components/BestDeals";
import ShopByCategory from "@/components/ShopByCategory";
import SignUpPromo from "@/components/SignUpPromo";

const HomePage = () => {
  return (
    <div className="bg-gray-200">
      <section className="bg-white">
        <div className="container mx-auto py-8">
          <MainCarousel />
        </div>
      </section>

      <FeatureCard/>

      <ShopByCategory/>

      <SignUpPromo/>
    </div>
  );
};

export default HomePage;
