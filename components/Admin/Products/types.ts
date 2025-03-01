export interface AddProductButtonProps {
  onAdd: () => void;
}

export interface PaginationProps {
  totalProducts: number;
  productsPerPage: number;
  paginate: (pageNumber: number) => void;
}


export  interface Product {
    _id: string
    tag: string
    image: {
      asset: {
        _ref: string
      }
    }
    discountPercentage: string
    title: string
    description: string
    buyingPrice: string
    profitPercentage: string
    profitPrice: string
    price: string
    stars: string
    previousPrice: string
    reviews: string
  }
  

 export interface ProductModalProps {
    modalType: "delete" | "detail" | "edit" | "add" | null;
    selectedProduct: Product | null;
    onClose: () => void;
    onDelete: (id: string) => void;
    onEdit: (product: Product) => void;
    onAdd: (product: Omit<Product, "_id">) => void;
  }
  

  export interface ProductSearchProps {
    searchTerm: string
    setSearchTerm: (term: string) => void
}
  

export interface ProductTableProps {
    currentProducts: Product[]
    onViewDetails: (product: Product) => void
    onEdit: (product: Product) => void
    onDelete: (product: Product) => void
  }
  