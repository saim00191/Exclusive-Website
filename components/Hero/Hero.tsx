import Wrapper from "@/shared/Wrapper";
import { Inter, Poppins } from "next/font/google";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";


const Hero = () => {
  return (
    <>
    <Wrapper className="flex flex-col-reverse mdl:flex-row items-center justify-between ">
      <LeftSide/>
      <RightSide/>
      </Wrapper>
      
    </>
  );
};

export default Hero;
