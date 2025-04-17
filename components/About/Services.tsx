import React from "react";
import service1 from "@/images/ServiceImg1.png";
import service2 from "@/images/ServiceImg2.png";
import service3 from "@/images/ServiceImg3.png";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { Inter } from "next/font/google";
import Wrapper from "@/shared/Wrapper";
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });
const Inters = Inter({ subsets: ["latin"], weight: ["400", "700"] });
const Services = () => {
  return (
    <Wrapper className=" h-auto justify-center flex py-8">
      <div className="w-full grid grid-cols-1 xsm:grid-cols-2 md:grid-cols-3 gap-8 justify-between">
        <div className="flex flex-col gap-[24px] items-center ">
          <Image src={service1} alt="" className="h-[80px] w-[80px]  " />
          <div className="flex flex-col gap-[8px] items-center text-center">
            <h1 className={`${Inters.className} font-semibold text-[20px]`}>
              FREE AND FAST DELIVERY
            </h1>
            <p className={`${poppins.className} font-normal text-[14px]`}>
              Free delivery for all orders over $140
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-[24px] items-center ">
          <Image src={service2} alt="" className="h-[80px] w-[80px] " />
          <div className="flex flex-col gap-[8px] items-center text-center">
            <h1 className={`${Inters.className} font-semibold text-[20px]`}>
              24/7 CUSTOMER SERVICE
            </h1>
            <p className={`${poppins.className} font-normal text-[14px]`}>
              Friendly 24/7 customer support
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-[24px] items-center ">
          <Image src={service3} alt="" className="h-[80px] w-[80px] " />
          <div className="flex flex-col gap-[8px] items-center text-center">
            <h1 className={`${Inters.className} font-semibold text-[20px]`}>
              MONEY BACK GUARANTEE
            </h1>
            <p className={`${poppins.className} font-normal text-[14px]`}>
              We reurn money within 30 days
            </p>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Services;
