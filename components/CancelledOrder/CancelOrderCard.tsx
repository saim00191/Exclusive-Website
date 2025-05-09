import type React from "react";
import Link from "next/link";
import { Inter, Poppins } from "next/font/google";
import { Order } from "@/components/Orders/types";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "700"] });

interface CancelledOrderProps {
  order: Order;
}

const OrderCard: React.FC<CancelledOrderProps> = ({ order }) => {
  return (
    <div className="xs:h-[230px] xs:w-[350px] p-4 space-y-6 border border-[#e5e5e5] rounded-md">
      <p className={`${inter.className} text-[16px] text-black font-medium`}>
        {" "}
        Order Id:{" "}
        <span
          className={`${poppins.className} text-[18px] text-black font-medium`}
        >
          {" "}
          {order.orderId}{" "}
        </span>{" "}
      </p>
      <p className={`${inter.className} text-[16px] text-black font-medium`}>
        {" "}
        Name:{" "}
        <span
          className={`${poppins.className} text-[18px] text-black font-medium`}
        >
          {" "}
          {order.firstName}{" "}
        </span>{" "}
      </p>
      <p className={`${inter.className} text-[16px] text-black font-medium`}>
        {" "}
        Cancelled Date:{" "}
        <span
          className={`${poppins.className} text-[18px] text-black font-medium`}
        >
          {" "}
          {new Date(order.cancelledAt).toLocaleDateString("en-GB")}{" "}
        </span>{" "}
      </p>
      <div className="flex justify-end items-center ">
        <Link
          href={`/cancellations/cancellationsDetails/${order.orderId}`}
          className="w-[200px] h-[56px] py-4 flex items-center justify-center rounded-[4px] border border-carminePink text-black  hover:text-white hover:bg-carminePink"
        >
          <p className={`${poppins.className} text-[16px] `}>View Details</p>
        </Link>
      </div>
    </div>
  );
};

export default OrderCard;
