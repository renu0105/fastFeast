"use client";
import { FcGoogle } from "react-icons/fc";
import { FaRegUserCircle } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/login", {
        email,
        password,
      });
      const data = res.data;

      if (res.status === 200) {
        const token = data.token;
        localStorage.setItem("token", token);
        toast.success("Login Successful");
        router.push("/shipping");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-white h-screen w-full flex flex-col items-center text-black">
      <div className="flex flex-col gap-6 m-6 w-full">
        <div className="border-b-2 pb-3 text-red-950 font-bold my-4 flex flex-col items-center">
          <h1 className="text-6xl font-ruthie">FastFeast</h1>
          <span className="mx-auto text-2xl">Sign Up or Sign In</span>
        </div>

        <div className="flex flex-col gap-2 mx-auto w-96 ">
          <form onSubmit={handleSubmit} className="flex flex-col w-full">
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white border-2 border-gray-300 p-3"
              required
            />
            <input
              type="text"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white border-2 border-t-0 border-gray-300 p-3"
              required
            />
            <p className="border-b-2 border-gray-300 rounded-xl pb-6 my-4 text-xs text-gray-600">
              Password must be at least 8 characters
            </p>

            <button
              className="bg-purple-500 rounded-2xl flex flex-row items-center p-3 text-white gap-5 justify-center"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                "Signing in..."
              ) : (
                <>
                  <FaLock />
                  Sign In
                </>
              )}
            </button>
          </form>

          <button
            className="p-3 rounded-2xl flex flex-row items-center gap-5 justify-center bg-base-100 text-white"
            onClick={() => router.push("/register")}
          >
            <FaRegUserCircle className="text-2xl" />
            <span>Create new Account</span>
          </button>
          <button
            className="p-3 rounded-2xl flex flex-row items-center gap-5 justify-center bg-base-100 text-white"
            onClick={() => signIn("google")}
          >
            <FcGoogle className="text-2xl" />
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
