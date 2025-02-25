'use client'
import Wrapper from "@/shared/Wrapper";
import { Poppins } from "next/font/google";
import React from "react";
import { FiEye } from "react-icons/fi";
import { FaArrowsRotate, FaUser } from "react-icons/fa6";
import { AiOutlineProduct } from "react-icons/ai";
import { FaJediOrder } from "react-icons/fa";
import Link from "next/link";
import { TbCancel } from "react-icons/tb";
import { TiMessages } from "react-icons/ti";
import { IoMdLogOut } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { clearAdminInfo } from "@/redux/adminSlice";
import { useRouter } from "next/navigation";
import { RootState } from "@/redux/store";
import { IoMdLogIn } from "react-icons/io";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

const SideNav = () => {

  const adminInfo = useSelector((state: RootState) => state.adminSlice.adminInfo);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearAdminInfo());
    router.push('/adminLogin')
  };

  const sideNavItems = [
    { icon: FiEye, title: "Overview", href: "/admin" },
    { icon: FaUser, title: "Users", href: "/admin/users" },
    { icon: FaJediOrder, title: "Orders", href: "/admin/orders" },
    { icon: AiOutlineProduct, title: "Products", href: "/admin/products" },
    { icon: TbCancel, title: "Cancelled Orders", href: "/admin/cancelledOrders" },
    { icon: FaArrowsRotate, title: "Reactivated Orders", href: "/admin/reactivatedOrder" },
    { icon: TiMessages, title: "Inbox", href: "/admin/inbox" },
  ];

  return (
    <Wrapper className="flex justify-start h-auto py-6">
      <div className="border-r-2 border-r-[#F0F0F0] py-5 w-[75px] xsm:w-[100px] sm:w-[200px] lg:w-[280px] h-auto flex flex-col items-center gap-4">
        {sideNavItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="flex items-center gap-4 hover:text-white group px-4 hover:bg-carminePink w-[50px] xsm:w-[80px] sm:w-[180px] lg:w-[250px] h-[50px] rounded-[10px] cursor-pointer"
          >
            <item.icon className="text-carminePink group-hover:text-white text-xl" />
            <p
              className={`${poppins.className} text-[16px] text-[#858585] group-hover:text-white font-medium hidden sm:block`}
            >
              {item.title}
            </p>
          </Link>
        ))}
        {adminInfo !== null ? <button
          onClick={handleLogout}
          className="flex items-center gap-4 text-[#858585] hover:text-white group px-4 hover:bg-carminePink w-[50px] xsm:w-[80px] sm:w-[180px] lg:w-[250px] h-[50px] rounded-[10px] cursor-pointer"
        >
          <IoMdLogOut className="text-carminePink group-hover:text-white text-xl" />
          <p className={`${poppins.className} text-[16px] font-medium hidden sm:block`}>
            Signout
          </p>
        </button> : <Link href='/adminLogin'
  
          className="flex items-center gap-4 text-[#858585] hover:text-white group px-4 hover:bg-carminePink w-[50px] xsm:w-[80px] sm:w-[180px] lg:w-[250px] h-[50px] rounded-[10px] cursor-pointer"
        >
          <IoMdLogIn className="text-carminePink group-hover:text-white text-xl" />
          <p className={`${poppins.className} text-[16px] font-medium hidden sm:block`}>
            Login
          </p>
        </Link>}
        
      </div>
    </Wrapper>
  );
};

export default SideNav;
