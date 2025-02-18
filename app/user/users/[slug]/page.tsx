"use client";
import { client } from "@/sanity/lib/client";
import Wrapper from "@/shared/Wrapper";
import { useEffect, useState } from "react";
import { Inter, Poppins } from "next/font/google";
import Image from "next/image";
import { MdDelete } from "react-icons/md";
import { AiOutlineMinus } from "react-icons/ai";
import { FiPlus } from "react-icons/fi";

interface Product {
  productId: string;
  productImage: {
    asset: {
      url: string;
    };
  };
  productName: string;
  quantity: number;
  price: number;
  totalPrice: number;
}

interface OrderData {
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
  shippingDate: string | null;
}

const inter = Inter({ subsets: ["latin"], weight: ["400", "700"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

interface OrderPageProps {
  params: {
    slug: string;
  };
}

export default function OrderPage({ params }: OrderPageProps) {
  const slug = params.slug;
  console.log(slug);
  const [data, setData] = useState<OrderData | null>(null);


  useEffect(() => {

    async function getData() {
      try {
        const response = await client.fetch(
          `*[_type == "order" && orderId == $slug] {
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
            slug,
          }
        );
        setData(response[0]);
        console.log("Data fetched:", response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getData();
  }, [slug]);

  if (!data) {
    return <div>Loading...</div>; // Optional loading state
  }

  // Hydration fix: Only render dynamic content after the component is mounted
  

  return (
    <Wrapper className="px-4 py-10">
      <div className="flex flex-col gap-5 justify-center">
        <h1
          className={`${inter.className} font-semibold text-[36px] leading-[48px] flex items-center tracking-[4px] text-black`}
        >
          Order Details
        </h1>
        <h3
          className={`${inter.className} text-[18px] mt-6 text-black font-medium`}
        >
          Order ID :{" "}
          <span
            className={`${poppins.className} text-[20px] text-black font-medium`}
          >
            {slug}
          </span>
        </h3>
        <h3 className={`${inter.className} text-[18px] text-black font-medium`}>
          Name :{" "}
          <span
            className={`${poppins.className} text-[20px] text-black font-medium`}
          >
            {data.firstName}
          </span>
        </h3>
        <div className="flex-col smx:flex-row flex smx:items-center space-y-5 smx:space-y-0 smx:space-x-5">
          <h3
            className={`${inter.className} text-[18px] text-black font-medium`}
          >
            Order Date :{" "}
            <span
              className={`${poppins.className} text-[20px] text-black font-medium`}
            >
              {new Date(data.orderDate).toLocaleDateString("en-GB")}
            </span>
          </h3>
          <h3
            className={`${inter.className} text-[18px] text-black font-medium`}
          >
            Shipping Date :{" "}
            <span
              className={`${poppins.className} text-[20px] text-black font-medium`}
            >
              {data.shippingDate
                ? new Date(data.shippingDate).toLocaleDateString("en-GB")
                : new Date(
                    new Date(data.orderDate).getTime() + 8 * 24 * 60 * 60 * 1000
                  ).toLocaleDateString("en-GB")}
            </span>
          </h3>
        </div>
        <div>
          {data.products.map((item) => (
            <div
              key={item.productId}
              className="w-full lg:max-w-[1170px] border-b border-b-gray-300 py-5 h-full grid grid-cols-2 smx:grid-cols-5 gap-4 px-4"
            >
              <div className="bg-[#D0D5DD] w-[95px] h-[95px] rounded-[12px] flex items-center justify-center">
                {item.productImage.asset.url ? (

                <Image
                  src={item.productImage.asset.url}
                  alt={item.productName}
                  className="w-full h-full object-cover rounded-[12px]"
                  width={95}
                  height={95}
                />
                ) :
                  <p>No Image</p>}
              </div>
              <p
                className={`${poppins.className} text-black px-1 whitespace-nowrap smx:whitespace-normal col-span-2 xs:col-span-1 justify-end smx:justify-start flex items-center`}
              >
                {item.productName}
              </p>
              <div className="flex gap-2 items-center justify-start smx:justify-center px-1">
                <p className={`${poppins.className} text-black`}>
                  ${item.price}
                </p>
                <p className={`${poppins.className} text-black`}>
                  ({item.quantity})
                </p>
              </div>
              <p
                className={`${poppins.className} text-black flex justify-end smx:justify-center items-center px-1`}
              >
                ${item.totalPrice}
              </p>
              <div className="flex items-center gap-4 smx:justify-end justify-center w-full">
                <span
                  className="w-7 h-7 hover:cursor-pointer hover:bg-carminePink hover:text-white border border-gray-300 rounded-full flex items-center justify-center"
                >
                  <FiPlus className="text-[18px]" />
                </span>
                <span
                  className="w-7 h-7 hover:cursor-pointer hover:bg-carminePink hover:text-white border border-gray-300 rounded-full flex items-center justify-center"
                >
                  <AiOutlineMinus className="text-[18px]" />
                </span>

                <span
                  className="w-7 h-7 hover:cursor-pointer hover:bg-carminePink hover:text-white border border-gray-300 rounded-full flex items-center justify-center"
                >
                  <MdDelete className="text-[18px]" />
                </span>
              </div>
            </div>
          ))}
          <div className="flex justify-center smx:justify-end mt-6 items-center ">
            <button
              className="w-[200px] h-[56px] py-4 flex items-center justify-center rounded-[4px] border border-carminePink text-black hover:text-white hover:bg-carminePink"
            >
              <p className={`${poppins.className} text-[16px] `}>
                {" "}
                Save Changes
              </p>
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
