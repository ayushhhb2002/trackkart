import Link from "next/link";
import React from "react";

interface Product {
  id: number;
  name: string;
  price: string;
  discountedPrice: string;
  image: string;
  link: string;
}

const ProductCard = ({
  product,
  onClick,
}: {
  product: Product;
  onClick?: (productId: number) => void;
}) => {
  const handleClick = () => {
    if (onClick) {
      // console.log("Product clicked:", product.id);
      onClick(product.id);
    }
  };

  return (
    <Link href={product.link} onClick={handleClick}>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden mr-6 cursor-pointer group">
        <img
          src={product.image}
          alt={product.name}
          className="px-3 py-2 w-full h-48 object-contain"
        />

        <div className="p-4 transition-transform duration-300 group-hover:-translate-y-2">
          <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
          <div className="flex items-center justify-center space-x-2 mt-2">
            <p className="text-gray-500 line-through">{product.price}</p>
            <p className="text-green-600 font-semibold">
              {product.discountedPrice}
            </p>
          </div>
          <div className="flex justify-center mt-4">
            <div className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-300">
              View Details
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;