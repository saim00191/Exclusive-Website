import type React from "react"
import Image from "next/image"
import { FiPlus } from "react-icons/fi"
import { AiOutlineMinus } from "react-icons/ai"
import { MdDelete } from "react-icons/md"
import { client } from "@/sanity/lib/client"
import imageUrlBuilder from "@sanity/image-url"
import type { Product, OrderData ,ImageType } from "@/components/Orders/OrderDetails/types"
import { Poppins } from "next/font/google"


const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] })
const builder = imageUrlBuilder(client)

function urlFor(source: ImageType) {
  return builder.image(source)
}

interface ProductListProps {
  products: Product[]
  setData: React.Dispatch<React.SetStateAction<OrderData | null>>
}

export default function ProductList({ products, setData }: ProductListProps) {
  const handleIncrease = (productId: string) => {
    setData((prevData) => {
      if (prevData) {
        const updatedProducts = prevData.products.map((product) => {
          if (product.productId === productId) {
            const updatedQuantity = product.quantity + 1
            const updatedTotalPrice = updatedQuantity * product.price
            return { ...product, quantity: updatedQuantity, totalPrice: updatedTotalPrice }
          }
          return product
        })
        return { ...prevData, products: updatedProducts }
      }
      return prevData
    })
  }

  const handleDecrease = (productId: string) => {
    setData((prevData) => {
      if (prevData) {
        const updatedProducts = prevData.products.map((product) => {
          if (product.productId === productId && product.quantity > 1) {
            const updatedQuantity = product.quantity - 1
            const updatedTotalPrice = updatedQuantity * product.price
            return { ...product, quantity: updatedQuantity, totalPrice: updatedTotalPrice }
          }
          return product
        })
        return { ...prevData, products: updatedProducts }
      }
      return prevData
    })
  }

  const handleDelete = (productId: string) => {
    setData((prevData) => {
      if (prevData) {
        const updatedProducts = prevData.products.filter((product) => product.productId !== productId)
        return { ...prevData, products: updatedProducts }
      }
      return prevData
    })
  }

  return (
    <div>
      {products.map((item, index) => (
        <div
          key={item.productId ? `${item.productId}-${index}` : `${index * 432}`}
          className="w-full lg:max-w-[1170px] border-b border-b-gray-300 py-5 h-full grid grid-cols-2 smx:grid-cols-5 gap-4 px-4"
        >
          <div className="bg-[#D0D5DD] w-[95px] h-[95px] rounded-[12px] flex items-center justify-center">
            {item.productImage?.asset?._ref ? (
              <Image
                src={urlFor(item.productImage).url() || "/placeholder.svg"}
                alt={item.productName}
                className="w-full h-full object-cover rounded-[12px]"
                width={95}
                height={95}
                unoptimized={true}
              />
            ) : (
              <div className="w-full h-full bg-gray-300 rounded-[12px] flex items-center justify-center">
                <p>No Image</p>
              </div>
            )}
          </div>
          <p className={`${poppins.className} text-black px-1 whitespace-nowrap smx:whitespace-normal col-span-2 xs:col-span-1 justify-end smx:justify-start flex items-center`}>
            {item.productName}
          </p>
          <div className="flex gap-2 items-center justify-start smx:justify-center px-1">
            <p className={`${poppins.className} text-black`}>${item.price}</p>
            <p className={`${poppins.className} text-black`}>({item.quantity})</p>
          </div>
          <p className={`${poppins.className} text-black flex justify-end smx:justify-center items-center px-1`}>${item.totalPrice}</p>
          <div className="flex items-center gap-4 smx:justify-end justify-center w-full">
            <span
              onClick={() => handleIncrease(item.productId)}
              className="w-7 h-7 hover:cursor-pointer hover:bg-carminePink hover:text-white border border-gray-300 rounded-full flex items-center justify-center"
            >
              <FiPlus className="text-[18px]" />
            </span>
            <span
              onClick={() => handleDecrease(item.productId)}
              className="w-7 h-7 hover:cursor-pointer hover:bg-carminePink hover:text-white border border-gray-300 rounded-full flex items-center justify-center"
            >
              <AiOutlineMinus className="text-[18px]" />
            </span>
            <span
              onClick={() => handleDelete(item.productId)}
              className="w-7 h-7 hover:cursor-pointer hover:bg-carminePink hover:text-white border border-gray-300 rounded-full flex items-center justify-center"
            >
              <MdDelete className="text-[18px]" />
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

