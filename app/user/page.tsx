"use client";
import { RootState } from "@/redux/store";
import { client } from "@/sanity/lib/client";
import Wrapper from "@/shared/Wrapper";
import { Inter, Poppins } from "next/font/google";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface Order {
  orderId: string;
  firstName: string;
  orderDate: string;
  shippingDate: string;
}

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "700"] });

const Home = () => {
  const [data, setData] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const userInfo = useSelector((state: RootState) => state.products.userInfo);

  useEffect(() => {
    async function getData() {
      try {
        const response = await client.fetch(
          `*[_type == "order" && userLoginEmail == $email] {
            orderId,
            firstName,
            orderDate,
            shippingDate
          }`,
          {
            email: userInfo?.email,
          }
        );

        setData(response);
        console.log("Data fetched:", response);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [userInfo?.email]);

  return (
    <Wrapper className="py-10 px-4 flex items-center justify-center">
      <div className="grid grid-cols-1 gap-14 md:grid-cols-2  lgll:grid-cols-3">
        {data.map((order, index) => (
          <div
            key={index}
            className="xs:h-[230px] xs:w-[350px] p-4 space-y-6 border border-[#e5e5e5] rounded-md"
          >
            <p
              className={`${inter.className} text-[16px] text-black font-medium`}
            >
              {" "}
              Order Id:{" "}
              <span
                className={`${poppins.className} text-[18px] text-black font-medium`}
              >
                {" "}
                {order.orderId}{" "}
              </span>{" "}
            </p>
            <p
              className={`${inter.className} text-[16px] text-black font-medium`}
            >
              {" "}
              Name:{" "}
              <span
                className={`${poppins.className} text-[18px] text-black font-medium`}
              >
                {" "}
                {order.firstName}{" "}
              </span>{" "}
            </p>
            <p
              className={`${inter.className} text-[16px] text-black font-medium`}
            >
              {" "}
              Order Date:{" "}
              <span
                className={`${poppins.className} text-[18px] text-black font-medium`}
              >
                {" "}
                {new Date(order.orderDate).toLocaleDateString("en-GB")}{" "}
              </span>{" "}
                </p>
                <div className="flex justify-end items-center ">
                    <Link href={`user/users/${order.orderId}`} 
                        className="w-[200px] h-[56px] py-4 flex items-center justify-center rounded-[4px] border border-carminePink text-black  hover:text-white hover:bg-carminePink"
                    >
                       <p className={`${poppins.className} text-[16px] `}> View Details</p>
                    </Link>
                </div>
          </div>
        ))}
      </div>
    </Wrapper>
  );
};

export default Home;
