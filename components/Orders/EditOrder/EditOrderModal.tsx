"use client"

import type React from "react"

import { useState } from "react"
import { Dialog } from "@headlessui/react"
import { Poppins } from "next/font/google"


const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] })

interface EditDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  field: string
  value: string
  onUpdate: (field: string, value: string) => void
}

export default function EditDetailsModal({ isOpen, onClose, field, value, onUpdate }: EditDetailsModalProps) {
  const [inputValue, setInputValue] = useState(value)
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (field === "email" && !inputValue.includes("@")) {
      setError("Email must include @")
      return
    }

    if (field === "phone" && inputValue.length !== 11) {
      setError("Phone number must be 11 digits")
      return
    }

    if (field === "address" && inputValue.trim().length < 10) {
      return setError("Address must be at least 10 characters long");
    }


    if (field === "city" && inputValue.trim().length < 5) {
      return setError("City must be at least 5 characters long");
    }

    onUpdate(field, inputValue)
    onClose()
    setInputValue("")
  }

  const handleClose = () => {
    setError("")
    onClose()
  }
    
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30 " aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-sm rounded bg-white p-6">
          <Dialog.Title className={`${poppins.className} text-lg font-medium mb-4`}>Edit {field}</Dialog.Title>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value)
                setError("")
              }}
              className={`${poppins.className} w-full p-2 border rounded mb-4`}
            />
            {error && <p className={`${poppins.className} text-red-500 mb-4`}>{error}</p>}
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={handleClose}
                className={`${poppins.className} px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-carminePink hover:text-white`}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`${poppins.className} px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700`}
              >
                Save
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}

