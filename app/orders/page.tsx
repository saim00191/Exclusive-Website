"use client";

import { RootState } from "@/redux/store";
import Wrapper from "@/shared/Wrapper";
import { Inter, Poppins } from "next/font/google";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import { MdDelete } from "react-icons/md";
import { FiPlus } from "react-icons/fi";
import { AiOutlineMinus } from "react-icons/ai";


const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "700"] });


interface Product {
  productId: string;
  productImage: { asset: { url: string } };
  productName: string;
  quantity: number;
  price: number;
  totalPrice: number;
}

interface Order {
  orderId: string;
  userLoginName: string;
  userLoginEmail: string;
  firstName: string;
  company: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  products: Product[];
  totalAmount: number;
  orderStatus: string;
  paymentStatus: string;
  orderDate: string;
  shippingDate: string;
}

const Home = () => {
  const [data, setData] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const userInfo = useSelector((state: RootState) => state.products.userInfo);
  
  useEffect(() => {
    async function getData() {
      try {
        const response: Order[] = await client.fetch(
          `*[_type == "order" && userLoginEmail == $email] {
            orderId,
            userLoginName,
            userLoginEmail,
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
    
    <Wrapper className="py-6">
      <h1 className={`${inter.className} text-[24px] tracking-[4px] leading-[24px] font-bold text-black`}>
        Orders
      </h1>

      <div>
        {loading ? (
          <p>Loading...</p>
        ) : data.length > 0 && userInfo !== null ? (
          data.map((order) => (
            <div className="py-8 space-y-6 px-2" key={order.orderId}>
              <h4 className={`${inter.className} text-[#344054] font-semibold text-[20px] leading-[26px]`}>
                Order ID: <span className={`${poppins.className} font-medium text-black`}>{order.orderId}</span>
              </h4>
              
              <h3 className={`${inter.className} text-[#344054] font-semibold text-[20px] leading-[26px]`}>
                Buyer Name: <span className={`${poppins.className} font-medium text-black`}>{order.firstName}</span>
              </h3>
              <div>
                {order.products.map((item) => (
                  <div
                    key={item.productId}
                    className="w-full lg:max-w-[1170px] border-b border-b-gray-300 py-5 h-full grid grid-cols-2 smx:grid-cols-5 gap-4 px-4"
                  >
                    <div className="bg-[#D0D5DD] w-[95px] h-[95px] rounded-[12px] flex items-center justify-center">
                      <Image
                        src={item.productImage.asset.url}
                        alt={item.productName}
                        className="w-full h-full object-cover rounded-[12px]"
                        width={95}
                        height={95}
                      />
                    </div>
                    <p className={`${poppins.className} text-black px-1 whitespace-nowrap smx:whitespace-normal col-span-2 xs:col-span-1  justify-end smx:justify-start flex items-center`}>
                      {item.productName}
                    </p>
                    <div className="flex gap-2 items-center justify-start smx:justify-center px-1"> 
                      <p className={`${poppins.className} text-black`}>${item.price}</p>
                      <p className={`${poppins.className} text-black`}>({item.quantity})</p>
                    </div>
                    <p className={`${poppins.className} text-black flex justify-end smx:justify-center items-center px-1`}>
                      ${item.totalPrice}
                    </p>
                    <div className="flex items-center gap-4 smx:justify-end  justify-center w-full">

                        <span className="w-7 h-7 hover:cursor-pointer hover:bg-carminePink hover:text-white border border-gray-300 rounded-full flex items-center justify-center">
                          <FiPlus className="text-[18px] "/>
                          </span>
                        <span className="w-7 h-7 hover:cursor-pointer hover:bg-carminePink hover:text-white border border-gray-300 rounded-full flex items-center justify-center">
                          <AiOutlineMinus className="text-[18px] "/>
                          </span>
                  
                      <span className="w-7 h-7 hover:cursor-pointer hover:bg-carminePink hover:text-white border border-gray-300 rounded-full flex items-center justify-center">
                        <MdDelete className="text-[18px] "/>
                      </span>
                    </div>
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
