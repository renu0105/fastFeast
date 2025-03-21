"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data = await res.json();
    if (res.ok) {
      alert(data.message);
      router.push("/login");
    } else {
      alert(data.error);
    }

    if (password.length < 8) {
      alert("Password must be at least 8 characters");
      return;
    }
    setName("");
    setEmail("");
    setPassword("");
  };
  return (
    <div className="h-screen">
      <div className="border-b-2 w-full pb-6 border-red-900 text-center text-red-950">
        <h1 className="text-6xl font-ruthie my-5 font-bold">FastFeast</h1>
        <span className="mx-auto text-2xl font-bold">Register</span>
      </div>
      <form
        className="flex flex-col border-2 border-gray-400 p-6 rounded-2xl h-[50%] gap-4 justify-center my-16 w-[70%] mx-auto"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Name"
          className="bg-white p-3 border-2 border-gray-300"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Email"
          className="bg-white p-3 border-2 border-gray-300"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="bg-white p-3 border-2 border-gray-300"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-purple-500 p-3 text-white w-52 mx-auto rounded-2xl mt-3 text-xl"
        >
          Register
        </button>
        <p className="text-center">
          Do you have an account ?{" "}
          <Link href="/login" className="text-blue-400">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
