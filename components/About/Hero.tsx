import React from "react";
import image from "@/images/aboutmainImage.png";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { Inter } from "next/font/google";
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });
const Inters = Inter({ subsets: ["latin"], weight: ["400", "700"] });
const Hero = () => {
  return (
    <div className="grid md:grid-cols-2  h-[609px] relative ">
      <div className="container  absolute md:relative w-[525px] h-[336px] items-center -top-16 sm:top-2 md:top-0 justify-center md:justify-end flex ">
        <div className="w-[525px]  h-[336px] gap-[40px] mr-[28px] flex flex-col justify-center">
          <h1
            className={`${Inters.className} text-[54px] font-semibold leading-16 md:tracking-wide text-justify`}
          >
            Our Story
          </h1>
          <div className="flex flex-col gap-[24px]">
            <p
              className={`${poppins.className} font-poppins text-[16px] font-normal leading-6 text-left`}
            >
              Launced in 2015, Exclusive is South Asia premier online shopping
              makterplace with an active presense in Bangladesh. Supported by
              wide range of tailored marketing, data and service solutions,
              Exclusive has 10,500 sallers and 300 brands and serves 3 millioons
              customers across the region.{" "}
            </p>
            <p
              className={`${poppins.className} font-poppins text-[16px] font-normal leading-6 text-left`}
            >
              Exclusive has more than 1 Million products to offer, growing at a
              very fast. Exclusive offers a diverse assotment in categories
              ranging from consumer.{" "}
            </p>
          </div>
        </div>
      </div>
      <div className="w-full h-[609px]  overflow-hidden flex items-center justify-start">
        <div className="w-full  md:opacity-100 opacity-30 md:w-[705px] h-[609px]  flex justify-start relative">
          <Image
            src={image}
            alt="about"
            className="w-[837px] h-[609px] md:object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
