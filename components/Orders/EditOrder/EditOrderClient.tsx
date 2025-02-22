"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { client } from "@/sanity/lib/client"
import Wrapper from "@/shared/Wrapper"
import OrderDetails from "@/components/Orders/EditOrder/OrderDetails"
import ProductList from "@/components/Orders/EditOrder/ProductList"
import EditDetailsModal from "@/components/Orders/EditOrder/EditOrderModal"
import type { OrderData } from "@/components/Orders/OrderDetails/types"
import LoadingSpinner from "@/shared/LoadingSpinner"
import { Poppins } from "next/font/google"
import CancelOrderModal from "@/components/Orders/EditOrder/CancelOrder"

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] })

export default function EditOrderClient({ slug }: { slug: string }) {
  const router = useRouter()
  const [data, setData] = useState<OrderData | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editField, setEditField] = useState("")
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false)

  useEffect(() => {
    async function getData() {
      try {
        const response = await client.fetch(`*[_type == "order" && orderId == $slug][0]`, { slug })
        setData(response)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }
    getData()
  }, [slug])

  const handleSaveChanges = async () => {
    if (data && data._id) {
      try {
        await client
          .patch(data._id)
          .set({
            products: data.products,
            totalAmount: data.totalAmount,
            firstName: data.firstName,
            email: data.email,
            address: data.address,
            city: data.city,
            phone: data.phone,
          })
          .commit()

  
        if (data.products.length === 0) {
          router.push("/")
        } else {
          const refreshedData = await client.fetch(`*[_type == "order" && _id == $id][0]`, { id: data._id })
          setData(refreshedData)
        }
      } catch (error) {
        console.error("Error saving changes:", error)
      }
    }
  }

  const handleEditField = (field: string) => {
    setEditField(field)
    setIsEditModalOpen(true)
  }

  const handleUpdateField = (field: string, value: string) => {
    setData((prevData) => {
      if (prevData) {
        return { ...prevData, [field]: value }
      }
      return prevData
    })
  }

  const handleCancelOrder = () => {
    setIsCancelModalOpen(true)
  }

  const confirmCancelOrder = async () => {
    if (data && data._id) {
      try {
        await client.delete(data._id)
        router.push("/orders")
      } catch (error) {
        console.log(error)
      }
    }
  }

  if (!data) {
    return <LoadingSpinner />
  }

  return (
    <Wrapper className="px-4 py-10">
      <div className="flex flex-col gap-5 justify-center">
        <h1 className="font-semibold text-[36px] leading-[48px] flex items-center tracking-[4px] text-black">
          Edit Order
        </h1>
        <h3 className="text-[18px] mt-6 text-black font-medium">
          Order ID: <span className="text-[20px] text-black font-medium">{slug}</span>
        </h3>

        <ProductList products={data.products} setData={setData} />

        <OrderDetails data={data} onEditField={handleEditField} />

        <div className="flex justify-center smx:justify-end mt-6 items-center gap-3">
          <div className="flex justify-center smx:justify-end  items-center">
            <button
              onClick={handleCancelOrder}
              className="w-[200px] h-[56px] py-4 flex items-center justify-center rounded-[4px] border border-carminePink text-black hover:text-white hover:bg-carminePink"
            >
              <p className={`${poppins.className} text-[16px]`}>Cancel Order</p>
            </button>
          </div>
          <div className="flex justify-center smx:justify-end  items-center">
            <button
              onClick={handleSaveChanges}
              className="w-[200px] h-[56px] py-4 flex items-center justify-center rounded-[4px] border border-carminePink text-black hover:text-white hover:bg-carminePink"
            >
              <p className={`${poppins.className} text-[16px]`}>Save Changes</p>
            </button>
          </div>
        </div>
      </div>

      <EditDetailsModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        field={editField}
        value={data[editField as keyof OrderData] as string}
        onUpdate={handleUpdateField}
      />

      <CancelOrderModal
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        onConfirm={confirmCancelOrder}
        orderDetails={data}
      />
    </Wrapper>
  )
}

