import Page from "@/components/Page";
import React from "react";
import BestDealsData from "@/data/BestDealsData";

const Fashion = () => {
  const fashionProducts = BestDealsData.filter(
    (product) => product.category === "Fashion"
  );

  return (
    <Page BestDealsData={fashionProducts} PageName={"Fashion"} />
  );
};

export default Fashion;