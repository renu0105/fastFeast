"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const ProductItems = () => {
  const [card, setCard] = useState([]);

  useEffect(() => {
    const fetchedData = async () => {
      try {
        const res = await fetch("/api/product", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error("Something went wrong");
        }
        const data = await res.json();
        console.log("data", data);
        setCard(data.products || []);
      } catch (error) {
        console.log(error);
      }
    };
    fetchedData();
  }, []);

  return (
    <>
      <h1 className="m-7 text-3xl font-bold">Products</h1>
      <div className="grid grid-cols-2 lg:grid-cols-5 w-full my-6 text-xl gap-5">
        {card.length > 0 ? (
          card.map((item) => (
            <div
              key={item._id}
              className="flex flex-col gap-2 bg-white rounded-3xl p-3 max-w-full mx-3 shadow-md "
            >
              <Link href={`/product/${item.slug}`}>
                <Image
                  src={item.image}
                  alt={item.name}
                  width={500}
                  height={500}
                  className="rounded-3xl w-full h-52 mx-auto object-cover"
                />
                <h2 className="text-center text-green-500 text-2xl my-3 font-bold">
                  {item.name}
                </h2>
              </Link>
              <div className="flex flex-row justify-between items-center mx-2">
                <p className="text-center text-red-500 text-2xl my-3 font-bold">
                  ${item.price}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="mx-7">No products available</p>
        )}
      </div>
    </>
  );
};
export default ProductItems;
