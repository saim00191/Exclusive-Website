import Image from "next/image";
import React from "react";
import { CiTwitter } from "react-icons/ci";
import { CiInstagram } from "react-icons/ci";
import { RiLinkedinLine } from "react-icons/ri";
import member1 from "@/images/memberImg1.png";
import member2 from "@/images/memberImg2.png";
import member3 from "@/images/memberImg4.png";
import { Poppins } from "next/font/google";
import { Inter } from "next/font/google";
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });
const Inters = Inter({ subsets: ["latin"], weight: ["400", "700"] });
const Mamber = () => {
  return (
    <div className="container gap-3 flex-col   md:flex-row flex justify-center items-center md:justify-between ">
      <div className="flex flex-col gap-[32px] ">
        <div>
          <Image
            src={member1}
            alt=""
            className="rounded-[4px] w-[370px] h-[430px]"
          />
        </div>
        <div className="flex flex-col gap-[16px]">
          <div className="flex flex-col gap-[8px]">
            <h1 className={`${Inters.className} font-medium text-[32px]`}>
              Tom Cruise
            </h1>
            <p className={`${poppins.className} font-normal text-[16px]`}>
              Founder & Chairman
            </p>
          </div>
          <div className="flex gap-[16px]">
            <CiTwitter size={24} />
            <CiInstagram size={24} />
            <RiLinkedinLine size={24} />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-[32px] ">
        <div>
          <Image
            src={member2}
            alt=""
            className="rounded-[4px] w-[370px] h-[430px]"
          />
        </div>
        <div className="flex flex-col gap-[16px]">
          <div className="flex flex-col gap-[8px]">
            <h1 className={`${Inters.className} font-medium text-[32px]`}>
              Emma Watson
            </h1>
            <p className={`${poppins.className} font-normal text-[16px]`}>
              Managing Director
            </p>
          </div>
          <div className="flex gap-[16px]">
            <CiTwitter size={24} />
            <CiInstagram size={24} />
            <RiLinkedinLine size={24} />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-[32px] ">
        <div>
          <Image
            src={member3}
            alt=""
            className="w-[370px] h-[430px] rounded-[4px]"
          />
        </div>
        <div className="flex flex-col gap-[16px]">
          <div className="flex flex-col gap-[8px]">
            <h1 className={`${Inters.className} font-medium text-[32px]`}>
              Will Smith
            </h1>
            <p className={`${poppins.className} font-normal text-[16px]`}>
              Product Designer
            </p>
          </div>
          <div className="flex gap-[16px]">
            <CiTwitter size={24} />
            <CiInstagram size={24} />
            <RiLinkedinLine size={24} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mamber;
