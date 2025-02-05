"use client"
import Wrapper from "@/shared/Wrapper"
import { Inter, Poppins } from "next/font/google"
import Image1 from "@/images/billingDetailsImg1.png"
import Image2 from "@/images/billingDetailsImg2.png"
import Image3 from "@/images/billingDetailsImg3.png"
import Image4 from "@/images/billingDetailsImg4.png"
import Image from "next/image"
import type React from "react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] })
const inter = Inter({ subsets: ["latin"], weight: ["400", "700"] })
import type { RootState } from "@/redux/store"
import { RxCross2 } from "react-icons/rx"
import { deleteItem } from "@/redux/slice"
import { client } from "@/sanity/lib/client"
import { useRouter } from "next/navigation"

type FormData = {
  firstName: string
  companyName: string
  streetAddress: string
  apartment: string
  town: string
  phone: string
  email: string
  saveInfo: boolean
}

type FormErrors = {
  [key in keyof FormData]?: string
}

const BillingDetails = () => {
  const dispatch = useDispatch()
  const [bankError, setBankError] = useState(false)
  const [couponCodeError, setCouponCodeError] = useState(false)
  const [total, setTotal] = useState(0)
  const [formErrors, setFormErrors] = useState<FormErrors>({})
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    companyName: "",
    streetAddress: "",
    apartment: "",
    town: "",
    phone: "",
    email: "",
    saveInfo: false,
  })
  const [isLoading, setIsLoading] = useState(false) // Added loading state

  const products = useSelector((state: RootState) => state.products.products)
  const userInfo = useSelector((state: RootState) => state.products.userInfo)
  const router = useRouter()
  useEffect(() => {
    const totalAmount = products.reduce((acc, item) => {
      const price = (item.price as number) || 0
      return acc + price * item.quantity
    }, 0)
    setTotal(totalAmount)
  }, [products])

  const BankErrorHandler = () => {
    setBankError(true)
    setTimeout(() => {
      setBankError(false)
    }, 1000)
  }

  const CouponCodeErrorHandler = () => {
    setCouponCodeError(true)
    setTimeout(() => {
      setCouponCodeError(false)
    }, 1000)
  }

  const billingForm = [
    { title: "First Name", required: true, field: "firstName" },
    { title: "Company Name", required: false, field: "companyName" },
    { title: "Street Address", required: true, field: "streetAddress" },
    {
      title: "Apartment, floor, etc. (optional)",
      required: false,
      field: "apartment",
    },
    { title: "Town/City", required: true, field: "town" },
    { title: "Phone Number", required: true, field: "phone" },
    { title: "Email Address", required: true, field: "email" },
  ]

  const validateForm = () => {
    const errors: FormErrors = {}
    billingForm.forEach((item) => {
      if (item.required && !formData[item.field as keyof FormData]) {
        errors[item.field as keyof FormData] = `${item.title} is required`
      }
    })
    return errors
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof FormData) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: e.target.value,
    }))

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [field]: "",
    }))
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      saveInfo: e.target.checked,
    }))
  }

  const handleSubmit = async () => {
    const errors = validateForm()
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
    } else {
      setFormErrors({})
      setIsLoading(true) // Add this line to set loading state

      const productsWithImages = await Promise.all(
        products.map(async (product, index) => {
          let productImage

          if (typeof product.img === "string") {
            const response = await fetch(product.img)
            const blob = await response.blob()
            const uploadedImage = await client.assets.upload("image", blob)
            productImage = {
              _type: "image",
              asset: {
                _type: "reference",
                _ref: uploadedImage._id,
              },
            }
          } else if (product.img?.src) {
            const response = await fetch(product.img.src)
            const blob = await response.blob()
            const uploadedImage = await client.assets.upload("image", blob)
            productImage = {
              _type: "image",
              asset: {
                _type: "reference",
                _ref: uploadedImage._id,
              },
            }
          } else {
            productImage = product.img
          }

          return {
            productId: product.id,
            productImage,
            productName: product.title,
            quantity: product.quantity,
            price: product.price,
            totalPrice: product.price && product.price * product.quantity,
            _key: product.id ? `product-${product.id}` : `product-${index}`,
          }
        }),
      )

      // Prepare the order data
      const orderData = {
        _type: "order",
        orderId: `ORD-${Date.now()}`,
        userLoginName: userInfo?.displayName,
        userLoginEmail: userInfo?.email,
        userLoginPassword: userInfo?.password,
        firstName: formData.firstName,
        company: formData.companyName,
        address: formData.streetAddress,
        city: formData.town,
        phone: formData.phone,
        email: formData.email,
        products: productsWithImages,
        totalAmount: total,
        orderStatus: "pending",
        paymentStatus: "pending",
        orderDate: new Date().toISOString(),
        shippingDate: "",
      }

      try {
        const existingOrder = await client.fetch(
          `*[_type == "order" && userLoginEmail == "${userInfo?.email}" && userLoginPassword == "${userInfo?.password}"][0]`,
        )

        if (existingOrder) {
          const updatedOrder = await client
            .patch(existingOrder._id)
            .set({
              products: productsWithImages,
              totalAmount: total,
              firstName: formData.firstName,
              company: formData.companyName,
              address: formData.streetAddress,
              city: formData.town,
              phone: formData.phone,
              email: formData.email,
              orderStatus: "pending",
              paymentStatus: "pending",
              orderDate: new Date().toISOString(),
            })
            .commit()
          console.log("Order updated successfully:", updatedOrder)
        } else {
          const result = await client.create(orderData)
          console.log("Order created successfully:", result)
        }
        router.push("/orders/ordersuccess")
      } catch (error) {
        console.error("Error occurred while updating or creating the order:", error)
      } finally {
        setIsLoading(false) // Add this line to reset loading state
      }
    }
  }

  if (products.length === 0) {
    return (
      <Wrapper className="py-12">
        <h2 className={`${inter.className} text-[36px] tracking-[4px] leading-[30px] font-medium text-black`}>
          Your Cart is Empty
        </h2>
      </Wrapper>
    )
  }

  return (
    <Wrapper className="py-12">
      <h2
        className={`${inter.className} text-[36px] tracking-[4px] px-4 xs:px-6 sm:px-8 leading-[30px] font-medium text-black`}
      >
        Billing Details
      </h2>
      <div className="flex flex-col lg:flex-row justify-between items-center py-10">
        <div className="h-auto w-full lg:w-[470px] px-4 xs:px-6 sm:px-8 flex flex-col gap-6">
          {billingForm.map((item, index) => (
            <div key={index} className="w-full flex flex-col gap-2 h-auto ">
              <p className={`${poppins.className} text-[16px] leading-[24px] opacity-40 text-black`}>
                {item.title}{" "}
                {item.required && (
                  <span className={`${poppins.className} text-[16px] leading-[24px] text-carminePink opacity-70`}>
                    *
                  </span>
                )}
              </p>
              <input
                type="text"
                value={formData[item.field as keyof FormData] as string}
                onChange={(e) => handleInputChange(e, item.field as keyof FormData)}
                className={`${poppins.className} h-[50px] rounded-[4px] bg-secondary outline-none px-3`}
              />
              {formErrors[item.field as keyof FormData] && (
                <p className={`${poppins.className} text-[14px] text-red-500`}>
                  {formErrors[item.field as keyof FormData]}
                </p>
              )}
            </div>
          ))}
          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              checked={formData.saveInfo}
              onChange={handleCheckboxChange}
              className="w-6 h-6 bg-white border-2 border-gray-400 rounded-md checked:bg-red-300"
            />
            <p className={`${poppins.className} font-normal text-[14px] leading-[24px] text-black`}>
              Save this information for faster check-out next time
            </p>
          </div>
        </div>
        {/* Billing Summary and Payment */}
        <div className="h-auto lg:h-[600px] w-full lg:w-[527px] items-end mt-8 lg:mt-0 px-4 xs:px-6 sm:px-8 flex flex-col gap-8">
          <div className="w-full smx:w-[425px]">
            <div className="flex flex-col gap-8 overflow-y-scroll custom-scrollbar h-[140px]">
              {products.map((item, index) => (
                <div key={index} className="flex items-center flex-row pr-2 justify-between">
                  <div className="flex gap-3 items-center relative">
                    <Image
                      src={item.img || "/placeholder.svg"}
                      alt="Product Image"
                      className="h-[54px] w-[54px]"
                      width={54}
                      height={54}
                    />
                    <span
                      onClick={() => dispatch(deleteItem(item.id))}
                      className="h-[24px] w-[24px] rounded-full text-white cursor-pointer text-[14px] absolute flex items-center justify-center top-0.5 bg-carminePink"
                    >
                      <RxCross2 />
                    </span>
                    <p className={`${poppins.className} text-black text-[16px] font-normal`}>{item.title}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <p className={`${poppins.className} text-black text-[16px] font-normal`}>${item.price}</p>
                    <p className={`${poppins.className} text-black text-[16px] font-normal`}>({item.quantity})</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Total and Payment Methods */}
          <div className="w-full smx:w-[425px] h-[140px] flex flex-col justify-between">
            <div className="h-[24px] w-full flex justify-between">
              <p className={`${poppins.className} text-black text-[16px] font-normal`}>Subtotal:</p>
              <p className={`${poppins.className} text-black text-[16px] font-normal`}>${total}/=</p>
            </div>
            <span className="h-0.5 w-full bg-gray-300" />
            <div className="h-[24px] w-full flex justify-between">
              <p className={`${poppins.className} text-black text-[16px] font-normal`}>Shipping:</p>
              <p className={`${poppins.className} text-black text-[16px] font-normal`}>Free</p>
            </div>
            <span className="h-0.5 w-full bg-gray-300" />
            <div className="h-[24px] w-full flex justify-between">
              <p className={`${poppins.className} text-black text-[16px] font-normal`}>Total:</p>
              <p className={`${poppins.className} text-black text-[16px] font-normal`}>${total}/=</p>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="w-full smx:w-[425px] h-[38px] flex flex-col">
            <div className="w-full smx:w-[425px] h-[28px] flex justify-between">
              <div className="flex gap-3 items-center">
                <input type="radio" name="transfer" className="h-[24px] w-[24px]" onClick={BankErrorHandler} />
                <p className={`${poppins.className} text-black text-[16px] font-normal`}>Bank</p>
              </div>
              <div className="flex w-[198px] items-center justify-between">
                <Image src={Image1 || "/placeholder.svg"} alt="Image1" className="w-[46px] h-[50px] cursor-pointer" />
                <Image src={Image2 || "/placeholder.svg"} alt="Image1" className="w-[39px] h-[26px] cursor-pointer" />
                <Image src={Image3 || "/placeholder.svg"} alt="Image1" className="w-[39px] h-[26px] cursor-pointer" />
                <Image src={Image4 || "/placeholder.svg"} alt="Image1" className="w-[42px] h-[50px] cursor-pointer" />
              </div>
            </div>
            {bankError && (
              <p className={`${poppins.className} mt-0.5 text-black text-[16px] text-center font-normal`}>
                Bank Transfer Not Available
              </p>
            )}
          </div>
          <div className="flex items-center justify-between w-[174px] h-[24px]">
            <input type="radio" className="h-[24px] w-[24px]" name="transfer" />
            <p className={`${poppins.className} text-black text-[16px] font-normal`}>Cash on delivery</p>
          </div>

          {/* Coupon Code */}
          <div className="w-[527px] h-[66px] flex flex-col items-center justify-between">
            <div className="smx:flex justify-between w-full hidden h-[56px]">
              <input
                type="text"
                className={`${poppins.className} border border-black rounded-[4px] w-[300px] h-[56px] outline-none text-black text-[16px] font-normal placeholder:opacity-50 px-4`}
                placeholder="Coupon Code"
              />
              <button
                onClick={CouponCodeErrorHandler}
                className={`${poppins.className} w-[211px] h-[56px] py-4 px-12 rounded-[4px] text-primary bg-carminePink`}
              >
                Apply Coupon
              </button>
            </div>
            {couponCodeError && (
              <p className={`${poppins.className} mt-0.5 text-black text-[16px] text-center font-normal`}>
                Invalid Coupon Code
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="w-full flex justify-end mt-4">
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className={`${poppins.className} w-[200px] h-[56px] py-4 rounded-[4px] text-white bg-carminePink ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                </div>
              ) : (
                "Place Order"
              )}
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default BillingDetails

