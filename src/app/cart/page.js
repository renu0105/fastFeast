"use client";

import { useRouter } from "next/navigation";
import { useCartService } from "../middleware/cartStore";
import { GiShoppingBag } from "react-icons/gi";
import { useSession } from "next-auth/react";

const CartPage = () => {
  const router = useRouter();
  const { items, increase, decrease } = useCartService();
  const { data: session } = useSession();

  return (
    <div>
      <h1 className="text-pink-700 font-bold text-3xl w-full text-center my-3">
        Shopping Cart
      </h1>
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[500px] ">
          <GiShoppingBag className="h-44 w-96 text-pink-700 my-6" />
          <h2 className="text-3xl font-bold">Hey, it feels so light!</h2>
          <p>
            There is nothing in your cart.Let's add some items to your cart.
          </p>
          <button
            className="border-2 border-pink-700 text-pink-700 p-3 my-6 font-semibold"
            onClick={() => router.push("/")}
          >
            ADD ITEMS TO CART
          </button>
        </div>
      ) : (
        <div className="w-full ">
          <table className="table table-auto bg-white rounded-3xl h-fit mx-6 w-[90%] text-red-900">
            <thead className="bg-red-950">
              <tr>
                <th>Item</th>
                <th>Price</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={item.slug || `item-${index}`}>
                  <td>{item.name || "unknown"}</td>
                  <td>${item.price || "0.00"}</td>
                  <td className="flex flex-row gap-3 items-center">
                    <>
                      <button
                        onClick={() => increase(item)}
                        className="btn btn-primary"
                      >
                        +
                      </button>
                      {item.qty || "0"}
                      <button
                        onClick={() => decrease(item)}
                        className="btn btn-primary"
                      >
                        -
                      </button>
                    </>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-center my-6 w-72 mx-auto p-6 rounded-2xl">
            <p className="text-black text-xl font-bold">
              Total Price : $
              {items.reduce((acc, item) => acc + item.price * item.qty, 0)}
            </p>
            <button
              onClick={() =>
                session ? router.push("/shipping") : router.push("/login")
              }
              className="bg-primary text-black p-3 mt-6 text-xl"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default CartPage;
