import Wrapper from "@/shared/Wrapper";
import { Inter, Poppins } from "next/font/google";
import CategoriesItem from "./CategoriesItems";

const inter = Inter({ subsets: ["latin"], weight: ["400", "700"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

const Categories = () => {
  return (
    <Wrapper className="h-auto lgll:h-[313px] gap-[60px]  flex flex-col justify-end">
      <div className="h-[103px]">
        <div className="flex  items-center gap-[16px]  justify-start h-[40px]">
          <div className="w-[20px] h-[40px] bg-carminePink" />
          <h2
            className={`${poppins.className} font-semibold text-[16px] leading-[20px] text-carminePink`}
          >
            Categories
          </h2>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between mt-2 px-4 lgll:px-0">
          <h2
            className={`${inter.className} font-semibold text-[18px] xs:text-[22px] xsm:text-[28px] sm:text-[36px] leading-[48px] tracking-[4px] text-black`}
          >
            Browse By Category
          </h2>
          <div className="h-[46px] hidden md:flex gap-8 lg:pr-12">
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
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-1 xs:grid-cols-2 xsm:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lgll:grid-cols-6 gap-[30px]">
          {CategoriesItem.map((item, index) => (
            <div
              key={index}
              className="group flex flex-col justify-center items-center gap-2 h-[145px] border-[#000000]/30 w-[170px] hover:bg-carminePink border rounded-[4px] cursor-pointer"
            >
              <span className="text-[45px] group-hover:text-white">
                {item.icon}
              </span>
              <p
                className={`${poppins.className} font-normal text-[16px] leading-[24px] text-black group-hover:text-white`}
              >
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="border-b border-[0.5px] border-black opacity-30" />
    </Wrapper>
  );
};

export default Categories;
