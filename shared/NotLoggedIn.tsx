import { Poppins } from 'next/font/google';
import React from 'react'
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });


const NotLoggedIn = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
    <h2 className={`${poppins.className} text-2xl font-bold text-red-600`}>Not Logged In</h2>
  </div>
  )
}

export default NotLoggedIn