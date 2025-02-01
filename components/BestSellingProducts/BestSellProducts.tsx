"use client";
import Wrapper from "@/shared/Wrapper";
import { Inter, Poppins } from "next/font/google";
import Image from "next/image";
import { FaRegHeart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { addToCart } from "@/redux/slice";
import { addToWishlist } from "@/redux/wishlistSlice";
import { addToSingleProduct } from "@/redux/products";
import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import {Product} from '@/types/types'

const inter = Inter({ subsets: ["latin"], weight: ["400", "700"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });


const BestSellProducts = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getData() {
      try {
        const response = await client.fetch(
          `*[_type == "product" && tag == "BestSellingProducts"] {
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
       
        setLoading(false); 
      } catch (error) {
        console.log(error);
        setLoading(false); 
      }
    }
    getData();
  }, []);


  return (
    <Wrapper className=" h-auto lgll:h-[518px]  gap-[60px] flex flex-col ">
      <div className="lgll:h-[108px]  flex flex-col justify-between">
        <div className="flex  items-center gap-[16px]  justify-start h-[40px]">
          <div className="w-[20px] h-[40px] bg-carminePink" />
          <h2
            className={`${poppins.className} font-semibold text-[16px] leading-[20px] text-carminePink`}
          >
            This Month
          </h2>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center px-4 lgll:px-0">
          <h2
            className={`${inter.className} font-semibold text-[22px] xsm:text-[26px] sm:text-[35px] leading-[48px] tracking-[4px] text-black`}
          >
            Best Selling Products
          </h2>
          <button className="w-[159px] h-[56px] rounded-[4px] bg-carminePink py-4 px-12">
            <p
              className={`${poppins.className} text-[16px] leading-[24px] font-medium text-white`}
            >
              View All
            </p>
          </button>
        </div>
      </div>
      {loading ? (
        <div className="w-full h-full flex justify-center items-center col-span-full">
          <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-red-500"></div>
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lgll:grid-cols-4  gap-[30px] mt-8 lgll:mt-0">
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
                className="h-[350px] w-[270px] group relative "
              >
                <div className="w-full h-[250px] bg-secondary rounded-[4px] flex items-center justify-center">
                  <Image
                    src={item.image.asset.url}
                    alt="Product 1"
                    className="cursor-pointer w-[190px] h-[180px]"
                    width={270}
                    height={250}
                    onClick={() => {
                      router.push(`/singleproduct`);
                    }}
                  />
                </div>

                <div className="absolute cursor-pointer  items-center gap-2 left-[220px] top-3 flex flex-col justify-center  ">
                  <span
                    onClick={() =>
                      dispatch(
                        addToWishlist({
                          id: item._id,
                          title: item.title,
                          price: item.price,
                          img: item.image.asset.url,

                          previousPrice: item.previousPrice,
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
                  className="cursor-pointer w-full h-[41px] rounded-[4px] group-hover:flex items-center duration-1000 justify-center absolute top-[209px] hidden bg-black"
                >
                  <button
                    className={`${poppins.className} font-medium text-center text-[16px] cursor-pointer leading-[24px] text-white`}
                  >
                    Add To Cart
                  </button>
                </div>
                <div className="flex flex-col gap-2">
                  <h2
                    className={`${poppins.className} text-black text-[16px] leading-[24px] font-medium`}
                  >
                    {item.title}
                  </h2>
                  <div className="flex gap-4 w-[85px] h-[24px] items-center">
                    <p
                      className={`${poppins.className} text-carminePink text-[16px] leading-[24px] font-medium`}
                    >
                      ${item.price}
                    </p>
                    <p
                      className={`${poppins.className} text-black line-through opacity-50 text-[16px] leading-[24px] font-medium`}
                    >
                      {item.previousPrice}
                    </p>
                  </div>
                  <div className="flex gap-2 h-[20px] items-center w-[140px] justify-between">
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
                          fill="#FFAD33"
                        />
                      </svg>
                    ))}
                    <p
                      className={`${poppins.className} text-black opacity-50 text-[14px] leading-[21px] font-semibold`}
                    >
                      ({item.reviews})
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default BestSellProducts;
