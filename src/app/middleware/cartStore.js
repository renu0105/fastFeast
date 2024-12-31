import { create } from "zustand";
import { persist } from "zustand/middleware";
import { round } from "./utils";

const initialState = {
  items: [],
  itemsPrice: 0,
  taxPrice: 0,
  shippingPrice: 0,
  totalPrice: 0,
  PaymentMethod: "Paypal",
  shippingAddress: {
    name: "",
    city: "",
    state: "",
    address: "",
    country: "",
  },
};

export const CartStore = create(
  persist(
    (set) => ({
      ...initialState,
      clear: () => set({ ...initialState }),
      setCart: (updatedItems) => {
        const { itemsPrice, taxPrice, shippingPrice, totalPrice } =
          calcPrice(updatedItems);
        set({
          items: updatedItems,
          itemsPrice,
          taxPrice,
          shippingPrice,
          totalPrice,
        });
      },
    }),
    { name: "CartStore" }
  )
);

export const useCartService = () => {
  const {
    items,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    PaymentMethod,
    shippingAddress,
    clear,
    setCart,
  } = CartStore((state) => state);

  return {
    items,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    PaymentMethod,
    shippingAddress,
    clear,

    increase: (item) => {
      const exist = items.find((x) => x.slug === item.slug);

      const updatedItems = exist
        ? items.map((x) =>
            x.slug === item.slug ? { ...exist, qty: exist.qty + 1 } : x
          )
        : [...items, { ...item, qty: 1 }];

      setCart(updatedItems);
    },

    decrease: (item) => {
      const exist = items.find((x) => x.slug === item.slug);
      if (!exist) return;
      const updatedItems =
        exist.qty === 1
          ? items.filter((x) => x.slug !== item.slug)
          : items.map((x) =>
              x.slug === item.slug ? { ...exist, qty: exist.qty - 1 } : x
            );

      setCart(updatedItems);
    },

    saveShippingAddress: (shippingAddress) => {
      CartStore.setState({
        shippingAddress,
      });
    },

    savePaymentMethod: (PaymentMethod) => {
      CartStore.setState({
        PaymentMethod,
      });
    },

    clear: () => {
      CartStore.setState({
        items: [],
      });
    },

    init: () => {
      CartStore.setState(initialState);
    },
  };
};

const calcPrice = (items) => {
  const itemsPrice = round(
    items.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  const taxPrice = round(itemsPrice * 0.15);
  const shippingPrice = round(itemsPrice > 100 ? 0 : 100);
  const totalPrice = round(itemsPrice + taxPrice + shippingPrice);
  return { itemsPrice, taxPrice, shippingPrice, totalPrice };
};
