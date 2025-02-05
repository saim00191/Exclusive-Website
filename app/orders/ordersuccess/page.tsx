"use client";

import Wrapper from "@/shared/Wrapper";
import { Poppins } from "next/font/google";
import { useEffect, useState } from "react";
import SuccessImage from "@/images/success.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { clearProducts } from "@/redux/slice";
import { useDispatch } from "react-redux";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

const Home = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [countdown, setCountdown] = useState(4);

  useEffect(() => {
    dispatch(clearProducts());
    const timer = setInterval(() => {
      setCountdown((prevCount) => {
        if (prevCount === 1) {
          clearInterval(timer);
          router.push("/");
        }
        return prevCount - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <Wrapper className="flex flex-col gap-6 items-center justify-center py-20 space-y-2">
      <Image
        src={SuccessImage || "/placeholder.svg"}
        alt="Success"
        className="w-[200px] h-[200px]"
      />
      <h1
        className={`${poppins.className} text-[30px] uppercase leading-[30px] text-center font-bold text-black`}
      >
        Your Order is Confirmed
      </h1>
      <p
        className={`${poppins.className} text-[18px] text-center leading-[24px] font-medium text-black`}
      >
        Thank you for shopping with us!
      </p>

      <p
        className={`${poppins.className} text-[18px] text-center leading-[24px] font-medium text-black`}
      >
        You will be redirected to the home page in {countdown} second
        {countdown !== 1 ? "s" : ""}
      </p>
    </Wrapper>
  );
};

export default Home;
