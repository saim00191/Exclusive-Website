import { Inter, Poppins } from "next/font/google"

const inter = Inter({ subsets: ["latin"], weight: ["400", "700"] })
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] })

interface DeliveredOrderProps {
  slug: string
  firstName: string
  formattedOrderDate: string | null
  formattedDeliveredDate: string | null
}

export default function OrderDetails({
  slug,
  firstName,
  formattedOrderDate,
  formattedDeliveredDate,
}: DeliveredOrderProps ) {
  return (
    <div className="flex flex-col gap-5 justify-center">
      <h1
        className={`${inter.className} font-semibold text-[36px] leading-[48px] flex items-center tracking-[4px] text-black`}
      >
        Delivered Order Details
      </h1>
      <h3 className={`${inter.className} text-[18px] mt-6 text-black font-medium`}>
        Order ID: <span className={`${poppins.className} text-[20px] text-black font-medium`}>{slug}</span>
      </h3>
      <h3 className={`${inter.className} text-[18px] text-black font-medium`}>
        Name: <span className={`${poppins.className} text-[20px] text-black font-medium`}>{firstName}</span>
      </h3>
      <div className="flex-col smx:flex-row flex smx:items-center space-y-5 smx:space-y-0 smx:space-x-5">
        <h3 className={`${inter.className} text-[18px] text-black font-medium`}>
          Order Date:{" "}
          <span className={`${poppins.className} text-[20px] text-black font-medium`}>
            {formattedOrderDate ? formattedOrderDate : "Loading..."}
          </span>
        </h3>
        <h3 className={`${inter.className} text-[18px] text-black font-medium`}>
          Delivered Date:{" "}
          <span className={`${poppins.className} text-[20px] text-black font-medium`}>
          {formattedDeliveredDate ? formattedDeliveredDate : "Loading..."}
          </span>
        </h3>
      </div>
    </div>
  )
}

