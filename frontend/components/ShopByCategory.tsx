import React from "react";
import Link from "next/link";

const ShopByCategory = () => {
  const categories = [
    { name: "Electronics", image: "/images/ShopByCat/ShopByCat1.avif" },
    { name: "Fashion", image: "/images/ShopByCat/ShopByCat2.avif" },
    { name: "Home", image: "/images/ShopByCat/ShopByCat3.avif" },
    { name: "Beauty", image: "/images/ShopByCat/ShopByCat4.avif" },
  ];

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">
          Shop by Category
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <div
              key={category.name}
              className="bg-contain rounded-lg p-8 text-center"
              style={{ backgroundImage: `url(${category.image})` }}
            >
              <h3 className="text-xl font-bold text-white">{category.name}</h3>
              <Link
                href={`/category/${category.name.toLowerCase()}`}
                className="mt-4 inline-block px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Explore
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopByCategory;
