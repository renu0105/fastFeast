"use client";
import { useRouter } from "next/navigation";
import CheckoutSteps from "../components/CheckOutSteps";
import { useCartService } from "../middleware/cartStore";
import { useEffect, useState } from "react";

const Payment = () => {
  const router = useRouter();
  const { shippingAddress, PaymentMethod, savePaymentMethod } =
    useCartService();
  const [selectPaymentMethod, setSelectPaymentMethod] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    savePaymentMethod(selectPaymentMethod);
    router.push("/place-order");
  };

  useEffect(() => {
    if (!shippingAddress) {
      return router.push("/shipping");
    }
    setSelectPaymentMethod(PaymentMethod || "Paypal");
  }, [shippingAddress, PaymentMethod, router]);

  return (
    <div className="min-h-screen m-12">
      <CheckoutSteps current={3} />
      <h1 className="text-center font-bold text-3xl m-9 text-red-900">
        Payment Method
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-base-100 text-white lg:mx-[30%] rounded-2xl p-5 text-xl"
      >
        {["Net Banking", "Paypal", "Card", "Cash on Delivery"].map(
          (payment) => (
            <div key={payment} className="flex flex-row justify-between">
              <label htmlFor={payment}>{payment}</label>
              <input
                type="radio"
                name="payment"
                value={payment}
                checked={selectPaymentMethod === payment}
                onChange={() => setSelectPaymentMethod(payment)}
              />
            </div>
          )
        )}
        <button
          type="submit"
          className="bg-purple-500 p-3 rounded-3xl w-full my-6"
        >
          Next
        </button>
      </form>
    </div>
  );
};
export default Payment;
