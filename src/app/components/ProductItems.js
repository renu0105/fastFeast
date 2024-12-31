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
        setCard(data.products || []);
      } catch (error) {
        console.log(error);
      }
    };
    fetchedData();
  }, []);

  return (
    <div className="mx-3 lg:mx-7">
      <h1 className="text-3xl font-bold">Products</h1>
      <div className="grid grid-cols-2 lg:grid-cols-5 w-full my-6 lg:text-xl gap-3">
        {card.length > 0 ? (
          card.map((item) => (
            <div
              key={item._id}
              className="flex flex-col gap-2 bg-white rounded-3xl p-3 lg:max-w-full "
            >
              <Link href={`/product/${item.slug}`}>
                <Image
                  src={item.image}
                  alt={item.name}
                  width={500}
                  height={500}
                  className="rounded-3xl lg:w-full lg:h-52 h-32 mx-auto object-cover"
                />
                <h2 className="text-green-500">{item.name}</h2>
              </Link>
              <p className=" text-red-500">${item.price}</p>
            </div>
          ))
        ) : (
          <p className="mx-7">No products available</p>
        )}
      </div>
    </div>
  );
};
export default ProductItems;
