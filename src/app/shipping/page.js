"use client";

import { useForm } from "react-hook-form";
import CheckoutSteps from "../components/CheckOutSteps";
import { useCartService } from "../middleware/cartStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Shipping = () => {
  const router = useRouter();
  const { shippingAddress, saveShippingAddress } = useCartService();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      address: "",
      city: "",
      pincode: "",
      country: "",
    },
  });

  useEffect(() => {
    setValue("name", shippingAddress.name || "");
    setValue("address", shippingAddress.address || "");
    setValue("city", shippingAddress.city || "");
    setValue("pincode", shippingAddress.pincode || "");
    setValue("country", shippingAddress.country || "");
  }, [shippingAddress, setValue]);

  const formSubmit = (form) => {
    saveShippingAddress(form);
    router.push("/payment");
  };

  const FormInput = ({ id, name, required, pattern }) => {
    return (
      <div className="flex flex-col gap-2 mx-3">
        <label htmlFor={id}>{name}</label>
        <input
          type="text"
          id={id}
          {...register(id, { required: `${name} is required`, pattern })}
          className=" p-3 bg-white w-full"
        />
        {errors[id]?.message && <div>{errors[id]?.message}</div>}
      </div>
    );
  };

  return (
    <div className="min-h-screen lg:m-7 mx-3 flex flex-col items-center">
      <CheckoutSteps current={2} />
      <h1 className="font-bold text-3xl text-red-900 my-5">Shipping Address</h1>
      <form
        onSubmit={handleSubmit(formSubmit)}
        className="flex flex-col border-2 border-gray-400 gap-2 lg:mx-44 rounded-2xl lg:p-5 py-5 lg:w-[35%]"
      >
        <FormInput name="Name" id="name" required />
        <div className="flex flex-row">
          <FormInput name="Address" id="address" required />
          <FormInput name="City" id="city" required />
        </div>
        <div className="flex flex-row">
          <FormInput name="Pincode" id="pincode" required />
          <FormInput name="Country" id="country" required />
        </div>
        <button className="bg-purple-800 p-3 w-44 rounded-2xl mx-auto my-7 ">
          Next
        </button>
      </form>
    </div>
  );
};
export default Shipping;
