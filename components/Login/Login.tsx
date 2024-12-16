"use client";
import Image from "next/image";
import React, { useState } from "react";
import { app } from "@/firebase/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import image from "@/images/Login.png";
import { Inter } from 'next/font/google';
import { Poppins } from 'next/font/google';
import Link from "next/link";
import { setUserInfo } from "@/redux/slice";
import { useDispatch } from "react-redux";
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });
const inters = Inter({ subsets: ["latin"], weight: ["400", "700"] });
const LogIn = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errEmail, setErrEmail] = useState<string>("");
  const [userErrEmail, setUserErrEmail] = useState<string>("");
  const [errPassword, setErrPassword] = useState<string>("");
  const [userErrPassword, setUserErrPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [successMsg, setSuccessMsg] = useState<string>("");
  const [errMessage, setErrMessage] = useState<string>("");

  const emailValidation = (email: string): boolean => {
    return (
      String(email)
        .toLowerCase()
        .match(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/) !== null
    );
  };
  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setErrEmail("");
    setUserErrEmail("");
    setErrMessage("");
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setErrPassword("");
    setUserErrPassword("");
    setErrMessage("");
  };

  const dispatch = useDispatch();
  const signInUser = (event: any) => {
    event.preventDefault();

    setErrEmail("");
    setErrPassword("");
    setErrMessage("");
    setSuccessMsg("");

    // Validate email
    if (!email) {
      setErrEmail("Enter your email");
      return;
    }
    if (!emailValidation(email)) {
      setErrEmail("Enter a valid email");
      return;
    }

    // Validate password
    if (!password) {
      setErrPassword("Enter your password");
      return;
    }
    if (password.length < 6) {
      setErrPassword("Passwords must be at least 6 characters.");
      return;
    }

    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, email, password)
      .then((value) => {
        console.log("User signed in successfully!");
        const user = value.user;
        dispatch(
          setUserInfo({
            id: user?.uid,
            email: user?.email,
            displayName: user?.displayName,
            photoURL: user?.photoURL,
          })
        );
        setLoading(false);
        setSuccessMsg("Logged In Successfully!");
        setTimeout(() => {
          router.push("/");
        }, 3000);
      })

      .catch((error) => {
        setLoading(false);
        const errorCode = error.code;
        console.error("Error signing in with email and password:", error);

        if (errorCode === "auth/invalid-email") {
          setErrEmail("Invalid email");
        } else if (errorCode === "auth/wrong-password") {
          setErrPassword("Invalid password");
        } else if (errorCode === "auth/invalid-credential") {
          setErrMessage("Invalid Email and Password");
        }
      });
  };

  return (
    <div className="max-w-[1305px] my-[60px]  w-full h-[781px] 2xl:mx-auto">
      <div className="top-[200px] left-0 md:flex justify- w-full h-[781px]  lg:gap-[129px] overflow-hidden">
        <div className="h-[781px] md:w-[805px] hidden md:block w-full  bg-[#CBE4E8] content-end items-end overflow-hidden">
          <div className=" flex lg:h-[706px] h-full w-full md:opacity-100  opacity-70 lg:w-[700px] lgl:w-[919px] items-end justify-end -ml-10 ">
            <Image
              src={image}
              alt="Login"
              height={706}
              width={805}
              className="h-[706px] w-full lg:w-[919px] -left-[500px]"
            />
          </div>
        </div>
        <div className="flex flex-col px-4  items-center justify-center">
          <div className="md:w-[371px] w-full flex gap-[48px] flex-col  h-[531px] ">
            <div className="flex flex-col gap-[24px] md:items-start items-center -mt-3">
              <h1
                className={`font-medium text-[36px] md:text-start text-center ${inters.className}`}
              >
                Log in to Exclusive
              </h1>
              <p className={`font-normal text-[16px] ${poppins.className}`}>
                Enter your details below
              </p>
            </div>
            <div className="flex flex-col gap-[40px]">
              <form onSubmit={signInUser} className="flex flex-col gap-[40px]">
                <div className="border-b w-full border-b-black opacity-50">
                  <input
                    type="text"
                    onChange={handleEmail}
                    value={email}
                    placeholder="Email or Phone Number"
                    className={`outline-none font-normal w-full py-[4px] text-[16px] leading-[24px] ${poppins.className}`}
                  />
                </div>
                {errEmail && (
                  <p className="text-red-600 text-xs -mt-8 font-bold flex items-center gap-1.5 ">
                    <span className="italic font-extrabold">!</span>
                    {errEmail}
                  </p>
                )}
                {userErrEmail && (
                  <p className="text-red-600 text-xs -mt-8 font-bold flex items-center gap-1.5 ">
                    <span className="italic font-extrabold">!</span>
                    {userErrEmail}
                  </p>
                )}
                <div className="border-b w-full border-b-black opacity-50">
                  <input
                    type="password"
                    placeholder="Password"
                    onChange={handlePassword}
                    value={password}
                    className={`font-normal text-[16px] outline-none w-full py-[4px] leading-[24px] ${poppins.className}`}
                  />
                </div>
                {errPassword && (
                  <p className="text-red-600 text-xs -mt-8 font-bold flex items-center gap-1.5 ">
                    <span className="italic font-extrabold">!</span>
                    {errPassword}
                  </p>
                )}
                {userErrPassword && (
                  <p className="text-red-600 text-xs -mt-8 font-bold flex items-center gap-1.5 ">
                    <span className="italic font-extrabold">!</span>
                    {userErrPassword}
                  </p>
                )}
                <div className="flex flex-col gap-[32px]">
                  {errMessage && (
                    <p className="text-red-600 text-[19px] text-center -mt-4 font-bold flex items-center gap-1.5 ">
                      <span className="italic font-extrabold">!</span>
                      {errMessage}
                    </p>
                  )}
                  {successMsg && (
                  <div className={`${poppins.className} mt-4 text-center font-bold uppercase p-2 bg-green-100 text-green-700 rounded`}>
                    {successMsg}
                  </div>
                )}
                  <div className="gap-[16px] flex items-center justify-between">
                    <button
                      type="submit"
                      className={`font-medium text-[16px] ${inters.className} bg-[#DB4444] w-[143px] text-white rounded-[4px] justify-center py-[16px]`}
                    >
                      Log In
                    </button>
                    <button
                      type="button"
                      className={`font-normal text-[16px] ${inters.className} text-[#DB4444]`}
                    >
                      Forget Password?
                    </button>
                  </div>
                  <div className="flex justify-center gap-[4px] items-center">
                    <p
                      className={`font-medium opacity-70 text-[16px] ${poppins.className}`}
                    >
                      Create an account?
                    </p>
                    <p
                      className={`font-medium opacity-70 text-[16px] border-b border-b-black ${poppins.className}`}
                    >
                      <Link href="/signup">Sign Up</Link>
                    </p>
                  </div>
                </div>
                
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;

