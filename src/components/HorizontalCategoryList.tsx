/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

const categories = ["Desi Fusion Coolers", "Mojitos", "Hot Drinks"] as const;

// Create a type from the categories
type Category = (typeof categories)[number];

// Update the interface to use the specific Category type
interface HorizontalCategoryListProps {
  selected: Category;
  categories: readonly Category[];
  onClick: (category: Category) => void;
}

const HorizontalCategoryList = ({
  selected,
  categories = [],
  onClick,
}: HorizontalCategoryListProps) => {
  return (
    <div
      className="overflow-x-auto whitespace-nowrap 
        [&::-webkit-scrollbar]:hidden 
        scrollbar-hide 
        px-2"
      style={{
        msOverflowStyle: "none", // IE and Edge
        scrollbarWidth: "none", // Firefox
      }}
    >
      <div className="flex space-x-4 px-4 py-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onClick(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              selected === category
                ? "bg-[var(--ocean-green)] text-black shadow-md font-semibold"
                : "text-white"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HorizontalCategoryList;
