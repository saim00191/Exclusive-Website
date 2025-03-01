import {PaginationProps} from './types'

const Pagination = ({ totalProducts, productsPerPage, paginate }: PaginationProps) => {
  return (
    <div className="mt-4 flex justify-center gap-2">
      {Array.from({
        length: Math.ceil(totalProducts / productsPerPage),
      }).map((_, index) => (
        <button
          className={`h-[35px] w-[35px] rounded-full cursor-pointer border border-carminePink hover:bg-carminePink hover:text-white font-semibold `}
          key={index}
          onClick={() => paginate(index + 1)}
        >
          {index + 1}
        </button>
      ))}
    </div>
  )
}

export default Pagination

