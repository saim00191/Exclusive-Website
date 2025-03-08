"use client";
import Wrapper from "@/shared/Wrapper";
import { Poppins } from "next/font/google";
import Image from "next/image";
import { RxCross2 } from "react-icons/rx";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { decreaseQuantity, deleteItem, increaseQuantity } from "@/redux/slice";
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

const Cart = () => {
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);
  const products = useSelector((state: RootState) => state.products.products);
  const userInfo = useSelector((state: RootState) => state.products.userInfo);
  useEffect(() => {
    const totalAmount = products.reduce((acc, item) => {
      const price = (item.price as number) || 0;
      return acc + price * item.quantity;
    }, 0);
    setTotal(totalAmount);
  }, [products]);

  const headingItems = ["Products", "Price", "Quantity", "Subtotal"];

  return (
    <Wrapper className="py-4 sm:py-8 md:py-14">
      <div className="h-auto gap-[40px] flex flex-col">
        {products.length > 0 ? (
          <>
            <div className=" hidden  lgl:block">
              <div className="h-[70px] flex flex-col items-center">
                <div className="w-full max-w-[1091px] h-auto sm:h-[24px] mx-auto my-auto grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 md:gap-[280px] items-center px-4 sm:px-0">
                  {headingItems.map((item, index) => (
                    <div key={index}>
                      <h2
                        className={`${poppins.className} leading-[24px] font-normal text-[16px]`}
                      >
                        {item}
                      </h2>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {products.map((item, index) => (
              <div
                key={index}
                className="h-auto lg:h-[102px]   flex items-center justify-center"
              >
                <div className=" w-full lg:max-w-[1091px] border-b border-b-gray-300 py-5 sml:border-none gap-y-12 gap-x-[220px] sml:gap-36 md:gap-x-52 lg:gap-[280px] h-full grid grid-cols-2 sml:grid-cols-4 items-center px-4 ">
                  <div className="h-[54px] gap-x-2 lg:gap-x-5 flex items-center relative">
                    <Image
                      src={item.img}
                      alt="Image1"
                      className="h-full w-[54px] relative"
                      width={54}
                      height={54}
                    />
                    <span
                      onClick={() => dispatch(deleteItem(item.id))}
                      className="h-[24px] w-[24px] rounded-full text-white cursor-pointer text-[14px] absolute flex items-center justify-center -top-1 bg-carminePink"
                    >
                      <RxCross2 />
                    </span>
                    <h2
                      className={`${poppins.className} text-[16px] leading-[24px] text-black font-normal `}
                    >
                      {item.title}
                    </h2>
                  </div>
                  <p
                    className={`${poppins.className} flex justify-end sml:justify-start  text-[16px] leading-[24px] text-black font-normal`}
                  >
                    ${item.price}
                  </p>
                  <div className="flex w-[60px] sm:w-[72px] h-[36px] sm:h-[44px] rounded-[4px] border-[1.5px] border-black/40  items-center justify-center">
                    <div className="w-[48px] h-[32px] flex gap-4 items-center">
                      <p
                        className={`${poppins.className} text-[16px] leading-[24px] text-black font-normal`}
                      >
                        {item.quantity}
                      </p>
                      <div className="w-4 h-full flex flex-col justify-between">
                        <span
                          onClick={() => dispatch(increaseQuantity(item.id))}
                          className="h-[16px] w-[16px] hover:bg-primary cursor-pointer rounded-xl"
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M7.75732 7.36666L4.45732 10.6667L3.51465 9.72399L7.75732 5.48132L12 9.72399L11.0573 10.6667L7.75732 7.36666Z"
                              fill="black"
                            />
                          </svg>
                        </span>

                        <span
                          onClick={() => dispatch(decreaseQuantity(item.id))}
                          className="h-[16px] w-[16px] hover:bg-primary cursor-pointer rounded-xl"
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M8.24268 8.63334L11.5427 5.33334L12.4854 6.27601L8.24268 10.5187L4.00002 6.27601L4.94268 5.33334L8.24268 8.63334Z"
                              fill="black"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                  <p
                    className={`${poppins.className} flex justify-end text-[16px] leading-[24px] text-black font-normal`}
                  >
                    ${item.price ? item.price * item.quantity : 0}
                  </p>
                </div>
              </div>
            ))}

            <div className="w-full h-auto sm:h-[56px] flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 px-4 ">
              <Link href="/">
                <button
                  className={`${poppins.className} w-[218px] py-4 px-12 border border-black/50 font-normal text-[15px] leading-[24px]`}
                >
                  Return To Shop
                </button>
              </Link>
              <button
                className={`${poppins.className} w-[218px] py-4 px-12 border border-black/50 font-normal text-[15px] leading-[24px]`}
              >
                Update Cart
              </button>
            </div>

            <div className="h-auto sm:h-[324px] flex flex-col smx:flex-row  justify-center md:justify-end lgl:justify-between gap-8 lg:gap-0 px-4">
              <div className="hidden lgl:flex  flex-col sm:flex-row justify-between h-auto sm:h-[56px] w-full sm:w-[537px] gap-4 sm:gap-0">
                <div className="w-full sm:w-[300px] hidden lg:flex items-center justify-center rounded-[4px] border border-black ">
                  <input
                    type="text"
                    placeholder="Coupon Code"
                    className={`${poppins.className} h-full w-full px-4 outline-none text-[16px] leading-[24px] text-black font-normal`}
                  />
                </div>
                <button
                  className={`${poppins.className} w-full sm:w-[211px] h-full py-4 px-12 text-primary bg-carminePink rounded-[4px]`}
                >
                  Apply Coupon
                </button>
              </div>
              <div className="h-full rounded-[4px] border-black border-[1.5px] w-full smx:w-[470px] flex items-center justify-center p-4 sm:p-0">
                <div className="lg:w-[424px] w-full p-4 lg:p-0">
                  <h2
                    className={`${poppins.className} font-medium text-[20px] leading-[28px] text-black`}
                  >
                    Cart Total
                  </h2>
                  <div className="h-[24px] flex justify-between py-7 items-center">
                    <h2
                      className={`${poppins.className} font-normal text-[16px] leading-[24px] text-black`}
                    >
                      Subtotal:
                    </h2>
                    <p
                      className={`${poppins.className} font-normal text-[16px] leading-[24px] text-black`}
                    >
                      ${total}
                    </p>
                  </div>
                  <div className="border-b border-[0.5px] border-black opacity-30" />
                  <div className="h-[24px] flex justify-between items-center py-7">
                    <h2
                      className={`${poppins.className} font-normal text-[16px] leading-[24px] text-black`}
                    >
                      Shipping:
                    </h2>
                    <p
                      className={`${poppins.className} font-normal text-[16px] leading-[24px] text-black`}
                    >
                      Free
                    </p>
                  </div>
                  <div className="border-b border-[0.5px] border-black opacity-30" />
                  <div className="h-[24px] flex justify-between items-center py-7">
                    <h2
                      className={`${poppins.className} font-normal text-[16px] leading-[24px] text-black`}
                    >
                      Total:
                    </h2>
                    <p
                      className={`${poppins.className} font-normal text-[16px] leading-[24px] text-black`}
                    >
                      ${total}
                    </p>
                  </div>
                  <div className="flex items-center justify-center">
                    {userInfo !== null ? (
                      <Link href="/cart/checkout">
                        <button
                          className={`${poppins.className} w-full sm:w-[265px] h-[56px] rounded-[4px] py-4 px-12 bg-carminePink text-[14px]  xs:text-[16px] leading-[24px] font-medium cursor-pointer text-primary`}
                        >
                          Proceed to Checkout
                        </button>
                      </Link>
                    ) : (
                      <button
                        className={`${poppins.className} w-full sm:w-[265px] h-[56px] rounded-[4px] py-4 px-12 bg-gray-300 text-[16px] leading-[24px] font-medium text-primary cursor-not-allowed`}
                        disabled
                      >
                        Login to Checkout
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center h-[400px]">
            <h2
              className={`${poppins.className} font-normal text-[20px] leading-[28px] text-black`}
            >
              Your cart is empty
            </h2>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default Cart;
