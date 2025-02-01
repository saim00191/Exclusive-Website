"use client";
import Wrapper from "@/shared/Wrapper";
import { Inter, Poppins } from "next/font/google";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/slice";
import { addToWishlist } from "@/redux/wishlistSlice";
import { useRouter } from "next/navigation";
import { addToSingleProduct } from "@/redux/products";
import { client } from "@/sanity/lib/client";
import {Product} from '@/types/types'

const inter = Inter({ subsets: ["latin"], weight: ["400", "700"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });
const ExploreOurProduct = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getData() {
      try {
        const response = await client.fetch(
          `*[_type == "product" && tag == "ExploreOurProducts"] {
              _id,
              title,
              tag,
              price,
              previousPrice,
              image {
                asset->{
                  _id,
                  url
                }
              },
              discountPercentage,
              description,
              reviews,
              stars
            }`
        );
        setData(response);
        setLoading(false); // set loading to false after data is fetched
      } catch (error) {
        console.log(error);
        setLoading(false); // set loading to false if there's an error
      }
    }
    getData();
  }, []);

  return (
    <Wrapper className="py-14">
      <div className="h-auto lgll:h-[1016px] gap-[60px] ">
        <div className="h-[108px] flex flex-col ">
          <div className="flex  items-center gap-[16px]  justify-start h-[40px]">
            <div className="w-[20px] h-[40px] bg-carminePink" />
            <h2
              className={`${poppins.className} font-semibold text-[16px] leading-[20px] text-carminePink`}
            >
              Our Products
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between mt-2 px-4 lgll:px-0">
            <h2
              className={`${inter.className} font-semibold text-[28px] sm:text-[36px] leading-[48px] tracking-[4px] text-black`}
            >
              Explore Our Products
            </h2>
            <div className="h-[46px] flex gap-8 lg:pr-12">
              {/* Down is button  first is left button second is right button */}
              {[
                {
                  width: 24,
                  height: 24,
                  path: "M11 5L4 12L11 19M4 12H20",
                  strokeWidth: 2,
                },
                {
                  width: 19,
                  height: 16,
                  path: "M1.5 8H18M18 8L11 1M18 8L11 15",
                  strokeWidth: 1.5,
                },
              ].map((icon, i) => (
                <div
                  key={i}
                  className="h-[46px] w-[46px] cursor-pointer hover:bg-carminePink bg-[#F5F5f5] rounded-full flex items-center justify-center"
                >
                  <svg
                    width={icon.width}
                    height={icon.height}
                    viewBox={`0 0 ${icon.width} ${icon.height}`}
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d={icon.path}
                      stroke="black"
                      strokeWidth={icon.strokeWidth}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              ))}
            </div>
          </div>
        </div>
        {loading ? (
          <div className="w-full flex h-full justify-center items-center col-span-full">
            <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-red-500"></div>
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <div className="grid grid-cols-1 sml:grid-cols-2 lg:grid-cols-3 lgll:grid-cols-4 gap-[60px] py-10">
              {data.map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    dispatch(
                      addToSingleProduct({
                        id: item._id,
                        title: item.title,
                        newPrice: item.price,
                        image: item.image.asset.url,
                        description: item.description,
                        star: item.stars,
                        reviews: item.reviews,
                        quantity: 1,
                      })
                    );
                  }}
                  className="h-[322px] w-[270px]  group"
                >
                  <div className="w-full h-[250px] bg-secondary relative cursor-pointer flex items-center justify-center">
                    <Image
                      src={item.image.asset.url}
                      alt={item.title}
                      className="h-[180px] w-[120px]"
                      width={120}
                      height={180}
                      onClick={() => {
                        router.push(`/singleproduct`);
                      }}
                    />

                    <div className="absolute  items-center gap-2 left-[220px] top-3 flex flex-col justify-center  ">
                      <span
                        onClick={() =>
                          dispatch(
                            addToWishlist({
                              id: item._id,
                              title: item.title,
                              price: item.price,
                              img: item.image.asset.url,
                              quantity: 1,
                            })
                          )
                        }
                        className="bg-primary rounded-full h-6 w-6 flex items-center justify-center"
                      >
                        <FaRegHeart />
                      </span>
                      <span className="bg-primary rounded-full h-6 w-6 flex items-center justify-center">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M21.257 10.962C21.731 11.582 21.731 12.419 21.257 13.038C19.764 14.987 16.182 19 12 19C7.81801 19 4.23601 14.987 2.74301 13.038C2.51239 12.7411 2.38721 12.3759 2.38721 12C2.38721 11.6241 2.51239 11.2589 2.74301 10.962C4.23601 9.013 7.81801 5 12 5C16.182 5 19.764 9.013 21.257 10.962V10.962Z"
                            stroke="black"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                            stroke="black"
                            strokeWidth="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </span>
                    </div>
                    <div
                      onClick={() =>
                        dispatch(
                          addToCart({
                            id: item._id,
                            title: item.title,
                            price: item.price,
                            img: item.image.asset.url,
                            quantity: 1,
                          })
                        )
                      }
                      className="w-full h-[41px] rounded-[4px] group-hover:flex items-center duration-1000 justify-center absolute top-[209px] hidden bg-black"
                    >
                      <h2
                        className={`${poppins.className} font-medium text-center text-[16px] cursor-pointer leading-[24px] text-white`}
                      >
                        Add To Cart
                      </h2>
                    </div>
                  </div>
                  <h2
                    className={`${poppins.className} text-[16px] leading-[24px] font-medium text-black`}
                  >
                    {item.title}
                  </h2>
                  <div className="flex gap-[8px] items-center">
                    <p
                      className={`${poppins.className} mt-0.5 text-[16px] leading-[24px] font-medium text-carminePink`}
                    >
                      ${item.price}
                    </p>
                    <div className="flex gap-2">
                      {Array.from({ length: item.stars }).map((_, index) => (
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
                            fill={index < item.stars ? "#FFAD33" : "#FAFAFA"}
                          />
                        </svg>
                      ))}
                    </div>
                    <p
                      className={`${poppins.className} text-[14px] leading-[21px] font-semibold text-black opacity-50`}
                    >
                      ({item.reviews})
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default ExploreOurProduct;
