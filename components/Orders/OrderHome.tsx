"use client"

import type { RootState } from "@/redux/store"
import type React from "react"
import { client } from "@/sanity/lib/client"
import Wrapper from "@/shared/Wrapper"
import { Inter } from "next/font/google"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import type { Order } from "./types"
import OrderCard from "./OrderCard"
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
          `*[_type == "order" && userLoginEmail == $email] {
            orderId,
            firstName,
            orderDate,
            shippingDate,
            products
          }`,
          {
            email: userInfo?.email,
          },
        )


        const ordersWithProducts = response.filter((order: Order) => order.products && order.products.length > 0)

        setData(ordersWithProducts)

      } catch (error) {
        console.error(error)
        setLoading(false)
      } finally {
        setLoading(false)
      }
    }
    getData()
  }, [userInfo?.email])

  if (loading) {
    return <LoadingSpinner />
  }

  if (data.length === 0) {
    return (
      <Wrapper className="py-10 px-4 flex items-center justify-center">
        <p className={`${inter.className} text-[21px] text-black font-medium`}>No Orders found.</p>
      </Wrapper>
    )
  }

  return (
    <Wrapper className="py-10 px-4 flex items-center justify-center">
      <div className="grid grid-cols-1 gap-14 md:grid-cols-2 lgll:grid-cols-3">
        {data.map((order, index) => (
          <OrderCard key={index} order={order} />
        ))}
      </div>
    </Wrapper>
  )
}

export default Home

