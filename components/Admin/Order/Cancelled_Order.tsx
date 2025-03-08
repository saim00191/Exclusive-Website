"use client"

import { useEffect, useState } from "react"
import { AnimatePresence } from "framer-motion"
import { Poppins } from "next/font/google"
import { client } from "@/sanity/lib/client"
import LoadingSpinner from "@/shared/LoadingSpinner"
import { useSelector } from "react-redux"
import type { RootState } from "@/redux/store"
import NotLoggedIn from "@/shared/NotLoggedIn"
import OrderTable from "./Order_Table"
import OrderDetailsModal from "./Order_Details_Modal"
import type { Order } from "./types"

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] })

export default function CancelledOrderPage() {
  const [orderData, setOrderData] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const adminInfo = useSelector((state: RootState) => state.adminSlice.adminInfo)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const Orders: Order[] = await client.fetch(
          `*[_type == "cancelOrder"]{
            orderId,
            firstName,
            email,
            userLoginEmail,
            totalAmount,
            phone,
            city,
            address,
            company,
            userLoginPassword,
            orderStatus,
            paymentStatus,
            orderDate,
            cancelledAt,
            products[]{
              productId,
              productImage,
              productName,
              quantity,
              price,
              totalPrice
            }
          }`,
        )
        setOrderData(Orders)
      } catch (error) {
        console.error("Error fetching Orders:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchOrders()
  }, [])

  useEffect(() => {
    if (selectedOrder) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [selectedOrder])

  if (!adminInfo || !adminInfo.name) {
    return <NotLoggedIn />
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className={`${poppins.className} py-10 px-4 sm:px-6 lg:px-8 ${selectedOrder ? "pointer-events-none" : ""}`}>
      <h1 className="font-bold mb-6 text-[28px] sm:text-[36px] tracking-[4px] text-black">Cancelled Orders</h1>

      <OrderTable orderData={orderData} onViewDetails={setSelectedOrder} />

      <AnimatePresence>
        {selectedOrder && <OrderDetailsModal selectedOrder={selectedOrder} onClose={() => setSelectedOrder(null)} />}
      </AnimatePresence>
    </div>
  )
}

