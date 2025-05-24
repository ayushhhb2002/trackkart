import React from "react";
import Page from "@/components/Page";
import BestDealsData from "@/data/BestDealsData";

export const getServerSideProps = async () => {
  return {
    props: {
      BestDealsData,
      PageName: "Best Deals",
    },
  };
};

const BestDealsPage = ({ BestDealsData, PageName }: { BestDealsData: any[]; PageName: string }) => {
  return <Page BestDealsData={BestDealsData} PageName={PageName} />;
};

export default BestDealsPage;