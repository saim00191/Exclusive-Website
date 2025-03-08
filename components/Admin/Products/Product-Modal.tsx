"use client"

import { urlFor } from "@/sanity/lib/image"
import { client } from "@/sanity/lib/client"
import Image from "next/image"
import  { Product } from "./types"
import { useCallback, useState, useRef } from "react"
import { ImagePlus, X } from "lucide-react"

interface ProductModalProps {
  modalType: "delete" | "detail" | "edit" | "add" | null
  selectedProduct: Product | null
  onClose: () => void
  onDelete: (id: string) => void
  onEdit: (product: Product) => void
  onSubmitEdit: (product: Product) => void
  onAdd: (product: Omit<Product, "_id">) => void
}

const ProductModal = ({
  modalType,
  selectedProduct,
  onClose,
  onDelete,
  onEdit,
  onSubmitEdit,
  onAdd,
}: ProductModalProps) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = useCallback(
    async (file: File) => {
      try {
        setIsUploading(true)

        // Upload image to Sanity
        const imageAsset = await client.assets.upload("image", file)

        if (selectedProduct && modalType === "add") {
          onEdit({
            ...selectedProduct,
            image: { asset: { _ref: imageAsset._id } },
          })
        }

        // Set preview
        setUploadedImage(URL.createObjectURL(file))
      } catch (error) {
        console.error("Error uploading image:", error)
      } finally {
        setIsUploading(false)
      }
    },
    [modalType, onEdit, selectedProduct],
  )

  const handlePaste = useCallback(
    async (e: ClipboardEvent) => {
      const items = e.clipboardData?.items
      if (!items) return

      for (const item of items) {
        if (item.type.indexOf("image") === 0) {
          const file = item.getAsFile()
          if (file) {
            await handleImageUpload(file)
          }
          break
        }
      }
    },
    [handleImageUpload],
  )

  // Add paste event listener
  useCallback(() => {
    if (modalType === "add") {
      document.addEventListener("paste", handlePaste)
      return () => document.removeEventListener("paste", handlePaste)
    }
  }, [modalType, handlePaste])

  if (!selectedProduct || !modalType) return null

  switch (modalType) {
    case "delete":
      return (
        <div className={` fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center`}>
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p>Are you sure you want to delete {selectedProduct.title}?</p>
            <div className="mt-4 flex justify-end gap-2">
              <button className="px-4 py-2 bg-gray-200 rounded" onClick={onClose}>
                Cancel
              </button>
              <button className="px-4 py-2 bg-red-500 text-white rounded" onClick={() => onDelete(selectedProduct._id)}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )
    case "detail":
      return (
        <div className={` fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center`}>
          <div className="bg-white p-6 space-y-2  rounded-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">{selectedProduct.title}</h2>
            <Image
              src={urlFor(selectedProduct.image?.asset._ref).url() || "/placeholder.svg"}
              alt={selectedProduct.title}
              width={200}
              height={200}
              className="mb-4 mx-auto"
            />
            <p>
              <strong>Description:</strong>{" "}
              {selectedProduct.description.length > 100
                ? selectedProduct.description.substring(0, 150) + "..."
                : selectedProduct.description}
            </p>
            <p>
              <strong>Buying Price:</strong> {selectedProduct.buyingPrice}
            </p>
            <p>
              <strong>Profit Price:</strong> {selectedProduct.profitPrice}
            </p>
            <p>
              <strong>Profit Percentage:</strong> {selectedProduct.profitPercentage}
            </p>
            <p>
              <strong>Price:</strong> {selectedProduct.price}
            </p>
            <p>
              <strong>Previous Price:</strong> {selectedProduct.previousPrice}
            </p>
            <p>
              <strong>Discount:</strong> {selectedProduct.discountPercentage}
            </p>
            <p>
              <strong>Stars:</strong> {selectedProduct.stars}
            </p>
            <p>
              <strong>Reviews:</strong> {selectedProduct.reviews}
            </p>
            <button className="mt-4 px-4 py-2 bg-gray-200 rounded" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      )
    case "edit":
      return (
        <div className={` fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center`}>
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Edit Product</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                onSubmitEdit(selectedProduct)
              }}
            >
              <input
                type="text"
                value={selectedProduct.title}
                onChange={(e) => {
                  onEdit({
                    ...selectedProduct,
                    title: e.target.value,
                  })
                }}
                className="w-full p-2 mb-2 border rounded"
                placeholder="Title"
              />
              <input
                type="text"
                value={selectedProduct.description}
                onChange={(e) => {
                  onEdit({
                    ...selectedProduct,
                    description: e.target.value,
                  })
                }}
                className="w-full p-2 mb-2 border rounded"
                placeholder="Description"
              />
              <input
                type="text"
                value={selectedProduct.price}
                onChange={(e) => {
                  onEdit({
                    ...selectedProduct,
                    price: e.target.value,
                  })
                }}
                className="w-full p-2 mb-2 border rounded"
                placeholder="Price"
              />
              <input
                type="text"
                value={selectedProduct.previousPrice}
                onChange={(e) => {
                  onEdit({
                    ...selectedProduct,
                    previousPrice: e.target.value,
                  })
                }}
                className="w-full p-2 mb-2 border rounded"
                placeholder="Previous Price"
              />
              <input
                type="text"
                value={selectedProduct.discountPercentage}
                onChange={(e) => {
                  onEdit({
                    ...selectedProduct,
                    discountPercentage: e.target.value,
                  })
                }}
                className="w-full p-2 mb-2 border rounded"
                placeholder="Discount Percentage"
              />
              <div className="flex justify-end gap-2 mt-4">
                <button type="button" className="px-4 py-2 bg-gray-200 rounded" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )
    case "add":
      return (
        <div
          className={` fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto`}
        >
          <div className="bg-white p-6 rounded-lg max-w-md w-full my-8">
            <h2 className="text-xl font-bold mb-4">Add New Product</h2>
            <form
              onSubmit={async (e) => {
                e.preventDefault()
                if (!selectedProduct.image?.asset._ref) {
                  alert("Please upload an image")
                  return
                }
                onAdd(selectedProduct as Omit<Product, "_id">)
              }}
              className="max-h-[70vh] overflow-y-auto pr-2"
            >
              <div className="grid gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Product Image</label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md relative">
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          handleImageUpload(file)
                        }
                      }}
                    />

                    {uploadedImage || selectedProduct.image?.asset._ref ? (
                      <div className="relative w-full aspect-square">
                        <Image
                          src={uploadedImage || urlFor(selectedProduct.image?.asset._ref).url()}
                          alt="Product preview"
                          fill
                          className="object-cover rounded-md"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setUploadedImage(null)
                            onEdit({
                              ...selectedProduct,
                              image: { asset: { _ref: "" } },
                            })
                          }}
                          className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-1 text-center">
                        <ImagePlus className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
                          >
                            <span>Upload a file</span>
                          </button>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                      </div>
                    )}

                    {isUploading && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-md">
                        <div className="text-white">Uploading...</div>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Tag</label>
                  <input
                    type="text"
                    value={selectedProduct.tag}
                    onChange={(e) => {
                      onEdit({
                        ...selectedProduct,
                        tag: e.target.value,
                      })
                    }}
                    className="w-full p-2 border rounded"
                    placeholder="Tag (e.g., new, sale)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Title</label>
                  <input
                    type="text"
                    value={selectedProduct.title}
                    onChange={(e) => {
                      onEdit({
                        ...selectedProduct,
                        title: e.target.value,
                      })
                    }}
                    className="w-full p-2 border rounded"
                    placeholder="Product Title"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea
                    value={selectedProduct.description}
                    onChange={(e) => {
                      onEdit({
                        ...selectedProduct,
                        description: e.target.value,
                      })
                    }}
                    className="w-full p-2 border rounded"
                    placeholder="Product Description"
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Buying Price</label>
                  <input
                    type="text"
                    value={selectedProduct.buyingPrice}
                    onChange={(e) => {
                      onEdit({
                        ...selectedProduct,
                        buyingPrice: e.target.value,
                      })
                    }}
                    className="w-full p-2 border rounded"
                    placeholder="Buying Price"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Profit Price</label>
                  <input
                    type="text"
                    value={selectedProduct.profitPrice}
                    onChange={(e) => {
                      onEdit({
                        ...selectedProduct,
                        profitPrice: e.target.value,
                      })
                    }}
                    className="w-full p-2 border rounded"
                    placeholder="Profit Price"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Profit Percentage</label>
                  <input
                    type="text"
                    value={selectedProduct.profitPercentage}
                    onChange={(e) => {
                      onEdit({
                        ...selectedProduct,
                        profitPercentage: e.target.value,
                      })
                    }}
                    className="w-full p-2 border rounded"
                    placeholder="Profit Percentage"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Selling Price</label>
                  <input
                    type="text"
                    value={selectedProduct.price}
                    onChange={(e) => {
                      onEdit({
                        ...selectedProduct,
                        price: e.target.value,
                      })
                    }}
                    className="w-full p-2 border rounded"
                    placeholder="Selling Price"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Previous Price</label>
                  <input
                    type="text"
                    value={selectedProduct.previousPrice}
                    onChange={(e) => {
                      onEdit({
                        ...selectedProduct,
                        previousPrice: e.target.value,
                      })
                    }}
                    className="w-full p-2 border rounded"
                    placeholder="Previous Price"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Discount Percentage</label>
                  <input
                    type="text"
                    value={selectedProduct.discountPercentage}
                    onChange={(e) => {
                      onEdit({
                        ...selectedProduct,
                        discountPercentage: e.target.value,
                      })
                    }}
                    className="w-full p-2 border rounded"
                    placeholder="Discount Percentage"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Stars Rating</label>
                  <input
                    type="text"
                    value={selectedProduct.stars}
                    onChange={(e) => {
                      onEdit({
                        ...selectedProduct,
                        stars: e.target.value,
                      })
                    }}
                    className="w-full p-2 border rounded"
                    placeholder="Stars (1-5)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Reviews Count</label>
                  <input
                    type="text"
                    value={selectedProduct.reviews}
                    onChange={(e) => {
                      onEdit({
                        ...selectedProduct,
                        reviews: e.target.value,
                      })
                    }}
                    className="w-full p-2 border rounded"
                    placeholder="Number of Reviews"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <button type="button" className="px-4 py-2 bg-gray-200 rounded" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-carminePink text-white rounded" disabled={isUploading}>
                  {isUploading ? "Uploading..." : "Save Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )
    default:
      return null
  }
}

export default ProductModal

