"use client"

import React, { useState } from "react";
import { Poppins } from "next/font/google";
import { client } from "@/sanity/lib/client";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import toast from "react-hot-toast";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

const Contact = () => {
  const userInfo = useSelector((state: RootState) => state.products.userInfo);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Only proceed if userInfo exists
    if (!userInfo) {
      toast.error("You must be logged in to send a message.");
      setIsLoading(false);
      return;
    }

    try {
      const doc = {
        _type: "inbox",
        userLoginName: userInfo?.displayName,
        userLoginEmail: userInfo?.email,
        userLoginPassword: userInfo?.password,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        date: new Date().toISOString(),
      };

      const delay = new Promise((resolve) => setTimeout(resolve, 2000));
      await Promise.all([delay, client.create(doc)]);

      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to send message.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row container gap-5 py-14">
      {/* Left Panel */}
      <div className="flex justify-center h-auto lg:h-[457px]  w-full lg:w-[340px] items-center">
        <div className="w-full lg:w-[270px] h-auto lg:h-[366px] flex flex-col gap-[32px]">
          <div className="flex flex-col gap-[24px]">
            <div className="flex gap-[16px] items-center">
              <div className="bg-[#DB4444] h-[40px] w-[40px] flex items-center justify-center rounded-full">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.55423 5.24L6.17123 1.335C5.78123 0.885 5.06623 0.887 4.61323 1.341L1.83123 4.128C1.00323 4.957 0.766232 6.188 1.24523 7.175C4.10685 13.1 8.88528 17.8851 14.8062 20.755C15.7922 21.234 17.0222 20.997 17.8502 20.168L20.6582 17.355C21.1132 16.9 21.1142 16.181 20.6602 15.791L16.7402 12.426C16.3302 12.074 15.6932 12.12 15.2822 12.532L13.9182 13.898C13.8484 13.9712 13.7565 14.0194 13.6566 14.0353C13.5567 14.0512 13.4543 14.0339 13.3652 13.986C11.1357 12.7021 9.28622 10.8502 8.00523 8.619C7.95726 8.52975 7.93989 8.42723 7.95578 8.32716C7.97168 8.22708 8.01996 8.13499 8.09323 8.065L9.45323 6.704C9.86523 6.29 9.91023 5.65 9.55423 5.239V5.24Z"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h1 className={`${poppins.className} font-medium text-[16px]`}>
                Call To Us
              </h1>
            </div>
            <div className="flex flex-col gap-[16px]">
              <p className={`${poppins.className} font-normal text-[14px]`}>
                We are available 24/7, 7 days a week.
              </p>
              <p className={`${poppins.className} font-normal text-[14px]`}>
                Phone: +8801611112222
              </p>
            </div>
          </div>
          <div className="border w-full border-black opacity-50"></div>
          <div className="flex flex-col gap-[24px]">
            <div className="flex gap-[16px] items-center">
              <div className="bg-[#DB4444] h-[40px] w-[40px] flex items-center justify-center rounded-full">
                <svg
                  width="22"
                  height="16"
                  viewBox="0 0 22 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1L11 8L21 1M1 15H21V1H1V15Z"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h1 className={`${poppins.className} font-medium text-[16px]`}>
                Write To US
              </h1>
            </div>
            <div className="flex flex-col gap-[16px]">
              <p className={`${poppins.className} font-normal text-[14px]`}>
                Fill out our form and we will contact you within 24 hours
              </p>
              <p className={`${poppins.className} font-normal text-[14px]`}>
                Emails: customer@exclusive.com
              </p>
              <p className={`${poppins.className} font-normal text-[14px]`}>
                Emails: support@exclusive.com
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Right Panel: Form */}
      <div className="w-full mt-12 lg:mt-0 lgl:w-[800px] h-auto lg:h-[457px] flex items-center justify-center">
        <div className="w-full lgl:w-[737px] sml:px-8 lg:px-0 h-auto lg:h-[377px] flex flex-col gap-[32px]">
          <div className="flex flex-col lg:flex-row justify-between gap-4 lg:gap-0">
            <div className="bg-[#F5F5F5] opacity-50 w-full lg:w-[235px]">
              <input
                type="text"
                placeholder="Your Name"
                required
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={isLoading}
                className={`bg-[#F5F5F5] font-normal text-[16px] h-[50px] outline-none w-full py-[4px] pl-[16px] leading-[24px] ${poppins.className} ${
                  isLoading ? "cursor-not-allowed" : ""
                }`}
              />
            </div>
            <div className="bg-[#F5F5F5] opacity-50 w-full lg:w-[235px]">
              <input
                type="text"
                placeholder="Your Email"
                required
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
                className={`bg-[#F5F5F5] font-normal text-[16px] h-[50px] outline-none w-full py-[4px] pl-[16px] leading-[24px] ${poppins.className} ${
                  isLoading ? "cursor-not-allowed" : ""
                }`}
              />
            </div>
            <div className="bg-[#F5F5F5] opacity-50 w-full lg:w-[235px]">
              <input
                type="text"
                placeholder="Your Phone"
                required
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={isLoading}
                className={`font-normal bg-[#F5F5F5] text-[16px] h-[50px] outline-none w-full py-[4px] pl-[16px] leading-[24px] ${poppins.className} ${
                  isLoading ? "cursor-not-allowed" : ""
                }`}
              />
            </div>
          </div>
          <div className="flex w-full gap-[16px] items-center">
            <textarea
              placeholder="Your Message"
              required
              name="message"
              value={formData.message}
              onChange={handleChange}
              disabled={isLoading}
              className={`font-normal resize-none bg-[#F5F5F5] text-[16px] h-[207px] outline-none w-full py-[4px] pl-[16px] leading-[24px] ${poppins.className} ${
                isLoading ? "cursor-not-allowed" : ""
              }`}
            />
          </div>
          <div className="flex gap-[16px] justify-end items-center">
            <button
              onClick={handleSubmit}
              disabled={isLoading || !userInfo}
              className={`relative bg-[#DB4444] text-[#ffffff] font-medium text-[16px] h-[56px] w-[215px] rounded-[4px] outline-none ${poppins.className} ${
                isLoading || !userInfo ? "cursor-not-allowed opacity-80" : ""
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Sending...
                </div>
              ) : (
                userInfo ? "Send Message" : "Login to Send Message"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
