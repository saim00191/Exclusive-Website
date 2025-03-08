"use client"
import { Poppins } from "next/font/google"
import type React from "react"
import type { FormData, FormErrors } from "./Checkout"

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] })

interface BillingFormProps {
  formData: FormData
  setFormData: React.Dispatch<React.SetStateAction<FormData>>
  formErrors: FormErrors
  setFormErrors: React.Dispatch<React.SetStateAction<FormErrors>>
}

const BillingForm = ({ formData, setFormData, formErrors, setFormErrors }: BillingFormProps) => {
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

  return (
    <div className="h-auto w-full lg:w-[470px] px-4 xs:px-6 sm:px-8 flex flex-col gap-6">
      {billingForm.map((item, index) => (
        <div key={index} className="w-full flex flex-col gap-2 h-auto ">
          <p className={`${poppins.className} text-[16px] leading-[24px] opacity-40 text-black`}>
            {item.title}{" "}
            {item.required && (
              <span className={`${poppins.className} text-[16px] leading-[24px] text-carminePink opacity-70`}>*</span>
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
  )
}

export default BillingForm

