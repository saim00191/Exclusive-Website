"use client";

import { RootState } from "@/redux/store";
import Wrapper from "@/shared/Wrapper";
import { Inter, Poppins } from "next/font/google";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { CiDeliveryTruck } from "react-icons/ci";
import { client } from "@/sanity/lib/client";
import Image from "next/image";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "700"] });

const Home = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const userInfo = useSelector((state: RootState) => state.products.userInfo);

  useEffect(() => {
    async function getData() {
      try {
        const response = await client.fetch(
          `*[_type == "order" && userLoginEmail == $email && userLoginPassword == $password] {
            orderId,
            userLoginName,
            userLoginEmail,
            userLoginPassword,
            firstName,
            company,
            address,
            city,
            phone,
            email,
            products[] {
              productId,
              productImage {
                asset-> {
                  url
                }
              },
              productName,
              quantity,
              price,
              totalPrice
            },
            totalAmount,
            orderStatus,
            paymentStatus,
            orderDate,
            shippingDate
          }`,
          {
            email: userInfo?.email,
            password: userInfo?.password,
          }
        );

        setData(response);
        console.log("Data fetched:", response);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    }
    getData();
  }, []);

  const formatDate = (date: string) => {
    const parsedDate = new Date(date);
    return parsedDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Function to calculate the delivery date by adding 7 days
  const calculateDeliveryDate = (orderDate: string): string => {
    const parsedDate = new Date(orderDate);
    parsedDate.setDate(parsedDate.getDate() + 7); // Add 7 days
    return parsedDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Wrapper className="py-6">
      <h1
        className={`${inter.className} text-[24px] tracking-[4px] leading-[24px] font-bold text-black`}
      >
        Orders
      </h1>

      <div>
        {loading ? (
          <p>Loading...</p>
        ) : data.length > 0 ? (
          data.map((order: any) => (
            <div className="py-8 space-y-6 px-2" key={order.orderId}>
              <h4
                className={`${inter.className} text-[#344054] font-semibold text-[20px] leading-[26px]`}
              >
                Order ID:{" "}
                <span className={`${poppins.className} font-medium text-black`}>
                  {order.orderId}
                </span>
              </h4>
              <div className="max-w-[700px] h-auto flex flex-col gap-2 sml:flex-row sml:gap-3 justify-between items-start sml:items-center">
                <p
                  className={`${inter.className} text-[#667085] font-medium text-[20px] leading-[26px]`}
                >
                  Order Date :{" "}
                  <span
                    className={`${poppins.className} font-medium text-black`}
                  >
                    {formatDate(order.orderDate)}
                  </span>{" "}
                </p>
                <p className="text-[#667085] hidden sml:block">|</p>

                <p
                  className={`${inter.className} text-[#12B76A] font-medium text-[20px] leading-[26px]`}
                >
                  Delivery Date:{" "}
                  <span
                    className={`${poppins.className} font-medium text-black`}
                  >
                    {calculateDeliveryDate(order.orderDate)}
                  </span>{" "}
                </p>
              </div>
              <h3
                className={`${inter.className} text-[#344054] font-semibold text-[20px] leading-[26px]`}
              >
                Buyer Name:{" "}
                <span className={`${poppins.className} font-medium text-black`}>
                  {order.firstName}
                </span>
              </h3>
              <div className="">
                {order.products.map((item: any) => (
                  <div
                    key={item.orderId}
                    className="w-full lg:max-w-[1170px] border-b border-b-gray-300 py-5 h-full grid grid-cols-2 smxs:grid-cols-4 gap-4  px-4"
                  >
                    <div className="bg-[#D0D5DD] w-[95px] h-[95px] rounded-[12px] flex items-center justify-center">
                      <Image
                        src={item.productImage.asset.url}
                        alt=""
                        className="w-full h-full object-cover rounded-[12px]"
                        width={95}
                        height={95}
                      />
                    </div>
                    <p
                      className={`${poppins.className} text-black  justify-end smxs:justify-start flex items-center`}
                    >
                      {item.productName}
                    </p>
                    <div className="flex gap-2 items-center justify-start">
                      <p className={`${poppins.className} text-black`}>
                        ${item.price}
                      </p>
                      <p className={`${poppins.className} text-black`}>
                        ({item.quantity})
                      </p>
                    </div>
                    <p
                      className={`${poppins.className} text-black flex justify-end items-center`}
                    >
                      ${item.totalPrice}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p>No orders found</p>
        )}
      </div>
    </Wrapper>
  );
};

export default Home;
