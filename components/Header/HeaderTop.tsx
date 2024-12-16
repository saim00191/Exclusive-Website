import Wrapper from "@/shared/Wrapper";
import { Poppins } from "next/font/google";
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

const HeaderTop = () => {
  return (
    <div className="bg-black">
      <Wrapper className=" flex justify-end ">
        <div className="flex h-[48px] items-center w-[859px] justify-between px-3 lg:px-0">
          <h2
            className={`${poppins.className} text-white flex items-center font-normal text-[14px] leading-[21px]`}
          >
            Summer Sale{" "}
            <span className="hidden md:block">
              For All Swim Suits And Free Express Delivery - OFF 50%!
            </span>{" "}
            <span className="font-semibold hover:underline cursor-pointer  text-[14px] leading-[24px]">
              ShopNow
            </span>
          </h2>
          <h2
            className={`${poppins.className} text-white font-normal text-[14px] leading-[21px] flex gap-x-5 items-center cursor-pointer`}
          >
            English{" "}
            <span>
              <svg
                width="13"
                height="8"
                viewBox="0 0 13 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.36403 4.95L11.314 0L12.728 1.414L6.36403 7.778L2.67029e-05 1.414L1.41403 0L6.36403 4.95Z"
                  fill="white"
                />
              </svg>
            </span>
          </h2>
        </div>
      </Wrapper>
    </div>
  );
};

export default HeaderTop;
