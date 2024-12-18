"use client";
import { useEffect, useState } from "react";
import { useCartService } from "../middleware/cartStore";

const AddToCart = ({ item }) => {
  const { items, increase, decrease } = useCartService();
  const [existItems, setExistItems] = useState(null);

  useEffect(() => {
    if (!items || items.length === 0) return;

    const foundItems = items.find((x) => x.slug === item.slug);
    setExistItems(foundItems || null);
  }, [items, item]);

  const cartHandler = () => {
    increase(item);
  };

  const decrement = () => {
    if (existItems?.qty === 1) {
      setExistItems(null);
    }
    decrease(existItems);
  };

  return existItems ? (
    <div className="flex flex-row gap-2 justify-between">
      <button onClick={decrement}>-</button>
      <span>{existItems.qty}</span>
      <button onClick={() => increase(existItems)}>+</button>
    </div>
  ) : (
    <button
      onClick={cartHandler}
      className="bg-purple-900 w-full p-2 rounded-3xl"
    >
      Add To Cart
    </button>
  );
};
export default AddToCart;
