"use client";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";

const Navbar = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
    localStorage.removeItem("token"); // Remove the token from localStorage
    toast.success("Logged out successfully");
    // router.push("/login"); // Redirect to the login page
  };

  const handleButton = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  return (
    <div className="bg-rose-950 flex flex-row justify-between text-xl p-3 text-white max-w-screen h-20 w-full">
      <div className="flex flex-row gap-5 items-center justify-center cursor-pointer">
        <Link href="/" className="font-ruthie text-4xl">
          FastFeast
        </Link>
      </div>

      <div className="flex flex-row gap-5 items-center">
        <button
          className="bg-red-800 p-2 rounded-2xl text-white flex flex-row items-center gap-3"
          onClick={() => router.push("/cart")}
        >
          <FaShoppingCart />
          <span>View Cart</span>
        </button>

        <div className="relative">
          <button className="flex items-center" onClick={handleButton}>
            <FaUser />
          </button>
          {showProfileMenu && (
            <div>
              {!session ? (
                <div className="absolute z-10 text-red-900 bg-white top-20 h-auto w-52 right-0 flex flex-col py-4 px-4 shadow-lg rounded-md">
                  {/* Account Message */}
                  <p className="text-gray-700 mb-4">To access your account:</p>

                  {/* Login and Register Buttons */}
                  <button
                    onClick={() => router.push("/login")}
                    className="font-bold mb-2 text-red-700 hover:text-red-900"
                  >
                    LOGIN
                  </button>
                  <button
                    onClick={() => router.push("/register")}
                    className="font-bold mb-4 text-red-700 hover:text-red-900"
                  >
                    REGISTER
                  </button>
                </div>
              ) : (
                <div className="absolute z-10 text-red-900 bg-white top-14 h-auto w-52 right-0 flex flex-col py-4 px-4 shadow-lg rounded-md">
                  <p className="text-gray-700 mb-4">
                    Welcome, {session.user?.name || "User"}
                  </p>

                  <button
                    onClick={handleLogout}
                    className="bg-red-600 text-white py-2 px-3 rounded-md hover:bg-red-700"
                  >
                    LOGOUT
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
