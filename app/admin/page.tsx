"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { client } from "@/sanity/lib/client";
import { Poppins } from "next/font/google";
import { FaJediOrder, FaOpencart } from "react-icons/fa";
import { FaArrowsRotate } from "react-icons/fa6";
import { LuUser } from "react-icons/lu";
import { TiMessages } from "react-icons/ti";
import { TbCancel } from "react-icons/tb";
import LoadingSpinner from "@/shared/LoadingSpinner";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

const Overview = () => {
  const adminInfo = useSelector((state: RootState) => state.adminSlice.adminInfo);

  const [data, setData] = useState({
    userCount: 0,
    ordersCount: 0,
    reactivateOrderCount: 0,
    cancelledOrderCount: 0,
    inboxCount: 0,
    productsCount: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!adminInfo || !adminInfo.name) return; 

    const fetchData = async () => {
      try {
        const responses = await Promise.all([
          client.fetch(`*[_type == "user"]`),
          client.fetch(`*[_type == "order"]`),
          client.fetch(`*[_type == "reactivateOrder"]`),
          client.fetch(`*[_type == "cancelOrder"]`),
          client.fetch(`*[_type == "inbox"]`),
          client.fetch(`*[_type == "product"]`),
        ]);

        setData({
          userCount: responses[0].length,
          ordersCount: responses[1].length,
          reactivateOrderCount: responses[2].length,
          cancelledOrderCount: responses[3].length,
          inboxCount: responses[4].length,
          productsCount: responses[5].length,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [adminInfo]);

  if (!adminInfo || !adminInfo.name) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h2 className={`${poppins.className} text-2xl font-bold text-red-600`}>Not Logged In</h2>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center">
      <div className="grid grid-cols-1 smx:grid-cols-2 gap-8 md:grid-cols-3 lgl:grid-cols-4 justify-items-center">
        {[
          { icon: FaOpencart, count: data.productsCount, label: "Products" },
          { icon: LuUser, count: data.userCount, label: "Users" },
          { icon: FaJediOrder, count: data.ordersCount, label: "Orders" },
          { icon: TbCancel, count: data.cancelledOrderCount, label: "Cancelled" },
          { icon: FaArrowsRotate, count: data.reactivateOrderCount, label: "ReActivated" },
          { icon: TiMessages, count: data.inboxCount, label: "Inbox" },
        ].map((item, index) => (
          <div key={index} className="flex items-center justify-center gap-4 border rounded-[12px] w-[190px] h-[100px]">
            <span className="flex items-center justify-center w-[50px] h-[50px] rounded-full">
              <item.icon size={30} color="green" />
            </span>
            <div className="flex flex-col items-center">
              <h4 className={`${poppins.className} text-[22px] text-[#464255] font-bold`}>
                {item.count}
              </h4>
              <p className={`${poppins.className} text-[18px] text-[#464255] whitespace-nowrap`}>
                {item.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Overview;
