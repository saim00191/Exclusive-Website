"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Poppins } from "next/font/google";
import { client } from "@/sanity/lib/client";
import LoadingSpinner from "@/shared/LoadingSpinner";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import NotLoggedIn from "@/shared/NotLoggedIn";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export interface Inbox {
  _id: string;
  UserLoginName?: string;
  userLoginEmail?: string;
  userLoginPassword?: string;
  name?: string;
  phone?: string;
  email?: string;
  message: string;
  date: string;
}

export default function InboxPage() {
  const [inboxData, setInbox] = useState<Inbox[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedInbox, setSelectedInbox] = useState<Inbox | null>(null);
  const adminInfo = useSelector((state: RootState) => state.adminSlice.adminInfo);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const Inbox: Inbox[] = await client.fetch(
          `*[_type == "inbox"]{
          _id,
            userLoginName,
            userLoginEmail,
            userLoginEmail,
            userLoginPassword,
            name,
            email,
            phone,
            message,
            date,
          }`
        );
        setInbox(Inbox);
        console.log("Orders", Inbox);
      } catch (error) {
        console.error("Error fetching Inbox:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    if (selectedInbox) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedInbox]);

  if (!adminInfo || !adminInfo.name) {
    return (
    <NotLoggedIn/>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div
      className={`${poppins.className} py-10 px-4 sm:px-6 lg:px-8 ${selectedInbox ? "pointer-events-none" : ""}`}
    >
      <h1 className="font-bold mb-6 text-[28px] sm:text-[36px] tracking-[4px] text-black ">
        Inbox
      </h1>
      <div className="overflow-x-auto rounded-md border">
        <table className="min-w-full bg-white border-collapse">
          <thead>
            <tr className="bg-carminePink text-white border-b ">
              <th className="px-2 sm:px-4 py-2 text-left">Name</th>
              <th className="px-2 sm:px-4 py-2 text-start hidden sm:table-cell">
                Email
              </th>
              <th className="px-2 sm:px-4 py-2 text-start hidden md:table-cell">
                Date
              </th>
              <th className="px-2 sm:px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {inboxData.map((inbox) => (
              <motion.tr
                key={inbox._id}
                className="border-b hover:bg-gray-50 "
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <td className="px-2 sm:px-4 py-2 font-medium">{inbox.name}</td>
                <td className="px-2 sm:px-4 py-2   text-start hidden sm:table-cell">
                  {inbox.email}
                </td>
                <td className="px-2 sm:px-4 py-2 text-start hidden md:table-cell">
                  {new Date(inbox.date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </td>
                <td className="px-2 sm:px-4 py-2 flex items-center justify-center">
                  <button
                    className="text-sm text-blue-600 hover:underline"
                    onClick={() => setSelectedInbox(inbox)}
                  >
                    View Details
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {selectedInbox && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg pointer-events-auto"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <h2 className="text-lg sm:text-xl font-bold mb-3">
                Message Detail
              </h2>
              <p>Name: {selectedInbox.name}</p>
              <p>LoggedIn Email: {selectedInbox.userLoginEmail}</p>
              {selectedInbox.userLoginPassword && (
                <p>LoggedIn Password: {selectedInbox.userLoginPassword}</p>
              )}
              <p>Email: {selectedInbox.email}</p>
              <p>Phone: {selectedInbox.phone}</p>

              <p>
                Date:{" "}
                {new Date(selectedInbox.date).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </p>

              <p>Messgae: {selectedInbox.message}</p>

              <div className="mt-4 flex justify-end">
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  onClick={() => setSelectedInbox(null)}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
