"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { urlFor } from "@/sanity/lib/image"
import type { Order } from "./types"

interface OrderDetailsModalProps {
  selectedOrder: Order | null
  onClose: () => void
}

export default function OrderDetailsModal({ selectedOrder, onClose }: OrderDetailsModalProps) {
  if (!selectedOrder) return null

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg pointer-events-auto"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
      >
        <h2 className="text-lg sm:text-xl font-bold mb-3">Order Details: {selectedOrder.orderId}</h2>
        <p>Customer: {selectedOrder.firstName}</p>
        <p>LoggedIn Email: {selectedOrder.userLoginEmail}</p>
        {selectedOrder.userLoginPassword && <p>LoggedIn Password: {selectedOrder.userLoginPassword}</p>}
        <p>Customer: {selectedOrder.firstName}</p>
        <p>Email: {selectedOrder.email}</p>
        <p>Phone: {selectedOrder.phone}</p>
        <p>City: {selectedOrder.city}</p>
        {selectedOrder.company && <p>City: {selectedOrder.city}</p>}
        <p>Address: {selectedOrder.address}</p>
        <p>Status: {selectedOrder.orderStatus}</p>
        <p>Payment Status: {selectedOrder.paymentStatus}</p>
        <p>Payment Method: Cash on Delivery</p>
        <p>
          Order Date:{" "}
          {new Date(selectedOrder.orderDate).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </p>
        <p>
          Cancelled Date:
          {selectedOrder.cancelledAt
            ? new Date(selectedOrder.cancelledAt).toLocaleString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })
            : "N/A"}
        </p>
        <p>Total: ${selectedOrder.totalAmount}</p>
        <h3 className="font-semibold mt-4">Products:</h3>
        <ul className="h-[250px] overflow-y-scroll">
          {selectedOrder.products.map((product) => (
            <li key={product.productId} className="flex items-center gap-3 text-sm mt-2">
              {product.productImage?.asset?._ref ? (
                <Image
                  src={urlFor(product.productImage).url() || "/placeholder.svg" || "/placeholder.svg"}
                  alt={product.productName}
                  className="w-[40px] h-[40px] object-cover"
                  width={40}
                  height={40}
                  unoptimized={true}
                />
              ) : (
                <div className="w-full h-full bg-gray-300 rounded-md flex items-center justify-center">
                  <p>No Image</p>
                </div>
              )}
              <span>
                {product.productName} - Quantity: <b>{product.quantity}</b> - <b>${product.price.toFixed(2)}</b>
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex justify-end">
          <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600" onClick={onClose}>
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

