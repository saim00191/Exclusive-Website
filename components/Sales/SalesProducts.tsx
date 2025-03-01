"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { FaRegHeart } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/slice";
import { addToWishlist } from "@/redux/wishlistSlice";
import { addToSingleProduct } from "@/redux/products";
import { client } from "@/sanity/lib/client";
import { Product } from '@/types/types';

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

const SalesProducts = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showAll, setShowAll] = useState<boolean>(false); 

  useEffect(() => {
    async function getData() {
      try {
        const response = await client.fetch(
          `*[_type == "product" && tag == "FlashSale"] {
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
    <>
      <div className="h-auto justify-end flex my-8 w-full">
        <div className="w-full flex items-center justify-center">
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[30px]">
            {loading ? (
              <div className="w-full h-full flex justify-center items-center col-span-full">
                <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-red-500"></div>
              </div>
            ) : (
              data.slice(0, showAll ? data.length : 4).map((item) => (
                <div
                  key={item._id}
                  onClick={() => {
                    dispatch(
                      addToSingleProduct({
                        id: item._id,
                        title: item.title,
                        newPrice: item.price,
                        image: item.image.asset.url,
                        discount: item.discountPercentage,
                        description: item.description,
                        oldPrice: item.previousPrice,
                        reviews: item.reviews,
                        star: item.stars,
                        quantity: 1,
                      })
                    );
                  }}
                  className="h-[350px] w-[270px] group relative mt-8"
                >
                  <div className="w-full h-[250px] bg-secondary rounded-[4px] flex items-center justify-center">
                    <Image
                      src={item.image.asset.url}
                      alt={item.title}
                      width={270}
                      height={250}
                      className="cursor-pointer w-[190px] h-[180px]"
                      onClick={() => {
                        router.push(`/singleproduct`);
                      }}
                    />
                  </div>
                  <div className="w-[55px] absolute rounded-[4px] flex items-center top-[12px] left-3 h-[26px] bg-carminePink py-[4px] px-3">
                    <span className={`${poppins.className} text-primary font-normal text-[12px] leading-[18px]`}>
                      {item.discountPercentage}%
                    </span>
                  </div>
                  <div className="absolute cursor-pointer items-center gap-2 left-[220px] top-3 flex flex-col justify-center">
                    <span
                      onClick={() =>
                        dispatch(
                          addToWishlist({
                            id: item._id,
                            title: item.title,
                            price: item.price,
                            img: item.image.asset.url,
                            discount: item.discountPercentage,
                            previousPrice: item.previousPrice,
                            quantity: 1,
                          })
                        )
                      }
                      className="bg-primary rounded-full h-6 w-6 flex items-center justify-center"
                    >
                      <FaRegHeart />
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
                    <button className={`${poppins.className} font-medium text-center text-[16px] cursor-pointer leading-[24px] text-white`}>
                      Add To Cart
                    </button>
                  </div>
                  <div className="flex flex-col gap-2 mt-2">
                    <h2 className={`${poppins.className} text-black text-[16px] leading-[24px] font-medium`}>
                      {item.title}
                    </h2>
                    <div className="flex gap-4 w-[85px] h-[24px] items-center">
                      <p className={`${poppins.className} text-carminePink text-[16px] leading-[24px] font-medium`}>
                        ${item.price}
                      </p>
                      <p className={`${poppins.className} text-black line-through opacity-50 text-[16px] leading-[24px] font-medium`}>
                        {item.previousPrice}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {data.length > 4 && (
  <div className="flex items-center justify-center py-4">
    <button
      onClick={() => setShowAll(!showAll)}
      className={`${poppins.className} text-white bg-carminePink hover:bg-red-400 transition duration-300 leading-[24px] text-[16px] font-medium h-[56px] w-[234px] rounded-[4px]`}
    >
      {showAll ? "View Less Products" : "View All Products"}
    </button>
  </div>
)}
    </>
  );
};

export default SalesProducts;
