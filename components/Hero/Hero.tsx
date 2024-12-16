import Wrapper from "@/shared/Wrapper";
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
