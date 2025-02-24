"use client";

import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { Poppins } from "next/font/google";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BiCommentDetail } from "react-icons/bi";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

interface Product {
  _id: string;
  tag: string;
  image: {
    asset: {
      _ref: string;
    };
  };
  discountPercentage: string;
  title: string;
  description: string;
  buyingPrice: string;
  profitPercentage: string;
  profitPrice: string;
  price: string;
  stars: string;
  previousPrice: string;
  reviews: string;
}

const ProductList = () => {
  const [productsData, setProductsData] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalType, setModalType] = useState<
    "delete" | "detail" | "edit" | null
  >(null);
  const productsPerPage = 10;

  useEffect(() => {
    fetchProducts();
  }, []);

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
        }`
      );
      setProductsData(products);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredProducts = productsData.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleDelete = async (id: string) => {
    try {
      await client.delete(id);
      setModalType(null);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEdit = async (product: Product) => {
    try {
      await client.patch(product._id).set(product).commit();
      setModalType(null);
      fetchProducts();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const renderModal = () => {
    if (!selectedProduct || !modalType) return null;

    switch (modalType) {
      case "delete":
        return (
          <div
            className={`${poppins.className} fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center`}
          >
            <div className="bg-white p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
              <p>Are you sure you want to delete {selectedProduct.title}?</p>
              <div className="mt-4 flex justify-end gap-2">
                <button
                  className="px-4 py-2 bg-gray-200 rounded"
                  onClick={() => setModalType(null)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded"
                  onClick={() => handleDelete(selectedProduct._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        );
      case "detail":
        return (
          <div
            className={`${poppins.className} fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center`}
          >
            <div className="bg-white p-6 space-y-2  rounded-lg max-w-md w-full">
              <h2 className="text-xl font-bold mb-4">
                {selectedProduct.title}
              </h2>
              <Image
                src={
                  urlFor(selectedProduct.image?.asset._ref).url() ||
                  "/placeholder.svg"
                }
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
              <button
                className="mt-4 px-4 py-2 bg-gray-200 rounded"
                onClick={() => setModalType(null)}
              >
                Close
              </button>
            </div>
          </div>
        );
      case "edit":
        return (
          <div
            className={`${poppins.className} fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center`}
          >
            <div className="bg-white p-6 rounded-lg max-w-md w-full">
              <h2 className="text-xl font-bold mb-4">Edit Product</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleEdit(selectedProduct);
                }}
              >
                <input
                  type="text"
                  value={selectedProduct.title}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      title: e.target.value,
                    })
                  }
                  className="w-full p-2 mb-2 border rounded"
                  placeholder="Title"
                />
                <input
                  type="text"
                  value={selectedProduct.description}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      description: e.target.value,
                    })
                  }
                  className="w-full p-2 mb-2 border rounded"
                  placeholder="Description"
                />
                <input
                  type="text"
                  value={selectedProduct.price}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      price: e.target.value,
                    })
                  }
                  className="w-full p-2 mb-2 border rounded"
                  placeholder="Price"
                />
                <input
                  type="text"
                  value={selectedProduct.previousPrice}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      previousPrice: e.target.value,
                    })
                  }
                  className="w-full p-2 mb-2 border rounded"
                  placeholder="Previous Price"
                />
                <input
                  type="text"
                  value={selectedProduct.discountPercentage}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      discountPercentage: e.target.value,
                    })
                  }
                  className="w-full p-2 mb-2 border rounded"
                  placeholder="Discount Percentage"
                />
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-200 rounded"
                    onClick={() => setModalType(null)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="h-auto py-8">
      <h1 className="font-bold mb-6 text-[28px] sm:text-[36px] tracking-[4px] text-black">
        Products
      </h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`${poppins.className} w-full border-carminePink border rounded-sm outline-carminePink p-3`}
        />
      </div>
      <div className="overflow-x-auto rounded-md border">
        {currentProducts.map((item, index) => (
          <div
            key={index}
            className={`${poppins.className} grid grid-cols-2 smx:grid-cols-4 border-b p-2 mx-auto`}
          >
            <div className="flex justify-start">
              <Image
                src={urlFor(item.image?.asset._ref).url() || "/placeholder.svg"}
                alt={item.title}
                className="cursor-pointer w-[70px] h-[70px]"
                width={70}
                height={70}
              />
            </div>
            <p className="text-[17px] flex justify-end smx:justify-start items-center">
              {item.title}
            </p>
            <p className="text-[17px] flex justify-start smx:justify-center items-center text-start">
              {item.price}
            </p>
            <div className="flex items-center gap-4 justify-end">
              <BiCommentDetail
                className="text-2xl cursor-pointer hover:text-carminePink"
                onClick={() => {
                  setSelectedProduct(item);
                  setModalType("detail");
                }}
              />
              <FaEdit
                className="text-2xl cursor-pointer hover:text-carminePink"
                onClick={() => {
                  setSelectedProduct(item);
                  setModalType("edit");
                }}
              />
              <MdDelete
                className="text-2xl cursor-pointer hover:text-carminePink"
                onClick={() => {
                  setSelectedProduct(item);
                  setModalType("delete");
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-center gap-2">
        {Array.from({
          length: Math.ceil(filteredProducts.length / productsPerPage),
        }).map((_, index) => (
          <button
            className={`${poppins.className} h-[35px] w-[35px] rounded-full cursor-pointer border border-carminePink hover:bg-carminePink hover:text-white font-semibold `}
            key={index}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
      {renderModal()}
    </div>
  );
};

export default ProductList;
