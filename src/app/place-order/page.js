"use client";
import Image from "next/image";
import { useCartService } from "../middleware/cartStore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import CheckoutSteps from "../components/CheckOutSteps";
import toast from "react-hot-toast";
import { useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

const PlaceOrder = () => {
  const router = useRouter();
  const { shippingAddress, PaymentMethod, items } = useCartService();
  const [loading, setLoading] = useState(false);

  const { data: session, status } = useSession();

  const handlePlaceOrder = async () => {
    setLoading(true);

    if (status !== "authenticated") {
      setLoading(false);
      toast.error("Please login to place order");

      router.push("/login");
      return;
    }

    try {
      const res = await axios.post("/api/orders", {
        shippingAddress,
        PaymentMethod,
        items,
        user: session.user.email,
      });

      if (res.error) {
        toast.error(res.error);
        setLoading(false);
        return;
      }

      toast.success("Order Placed Successfully");
      router.push("/thankYou");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="m-12 lg:mx-44 ">
      <CheckoutSteps current={4} />
      <h1 className="font-bold text-5xl m-5 text-center text-red-900 ">
        Checkout
      </h1>
      <div className=" flex flex-col gap-3">
        <h1 className="font-bold text-gray-400 border-b-2 border-gray-300 pb-2 flex justify-between items-center">
          SHIPPING DETAILS
          <button
            onClick={() => router.push("/shipping")}
            className="bg-red-900 p-2 text-white rounded-2xl w-20"
          >
            Edit
          </button>
        </h1>
        <p>{shippingAddress.name}</p>
        <p>{shippingAddress.address}</p>
        <p>
          {shippingAddress.city},{shippingAddress.pincode} ,
          {shippingAddress.country}
        </p>
      </div>

      <div>
        <h1 className="font-bold text-gray-400 border-b-2 border-gray-300 pb-2 mt-16 flex justify-between items-center ">
          PAYMENT METHOD
          <button
            onClick={() => router.push("/payment")}
            className="bg-red-900 w-20 p-2 rounded-2xl text-white"
          >
            Edit
          </button>
        </h1>
        <p>{PaymentMethod}</p>
      </div>

      <div>
        <h1 className="font-bold text-gray-400 border-b-2 border-gray-300 pb-2 flex justify-between items-center mt-16 mb-4">
          YOUR ORDER
          <button
            className="bg-red-900 p-2 rounded-2xl m-3 w-20 cursor-pointer text-white"
            onClick={() => router.push("/cart")}
          >
            Edit
          </button>
        </h1>
        <div>
          <table className="table p-3 text-gray-400">
            <thead>
              <tr className="bg-red-900 text-white">
                <th>Item</th>
                <th>Price</th>
                <th>Quantity</th>
              </tr>
            </thead>

            <tbody>
              {items.map((item) => (
                <tr key={item.slug}>
                  <td className="flex flex-row items-center gap-3">
                    <Link href={`/product/${item.slug}`}>
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={200}
                        height={200}
                        className="h-20 w-20"
                      />
                      {item.name}
                    </Link>
                  </td>
                  <td>${item.price}</td>
                  <td>{item.qty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="font-bold">
        <ul className="flex flex-col gap-3 border-t-2 border-gray-300 mt-16">
          <li className="flex justify-between">
            Items Price:
            <span>
              ${items.reduce((acc, item) => acc + item.price * item.qty, 0)}
            </span>
          </li>
          <li className="flex justify-between">
            <span>Tax Price:</span>$
            {(
              items.reduce((acc, item) => acc + item.price * item.qty, 0) * 0.1
            ).toFixed(2)}
          </li>
          <li className="flex justify-between">
            <span>Shipping Price:</span>$
            {(items.length > 0 ? 10 : 0).toFixed(2)}
          </li>
          <li className="border-b-2 border-gray-300 flex justify-between">
            <span className="font-bold">Total Price :</span>$
            {(
              items.reduce((acc, item) => acc + item.price * item.qty, 0) +
              items.reduce((acc, item) => acc + item.price * item.qty, 0) *
                0.1 +
              (items.length > 0 ? 10 : 0)
            ).toFixed(2)}
          </li>
          <button
            className="text-red-900 border-2 border-red-900 p-3 w-44 mx-auto
       "
            onClick={handlePlaceOrder}
          >
            PLace Order
          </button>
        </ul>
      </div>
    </div>
  );
};
export default PlaceOrder;
