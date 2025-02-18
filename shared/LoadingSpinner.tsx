import type React from "react"
const LoadingSpinner: React.FC = () => {
  return (
    <div className="w-full h-full flex justify-center items-center col-span-full py-8">
      <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-red-500"></div>
    </div>
  )
}

export default LoadingSpinner

