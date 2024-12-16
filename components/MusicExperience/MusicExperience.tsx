import Wrapper from "@/shared/Wrapper";
import HeadPhoneImage from "@/images/MusicExperienceImg.png";
import Image from "next/image";
import { Inter, Poppins } from "next/font/google";
const inter = Inter({ subsets: ["latin"], weight: ["400", "700"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

const timer = [
  { time: "23", hmss: "Hours" },
  { time: "05", hmss: "Days" },
  { time: "59", hmss: "Minutes" },
  { time: "35", hmss: "Seconds" },
];

const MusicExperience = () => {
  return (
    <Wrapper className="py-24">
      <div className="flex flex-col lg:flex-row justify-between items-center h-auto lg:h-[500px] lg:px-4 bg-black">
        <div className="w-full  lg:w-[600px] h-auto lg:h-[420px]  flex flex-col pl-8 py-8 justify-center lg:items-start items-center lg:justify-between">
          <p
            className={`${poppins.className} font-semibold  px-2 text-[16px] leading-[20px] text-greenColor`}
          >
            Categories
          </p>
          <h2
            className={`${inter.className} font-semibold mt-3 lg:mt-0 text-center lg:text-start text-[22px] sm:text-[30px] lg:text-[48px] leading-[35px] lg:leading-[60px] tracking-[4px] text-primary px-2`}
          >
            Enhance Your Music Experience
          </h2>
          <div className="w-[320px]  h-[62px] flex gap-[24px] mt-5 lg:mt-0">
            {timer.map((item, index) => (
              <div
                key={index}
                className="h-[62px] w-[62px] rounded-full bg-primary flex flex-col items-center justify-center"
              >
                <p
                  className={`${poppins.className} text-[16px] leading-[20px] font-semibold`}
                >
                  {item.time}
                </p>
                <p
                  className={`${poppins.className} text-[11px] leading-[18px] font-normal`}
                >
                  {item.hmss}
                </p>
              </div>
            ))}
          </div>
          <button
            className={`${poppins.className} w-[171px] mt-5 lg:mt-0 h-[56px] bg-greenColor rounded-[4px] text-[16px] text-primary leading-[24px]  lgl:px-2 py-3 font-medium cursor-pointer`}
          >
            Buy Now!
          </button>
        </div>
        <div className="w-full lg:w-[600px] h-auto lg:h-[420px] flex justify-center items-center ">
          <Image
            src={HeadPhoneImage}
            alt="Headphone Image"
            width={568}
            height={420}
            className="-rotate-180 -mt-20"
            style={{
              transform: "rotateY(180deg)",
              filter: "drop-shadow(0 0 100px rgba(255, 255, 255, 0.9))",
            }}
          />
        </div>
      </div>
    </Wrapper>
  );
};

export default MusicExperience;
