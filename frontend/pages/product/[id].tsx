import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import BestDealsData from "@/data/BestDealsData"; // Import BestDealsData

interface Product {
  id: number;
  name: string;
  price: string;
  discountedPrice: string;
  image: string;
  description: string;
}

const ProductDetails = ({ product }: { product: Product }) => {
  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className=" w-full py-10 px-16 bg-white">
      <div className="flex flex-col md:flex-row items-center md:items-start">
        {/* Product Image */}
        <div className="w-full md:w-1/3">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[650px] object-contain"
          />
        </div>

        {/* Product Info */}
        <div className="md:ml-32 mt-8 md:mt-0 w-full md:w-2/3">
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-gray-600 mt-4">{product.description}</p>
          <div className="flex items-center space-x-4 mt-4">
            <p className="text-gray-500 line-through text-xl">{product.price}</p>
            <p className="text-green-600 font-semibold text-2xl">
              {product.discountedPrice}
            </p>
          </div>

          {/* Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
            <button className="w-full sm:w-auto px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-300 cursor-pointer">
              Buy Now
            </button>
            <button className="w-full sm:w-auto px-6 py-3 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors duration-300 cursor-pointer">
              Contact Seller
            </button>
            <button className="w-full sm:w-auto px-6 py-3 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors duration-300 cursor-pointer">
              Save for Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  // Generate paths for all products in BestDealsData
  const paths = BestDealsData.map((product) => ({
    params: { id: product.id.toString() },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params!;

  // Find the product in BestDealsData by id
  const product = BestDealsData.find((p) => p.id.toString() === id);

  return {
    props: {
      product: product || null,
    },
  };
};

export default ProductDetails;