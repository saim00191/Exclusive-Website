import { FaEdit } from "react-icons/fa"
import type { OrderData } from "@/components/Orders/OrderDetails/types"
import { Inter, Poppins } from "next/font/google"


const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] })
const inter = Inter({ subsets: ["latin"], weight: ["400", "700"] })

interface OrderDetailsProps {
  data: OrderData
  onEditField: (field: string) => void
}

export default function OrderDetails({ data, onEditField }: OrderDetailsProps) {
  const details = [
    { label: "Name", value: data.firstName, field: "firstName" },
    { label: "Email", value: data.email, field: "email" },
    { label: "Address", value: data.address, field: "address" },
    { label: "City", value: data.city, field: "city" },
    { label: "Phone", value: data.phone, field: "phone" },
    { label: "Order Status", value: data.orderStatus },
    { label: "Payment Status", value: data.paymentStatus },
    { label: "Payment Method", value: "Cash on Delivery" },
    { label: "Total", value: `$${data.totalAmount}` },
  ]

  return (
    <div className="h-auto flex mt-8 justify-end">
      <div className="h-full rounded-[4px] border-black border-[1.5px] px-4 w-full sm:w-[470px] flex items-center justify-center">
        <div className="lg:w-[424px] w-full h-full py-8">
          <h2 className={`${inter.className} font-medium text-[20px] leading-[28px] text-black`}>Edit Details</h2>
          {details.map((item, index) => (
            <div key={index}>
              <div className="h-[24px] flex justify-between items-center py-7">
                <h2 className={`${inter.className} font-normal text-[16px] leading-[24px] text-black`}>{item.label}:</h2>
                <p className={`${poppins.className} flex items-center gap-2 font-normal text-[16px] leading-[24px] text-black break-words max-w-[40ch]`}>
                  {item.value}
                  {item.field && (
                    <span className="text-gray-600 cursor-pointer" onClick={() => onEditField(item.field)}>
                      <FaEdit />
                    </span>
                  )}
                </p>
              </div>
              {index < 8 && <div className="border-b border-[0.5px] border-black opacity-30" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

