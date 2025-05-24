import React from "react";
import Page from "@/components/Page";
import BestDealsData from "@/data/BestDealsData";

export const getServerSideProps = async () => {
  // Filter products by Electronics category
  const electronicsProducts = BestDealsData.filter(
    (product) => product.category === "Electronics"
  );

  return {
    props: {
      BestDealsData: electronicsProducts,
      PageName: "Electronics",
    },
  };
};

const Electronics = ({
  BestDealsData,
  PageName,
}: {
  BestDealsData: any[];
  PageName: string;
}) => {
  return <Page BestDealsData={BestDealsData} PageName={PageName} />;
};

export default Electronics;