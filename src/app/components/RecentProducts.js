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
    <div>
      <h1 className="text-3xl font-bold mx-7">Recent Products</h1>
      <div className="grid grid-cols-2 lg:grid-cols-5 w-full my-6 text-xl gap-5">
        {recentProducts.length > 0 ? (
          recentProducts.map((product) => (
            <div
              key={product._id}
              className="flex flex-col gap-2 bg-white rounded-3xl p-3 max-w-full mx-3 "
            >
              <Link href={`/product/${product.slug}`}>
                <Image
                  src={product.image}
                  alt="burger"
                  width={200}
                  height={200}
                  className="rounded-3xl w-full h-52 mx-auto object-cover"
                />
                <p className="text-green-500 font-bold text-center my-3">
                  {product.name}
                </p>
                <p className="text-red-600 font-bold">${product.price}</p>
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
