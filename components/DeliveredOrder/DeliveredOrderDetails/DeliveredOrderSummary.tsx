import { Poppins } from "next/font/google";
import { OrderData } from "@/components/Orders/OrderDetails/types";


const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

interface DeliveredOrderSummaryProps {
  data: OrderData;
}

export default function OrderSummary({ data }: DeliveredOrderSummaryProps) {
  
  return (
    <div className="h-auto flex mt-8 justify-end">
      <div className="h-full rounded-[4px] border-black border-[1.5px] px-4 w-full sm:w-[470px] flex items-center justify-center">
        <div className="lg:w-[424px] w-full h-full py-8">
          <h2
            className={`${poppins.className} font-medium text-[20px] leading-[28px] text-black`}
          >
           Delivered Order Summary
          </h2>
          {[
            { label: "Email", value: data.email },
            { label: "Delivered Address", value: data.address },
            { label: "City", value: data.city },
            { label: "Phone", value: data.phone },
            { label: "Order Status", value:"Delivered" },
            { label: "Payment Status", value: "Paid" },
            { label: "Payment Method", value: "Cash on Delivery" },
            { label: "Total", value: `$${data.totalAmount}` },
          ].map((item, index) => (
            <div key={index}>
              <div className="h-[24px] flex justify-between items-center py-7">
                <h2
                  className={`${poppins.className} font-normal text-[16px] leading-[24px] text-black`}
                >
                  {item.label}:
                </h2>
                <p
                  className={`${poppins.className} font-normal text-[14px] xsm:text-[16px] leading-[24px] text-black break-words max-w-[40ch]`}
                >
                  {item.value}
                </p>
              </div>
              {index < 7 && (
                <div className="border-b border-[0.5px] border-black opacity-30" />
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
