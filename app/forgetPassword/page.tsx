"use client"
import {  getAuth, sendPasswordResetEmail } from "firebase/auth"
import { app } from "@/firebase/firebase"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import type React from "react"
import { useState } from "react"
import image from "@/images/Login.png"
import { Inter } from "next/font/google"
import { Poppins } from "next/font/google"
import Link from "next/link"
import { client } from "@/sanity/lib/client"


const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] })
const inters = Inter({ subsets: ["latin"], weight: ["400", "700"] })

const ForgotPassword = () => {
  const router = useRouter()
  const auth = getAuth(app)
  const [email, setEmail] = useState("")
  const [successMsg, setSuccessMsg] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const [errEmail, setErrEmail] = useState<string>("")
    const [errFirebase, setErrFirebase] = useState<string>("")
    


  const emailValidation = (email: string): boolean => {
    return (
      String(email)
        .toLowerCase()
        .match(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/) !== null
    )
  }

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setEmail(e.target.value)
    setErrEmail("")
    setErrFirebase("")
  }

  
  const handleResetPassword = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrEmail("");
    setErrFirebase("");

    if (!email) {
      setErrEmail("Enter your email");
      setIsLoading(false);
      return;
    }

    if (!emailValidation(email)) {
      setErrEmail("Enter a valid email");
      setIsLoading(false);
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccessMsg("Password reset email sent successfully!");
      setEmail("");
      setIsLoading(false);

      const userQuery = `*[_type == "user" && userLoginEmail == $email][0]{_id}`;
      const user = await client.fetch(userQuery, { email });
  
      if (user?._id) {
        await client.patch(user._id).set({ userLoginPassword: "RESET_PENDING" }).commit();
      }
    
      setTimeout(() => {
        router.push("/login");
      }, 5000);
    } catch (error) {
      setErrFirebase("Failed to send reset email. Please try again.");
      setIsLoading(false);
      console.log(error)
    }
  };


  return (
    <div className="max-w-[1305px] my-[60px] w-full h-[781px] 2xl:mx-auto pr-4">
      <div className="top-[200px] left-0 md:flex justify- w-full h-[781px] lg:gap-[129px] overflow-hidden">
        <div className="h-[781px] mdl:w-[805px] hidden md:block w-full bg-[#CBE4E8] content-end items-end overflow-hidden">
          <div className="flex lg:h-[706px] h-full w-full md:opacity-100 opacity-70 lg:w-[700px] lgl:w-[919px] items-end justify-end -ml-10">
            <Image
              src={image || "/placeholder.svg"}
              alt="Login"
              height={706}
              width={805}
              className="h-[706px] w-full lg:w-[919px] -left-[500px]"
            />
          </div>
        </div>
        <form onSubmit={handleResetPassword} className="flex flex-col px-4 lg:px-0 items-center justify-center">
          <div className="md:w-[371px] w-full flex gap-[48px] flex-col h-[531px]">
            <div className="flex flex-col gap-[24px] md:items-start items-center -mt-3">
              <h1 className={`font-medium text-[36px] md:text-start text-center ${inters.className}`}>
                Forgot Password
              </h1>
              <p className={`font-normal text-[16px] ${poppins.className}`}>Enter your email to reset your password</p>
            </div>
            <div className="flex flex-col gap-[40px]">
              <div className="border-b w-full border-b-black opacity-50">
                <input
                  type="text"
                  placeholder="Email"
                  onChange={handleEmail}
                  value={email}
                  className={`outline-none font-normal w-full py-[4px] text-[16px] leadind-[24px] ${poppins.className}`}
                />
              </div>
              <p className="text-red-600 text-xs font-bold flex items-center gap-1.5 -mt-8">
                {errEmail && (
                  <>
                    <span className="italic font-extrabold">!</span>
                    {errEmail}
                  </>
                )}
              </p>
              <p className="text-red-600 text-xs font-bold flex items-center gap-1.5 -mt-8">
                {errFirebase && (
                  <>
                    <span className="italic font-extrabold">!</span>
                    {errFirebase}
                  </>
                )}
              </p>
              <div className="flex flex-col gap-[32px]">
                {successMsg && (
                  <div
                    className={`${poppins.className} mt-4 text-center font-bold uppercase p-2 bg-green-100 text-green-700 rounded`}
                  >
                    {successMsg}
                  </div>
                )}
                <div className="gap-[16px] flex flex-col">
                  <button
                    className={`font-medium text-[16px] ${inters.className} bg-[#DB4444] w-full text-white rounded-[4px] justify-center py-[16px]`}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex justify-center items-center">
                        <Loader2 size={24} className="h-6 w-6 animate-spin" />
                      </span>
                    ) : (
                      "Reset Password"
                    )}
                  </button>
                </div>
                <div className="flex justify-center gap-[4px] items-center">
                  <p className={`font-medium opacity-70 text-[16px] ${poppins.className}`}>Remember your password?</p>
                  <p className={`font-medium opacity-70 text-[16px] border-b border-b-black ${poppins.className}`}>
                    <Link href="/login">Log in</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword

