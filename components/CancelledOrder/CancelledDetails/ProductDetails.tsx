import { Poppins } from "next/font/google"
import Image from "next/image"
import  { Product } from "@/components/Orders/OrderDetails/types"
import { urlFor } from "@/sanity/lib/image"

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] })

interface ProductListProps {
  products: Product[]
}

export default function ProductList({ products }: ProductListProps) {
  return (
    <div>
      {products.map((item, index) => (
        <div
          key={item.productId ? `${item.productId}-${index}` : `${index * 432}`}
          className="w-full lg:max-w-[1170px] mx-auto border-b border-b-gray-300 py-5 h-full grid grid-cols-2 smx:grid-cols-4 gap-4 px-4"
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
          <p
            className={`${poppins.className} text-black px-1 whitespace-nowrap smx:whitespace-normal col-span-2 xs:col-span-1 justify-end smx:justify-start flex items-center`}
          >
            {item.productName}
          </p>
          <div className="flex gap-2 items-center justify-start smx:justify-center px-1">
            <p className={`${poppins.className} text-black`}>${item.price}</p>
            <p className={`${poppins.className} text-black`}>({item.quantity})</p>
          </div>
          <p className={`${poppins.className} text-black flex justify-end smx:justify-center items-center px-1`}>
            ${item.totalPrice}
          </p>
        </div>
      ))}
    </div>
  )
}

