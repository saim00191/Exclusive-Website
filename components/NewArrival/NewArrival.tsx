import Wrapper from "@/shared/Wrapper";
import Image from "next/image";
import Image1 from "@/images/NewArrival1.png";
import Image2 from "@/images/NewArrival2.png";
import Image3 from "@/images/NewArrival3.png";
import Image4 from "@/images/NewArrival4.png";
import { Inter, Poppins } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["400", "700"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

const NewArrival = () => {
  return (
    <Wrapper className="py-8 md:py-14">
      <div className="space-y-6 md:space-y-8">
        <div className="space-y-2 md:space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-5 h-10 bg-carminePink" />
            <h2
              className={`${poppins.className} font-semibold text-sm md:text-base text-carminePink`}
            >
              Featured
            </h2>
          </div>
          <h2
            className={`${inter.className} font-semibold text-2xl sm:text-3xl md:text-4xl leading-tight tracking-wider text-black`}
          >
            New Arrival
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 px-2 lgl:px-0">
          <div className="col-span-1 sm:col-span-2 lg:row-span-2 bg-black relative group overflow-hidden">
            <Image
              src={Image1}
              alt="PlayStation 5"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute bottom-6 left-6 right-6 space-y-2">
              <h2
                className={`${inter.className} font-semibold text-xl md:text-2xl tracking-wider text-white`}
              >
                PlayStation 5
              </h2>
              <p
                className={`${poppins.className} text-sm text-primary leading-snug`}
              >
                Black and White version of the PS5 coming out on sale.
              </p>
              <p
                className={`${poppins.className} font-medium text-white text-sm md:text-base hover:underline cursor-pointer`}
              >
                Shop Now
              </p>
            </div>
          </div>
          <div className="col-span-1 sm:col-span-2 bg-[#0d0d0d] relative group overflow-hidden">
            <Image
              src={Image2}
              alt="Women's Collections"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute bottom-6 left-6 right-6 space-y-2">
              <h2
                className={`${inter.className} font-semibold text-xl md:text-2xl tracking-wider text-white`}
              >
                Womens Collections
              </h2>
              <p
                className={`${poppins.className} text-sm text-primary leading-snug`}
              >
                Featured woman collections that give you another vibe.
              </p>
              <p
                className={`${poppins.className} font-medium text-white text-sm md:text-base hover:underline cursor-pointer`}
              >
                Shop Now
              </p>
            </div>
          </div>
          <div className="bg-[#000000] relative group overflow-hidden">
            <Image
              src={Image3}
              alt="Speakers"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute bottom-6 left-6 right-6 space-y-2">
              <h2
                className={`${inter.className} font-semibold text-xl md:text-2xl tracking-wider text-white`}
              >
                Speakers
              </h2>
              <p
                className={`${poppins.className} text-sm text-primary leading-snug`}
              >
                Amazon wireless speakers
              </p>
              <p
                className={`${poppins.className} font-medium text-white text-sm md:text-base hover:underline cursor-pointer`}
              >
                Shop Now
              </p>
            </div>
          </div>
          <div className="bg-black relative group overflow-hidden">
            <Image
              src={Image4}
              alt="Perfume"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute bottom-6 left-6 right-6 space-y-2">
              <h2
                className={`${inter.className} font-semibold text-xl md:text-2xl tracking-wider text-white`}
              >
                Perfume
              </h2>
              <p
                className={`${poppins.className} text-sm text-primary leading-snug`}
              >
                GUCCI INTENSE OUD EDP
              </p>
              <p
                className={`${poppins.className} font-medium text-white text-sm md:text-base hover:underline cursor-pointer`}
              >
                Shop Now
              </p>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default NewArrival;
