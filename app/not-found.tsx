import Wrapper from "@/shared/Wrapper";
import { Inter, Poppins } from "next/font/google";
import Link from "next/link";
import React from "react";
const inters = Inter({ subsets: ["latin"], weight: ["400", "700"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });
const NotFound = () => {
  return (
    <Wrapper className="flex justify-center items-center h-auto lg:h-[379px] w-full">
      <div className="flex flex-col h-auto lg:h-[279px]  w-full justify-between items-center">
        <div className="flex flex-col justify-between  h-full lg:h-[179px] w-full lg:w-[829px] items-center">
          <h2
            className={`${inters.className} text-[30px] xsm:text-[40px] mdl:text-[110px] leading-[115px] tracking-[3px] text-black font-medium`}
          >
            404 Not Found
          </h2>
          <p
            className={`${poppins.className} text-center smx:text-start text-[16px] leading-[24px] text-black`}
          >
            Your visited page not found. You may go home page.
          </p>
        </div>
        <Link href="/" className="py-8">
          <button
            className={`${poppins.className} text-primary w-[245px] h-[56px] rounded-[4px] bg-carminePink text-[15px] leading-[20px] py-4 px-12`}
          >
            Back to home page
          </button>
        </Link>
      </div>
    </Wrapper>
  );
};

export default NotFound;
