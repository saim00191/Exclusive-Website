import Image from "next/image";
import ratingImage1 from "@/images/ratingImg1.png";
import ratingImage3 from "@/images/ratingImg3.png";
import ratingImage4 from "@/images/ratingImg4.png";
import React from "react";
import { Poppins } from "next/font/google";
import { Inter } from "next/font/google";
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });
const Inters = Inter({ subsets: ["latin"], weight: ["400", "700"] });

const Rating = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="  grid lg:grid-cols-4 md:grid-cols-2 gap-4    justify-between ">
        <div className="flex justify-center items-center hover:bg-[#DB4444] hover:text-white rounded-[4px] w-[270px] border">
          <div className="flex justify-center items-center py-[50px]  flex-col  gap-[24px]">
            <Image src={ratingImage1} alt="" className="h-[80px] w-[80px]" />
            <div className="flex flex-col  gap-[12px] text-center">
              <h1 className={`${Inters.className} font-bold text-[32px] `}>
                10.5k{" "}
              </h1>
              <p className={`${poppins.className}  font-normal text-[16px]`}>
                Sallers active our site
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center hover:bg-[#DB4444] hover:text-white rounded-[4px] w-[270px] border">
          <div className="flex justify-center items-center py-[50px]  flex-col  gap-[24px]">
            <svg
              width="80"
              height="80"
              viewBox="0 0 80 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.3"
                d="M80 40C80 62.0914 62.0914 80 40 80C17.9086 80 0 62.0914 0 40C0 17.9086 17.9086 0 40 0C62.0914 0 80 17.9086 80 40ZM10.9071 40C10.9071 56.0675 23.9325 69.0929 40 69.0929C56.0675 69.0929 69.0929 56.0675 69.0929 40C69.0929 23.9325 56.0675 10.9071 40 10.9071C23.9325 10.9071 10.9071 23.9325 10.9071 40Z"
                fill="#2F2E30"
              />
              <circle cx="40" cy="40" r="29" fill="black" />
              <path
                d="M40.0003 57.2728C49.5397 57.2728 57.273 49.5395 57.273 40C57.273 30.4606 49.5397 22.7273 40.0003 22.7273C30.4608 22.7273 22.7275 30.4606 22.7275 40C22.7275 49.5395 30.4608 57.2728 40.0003 57.2728Z"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M45.0914 34.547C44.762 33.9758 44.2834 33.505 43.707 33.1848C43.1305 32.8646 42.4777 32.7072 41.8186 32.7294H38.1823C37.2178 32.7294 36.2929 33.1124 35.611 33.7941C34.929 34.4759 34.5459 35.4005 34.5459 36.3647C34.5459 37.3288 34.929 38.2535 35.611 38.9353C36.2929 39.617 37.2178 40 38.1823 40H41.8186C42.783 40 43.708 40.383 44.3899 41.0648C45.0719 41.7465 45.455 42.6712 45.455 43.6354C45.455 44.5995 45.0719 45.5242 44.3899 46.2059C43.708 46.8877 42.783 47.2707 41.8186 47.2707H38.1823C37.5232 47.2929 36.8704 47.1354 36.2939 46.8153C35.7174 46.4951 35.2389 46.0242 34.9095 45.453"
                stroke="white"
                stroke-width="2.75"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M40 28.1818V32.1212M40 47.8787V51.8181"
                stroke="white"
                stroke-width="2.75"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <div className="flex flex-col  gap-[12px] text-center">
              <h1 className={`${Inters.className} font-bold text-[32px]  `}>
                33k
              </h1>
              <p className={`${poppins.className}  font-normal text-[16px]`}>
                Mopnthly Produduct Sale
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center hover:bg-[#DB4444] hover:text-white rounded-[4px] w-[270px] border">
          <div className="flex justify-center items-center py-[50px]  flex-col  gap-[24px]">
            <Image src={ratingImage3} alt="" className="h-[80px] w-[80px]" />
            <div className="flex flex-col  gap-[12px] text-center">
              <h1 className={`${Inters.className} font-bold text-[32px]  `}>
                45.5k
              </h1>
              <p className={`${poppins.className}  font-normal text-[16px]`}>
                Customer active in our site
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center hover:bg-[#DB4444] hover:text-white rounded-[4px] w-[270px] border">
          <div className="flex justify-center items-center py-[50px]  flex-col  gap-[24px]">
            <Image src={ratingImage4} alt="" className="h-[80px] w-[80px]" />
            <div className="flex flex-col  gap-[12px] text-center">
              <h1 className={`${Inters.className} font-bold text-[32px] `}>
                25k
              </h1>
              <p className={`${poppins.className}  font-normal text-[16px]`}>
                Anual gross sale in our site
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rating;