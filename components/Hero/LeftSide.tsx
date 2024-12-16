import { Poppins } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

type ProductItem = { title: string; icon: boolean } | string;

const productsItems: ProductItem[] = [
  { title: "Woman's Fashion", icon: true },
  { title: "Men's Fashion", icon: true },
  "Electronics",
  "Home & Lifestyle",
  "Medicine",
  "Sports & Outdoor",
  "Baby's & Toys",
  "Groceries & Pets",
  "Health & Beauty",
];

const LeftSide = () => {
  return (
    <div className="mdl:h-[344px] h-full w-full mt-8 mdl:mt-0 hidden mdl:w-[217px] px-3 lg:grid grid-cols-2 sm:grid-cols-3 mdl:grid-cols-1 gap-y-[16px] mdl:border-r pr-4">
      {productsItems.map((item, index) => (
        <div
          key={index}
          className={`${poppins.className} rounded-md cursor-pointer font-normal leading-[24px] text-[16px] flex items-center  xsm:gap-x-8 mdl:justify-between text-black`}
        >
          {typeof item === "object" ? item.title : item}
          {typeof item === "object" && item.icon && (
            <span className="h-[12.73px] w-[7.73px] hidden xsm:flex">
              <svg
                width="8"
                height="13"
                viewBox="0 0 8 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.95 6.63597L0 1.68597L1.414 0.271973L7.778 6.63597L1.414 13L0 11.586L4.95 6.63597Z"
                  fill="black"
                />
              </svg>
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default LeftSide;
