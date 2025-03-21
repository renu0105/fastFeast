"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const RecentProducts = () => {
  const [recentProducts, setRecentProducts] = useState([]);

  useEffect(() => {
    const fetchedProducts = async () => {
      try {
        const res = await fetch("/api/product", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) {
          console.log(res.status);
        }
        const data = await res.json();
        if (data.products && data.products.length > 0) {
          const recentProducts = data.products
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 5); // Get the top 5 products
          setRecentProducts(recentProducts || []);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchedProducts();
  }, []);

  return (
    <div className="mx-3 lg:mx-7">
      <h1 className="text-3xl font-bold">Recent Products</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-5 w-full my-6 gap-3">
        {recentProducts.length > 0 ? (
          recentProducts.map((product) => (
            <div
              key={product._id}
              className="flex flex-col gap-2 bg-white rounded-3xl p-3 lg:max-w-full w-64"
            >
              <Link href={`/product/${product.slug}`}>
                <Image
                  src={product.image}
                  alt="burger"
                  width={200}
                  height={200}
                  className="w-full lg:h-52 h-44 mx-auto object-cover"
                />
                <div className="flex flex-row  justify-between my-5">
                  <p className="text-green-500 ">{product.name}</p>
                  <p className="text-red-600 ">₹{product.price}</p>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <div className="mx-7">No recent product</div>
        )}
      </div>
    </div>
  );
};
export default RecentProducts;
