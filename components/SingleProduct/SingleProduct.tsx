"use client";
import Wrapper from "@/shared/Wrapper";
import React, { useState } from "react";
import Image from "next/image";
import { Inter, Poppins } from "next/font/google";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "700"] });
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { addToCart, decreaseQuantity, increaseQuantity } from "@/redux/slice";
import { addToWishlist, removeFromWishlist } from "@/redux/wishlistSlice";

const SingleProducts = () => {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isColorSelected, setIsColorSelected] = useState(false);

  const toggleWishlist = () => {
    setIsInWishlist(!isInWishlist);
  };

  const handleColorClick = () => {
    setIsColorSelected(true);
  };
  const sizes = ["XS", "S", "M", "L", "XL"];
  const dispatch = useDispatch();
  const singleProduct = useSelector(
    (state: RootState) => state.singleProducts.Product
  );
  const products = useSelector((state: RootState) => state.products.products);
  const getProductQuantityInCart = (productId : string) => {
    const cartProduct = products.find((item) => item.id === productId);
    return cartProduct ? cartProduct.quantity : 0;
  };

  return (
    <div>
      <Wrapper className="py-14 relative">
        {singleProduct.map((item) => (
          <div
            key={item.id}
            className="h-auto lg:h-[550px] gap-4 flex flex-col lg:flex-row items-center  justify-between"
          >
            <div className="lg:h-[550px]  w-full lg:w-[600px]   ">
              <Image
                src={item.image}
                alt={item.title}
                className="h-full w-full "
                width={600}
                height={500}
              />
            </div>
            <div className="h-auto w-full lg:h-[550px]  lg:w-[500px] xs:px-5 md:px-8 mdl:px-10 lg:px-0 flex flex-col justify-between ">
              <h2
                className={`${inter.className} font-semibold text-[24px] leading-[24px] tracking-[3px]`}
              >
                {item.title}
              </h2>
              <div className="w-[320px] h-[21px] gap-x-3 mt-3 lg:mt-0 flex items-center">
                {Array.from({ length: item.star || 0 }).map((_, index) => (
                  <svg
                    key={index}
                    width="16"
                    height="15"
                    viewBox="0 0 16 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.673 7.17173C15.7437 6.36184 15.1709 4.65517 13.8284 4.65517H11.3992C10.7853 4.65517 10.243 4.25521 10.0617 3.66868L9.33754 1.32637C8.9309 0.0110567 7.0691 0.0110564 6.66246 1.32637L5.93832 3.66868C5.75699 4.25521 5.21469 4.65517 4.60078 4.65517H2.12961C0.791419 4.65517 0.215919 6.35274 1.27822 7.16654L3.39469 8.78792C3.85885 9.1435 4.05314 9.75008 3.88196 10.3092L3.11296 12.8207C2.71416 14.1232 4.22167 15.1704 5.30301 14.342L7.14861 12.9281C7.65097 12.5432 8.34903 12.5432 8.85139 12.9281L10.6807 14.3295C11.7636 15.159 13.2725 14.1079 12.8696 12.8046L12.09 10.2827C11.9159 9.71975 12.113 9.10809 12.5829 8.75263L14.673 7.17173Z"
                      fill="#FFAD33"
                    />
                  </svg>
                ))}
                <span
                  className={`${poppins.className} text-[14px] leading-[21px] font-normal text-black opacity-50`}
                >
                  ({item.rated} Reviews)
                </span>
                <p className="text-black opacity-40">|</p>
                <span
                  className={`${poppins.className} text-[14px] leading-[21px] font-normal text-greenColor opacity-60`}
                >
                  In Stock
                </span>
              </div>
              <h2
                className={`${inter.className} mt-3 lg:mt-0 font-normal text-[24px] leading-[24px] tracking-[3px]`}
              >
                {item.newPrice}.00
              </h2>
              <p
                className={`${poppins.className} mt-3 lg:mt-0 text-[14px] leading-[21px] font-normal text-black `}
              >
                {item.description}
              </p>
              <span className="w-full h-0.5 mt-3 lg:mt-0 flex items-center justify-center bg-black opacity-30" />
              <div className="flex items-center gap-[16px] mt-3 lg:mt-0 w-[280px]  h-[20px] ">
                <h4
                  className={`${inter.className} text-[20px] leading-[20px] tracking-[3px] font-normal text-black`}
                >
                  Colours:
                </h4>
                <div className="w-[48px] flex justify-between gap-1">
                  <span
                    className="h-[20px] w-[20px] bg-black rounded-full cursor-pointer"
                    onClick={handleColorClick}
                  />
                  <span
                    className="h-[20px] w-[20px] bg-[#E07575] rounded-full cursor-pointer"
                    onClick={handleColorClick}
                  />
                </div>
                {isColorSelected && (
                  <h2
                    className={`${poppins.className} text-[14px]   font-normal text-black`}
                  >
                    Not Available
                  </h2>
                )}
              </div>
              <div className="w-[312px] mt-3 lg:mt-0 h-[32px] flex items-center gap-6 ">
                <h4
                  className={`${inter.className} text-[20px] leading-[20px] tracking-[3px] font-normal text-black`}
                >
                  Size:
                </h4>
                <div className="gap-4 flex">
                  {sizes.map((item, index) => (
                    <div
                      key={index}
                      className="w-[32px] h-[32px] border border-black/50 rounded-[4px] flex items-center justify-center text-black   hover:bg-carminePink cursor-pointer hover:text-white"
                    >
                      <span
                        className={`${poppins.className} text-[14px] leading-[21px] font-medium `}
                      >
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex  mt-3 lg:mt-0 w-full sm:w-[400px] flex-col sm:flex-row justify-start  sm:justify-between">
                <div className="flex flex-col xs:flex-row gap-4">
                  <div className=" w-[159px] h-[44px] flex justify-between items-center">
                    <span
                      onClick={() => dispatch(decreaseQuantity(item.id))}
                      className="w-[40px] h-full rounded-tl-[4px] flex items-center justify-center rounded-bl-[4px] border hover:bg-carminePink text-[20px] border-black/50 cursor-pointer"
                    >
                      -
                    </span>
                    <button
                      className={`${poppins.className} w-[80px] h-full border-t border-b flex items-center justify-center border-black/50 text-[20px] leading-[28px] text-black`}
                    >
                      {getProductQuantityInCart(item.id)}
                    </button>
                    <span
                      onClick={() => dispatch(increaseQuantity(item.id))}
                      className="w-[40px] h-full rounded-tr-[4px] flex items-center justify-center rounded-br-[4px] border hover:bg-carminePink text-[20px] border-black/50 cursor-pointer"
                    >
                      +
                    </span>
                  </div>
                  <button
                    onClick={() =>
                      dispatch(
                        addToCart({
                          id: item.id,
                          title: item.title,
                          price: item.newPrice,
                          img: item.image,
                          quantity: 1,
                        })
                      )
                    }
                    className="bg-carminePink px-[48px] py-[10px] rounded-[4px] w-[165px] h-[44px]"
                  >
                    <h2
                      className={`${poppins.className} font-medium text-[12px] sm:text-[16px] leading-[24px] text-primary`}
                    >
                      Buy Now
                    </h2>
                  </button>
                </div>
                <div
                  onClick={toggleWishlist}
                  className=" w-[40px] cursor-pointer h-[40px] hidden sm:flex items-center justify-center"
                >
                  {isInWishlist ? (
                    <MdFavorite
                      color="red"
                      size={32}
                      onClick={() =>
                        dispatch(
                          removeFromWishlist({
                            id: item.id,
                          })
                        )
                      }
                    />
                  ) : (
                    <MdFavoriteBorder
                      size={32}
                      onClick={() =>
                        dispatch(
                          addToWishlist({
                            id: item.id,
                            title: item.title,
                            price: item.newPrice,
                            img: item.image,
                            previousPrice: item.oldPrice,
                            quantity: 1,
                          })
                        )
                      }
                    />
                  )}
                </div>
              </div>
              <div className="h-[180px] w-full mt-3 lg:mt-0 sm:w-[399px] hidden sm:flex flex-col justify-between rounded-[4px] sm:border border-black">
                <div className="w-full sm:w-[332px]  h-[50px] flex items-center justify-center gap-4 mt-6 ml-6">
                  <span>
                    {" "}
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_261_4843)">
                        <path
                          d="M11.6673 31.6667C13.5083 31.6667 15.0007 30.1743 15.0007 28.3333C15.0007 26.4924 13.5083 25 11.6673 25C9.82637 25 8.33398 26.4924 8.33398 28.3333C8.33398 30.1743 9.82637 31.6667 11.6673 31.6667Z"
                          stroke="black"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M28.3333 31.6667C30.1743 31.6667 31.6667 30.1743 31.6667 28.3333C31.6667 26.4924 30.1743 25 28.3333 25C26.4924 25 25 26.4924 25 28.3333C25 30.1743 26.4924 31.6667 28.3333 31.6667Z"
                          stroke="black"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M8.33398 28.3335H7.00065C5.89608 28.3335 5.00065 27.4381 5.00065 26.3335V21.6668M3.33398 8.3335H19.6673C20.7719 8.3335 21.6673 9.22893 21.6673 10.3335V28.3335M15.0007 28.3335H25.0007M31.6673 28.3335H33.0007C34.1052 28.3335 35.0007 27.4381 35.0007 26.3335V18.3335M35.0007 18.3335H21.6673M35.0007 18.3335L30.5833 10.9712C30.2218 10.3688 29.5708 10.0002 28.8683 10.0002H21.6673"
                          stroke="black"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M8 28H6.66667C5.5621 28 4.66667 27.1046 4.66667 26V21.3333M3 8H19.3333C20.4379 8 21.3333 8.89543 21.3333 10V28M15 28H24.6667M32 28H32.6667C33.7712 28 34.6667 27.1046 34.6667 26V18M34.6667 18H21.3333M34.6667 18L30.2493 10.6377C29.8878 10.0353 29.2368 9.66667 28.5343 9.66667H21.3333"
                          stroke="black"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M5 11.8182H11.6667"
                          stroke="black"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M1.81836 15.4545H8.48503"
                          stroke="black"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M5 19.0909H11.6667"
                          stroke="black"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_261_4843">
                          <rect width="40" height="40" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </span>
                  <div className="h-[50px] w-full flex flex-col justify-between ">
                    <h2
                      className={`${poppins.className} text-[16px] leading-[24px]text-black font-medium`}
                    >
                      Free Delivery
                    </h2>
                    <p
                      className={`${poppins.className} text-[10px] leading-[18px] font-medium underline`}
                    >
                      Enter your postal code for Delivery Availability
                    </p>
                  </div>
                </div>
                <span className="w-full h-0.5 bg-black opacity-20" />
                <div className="w-ful sm:w-[332px] h-[50px] flex items-center justify-center gap-4 mb-6 ml-6">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_261_4865)">
                      <path
                        d="M33.3327 18.3334C32.9251 15.4004 31.5645 12.6828 29.4604 10.5992C27.3564 8.51557 24.6256 7.18155 21.6888 6.80261C18.752 6.42366 15.7721 7.02082 13.208 8.5021C10.644 9.98337 8.6381 12.2666 7.49935 15M6.66602 8.33335V15H13.3327"
                        stroke="black"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M6.66602 21.6667C7.07361 24.5997 8.43423 27.3173 10.5383 29.4009C12.6423 31.4845 15.3731 32.8185 18.3099 33.1974C21.2467 33.5764 24.2266 32.9792 26.7907 31.4979C29.3547 30.0167 31.3606 27.7335 32.4994 25M33.3327 31.6667V25H26.666"
                        stroke="black"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_261_4865">
                        <rect width="40" height="40" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>

                  <div className="h-[50px] w-full flex flex-col justify-between ml-1 ">
                    <h2
                      className={`${poppins.className} text-[16px] leading-[24px]text-black font-medium`}
                    >
                      Return Delivery
                    </h2>
                    <p
                      className={`${poppins.className} text-[12px] leading-[18px] font-medium underline`}
                    >
                      Free 30 Days Delivery Returns. Details
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Wrapper>
    </div>
  );
};

export default SingleProducts;
