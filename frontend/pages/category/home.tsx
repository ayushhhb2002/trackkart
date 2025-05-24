import Page from "@/components/Page";
import React from "react";
import BestDealsData from "@/data/BestDealsData";

const Home = () => {
  const homeProducts = BestDealsData.filter(
    (product) => product.category === "Home"
  );

  return (
    <Page BestDealsData={homeProducts} PageName={"Home Essentials"} />
  );
};

export default Home;