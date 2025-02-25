"use client";

import type React from "react";
import {  useState } from "react";
import { Lock, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { Poppins } from "next/font/google";
import { useDispatch } from "react-redux";
import { setAdminInfo } from "@/redux/adminSlice";
import Wrapper from "@/shared/Wrapper";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export default function LoginForm() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (name === process.env.NEXT_PUBLIC_ADMIN_NAME && password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      const adminData = { name: name , password: password };

      dispatch(setAdminInfo(adminData));
      setSuccessMsg("Logged In Successfully");
        router.push("/admin");

    } else {
      setError("Invalid email or password");
    }
  };


  return (
    <Wrapper className="flex items-center justify-center w-full h-auto py-10 px-4">
      <div
        className={`${poppins.className} bg-white shadow-2xl max-w-[900px] h-auto rounded-lg overflow-hidden`}
      >
        <div className="bg-[#DB4444] p-8 text-white text-center">
          <h2 className="text-3xl font-bold">Admin Login</h2>
          <p className="mt-2 text-red-100">
            Welcome back! Please login to your account.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="p-8">
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Username
            </label>
            <div className="relative">
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#DB4444] pl-10"
                placeholder="Enter Admin Username"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#DB4444] pl-10"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-[#DB4444] text-white py-2 px-4 rounded-md hover:bg-[#C93E3E] transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#DB4444] focus:ring-opacity-50"
          >
            Login
          </button>
          <div>
            {error && <p className="text-xl text-center py-4 text-red-600">{error}</p>}
            {successMsg && <p className="text-xl text-center py-4 font-bold text-green-700">{successMsg}</p>}
          </div>
        </form>
      </div>
    </Wrapper>
  );
}
