import { urlFor } from "@/sanity/lib/image"
import Image from "next/image"
import { BiCommentDetail } from "react-icons/bi"
import { FaEdit } from "react-icons/fa"
import { MdDelete } from "react-icons/md"
import {ProductTableProps} from './types'

const ProductTable = ({ currentProducts, onViewDetails, onEdit, onDelete }: ProductTableProps) => {
  return (
    <div className="overflow-x-auto rounded-md border">
      {currentProducts.map((item, index) => (
        <div key={index} className={`grid grid-cols-2 smx:grid-cols-4 border-b p-2 mx-auto`}>
          <div className="flex justify-start">
            <Image
              src={urlFor(item.image?.asset._ref).url() || "/placeholder.svg"}
              alt={item.title}
              className="cursor-pointer w-[70px] h-[70px]"
              width={70}
              height={70}
            />
          </div>
          <p className="text-[17px] flex justify-end smx:justify-start items-center">{item.title}</p>
          <p className="text-[17px] flex justify-start smx:justify-center items-center text-start">{item.price}</p>
          <div className="flex items-center gap-4 justify-end">
            <BiCommentDetail
              className="text-2xl cursor-pointer hover:text-carminePink"
              onClick={() => onViewDetails(item)}
            />
            <FaEdit className="text-2xl cursor-pointer hover:text-carminePink" onClick={() => onEdit(item)} />
            <MdDelete className="text-2xl cursor-pointer hover:text-carminePink" onClick={() => onDelete(item)} />
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProductTable

