import Wrapper from "@/shared/Wrapper";
import React from "react";
import { Poppins } from "next/font/google";
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

const Account = () => {
  return (
    <div>
      <Wrapper>
        <div className="flex-row  flex justify-center  md:justify-between ">
          <div className="hidden mdl:w-[210px]  mdl:flex">
            <div className="flex flex-col gap-[24px]  w-full ">
              <div className="flex flex-col gap-[24px] ">
                <h1
                  className={`${poppins.className}  font-medium text-[16px] text-black`}
                >
                  Manage My Account
                </h1>
                <div className="flex  justify-end items-end ">
                  <div className="flex w-[165px] flex-col  gap-[8px]">
                    <p
                      className={`${poppins.className} hover:text-[#DB4444] cursor-pointer opacity-50 font-normal text-[15px] text-black`}
                    >
                      My Profile
                    </p>
                    <p
                      className={`${poppins.className} hover:text-[#DB4444] cursor-pointer opacity-50 font-normal text-[15px] text-black`}
                    >
                      Address Book
                    </p>
                    <p
                      className={`${poppins.className} hover:text-[#DB4444] cursor-pointer opacity-50 font-normal text-[15px] text-black`}
                    >
                      My Payment Options
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-[24px] ">
                <h1
                  className={`${poppins.className}  font-medium text-[16px] text-black`}
                >
                  My Orders
                </h1>
                <div className="flex  justify-end items-end ">
                  <div className="flex w-[165px] flex-col  gap-[8px]">
                    <p
                      className={`${poppins.className} hover:text-[#DB4444] cursor-pointer opacity-50 font-normal text-[15px] text-black`}
                    >
                      My Returns
                    </p>
                    <p
                      className={`${poppins.className} hover:text-[#DB4444] cursor-pointer opacity-50 font-normal text-[15px] text-black`}
                    >
                      My Cancellations
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex  flex-col gap-[24px] ">
                <h1
                  className={`${poppins.className}  font-medium text-[16px] text-black`}
                >
                  My WishList
                </h1>
              </div>
            </div>
          </div>
          <div className="md:w-[870px] md:h-[630px] p-4 md:p-0 rounded-[4px] shadow-xl flex border items-center justify-center">
            <div className=" flex flex-col gap-[24px] md:w-[710px] justify-start">
              <h1
                className={`${poppins.className} font-medium text-[20px] text-[#DB4444]`}
              >
                Edit Your Profile
              </h1>
              <div className="md:flex-row flex flex-col  w-full justify-between">
                <div className="flex flex-col gap-[8px]">
                  <p
                    className={`${poppins.className} font-normal text-[16px] text-black`}
                  >
                    First Name
                  </p>
                  <input
                    type="text"
                    placeholder="Md"
                    className="h-[50px] rounded-[4px] pl-4 w-[330px] outline-none bg-[#F5F5f5]"
                  />
                </div>
                <div className="flex flex-col gap-[8px]">
                  <p
                    className={`${poppins.className} font-normal text-[16px] text-black`}
                  >
                    Last Name
                  </p>
                  <input
                    type="text"
                    placeholder="Rimel"
                    className="h-[50px] rounded-[4px] pl-4  w-[330px] outline-none bg-[#F5F5f5]"
                  />
                </div>
              </div>
              <div className="md:flex-row flex flex-col  justify-between">
                <div className="flex flex-col gap-[8px]">
                  <p
                    className={`${poppins.className} font-normal text-[16px] text-black`}
                  >
                    Email
                  </p>
                  <input
                    type="text"
                    placeholder="rimel1111@gmail.com"
                    className="h-[50px] rounded-[4px] pl-4  w-[330px] outline-none bg-[#F5F5f5]"
                  />
                </div>
                <div className="flex flex-col gap-[8px]">
                  <p
                    className={`${poppins.className} font-normal text-[16px] text-black`}
                  >
                    Address
                  </p>
                  <input
                    type="text"
                    placeholder="Kingston, 5236, United State"
                    className="h-[50px] rounded-[4px] pl-4  w-[330px] outline-none bg-[#F5F5f5]"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-[16px]">
                <div className="flex flex-col gap-[8px]">
                  <p
                    className={`${poppins.className} font-normal text-[16px] text-black`}
                  >
                    Password Changes
                  </p>
                  <div className="flex flex-col gap-[16px]">
                    <input
                      type="text"
                      placeholder="Current Passwod "
                      className="h-[50px] rounded-[4px] pl-4  w-full outline-none bg-[#F5F5f5]"
                    />
                    <input
                      type="text"
                      placeholder="New Passwod "
                      className="h-[50px] rounded-[4px] pl-4  w-full outline-none bg-[#F5F5f5]"
                    />
                    <input
                      type="text"
                      placeholder="Confirm New Passwod"
                      className="h-[50px] rounded-[4px] pl-4  w-full outline-none bg-[#F5F5f5]"
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-end justify-end">
                <button className="w-[100px] h-[50px] rounded-[4px] text-start text-black font-medium ">
                  Cancel
                </button>
                <button className="w-[200px] h-[50px] rounded-[4px] text-white font-medium bg-[#DB4444]">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default Account;
