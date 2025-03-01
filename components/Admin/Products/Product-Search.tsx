import {ProductSearchProps} from './types'

const ProductSearch = ({ searchTerm, setSearchTerm }: ProductSearchProps) => {
  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={`w-full border-carminePink border rounded-sm outline-carminePink p-3`}
      />
    </div>
  )
}

export default ProductSearch

