"use client"

import type { RootState } from "@/redux/store"
import { client } from "@/sanity/lib/client"
import NotLoggedIn from "@/shared/NotLoggedIn"
import { Poppins } from "next/font/google"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import ProductSearch from "./Product-Search"
import ProductTable from "./Product-Table"
import Pagination from "./Pagination"
import ProductModal from "./Product-Modal"
import AddProductButton from "./Add-Product-Button"

export interface Product {
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

const ProductList = () => {
  const [productsData, setProductsData] = useState<Product[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const adminInfo = useSelector((state: RootState) => state.adminSlice.adminInfo)
  const [modalType, setModalType] = useState<"delete" | "detail" | "edit" | "add" | null>(null)
  const productsPerPage = 10

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const products: Product[] = await client.fetch(
        `*[_type == "product"]{
          _id,
          tag,
          image,
          discountPercentage,
          title,
          description,
          buyingPrice,
          profitPercentage,
          profitPrice,
          price,
          previousPrice,
          stars,
          reviews,
        }`,
      )
      setProductsData(products)
    } catch (error) {
      console.error("Error fetching products:", error)
    } 
  }

  const getEmptyProduct = (): Omit<Product, "_id"> => {
    return {
      tag: "",
      image: { asset: { _ref: "" } },
      title: "",
      description: "",
      discountPercentage: "0",
      buyingPrice: "0",
      profitPrice: "0",
      profitPercentage: "0",
      price: "0",
      previousPrice: "0",
      stars: "0",
      reviews: "0",
    }
  }

  if (!adminInfo || !adminInfo.name) {
    return <NotLoggedIn />
  }

  const filteredProducts = productsData.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  const handleDelete = async (id: string) => {
    try {
      await client.delete(id)
      setModalType(null)
      fetchProducts()
    } catch (error) {
      console.error("Error deleting product:", error)
    }
  }

  // This function only updates the local state
  const handleProductChange = (product: Product) => {
    setSelectedProduct(product)
  }

  // This function handles the actual submission to Sanity
  const handleSubmitEdit = async (product: Product) => {
    try {
      await client
        .patch(product._id)
        .set({
          tag: product.tag,
          image: product.image,
          title: product.title,
          description: product.description,
          buyingPrice: product.buyingPrice,
          profitPrice: product.profitPrice,
          profitPercentage: product.profitPercentage,
          price: product.price,
          previousPrice: product.previousPrice,
          discountPercentage: product.discountPercentage,
          stars: product.stars,
          reviews: product.reviews,
        })
        .commit()
      setModalType(null)
      fetchProducts()
    } catch (error) {
      console.error("Error updating product:", error)
    }
  }

  const handleAddProduct = async (productData: Omit<Product, "_id">) => {
    try {
      await client.create({
        _type: "product",
        ...productData,
      })
      setModalType(null)
      fetchProducts()
    } catch (error) {
      console.error("Error adding product:", error)
    }
  }

  return (
    <div className="h-auto py-8">
      <h1 className="font-bold mb-6 text-[28px] sm:text-[36px] tracking-[4px] text-black">Products</h1>

      <ProductSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <AddProductButton
        onAdd={() => {
          setSelectedProduct(getEmptyProduct() as Product)
          setModalType("add")
        }}
      />

      <ProductTable
        currentProducts={currentProducts}
        onViewDetails={(product) => {
          setSelectedProduct(product)
          setModalType("detail")
        }}
        onEdit={(product) => {
          setSelectedProduct(product)
          setModalType("edit")
        }}
        onDelete={(product) => {
          setSelectedProduct(product)
          setModalType("delete")
        }}
      />

      <Pagination
        totalProducts={filteredProducts.length}
        productsPerPage={productsPerPage}
        paginate={paginate}
      />

      <ProductModal
        modalType={modalType}
        selectedProduct={selectedProduct}
        onClose={() => setModalType(null)}
        onDelete={handleDelete}
        onEdit={handleProductChange}
        onSubmitEdit={handleSubmitEdit}
        onAdd={handleAddProduct}
      />
    </div>
  )
}

export default ProductList

