"use client";
import Link from "next/link";
import { IoLogoInstagram } from "react-icons/io";
import { FaFacebookSquare } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaTwitter } from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Footer = () => {
  const router = useRouter();
  return (
    <div className="bg-gray-300  ">
      <div className="mx-7 flex md:flex-row justify-between items-center flex-col gap-6">
        <div>
          <Link href="/">
            <h1 className="text-gray-800 font-bold text-6xl my-6 font-ruthie">
              FastFeast
            </h1>
          </Link>
          <div className="flex flex-row gap-9 text-4xl ">
            <Link href="/">
              <IoLogoInstagram />
            </Link>
            <Link href="/">
              <FaFacebookSquare />
            </Link>
            <Link href="/">
              <MdEmail />
            </Link>
            <Link href="/">
              <FaTwitter />
            </Link>
          </div>
        </div>

        <div className="flex lg:flex-row flex-col lg:gap-28 gap-12">
          <div className="flex flex-col">
            <h1 className="font-bold my-6">SHOP</h1>
            <Link href="/">Home</Link>
            <Link href="/products">Products</Link>
            <Link href="/">Orders</Link>
          </div>

          <div className="flex flex-col">
            <h1 className="font-bold my-6">CUSTOMER SERVICE</h1>
            <Link href="/contact">Contact Us</Link>
            <Link href="/about">About US</Link>
            <Link href="/shippingPolicy">Shipping Policy</Link>
          </div>

          <div className="flex flex-col">
            <h1 className="font-bold my-6">POLICY</h1>
            <Link href="/privacyPolicy">Privacy Policy</Link>
            <Link href="/cancel">Cancellation & Refund Policy</Link>
            <Link href="/term">Terms & Conditions</Link>
          </div>
        </div>
        <Image
          src="/pay_jzyfgd.png"
          alt="/payment"
          width={900}
          height={900}
          className="w-80 h-44 my-4"
        ></Image>
      </div>
      <p className="text-gray-600">© 2023 rusaa.in — All Rights are Reserved</p>
    </div>
  );
};
export default Footer;
