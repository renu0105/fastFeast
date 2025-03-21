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
      <h1 className="text-center font-bold text-3xl my-9 text-red-900">
        Payment Method
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col border-2 border-gray-400 gap-2 lg:mx-44 rounded-2xl lg:p-5 py-5 lg:w-[35%] px-7"
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
          className="bg-purple-800 p-3 w-44 rounded-2xl mx-auto my-7 "
        >
          Next
        </button>
      </form>
    </div>
  );
};
export default Payment;
