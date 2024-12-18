import { CgMail } from "react-icons/cg";
import { AiFillInstagram } from "react-icons/ai";
import { FaFacebookSquare } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import Link from "next/link";

const Contact = () => {
  return (
    <div className="h-screen  my-10">
      <div className="border-2 border-gray-300 mx-10 flex gap-7 flex-col rounded-3xl p-9 text-xl">
        <h1 className=" text-center font-bold text-3xl ">Contact US</h1>
        <div className="text-center border-2 border-gray-300 rounded-3xl p-2 flex justify-center items-center gap-3">
          <CgMail className="w-8 h-8" />
          <span className="font-bold">Gmail:</span>
          <Link href="/" className="text-blue-500">
            renuu157@gmail.com
          </Link>
        </div>
        <div className="text-center border-2 border-gray-300 rounded-3xl p-2 flex justify-center items-center gap-3">
          <AiFillInstagram className="w-8 h-8" />
          <span className="font-bold">Instagram:</span>
          <Link href="/"></Link>
        </div>
        <div className="text-center border-2 border-gray-300 rounded-3xl p-2 flex justify-center items-center gap-3">
          <FaFacebookSquare className="w-8 h-8" />
          <span className="font-bold">Facebook:</span>
          <Link href="/"></Link>
        </div>
        <div className="text-center border-2 border-gray-300 rounded-3xl p-2 flex justify-center items-center gap-3">
          <FaTwitter className="w-8 h-8" />
          <span className="font-bold">Twitter:</span>
          <Link href="/"></Link>
        </div>
        <div className="text-center border-2 border-gray-300 rounded-3xl p-2 flex justify-center items-center gap-3">
          <FaLocationDot className="w-8 h-8" />
          <span className="font-bold">Location:</span>
          <Link href="/"></Link>
        </div>
      </div>
    </div>
  );
};
export default Contact;
