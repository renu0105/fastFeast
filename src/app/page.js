"use client";
import Image from "next/image";
import RecentProducts from "./components/RecentProducts";
import MostBuyProduct from "./components/MostBuyProduct";
import ProductItems from "./components/ProductItems";

export default function Home() {
  return (
    <>
      <div className="lg:h-[500px] h-[400px] flex flex-col justify-center mx-7 gap-2 ">
        <div className=" flex flex-row justify-between items-center ">
          <div className="flex flex-col gap-2">
            <span className=" text-6xl lg:text-9xl font-bold">Choose</span>
            <span className="text-5xl lg:text-8xl font-bold">
              Your Favorite
            </span>
            <span className="text-5xl lg:text-7xl font-bold text-red-800">
              food
            </span>
            <div className="flex flex-row lg:gap-9 gap-4 my-6 text-xl">
              <button className=" border-2 rounded-3xl p-3 bg-red-700 text-white lg:w-40 w-36">
                Order
              </button>
              <button className="border-red-800 border-2 rounded-3xl p-3 lg:w-40 w-36">
                View Menu
              </button>
            </div>
          </div>
          <Image
            src="/pizza.jpeg"
            alt=""
            width={500}
            height={500}
            className="rounded-3xl mx-5 w-fit h-[300px] lg:w-[50%] lg:h-[40%] object-cover"
          />
        </div>
      </div>

      <RecentProducts />
      <MostBuyProduct />
      <ProductItems />
    </>
  );
}
