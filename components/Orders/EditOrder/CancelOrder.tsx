"use client"

import { Dialog } from "@headlessui/react"
import { Poppins } from "next/font/google"
import { useState } from "react"
import { client } from "@/sanity/lib/client"
import { Loader2 } from "lucide-react"
import { toast } from "react-hot-toast"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] })


interface Product {
  productId: string
  productImage: {
    _type: string
    asset:
      | {
          _ref: string
        }
      | string
  }
  productName: string
  quantity: number
  price: number
  totalPrice: number
}

interface OrderDetails {
  orderId: string
  userLoginName: string
  userLoginEmail: string
  firstName: string
  address: string
  city: string
  phone: number | string
  email: string
  products: Product[]
  totalAmount: number
  orderStatus: string
  paymentStatus: string
  orderDate: string
  shippingDate: string | null
}

interface CancelOrderModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  orderDetails: OrderDetails
}

export default function CancelOrderModal({ isOpen, onClose, onConfirm, orderDetails }: CancelOrderModalProps) {
  const userInfo = useSelector((state: RootState) => state.products.userInfo)
  const [isCancelling, setIsCancelling] = useState(false)

  const sendCancelOrderToSanity = async () => {
    setIsCancelling(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
  
      const query = `*[_type == "order" && orderId == $orderId][0]`;
      const params = { orderId: orderDetails.orderId };
      const existingOrder = await client.fetch(query, params);
  
      if (!existingOrder) {
        throw new Error(`Order with ID ${orderDetails.orderId} not found`);
      }
  
      const reactivateQuery = `*[_type == "reactivateOrder" && orderId == $orderId][0]`;
      const reactivateOrder = await client.fetch(reactivateQuery, params);
  
      if (reactivateOrder) {
        await client.delete(reactivateOrder._id);
      }
  
      await client
        .patch(existingOrder._id)
        .set({
          orderStatus: "cancelled",
          paymentStatus: "failed",
        })
        .commit();
  
      await client.create({
        _type: "cancelOrder",
        orderId: orderDetails.orderId,
        userLoginName: userInfo?.displayName,
        userLoginEmail: userInfo?.email,
        userLoginPassword:userInfo?.password,
        firstName: orderDetails.firstName,
        address: orderDetails.address,
        city: orderDetails.city,
        phone: orderDetails.phone,
        email: orderDetails.email,
        products: orderDetails.products,
        totalAmount: orderDetails.totalAmount,
        orderStatus: "cancelled",
        paymentStatus: "failed",
        orderDate: orderDetails.orderDate,
        cancelledAt: new Date().toISOString(),
      });
  
      onConfirm();
      onClose();
      toast.success("Order cancelled successfully.");
    } catch (error) {
      console.error("Error cancelling order:", error);
      toast.error("Failed to cancel order. Please try again.");
    } finally {
      setIsCancelling(false);
    }
  };
  

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className={`w-full max-w-sm rounded bg-white p-6 ${poppins.className}`}>
          <Dialog.Title className="text-lg font-medium mb-4">Cancel Order</Dialog.Title>
          <p className="mb-4">Are you sure you want to cancel this order? This action cannot be undone.</p>
          <div className="flex justify-end gap-4">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50"
              disabled={isCancelling}
            >
              No, keep order
            </button>
            <button
              onClick={sendCancelOrderToSanity}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 disabled:bg-red-400 disabled:cursor-not-allowed flex items-center justify-center"
              disabled={isCancelling}
            >
              {isCancelling ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Cancelling...
                </>
              ) : (
                "Yes, cancel order"
              )}
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}

