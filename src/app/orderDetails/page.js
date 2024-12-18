"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function OrderDetails({ orderId }) {
  const router = useRouter();
  const { data: session } = useSession();
  useEffect(() => {
    if (!session) {
      router.push("/");
    }
  }, [router, session]);

  const [data, setData] = useState("");

  useEffect(() => {
    function fetchData() {
      fetch(`/api/orders/${orderId}`)
        .then((response) => response.json())
        .then((data) => setData(data))
        .catch((error) => console.log(error));
    }
    fetchData();
  }, [orderId]);
  console.log("data", data);

  if (!data) return "loading";

  const {
    paymentMethod,
    shippingAddress,
    items,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    isDelivered,
    isPaid,
    deliveredAt,
    paidAt,
  } = data;

  return (
    <div>
      <div className=" bg-base-300 card w-[90%] m-7 p-5 rounded-xl flex gap-2">
        <h1 className="text-2xl">Order ID</h1>
        <p>{orderId}</p>
      </div>

      <div className="bg-base-300 card w-[90%] m-7 p-5 flex gap-2">
        <h2 className="text-2xl">Shipping Address</h2>
        <p>
          {shippingAddress.fullName},{shippingAddress.address},
          {shippingAddress.postalCode},{shippingAddress.country}
        </p>
        {isDelivered ? (
          <div className="text-red-600">Delivered at {deliveredAt}</div>
        ) : (
          <div className="text-red-600">Not Delivered</div>
        )}
      </div>

      <div className="bg-base-300 card w-[90%] m-7 p-5 flex gap-2">
        <h2 className="text-2xl">Payment Method</h2>
        <p>{paymentMethod}</p>
        {isPaid ? (
          <div className="text-red-600">Paid at {paidAt}</div>
        ) : (
          <div className="text-red-600">Not Paid</div>
        )}
      </div>

      <div className="bg-base-300 card w-[90%] m-7 p-5 flex gap-2">
        <table className="table">
          <thead className="text-xl ">
            <tr>
              <th>Items</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.slug}>
                <td>
                  <Link href={`/product/${item.slug}`}>
                    <Image
                      alt=""
                      width={50}
                      height={50}
                      src={item.image}
                    ></Image>
                  </Link>
                </td>
                <td>{item.qty}</td>
                <td>{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-base-300 card w-[90%] m-7 p-5 flex gap-2 ">
        <h2 className="text-2xl">Order Summary</h2>
        <ul className="py-3 space-y-3">
          <li className="flex justify-between">
            <h1>Item</h1>
            <p>${itemsPrice}</p>
          </li>
          <li className="flex justify-between">
            <h1>Tax</h1>
            <p>${taxPrice}</p>
          </li>
          <li className="flex justify-between">
            <h1>Shipping</h1>
            <p>${shippingPrice}</p>
          </li>
          <li className="flex justify-between">
            <h1>Total</h1>
            <p>${totalPrice}</p>
          </li>
        </ul>
      </div>
    </div>
  );
}
