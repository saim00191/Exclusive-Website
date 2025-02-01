'use client'

import { RootState } from "@/redux/store";
import Wrapper from "@/shared/Wrapper";
import { useSelector } from "react-redux";


const Home = () => {
    const userInfo = useSelector((state: RootState) => state.products.userInfo);
  return (
      <Wrapper>
          {userInfo?.email}
          {userInfo?.displayName}
          {userInfo?.password}
    </Wrapper>
  )
}

export default Home