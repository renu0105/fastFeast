"use client";
import { useRouter } from "next/navigation";
import { FaCheck } from "react-icons/fa";

const ThankYou = () => {
  const router = useRouter();
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold">THANK YOU</h1>
      {/* <p className="text-5xl font-bold text-center">
        Your order has been placed successfully
      </p> */}
      <FaCheck className="text-9xl text-green-600" />
      <p className="text-center">
        Thanks a bunch for filling that out,just like you do! we really
        appreciate you giving a moment of your time to help us improve our
        service.Thanks for being you.
      </p>
      <button
        className="border-2 border-black p-3 w-52 my-6"
        onClick={() => router.push("/")}
      >
        RETURN TO HOME
      </button>
    </div>
  );
};
export default ThankYou;
