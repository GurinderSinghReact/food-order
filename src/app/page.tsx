"use client";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Desi_Fusion_Coolers,
  Mojitos,
  Hot_Drinks,
  DrinkItem,
} from "@/constants/drinkList";
import { getLocalStorage, setLocalStorage } from "@/lib/localStorage";

type DrinkMenu = {
  Desi_Fusion_Coolers: DrinkItem[];
  Mojitos: DrinkItem[];
  Hot_Drinks: DrinkItem[];
};

export default function Home() {
  useEffect(() => {
    const drinkMenu: DrinkMenu = {
      Desi_Fusion_Coolers,
      Mojitos,
      Hot_Drinks,
    };

    const storedDrinks = getLocalStorage("drinkList");
    console.log(storedDrinks, "stored drinks");
    setLocalStorage("drinkList", drinkMenu);
  }, []);

  return (
    <div className="justify-center items-center flex flex-col min-h-screen">
      <Image src="/wok.svg" alt="WOK" height={400} width={400} />
      <h1 className="text-3xl">Gurivé</h1>
      <p className="text-base text-center my-6 mb-16">
        The Best Fresh Food delivered
        <br />
        straight to your plate
      </p>
      <Link href={"/category"}>
        <button className="bg-[var(--shark-gray)] p-4 px-20 rounded-lg border border-[var(--mine-shaft)]">
          View Drinks
        </button>
      </Link>
      <Link href={"/snacks"}>
        <button className="bg-[var(--shark-gray)] p-4 px-20 rounded-lg border border-[var(--mine-shaft)] mt-4">
          View Snacks
        </button>
      </Link>
    </div>
  );
}
