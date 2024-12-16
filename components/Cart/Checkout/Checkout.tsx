"use client";
import Wrapper from "@/shared/Wrapper";
import { Inter, Poppins } from "next/font/google";
import Image1 from "@/images/billingDetailsImg1.png";
import Image2 from "@/images/billingDetailsImg2.png";
import Image3 from "@/images/billingDetailsImg3.png";
import Image4 from "@/images/billingDetailsImg4.png";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "700"] });
import { RootState } from "@/redux/store";
import { RxCross2 } from "react-icons/rx";
import { deleteItem } from "@/redux/slice";

const BillingDetails = () => {
  const dispatch = useDispatch();
  const [bankError, setBankError] = useState(false);
  const [couponCodeError, setCouponCodeError] = useState(false);
  const [total, setTotal] = useState(0);
  const products = useSelector((state: RootState) => state.products.products);

  useEffect(() => {
    const totalAmount = products.reduce((acc, item) => {
      const price = (item.price as number) || 0;
      return acc + price * item.quantity;
    }, 0);
    setTotal(totalAmount);
  }, [products]);

  const BankErrorHandler = () => {
    setBankError(true);
    setTimeout(() => {
      setBankError(false);
    }, 1000);
  };
  const CouponCodeErrorHandler = () => {
    setCouponCodeError(true);
    setTimeout(() => {
      setCouponCodeError(false);
    }, 1000);
  };

  const billingForm = [
    { title: "First Name", required: true },
    { title: "Company Name", required: false },
    { title: "Street Address", required: true },
    { title: "Apartment, floor, etc. (optional)", required: false },
    { title: "Town/City", required: true },
    { title: "Phone Number", required: true },
    { title: "Email Address", required: true },
  ];

  if (products.length === 0) {
    return (
      <Wrapper className="py-12">
        <h2
          className={`${inter.className} text-[36px] tracking-[4px] leading-[30px] font-medium text-black`}
        >
          Your Cart is Empty
        </h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper className="py-12">
      <h2
        className={`${inter.className} text-[36px] tracking-[4px] px-4 xs:px-6 sm:px-8 leading-[30px] font-medium text-black`}
      >
        Billing Details
      </h2>
      <div className="flex flex-col lg:flex-row justify-between items-center py-10">
        <div className="h-[814px] w-full lg:w-[470px] px-4 xs:px-6 sm:px-8 flex flex-col gap-6">
          {billingForm.map((item, index) => (
            <div key={index} className="w-full flex flex-col gap-2 h-[82px] ">
              <p
                className={`${poppins.className} text-[16px] leading-[24px] opacity-40 text-black`}
              >
                {item.title}{" "}
                {item.required && (
                  <span
                    className={`${poppins.className} text-[16px] leading-[24px] text-carminePink opacity-70`}
                  >
                    *
                  </span>
                )}
              </p>
              <input
                type="text"
                className={`${poppins.className} h-[50px] rounded-[4px] bg-secondary outline-none px-3`}
              />
            </div>
          ))}
          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              className="w-6 h-6 bg-white border-2 border-gray-400 rounded-md checked:bg-red-300"
            />
            <p className="font-normal text-[16px] leading-[24px] text-black">
              Save this information for faster check-out next time
            </p>
          </div>
        </div>
        <div className="h-auto lg:h-[600px] w-full lg:w-[527px] items-end mt-8  lg:mt-0 px-4 xs:px-6 sm:px-8 flex flex-col gap-8">
          <div className="w-full smx:w-[425px] ">
            <div className="flex flex-col gap-8 overflow-y-scroll h-[140px] ">
              {products.map((item, index) => (
                <div key={index} className="flex items-center flex-row justify-between">
                  <div className="flex gap-3 items-center relative">
                    <Image
                      src={item.img}
                      alt="Product Image"
                      className="h-[54px] w-[54px]"
                      width={54}
                      height={54}
                    />
                    <span
                      onClick={() => dispatch(deleteItem(item.id))}
                      className="h-[24px] w-[24px] rounded-full text-white cursor-pointer text-[14px] absolute flex items-center justify-center top-0.5 bg-carminePink"
                    >
                      <RxCross2 />
                    </span>
                    <p
                      className={`${poppins.className} text-black text-[16px] font-normal`}
                    >
                      {item.title}
                    </p>
                  </div>
                  <p
                    className={`${poppins.className} text-black text-[16px] font-normal`}
                  >
                    ${item.price}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full smx:w-[425px] h-[140px]  flex flex-col justify-between">
            <div className="h-[24px] w-full  flex  justify-between">
              <p
                className={`${poppins.className} text-black text-[16px] font-normal`}
              >
                Subtotal:
              </p>
              <p
                className={`${poppins.className} text-black text-[16px] font-normal`}
              >
                ${total}/=
              </p>
            </div>
            <span className="h-0.5 w-full bg-gray-300" />
            <div className="h-[24px] w-full  flex justify-between">
              <p
                className={`${poppins.className} text-black text-[16px] font-normal`}
              >
                Shipping:
              </p>
              <p
                className={`${poppins.className} text-black text-[16px] font-normal`}
              >
                Free
              </p>
            </div>
            <span className="h-0.5 w-full bg-gray-300" />
            <div className="h-[24px] w-full  flex justify-between">
              <p
                className={`${poppins.className} text-black text-[16px] font-normal`}
              >
                Total:
              </p>
              <p
                className={`${poppins.className} text-black text-[16px] font-normal`}
              >
                ${total}/=
              </p>
            </div>
          </div>
          <div className="w-full smx:w-[425px]  h-[38px] flex flex-col ">
            <div className="w-full smx:w-[425px]  h-[28px] flex justify-between">
              <div className="flex gap-3 items-center">
                <input
                  type="radio"
                  name="transfer"
                  className="h-[24px] w-[24px]"
                  onClick={BankErrorHandler}
                />
                <p
                  className={`${poppins.className} text-black text-[16px] font-normal`}
                >
                  Bank
                </p>
              </div>
              <div className="flex w-[198px] items-center justify-between ">
                <Image
                  src={Image1}
                  alt="Image1"
                  className="w-[46px] h-[50px] cursor-pointer"
                />
                <Image
                  src={Image2}
                  alt="Image1"
                  className="w-[39px] h-[26px] cursor-pointer"
                />
                <Image
                  src={Image3}
                  alt="Image1"
                  className="w-[39px] h-[26px] cursor-pointer"
                />
                <Image
                  src={Image4}
                  alt="Image1"
                  className="w-[42px] h-[50px] cursor-pointer"
                />
              </div>
            </div>
            {bankError && (
              <p
                className={`${poppins.className} mt-0.5 text-black text-[16px] text-center font-normal`}
              >
                Bank Transfer Not Available
              </p>
            )}
          </div>
          <div className="flex items-center justify-between w-[174px] h-[24px] ">
            <input type="radio" className="h-[24px] w-[24px]" name="transfer"/>
            <p
              className={`${poppins.className} text-black text-[16px] font-normal`}
            >
              Cash on delivery
            </p>
          </div>
          <div className="w-[527px] h-[66px] flex flex-col items-center justify-between">
            <div className="smx:flex justify-between w-full hidden  h-[56px]">
              <input
                type="text"
                className={`${poppins.className} border border-black rounded-[4px] w-[300px] h-[56px] outline-none  text-black text-[16px] font-normal placeholder:opacity-50 px-4`}
                placeholder="Coupon Code"
              />
              <button
                onClick={CouponCodeErrorHandler}
                className={`${poppins.className} w-[211px] h-[56px] py-4 px-12 rounded-[4px] text-primary bg-carminePink`}
              >
                Apply Coupon
              </button>
            </div>
            {couponCodeError && (
              <p
                className={`${poppins.className} mt-0.5 text-black text-[16px] text-center font-normal`}
              >
                Coupon Code Not Available
              </p>
            )}
          </div>
          <button
            className={`${poppins.className} w-[190px] h-[56px] py-4 px-12 rounded-[4px] text-primary bg-carminePink`}
          >
            Place Order
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

export default BillingDetails;
