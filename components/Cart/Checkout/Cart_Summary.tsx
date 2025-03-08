"use client"
import { Poppins } from "next/font/google"
import type React from "react"

import Image, { StaticImageData } from "next/image"
import { useDispatch } from "react-redux"
import { deleteItem } from "@/redux/slice"
import { RxCross2 } from "react-icons/rx"
import { useEffect } from "react"
import PaymentMethods from "./PaymentMethod"
import CouponCode from "./CouponCode"
import OrderSummary from "./Order_Summary"

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] })

interface Product {
  id: string | number
  title: string
  price: number
  quantity: number
  img: StaticImageData | string
}

interface CartSummaryProps {
  products: Product[]
  total: number
  setTotal: React.Dispatch<React.SetStateAction<number>>
  isLoading: boolean
  handleSubmit: () => Promise<void>
}

const CartSummary = ({ products, total, setTotal, isLoading, handleSubmit }: CartSummaryProps) => {
  const dispatch = useDispatch()

  useEffect(() => {
    const totalAmount = products.reduce((acc, item) => {
      const price = (item.price as number) || 0
      return acc + price * item.quantity
    }, 0)
    setTotal(totalAmount)
  }, [products, setTotal])

  return (
    <div className="h-auto lg:h-[600px] w-full lg:w-[527px] items-end mt-8 lg:mt-0 px-4 xs:px-6 sm:px-8 flex flex-col gap-8">
      <div className="w-full smx:w-[425px]">
        <div className="flex flex-col gap-8 overflow-y-scroll custom-scrollbar h-[140px]">
          {products.map((item, index) => (
            <div key={index} className="flex items-center flex-row pr-2 justify-between">
              <div className="flex gap-3 items-center relative">
                <Image
                  src={item.img || "/placeholder.svg"}
                  alt="Product Image"
                  className="h-[54px] w-[54px]"
                  width={54}
                  height={54}
                />
                <span
                  onClick={() => dispatch(deleteItem(item.id.toString()))}
                  className="h-[24px] w-[24px] rounded-full text-white cursor-pointer text-[14px] absolute flex items-center justify-center top-0.5 bg-carminePink"
                >
                  <RxCross2 />
                </span>
                <p className={`${poppins.className} text-black text-[16px] font-normal`}>{item.title}</p>
              </div>
              <div className="flex items-center gap-1">
                <p className={`${poppins.className} text-black text-[16px] font-normal`}>${item.price}</p>
                <p className={`${poppins.className} text-black text-[16px] font-normal`}>({item.quantity})</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <OrderSummary total={total} />
      <PaymentMethods />
      <CouponCode />

      {/* Submit Button */}
      <div className="w-full flex justify-end mt-4">
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className={`${poppins.className} w-[200px] h-[56px] py-4 rounded-[4px] text-white bg-carminePink ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
            </div>
          ) : (
            "Place Order"
          )}
        </button>
      </div>
    </div>
  )
}

export default CartSummary

