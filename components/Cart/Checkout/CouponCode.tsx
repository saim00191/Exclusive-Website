"use client"
import { Poppins } from "next/font/google"
import { useState } from "react"

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] })

const CouponCode = () => {
  const [couponCodeError, setCouponCodeError] = useState(false)

  const CouponCodeErrorHandler = () => {
    setCouponCodeError(true)
    setTimeout(() => {
      setCouponCodeError(false)
    }, 1000)
  }

  return (
    <div className="w-[527px] h-[66px] flex flex-col items-center justify-between">
      <div className="smx:flex justify-between w-full hidden h-[56px]">
        <input
          type="text"
          className={`${poppins.className} border border-black rounded-[4px] w-[300px] h-[56px] outline-none text-black text-[16px] font-normal placeholder:opacity-50 px-4`}
          placeholder="Coupon Code"
        />
        <button
          onClick={CouponCodeErrorHandler}
          className={`${poppins.className} w-[211px] h-[56px] py-4 px-12 rounded-[4px] text-primary bg-carminePink`}
        >
          Apply Coupon
        </button>
      </div>
      {couponCodeError && (
        <p className={`${poppins.className} mt-0.5 text-black text-[16px] text-center font-normal`}>
          Invalid Coupon Code
        </p>
      )}
    </div>
  )
}

export default CouponCode

