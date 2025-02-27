"use client";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { app } from "@/firebase/firebase";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import image from "@/images/Login.png";
import { Inter } from "next/font/google";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { client } from "@/sanity/lib/client";


const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });
const inters = Inter({ subsets: ["latin"], weight: ["400", "700"] });
const SignUp = () => {
  const router = useRouter();
  const auth = getAuth(app);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMsg, setSuccessMsg] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [errUsername, setErrUserName] = useState<string>("");
  const [errEmail, setErrEmail] = useState<string>("");
  const [errPassword, setErrPassword] = useState<string>("");
  const [errFirebase, setErrFirebase] = useState<string>("");

  const handleUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setName(e.target.value);
    setErrUserName("");
  };

  const emailValidation = (email: string): boolean => {
    return (
      String(email)
        .toLowerCase()
        .match(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/) !== null
    );
  };

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setEmail(e.target.value);
    setErrEmail("");
    setErrFirebase("");
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPassword(e.target.value);
    setErrPassword("");
  };

  const handleRegistration = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrUserName("");
    setErrEmail("");
    setErrPassword("");
    setErrFirebase("");

    let hasError = false;

    if (!name) {
      setErrUserName("Enter your name");
      setIsLoading(false);
      hasError = true;
    } else if (name.length > 15) {
      setErrUserName("Name should not exceed 15 characters.");
      setIsLoading(false);
      hasError = true;
    }

    if (!email) {
      setErrEmail("Enter your email");
      hasError = true;
      setIsLoading(false);
    } else if (!emailValidation(email)) {
      setIsLoading(false);
      setErrEmail("Enter a valid email");
      hasError = true;
    } else if (email.length > 25) {
      setIsLoading(false);
      setErrEmail("Email should not exceed 25 characters.");
      hasError = true;
    }

    if (!password) {
      setErrPassword("Enter your password");
      hasError = true;
      setIsLoading(false);
    } else if (password.length < 7) {
      setErrPassword("Passwords must be at least 7 characters.");
      hasError = true;
      setIsLoading(false);
    } else if (password.length > 15) {
      setErrPassword("Passwords must not exceed 15 characters.");
      hasError = true;
      setIsLoading(false);
    }

    if (!hasError) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;

          console.log(user)
          if (auth.currentUser) {
            updateProfile(auth.currentUser, {
              displayName: name,
            })
              
          }

          client.create({
            _type: 'user',
            userLoginName: name,
            userLoginEmail: email,
            userLoginPassword: password, 
          })
            

          setIsLoading(false);
          setSuccessMsg("Account created successfully!");

          setName("");
          setEmail("");
          setPassword("");
          setTimeout(() => {
            router.push("/login");
          }, 5000);
        })
        .catch((error) => {
          const errorCode = error.code;
          setIsLoading(false);
          if (errorCode.includes("auth/email-already-in-use")) {
            setErrFirebase("Email already in use. Try another one");
          }
        });
    }
  };
  return (
    <div className="max-w-[1305px] my-[60px]  w-full h-[781px] 2xl:mx-auto pr-4">
      <div className="top-[200px] left-0 md:flex justify- w-full h-[781px]  lg:gap-[129px] overflow-hidden">
        <div className="h-[781px] mdl:w-[805px] hidden md:block w-full  bg-[#CBE4E8] content-end items-end overflow-hidden">
          <div className=" flex lg:h-[706px] h-full w-full md:opacity-100  opacity-70 lg:w-[700px] lgl:w-[919px]  items-end justify-end -ml-10 ">
            <Image
              src={image}
              alt="Login"
              height={706}
              width={805}
              className="h-[706px] w-full lg:w-[919px] -left-[500px]"
            />
          </div>
        </div>
        <form
          onSubmit={handleRegistration}
          className="flex flex-col px-4 lg:px-0 items-center justify-center"
        >
          <div className="md:w-[371px] w-full flex gap-[48px] flex-col  h-[531px] ">
            <div className="flex flex-col gap-[24px] md:items-start items-center -mt-3">
              <h1
                className={`font-medium text-[36px] md:text-start text-center ${inters.className}`}
              >
                Create an account
              </h1>
              <p className={`font-normal text-[16px] ${poppins.className}`}>
                Enter your details below
              </p>
            </div>
            <div className="flex flex-col gap-[40px]">
              <div className="border-b w-full border-b-black opacity-50">
                <input
                  type="text"
                  placeholder="Name"
                  onChange={handleUserName}
                  value={name}
                  className={`font-normal outline-none text-[16px]  w-full py-[4px] leadind-[24px] ${poppins.className}`}
                />
              </div>
              <p className="text-red-600 text-xs font-bold flex items-center gap-1.5 -mt-8">
                {errUsername && (
                  <>
                    <span className="italic font-extrabold">!</span>
                    {errUsername}
                  </>
                )}
              </p>
              <div className=" border-b w-full border-b-black opacity-50">
                <input
                  type="text"
                  placeholder="Email or Phone Number"
                  onChange={handleEmail}
                  value={email}
                  className={`outline-none font-normal  w-full  py-[4px] text-[16px] leadind-[24px] ${poppins.className}`}
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
              <div className="border-b w-full border-b-black opacity-50">
                <input
                  type="password"
                  placeholder="Password"
                  onChange={handlePassword}
                  value={password}
                  className={`font-normal text-[16px] outline-none w-full py-[4px] leadind-[24px] ${poppins.className}`}
                />
              </div>
              <p className="text-red-600 text-xs font-bold flex items-center gap-1.5 -mt-8">
                {errPassword && (
                  <>
                    <span className="italic font-extrabold">!</span>
                    {errPassword}
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
                <div className="gap-[16px] flex flex-col ">
                  <button
                    className={`font-medium text-[16px] ${inters.className} bg-[#DB4444] w-full text-white rounded-[4px] justify-center py-[16px]`}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                      
                        <span className="flex justify-center items-center">
                          <Loader2 size={24}  className=" h-6 w-6 animate-spin"/>
                       </span>
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </button>
                </div>
                <div className="flex justify-center gap-[4px] items-center ">
                  <p
                    className={`font-medium opacity-70 text-[16px] ${poppins.className}`}
                  >
                    Already have account?
                  </p>
                  <p
                    className={`font-medium opacity-70 text-[16px] border-b border-b-black ${poppins.className}`}
                  >
                    <Link href="/login">Log in</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
