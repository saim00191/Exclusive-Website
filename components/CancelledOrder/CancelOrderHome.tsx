"use client"

import type { RootState } from "@/redux/store"
import type React from "react"
import { client } from "@/sanity/lib/client"
import Wrapper from "@/shared/Wrapper"
import { Inter } from "next/font/google"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import type { Order } from "@/components/Orders/types"
import CancelOrderCard from "./CancelOrderCard"
import LoadingSpinner from "@/shared/LoadingSpinner"

const inter = Inter({ subsets: ["latin"], weight: ["400", "700"] })

const Home: React.FC = () => {
  const [data, setData] = useState<Order[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const userInfo = useSelector((state: RootState) => state.products.userInfo )

    useEffect(() => {
    async function getData() {
      try {
        const response = await client.fetch(
          `*[_type == "cancelOrder" && userLoginEmail == $email] {
            orderId,
            firstName,
            orderDate,
            cancelledAt,
            products
          }`,
          {
            email: userInfo?.email,
          }
        )

        setData(response)
      } catch (error) {
        console.log(error)
        setLoading(false)
      } finally {
        setLoading(false)
      }
    }
    if (userInfo?.email) getData()
  }, [userInfo?.email])
  if (loading) {
    return <LoadingSpinner />
  }

  if (data.length === 0) {
    return (
      <Wrapper className="py-10 px-4 flex items-center justify-center">
        <p className={`${inter.className} text-[21px] text-black font-medium`}>No Cancelled Orders found.</p>
      </Wrapper>
    )
  }

  return (
    <Wrapper className="py-10 px-4 flex items-center justify-center">
      <div className="grid grid-cols-1 gap-14 md:grid-cols-2 lgll:grid-cols-3">
        {data.map((order, index) => (
          <CancelOrderCard key={index} order={order} />
        ))}
      </div>
    </Wrapper>
  )
}

export default Home

