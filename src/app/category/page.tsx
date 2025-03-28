"use client";
import DrinkList, { Drink } from "@/components/DrinkList";
import HorizontalCategoryList from "@/components/HorizontalCategoryList";
import { getLocalStorage } from "@/lib/localStorage";
import React, { useEffect, useState } from "react";
import { FaCircleArrowRight } from "react-icons/fa6";

type DrinkItem = {
  name: string;
  description?: string;
  image: string;
  quantity: number;
};

const categories = [
  "Desi Fusion Coolers",
  "Mojitos",
  "Smoothie",
  "Floats",
  "Soft Drinks",
] as const;

const categoryKeyMap = {
  "Desi Fusion Coolers": "Desi_Fusion_Coolers",
  Mojitos: "Mojitos",
  Smoothie: "Smoothie",
  Floats: "Floats",
  "Soft Drinks": "Soft_Drinks",
} as const;

// Default drink list structure
const defaultDrinkList = {
  Desi_Fusion_Coolers: [],
  Mojitos: [],
  Smoothie: [],
  Floats: [],
  Soft_Drinks: [],
};

function Category() {
  // Use a state to track whether we're on the client side
  const [isClient, setIsClient] = useState(false);

  // Initialize stored drinks with default list
  const [storedDrinks, setStoredDrinks] = useState(defaultDrinkList);

  // Initial selected category
  const [selected, setSelected] = useState<(typeof categories)[number]>(
    categories[0],
  );

  // Initial drink list
  const [drinkList, setDrinkList] = useState<DrinkItem[]>([]);
  const [totalDrinks, setTotalDrinks] = useState(0);

  const calculateTotalDrinks = (drinks: typeof defaultDrinkList) => {
    return Object.values(drinks).reduce((total, category) => {
      return (
        total +
        category.reduce(
          (categoryTotal, drink: DrinkItem) => categoryTotal + drink.quantity,
          0,
        )
      );
    }, 0);
  };

  // Effect to run only on client-side
  useEffect(() => {
    // Mark as client-side
    setIsClient(true);

    // Attempt to get drinks from localStorage
    const localStorageDrinks = getLocalStorage("drinkList") || defaultDrinkList;
    setStoredDrinks(localStorageDrinks);

    const total = calculateTotalDrinks(localStorageDrinks);
    setTotalDrinks(total);

    // Set initial drink list for first category
    const initialCategoryKey = categoryKeyMap[selected];
    const initialDrinks = localStorageDrinks[initialCategoryKey] || [];
    setDrinkList(initialDrinks);

    const handleStorageChange = () => {
      const updatedStoredDrinks =
        getLocalStorage("drinkList") || defaultDrinkList;
      setStoredDrinks(updatedStoredDrinks);

      const newTotal = calculateTotalDrinks(updatedStoredDrinks);
      setTotalDrinks(newTotal);

      // Update the current category's drink list
      const currentCategoryKey = categoryKeyMap[selected];
      const currentCategoryDrinks =
        updatedStoredDrinks[currentCategoryKey] || [];
      setDrinkList(currentCategoryDrinks);
    };

    // Add event listener for storage changes
    window.addEventListener("storage", handleStorageChange);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [selected]);

  const onChangeDrink = (category: (typeof categories)[number]) => {
    setSelected(category);
    const localStorageKey = categoryKeyMap[category];
    const categoryDrinks = storedDrinks[localStorageKey] || [];
    setDrinkList(categoryDrinks);
  };

  const upDateDrinkList = (drink: Drink, type: "increase" | "decrease") => {
    const localStorageKey =
      categoryKeyMap[selected as keyof typeof categoryKeyMap];
    const category = storedDrinks[localStorageKey] || [];

    const updatedCategory = category.map((item: DrinkItem) =>
      item.name === drink.name
        ? {
            ...item,
            quantity:
              type === "increase" ? item.quantity + 1 : item.quantity - 1,
          }
        : item,
    );

    const updatedDrinks = {
      ...storedDrinks,
      [localStorageKey]: updatedCategory,
    };

    const newTotal = calculateTotalDrinks(updatedDrinks);
    setTotalDrinks(newTotal);

    localStorage.setItem("drinkList", JSON.stringify(updatedDrinks));
    window.dispatchEvent(new Event("storage"));
    setStoredDrinks(updatedDrinks);
    setDrinkList(updatedCategory);
  };

  // Only render the full component on the client side
  if (!isClient) {
    return null;
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 w-full z-10 bg-[var(--shark-black)]">
        <h1 className="text-3xl font-light p-8">
          Sweeten up
          <br />
          <span className="font-extrabold">Your Summers</span>
        </h1>
        <HorizontalCategoryList
          selected={selected}
          categories={categories}
          onClick={onChangeDrink}
        />
      </div>

      {/* Scrollable Drink List, pushed down by header */}
      <div className="flex-1 overflow-y-auto pt-[200px] px-4">
        <DrinkList drinks={drinkList} onClick={upDateDrinkList} />
      </div>
      {totalDrinks > 0 && (
        <div className="bg-[var(--ocean-green)] text-black font-bold p-6 text-sm flex justify-center items-center">
          <span className="mr-2">{`${totalDrinks} drink${
            totalDrinks > 1 ? "s" : ""
          } added`}</span>
          <FaCircleArrowRight size={18} />
        </div>
      )}
    </div>
  );
}

export default Category;
