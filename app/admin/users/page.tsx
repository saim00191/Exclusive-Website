"use client";
import { RootState } from "@/redux/store";
import { client } from "@/sanity/lib/client";
import LoadingSpinner from "@/shared/LoadingSpinner";
import NotLoggedIn from "@/shared/NotLoggedIn";
import { Inter, Poppins } from "next/font/google";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

type User = {
  _id: string;
  userLoginName: string;
  userLoginEmail: string;
  userLoginPassword: string;
  _createdAt: string;
};

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "700"] });

const formatDateTime = (dateTime: string) => {
  const date = new Date(dateTime);
  return `${date.getDate()} ${date.toLocaleString("default", { month: "long" })} ${date.getFullYear()} / ${date.toLocaleTimeString()}`;
};

export default function UserTable() {
  const [userData, setUserData] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const adminInfo = useSelector((state: RootState) => state.adminSlice.adminInfo);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await client.fetch(`*[_type == "user"]`);
        setUserData(users);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);


  if (!adminInfo || !adminInfo.name) {
    return (
      <NotLoggedIn/>
    );
  }


  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
   
          <LoadingSpinner/>
   
      </div>
    );
  }

  return (
    <div className={`${poppins.className}`}>
      <h1
        className={`${inter.className} font-bold mb-6 text-[36px] leading-[48px] flex items-center tracking-[4px] text-black`}
      >
        Users Data
      </h1>

      <div className="hidden md:block">
        <table className="w-full border-collapse bg-white shadow-sm">
          <thead>
            <tr className="bg-carminePink text-white">
              <th className="border p-2 text-left">Name</th>
              <th className="border p-2 text-left">Email</th>
              <th className="border p-2 text-left">Password</th>
              <th className="border p-2 text-left">Created At</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user) => (
              <tr key={user._id} className="border-b py-4">
                <td className="border p-2">{user.userLoginName}</td>
                <td className="border p-2">{user.userLoginEmail}</td>
                <td className="border p-2">{user.userLoginPassword}</td>
                <td className="border p-2">
                  {formatDateTime(user._createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-7">
        {userData.map((user) => (
          <div
            key={user._id}
            className="bg-white p-4 space-y-2  rounded shadow-xl"
          >
            <h3 className="font-bold">{user.userLoginName}</h3>
            <p className="text-sm text-gray-600">{user.userLoginEmail}</p>
            <p className="text-sm">Password: {user.userLoginPassword}</p>
            <p className="text-sm text-gray-500">
              Created At: {formatDateTime(user._createdAt)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}