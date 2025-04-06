import DrinkList from "@/components/DrinkList";
import { snacksList } from "@/constants/drinkList";
import React from "react";

export default function page() {
  return (
    <div className="h-screen flex flex-col">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 w-full z-10 bg-[var(--shark-black)]">
        <h1 className="text-3xl font-light p-8">
          Let the Munching
          <br />
          <span className="font-extrabold">Begin!</span>
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto pt-[200px] px-4">
        <DrinkList
          drinks={snacksList}
          // onClick={upDateDrinkList}
        />
      </div>
    </div>
  );
}
