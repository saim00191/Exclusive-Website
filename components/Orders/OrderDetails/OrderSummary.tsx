import { Poppins } from "next/font/google"
import { OrderData } from "./types"
import Link from "next/link"

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] })

interface OrderSummaryProps {
  data: OrderData
}

export default function OrderSummary({ data }: OrderSummaryProps) {
  return (
    <div className="h-auto flex mt-8 justify-end">
      <div className="h-full rounded-[4px] border-black border-[1.5px] px-4 w-full sm:w-[470px] flex items-center justify-center">
        <div className="lg:w-[424px] w-full h-full py-8">
          <h2 className={`${poppins.className} font-medium text-[20px] leading-[28px] text-black`}>Order Summary</h2>
          {[
            { label: "Email", value: data.email },
            { label: "Address", value: data.address },
            { label: "City", value: data.city },
            { label: "Phone", value: data.phone },
            { label: "Order Status", value: data.orderStatus },
            { label: "Payment Status", value: data.paymentStatus },
            { label: "Payment Method", value: "Cash on Delivery" },
            { label: "Total", value: `$${data.totalAmount}` },
          ].map((item, index) => (
            <div key={index}>
              <div className="h-[24px] flex justify-between items-center py-7">
                <h2 className={`${poppins.className} font-normal text-[16px] leading-[24px] text-black`}>
                  {item.label}:
                </h2>
                <p
                  className={`${poppins.className} font-normal text-[14px] xsm:text-[16px] leading-[24px] text-black break-words max-w-[40ch]`}
                >
                  {item.value}
                </p>
              </div>
              {index < 7 && <div className="border-b border-[0.5px] border-black opacity-30" />}
            </div>
          ))}
          
          <div className="flex justify-center items-center mt-6">
            <Link
              href={`/orders/editOrder/${data.orderId}`}
              className="w-[200px] h-[56px] py-4 flex items-center justify-center rounded-[4px] border border-carminePink text-black hover:text-white hover:bg-carminePink"
            >
              <p className={`${poppins.className} text-[16px]`}>Edit Details</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
