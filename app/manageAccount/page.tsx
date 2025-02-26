// import FirstPart from "@/components/ManageAccount/FirstPart";
// import SecondPart from "@/components/ManageAccount/SecondPart";
import Wrapper from "@/shared/Wrapper";
import { Poppins } from "next/font/google";
import React from "react";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

const Home = () => {
  return (
    <Wrapper
      className={`${poppins.className} flex justify-between h-auto py-14 `}
    >
      {/* <FirstPart/>
      <SecondPart/> */}
      Home
    </Wrapper>
  );
};

export default Home;
