import AppleImage from "@/images/apple.png";
import IphoneImg from "@/images/IphoneImg.png";
import Image from "next/image";
import { Inter, Poppins } from "next/font/google";
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "700"] });
const RightSide = () => {
  return (
    <div className="bg-black w-full lg:w-[892px] relative h-auto ">
      <div className="flex flex-col sm:flex-row  items-center justify-between">
        <div className="max-w-full xs:w-[360px] xs:px-12">
          <div className="w-full justify-center gap-x-4 sm:gap-x-0 sm:w-[190px] h-[49px] -ml-1.5 flex items-center sm:justify-between">
            <Image
              src={AppleImage}
              alt="AppleImage"
              className="h-[40px] w-[49px] "
            />
            <p
              className={`${poppins.className} text-[16px] leading-[24px] text-white`}
            >
              iPhone 14 Series
            </p>
          </div>
          <h2
            className={`${inter.className} text-center sm:text-start w-[310px] mt-5  font-semibold text-[30px] xs:text-[40px] xsm:text-[46px] leading-[60px] tracking-[4px] text-white`}
          >
            Up to 10% off Voucher
          </h2>
          <div className="w-full sm:flex justify-center sm:w-[113px] ">
            <p
              className={`${poppins.className} mt-7 cursor-pointer hover:underline flex items-center gap-x-4 sm:gap-x-0 justify-center sm:w-[113px] sm:justify-between font-medium text-[16px] leading-[24px] text-white`}
            >
              Shop Now{" "}
              <span>
                <svg
                  width="19"
                  height="16"
                  viewBox="0 0 19 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.5 8H18M18 8L11 1M18 8L11 15"
                    stroke="#FAFAFA"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <Image
            src={IphoneImg}
            alt="IphoneImg"
            className="w-[496px] h-[342px]"
          />
        </div>
        <div className="w-[110px] hidden  h-[14px] gap-x-[12px] absolute mdl:flex cursor-pointer justify-center items-center left-[335px] top-[319px]">
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <span
                key={index}
                className={`w-[12px] h-[12px] rounded-full ${
                  index === 2 ? "bg-[#Db4444]" : "bg-white"
                } opacity-50`}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default RightSide;
