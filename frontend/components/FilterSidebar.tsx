import React, { useState } from "react";

const FilterSidebar = () => {
  const [price, setPrice] = useState(500);

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(event.target.value));
  };

  return (
    <div className="w-full md:w-1/5 bg-white shadow-lg rounded-lg p-8 mr-10 self-start text-gray-800 ">
      <h2 className="text-xl font-bold mb-4">Filters</h2>

      {/* Price Range Filter */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Price Range</h3>
        <input
          type="range"
          min="0"
          max="1000"
          value={price}
          onChange={handlePriceChange}
          className="w-full"
        />
        <div className="flex justify-between text-sm text-gray-600 mt-2">
          <span>$0</span>
          <span>$1000</span>
        </div>
        <p className="text-center text-gray-800 font-medium mt-2">
          Selected Price: <span className="font-bold">${price}</span>
        </p>
      </div>

      {/* Rating Filter */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Rating</h3>
        <ul className="space-y-2">
          <li>
            <label className="flex items-center">
              <input type="radio" name="rating" className="mr-2" />
              4 Stars & Up
            </label>
          </li>
          <li>
            <label className="flex items-center">
              <input type="radio" name="rating" className="mr-2" />
              3 Stars & Up
            </label>
          </li>
          <li>
            <label className="flex items-center">
              <input type="radio" name="rating" className="mr-2" />
              2 Stars & Up
            </label>
          </li>
          <li>
            <label className="flex items-center">
              <input type="radio" name="rating" className="mr-2" />
              1 Star & Up
            </label>
          </li>
        </ul>
      </div>

      <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-300 cursor-pointer">
        Apply Filters
      </button>
    </div>
  );
};

export default FilterSidebar;