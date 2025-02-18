import { Dialog } from "@headlessui/react"
import { Poppins } from "next/font/google"

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] })

interface CancelOrderModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export default function CancelOrderModal({ isOpen, onClose, onConfirm }: CancelOrderModalProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center  justify-center p-4">
        <Dialog.Panel className={`w-full max-w-sm rounded bg-white h-[200px] p-6 ${poppins.className}`}>
          <Dialog.Title className="text-lg font-medium mb-4">Cancel Order</Dialog.Title>
          <p className="mb-4">Are you sure you want to cancel this order? This action cannot be undone.</p>
          <div className="flex justify-end gap-4">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              No, keep order
            </button>
            <button
              onClick={() => {
                onConfirm()
                onClose()
              }}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
            >
              Yes, cancel order
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}
