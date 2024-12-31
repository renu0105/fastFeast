"use client";
import Image from "next/image";
import RecentProducts from "./components/RecentProducts";
import MostBuyProduct from "./components/MostBuyProduct";
import ProductItems from "./components/ProductItems";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex flex-row mx-7 lg:gap-80">
        <div className="flex flex-col">
          <span className="font-bold lg:text-9xl text-4xl">Choose</span>
          <span className="font-bold lg:text-8xl text-3xl">Your Favorite</span>
          <span className="font-bold lg:text-9xl text-red-900 text-5xl">
            food
          </span>
          <Link href={"/products"}>
            <button className="bg-red-900 text-white p-3 lg:w-40 w-32 my-10 text-xl">
              View Menu
            </button>
          </Link>
        </div>

        <Image
          src="/pizza.jpeg"
          alt=""
          width={500}
          height={500}
          className="lg:h-[400px] lg:w-[400px] w-[150px] h-[150px]  rounded-3xl object-cover my-8"
        />
      </div>

      <RecentProducts />
      <MostBuyProduct />
      <ProductItems />
    </>
  );
}

// updated
