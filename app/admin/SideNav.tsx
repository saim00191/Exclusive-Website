import Wrapper from "@/shared/Wrapper";
import { Inter, Poppins } from "next/font/google";
import React from "react";
import { FiEye } from "react-icons/fi";
import { FaUser } from "react-icons/fa6";
import { AiOutlineProduct } from "react-icons/ai";
import { RiSecurePaymentLine } from "react-icons/ri";
import { FaJediOrder } from "react-icons/fa";
import Overview from "./Overview";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

const sideNavItems = [
  { icon: FiEye, title: "Overview" },
  { icon: FaUser, title: "Users" },
  { icon: FaJediOrder, title: "Orders" },
  { icon: AiOutlineProduct, title: "Products" },
  { icon: RiSecurePaymentLine, title: "Payments" },
];



const SideNav = () => {
    return (
        <Wrapper className="flex  justify-start h-auto py-6">
          <div className="border-r-2 border-r-[#F0F0F0] py-5 w-[100px] sm:w-[200px] lg:w-[280px]  h-auto flex flex-col items-center gap-4">
            {sideNavItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 hover:text-white group px-4 hover:bg-carminePink w-[80px] sm:w-[180px] lg:w-[250px] h-[50px] rounded-[10px] cursor-pointer"
              >
                <item.icon className="text-carminePink group-hover:text-white text-xl" />
                <p
                  className={`${poppins.className} text-[16px] text-[#858585] group-hover:text-white font-medium hidden sm:block`}
                >
                  {item.title}
                </p>
              </div>
            ))}
          </div>
            <div className="flex-1 py-5 px-3">
                <Overview />
          </div>
        </Wrapper>
      );
}

export default SideNav