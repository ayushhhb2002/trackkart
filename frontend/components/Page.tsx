import React, { useState, useEffect, useRef, use } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import FilterSidebar from "./FilterSidebar";
import { useAuth } from "../context/AuthContext";

interface Deal {
  id: number;
  name: string;
  price: string;
  discountedPrice: string;
  image: string;
  link: string;
}

const Page = ({
  BestDealsData,
  PageName,
}: {
  BestDealsData: Deal[];
  PageName: string;
}) => {
  const { userId, isLoggedIn } = useAuth();

  const itemsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);

  // Track last clicked product id as string or null
  const [lastClickedProductId, setLastClickedProductId] = useState<
    string | null
  >(null);

  // Track page load time
  const startTimeRef = useRef(Date.now());

  // To avoid multiple sends on unload/navigation
  const sentRef = useRef(false);

  const totalPages = Math.ceil(BestDealsData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = BestDealsData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Send data to backend
  const sendInteractionData = async (productId: string | null) => {
    if (sentRef.current) return; // only send once on unload
    sentRef.current = true;

    // console.log(isLoggedIn);
    // console.log(userId);
    if (!userId) {
      console.warn("Missing userId");
      return;
    }

    const endTime = Date.now();
    const timeSpent = Math.round((endTime - startTimeRef.current) / 1000);

    const payload = {
      user_id: userId,
      page: PageName,
      time_spent: timeSpent,
      product_clicked: productId,
    };

    try {
      await axios.post("https://trackkart-production.up.railway.app/interaction", payload);
      // console.log("✅ Interaction sent:", payload);
    } catch (error) {
      console.error("❌ Failed to send interaction data:", error);
    }
  };

  // Send on product click immediately
  useEffect(() => {
    if (lastClickedProductId === null) return;
    sendInteractionData(lastClickedProductId);
  }, [lastClickedProductId]);

  // Send on page unload or navigation away, with product_clicked as null if no click
  useEffect(() => {
    const handleUnload = () => {
      if (!sentRef.current) {
        sendInteractionData(lastClickedProductId);
      }
    };

    window.addEventListener("beforeunload", handleUnload);
    window.addEventListener("pagehide", handleUnload); // for better compatibility

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
      window.removeEventListener("pagehide", handleUnload);
    };
  }, [lastClickedProductId]);

  const handleProductClick = (productId: number) => {
    setLastClickedProductId(productId.toString());
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-gray-100 pt-10 pb-16">
      <div className="container mx-auto">
        <h1 className="text-3xl leading-none font-bold text-gray-800 mb-8 text-center">
          {PageName}
        </h1>
        <div className="flex flex-col md:flex-row gap-4">
          <FilterSidebar />

          <div className="w-full md:w-3/4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {currentItems.map((deal) => (
                <div key={deal.id} onClick={() => handleProductClick(deal.id)}>
                  <ProductCard product={deal} onClick={handleProductClick} />
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-8">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-4 py-2 mx-1 rounded-md cursor-pointer ${
                    currentPage === index + 1
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-200 text-gray-800"
                  } hover:bg-indigo-700 hover:text-white transition-colors duration-300`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
