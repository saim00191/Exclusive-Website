"use client"
import { Poppins } from "next/font/google"

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] })

interface OrderSummaryProps {
  total: number
}

const OrderSummary = ({ total }: OrderSummaryProps) => {
  return (
    <div className="w-full smx:w-[425px] h-[140px] flex flex-col justify-between">
      <div className="h-[24px] w-full flex justify-between">
        <p className={`${poppins.className} text-black text-[16px] font-normal`}>Subtotal:</p>
        <p className={`${poppins.className} text-black text-[16px] font-normal`}>${total}/=</p>
      </div>
      <span className="h-0.5 w-full bg-gray-300" />
      <div className="h-[24px] w-full flex justify-between">
        <p className={`${poppins.className} text-black text-[16px] font-normal`}>Shipping:</p>
        <p className={`${poppins.className} text-black text-[16px] font-normal`}>Free</p>
      </div>
      <span className="h-0.5 w-full bg-gray-300" />
      <div className="h-[24px] w-full flex justify-between">
        <p className={`${poppins.className} text-black text-[16px] font-normal`}>Total:</p>
        <p className={`${poppins.className} text-black text-[16px] font-normal`}>${total}/=</p>
      </div>
    </div>
  )
}

export default OrderSummary

