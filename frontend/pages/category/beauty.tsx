import React from "react";
import Page from "@/components/Page";
import BestDealsData from "@/data/BestDealsData";

export const getServerSideProps = async () => {
  // Filter data on server side
  const beautyProducts = BestDealsData.filter(
    (product) => product.category === "Beauty"
  );

  return {
    props: {
      BestDealsData: beautyProducts,
      PageName: "Beauty Products",
    },
  };
};

const Beauty = ({
  BestDealsData,
  PageName,
}: {
  BestDealsData: any[];
  PageName: string;
}) => {
  return <Page BestDealsData={BestDealsData} PageName={PageName} />;
};

export default Beauty;