import Wrapper from "@/shared/Wrapper";
import { Inter, Poppins } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["400", "700"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

interface TimerItemProps {
  label: string;
  value: string;
}

const Sale = () => {
  const TimerItem = ({ label, value }: TimerItemProps) => (
    <div className="flex flex-col h-[50px] w-[46px] gap-1">
      <p
        className={`${poppins.className} font-medium leading-[18px] text-[12px]`}
      >
        {label}
      </p>
      <h2
        className={`${inter.className} font-bold text-[32px] leading-[30px] tracking-[4px]`}
      >
        {value}
      </h2>
    </div>
  );

  return (
    <div className="py-8 w-full">
      <Wrapper className=" h-[103px]">
        <div className="h-auto lgll:h-[103px]">
          <div className="flex items-center gap-[16px]  justify-start h-[40px]">
            <div className="w-[20px] h-[40px] bg-carminePink" />
            <h2
              className={`${poppins.className} font-semibold text-[16px] leading-[20px] text-carminePink`}
            >
              Todays
            </h2>
          </div>
          <div className="flex flex-col lgll:flex-row justify-between items-center h-auto lgll:h-[63px] px-4 lg:px-0">
            <div className="w-full lgll:w-[600px] px-4 lgll:px-0 flex flex-col sm:flex-row justify-center sm:justify-between items-center">
              <h2
                className={`${inter.className} font-semibold text-[36px] leading-[48px] flex items-center tracking-[4px] text-black`}
              >
                Flash Sale
              </h2>
              <div className="w-[302px] hidden  xs:flex justify-between items-center">
                <TimerItem label="Days" value="03" />
                <div className="flex flex-col gap-2 mt-5">
                  <span className="h-1 rounded-full w-1 bg-[#E07575]" />
                  <span className="h-1 rounded-full w-1 bg-[#E07575]" />
                </div>
                <TimerItem label="Hours" value="23" />
                <div className="flex flex-col gap-2 mt-5">
                  <span className="h-1 rounded-full w-1 bg-[#E07575]" />
                  <span className="h-1 rounded-full w-1 bg-[#E07575]" />
                </div>
                <TimerItem label="Minutes" value="19" />
                <div className="flex flex-col gap-2  mt-5">
                  <span className="h-1 rounded-full w-1 bg-[#E07575]" />
                  <span className="h-1 rounded-full w-1 bg-[#E07575]" />
                </div>
                <TimerItem label="Seconds" value="56" />
              </div>
            </div>
            
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default Sale;
