"use client"
import { Poppins } from "next/font/google"
import Image from "next/image"
import { useState } from "react"
import Image1 from "@/images/billingDetailsImg1.png"
import Image2 from "@/images/billingDetailsImg2.png"
import Image3 from "@/images/billingDetailsImg3.png"
import Image4 from "@/images/billingDetailsImg4.png"

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] })

const PaymentMethods = () => {
  const [bankError, setBankError] = useState(false)

  const BankErrorHandler = () => {
    setBankError(true)
    setTimeout(() => {
      setBankError(false)
    }, 1000)
  }

  return (
    <>
      <div className="w-full smx:w-[425px] h-[38px] flex flex-col">
        <div className="w-full smx:w-[425px] h-[28px] flex justify-between">
          <div className="flex gap-3 items-center">
            <input type="radio" name="transfer" className="h-[24px] w-[24px]" onClick={BankErrorHandler} />
            <p className={`${poppins.className} text-black text-[16px] font-normal`}>Bank</p>
          </div>
          <div className="flex w-[198px] items-center justify-between">
            <Image src={Image1 || "/placeholder.svg"} alt="Bank Logo 1" className="w-[46px] h-[50px] cursor-pointer" />
            <Image src={Image2 || "/placeholder.svg"} alt="Bank Logo 2" className="w-[39px] h-[26px] cursor-pointer" />
            <Image src={Image3 || "/placeholder.svg"} alt="Bank Logo 3" className="w-[39px] h-[26px] cursor-pointer" />
            <Image src={Image4 || "/placeholder.svg"} alt="Bank Logo 4" className="w-[42px] h-[50px] cursor-pointer" />
          </div>
        </div>
        {bankError && (
          <p className={`${poppins.className} mt-0.5 text-black text-[16px] text-center font-normal`}>
            Bank Transfer Not Available
          </p>
        )}
      </div>
      <div className="flex items-center justify-between w-[174px] h-[24px]">
        <input type="radio" className="h-[24px] w-[24px]" name="transfer" />
        <p className={`${poppins.className} text-black text-[16px] font-normal`}>Cash on delivery</p>
      </div>
    </>
  )
}

export default PaymentMethods

