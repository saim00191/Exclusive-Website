"use client";
import Wrapper from "@/shared/Wrapper";
import HeaderTop from "./HeaderTop";
import { Inter, Poppins } from "next/font/google";
import { LuUser } from "react-icons/lu";
import Link from "next/link";
import { RxHamburgerMenu } from "react-icons/rx";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { RxCross1 } from "react-icons/rx";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { signOut } from "@/redux/slice";

const inter = Inter({ subsets: ["latin"], weight: ["400", "700"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

const navLinks = [
  { title: "Home", href: "/" },
  { title: "Contact", href: "/contact" },
  { title: "About", href: "/about" },
  { title: "Signup", href: "/signup" },
];

const Header = () => {
  const products = useSelector((state: RootState) => state.products.products);
  const wishlist = useSelector((state: RootState) => state.wishList.WishList);
  const userInfo = useSelector((state: RootState) => state.products.userInfo);

  const [isOpen, setIsOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const dispatch = useDispatch();

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  const handleLogout = () => {
    dispatch(signOut());
    setIsUserDropdownOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  return (
    <>
      <HeaderTop />
      <div className="py-8">
        <Wrapper className="flex items-center justify-between px-3">
          <Link href="/">
            <h2
              className={`${inter.className} text-[24px] text-black leading-[24px] font-bold tracking-[3px]`}
            >
              Exclusive
            </h2>
          </Link>
          <ul className="hidden sm:flex gap-x-[48px] items-center">
            {navLinks.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.href}
                  className={`${poppins.className} text-[16px] leading-[24px] font-normal relative group`}
                >
                  {item.title}
                  <span className="absolute bottom-0 left-0 w-0 h-1 bg-carminePink transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-4">
            <div className="w-[243px] h-[56px] hidden lg:flex py-[7px] pr-[12px] pl-[20px] gap-[10px] bg-[#F5F5F5] justify-center rounded-[8px] items-center">
              <input
                type="text"
                placeholder="What are you looking for?"
                className={`${poppins.className} bg-[#F5F5F5] text-sm w-[211px] text-gray-700 outline-none`}
              />
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17 17L13.2223 13.2156M15.3158 8.15789C15.3158 10.0563 14.5617 11.8769 13.2193 13.2193C11.8769 14.5617 10.0563 15.3158 8.15789 15.3158C6.2595 15.3158 4.43886 14.5617 3.0965 13.2193C1.75413 11.8769 1 10.0563 1 8.15789C1 6.2595 1.75413 4.43886 3.0965 3.0965C4.43886 1.75413 6.2595 1 8.15789 1C10.0563 1 11.8769 1.75413 13.2193 3.0965C14.5617 4.43886 15.3158 6.2595 15.3158 8.15789V8.15789Z"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className="xs:flex gap-[16px] hidden items-center">
              <Link href="/wishlist">
                <span className="relative">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11 7C8.239 7 6 9.216 6 11.95C6 14.157 6.875 19.395 15.488 24.69C15.6423 24.7839 15.8194 24.8335 16 24.8335C16.1806 24.8335 16.3577 24.7839 16.512 24.69C25.125 19.395 26 14.157 26 11.95C26 9.216 23.761 7 21 7C18.239 7 16 10 16 10C16 10 13.761 7 11 7Z"
                      stroke="black"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p
                    className={`${poppins.className} h-[24px] w-[24px] flex items-center justify-center rounded-full text-[18px] text-primary font-normal bg-carminePink absolute -top-[9px] left-[15px]`}
                  >
                    {wishlist.length > 0 ? wishlist.length : 0}
                  </p>
                </span>
              </Link>
              <Link href="/cart">
                <span className="relative">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11 27C11.5523 27 12 26.5523 12 26C12 25.4477 11.5523 25 11 25C10.4477 25 10 25.4477 10 26C10 26.5523 10.4477 27 11 27Z"
                      stroke="black"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M25 27C25.5523 27 26 26.5523 26 26C26 25.4477 25.5523 25 25 25C24.4477 25 24 25.4477 24 26C24 26.5523 24.4477 27 25 27Z"
                      stroke="black"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3 5H7L10 22H26"
                      stroke="black"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10 16.6667H25.59C25.7056 16.6667 25.8177 16.6267 25.9072 16.5535C25.9966 16.4802 26.0579 16.3782 26.0806 16.2648L27.8806 7.26479C27.8951 7.19222 27.8934 7.11733 27.8755 7.04552C27.8575 6.97371 27.8239 6.90678 27.7769 6.84956C27.73 6.79234 27.6709 6.74625 27.604 6.71462C27.5371 6.68299 27.464 6.66661 27.39 6.66666H8"
                      stroke="black"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p
                    className={`${poppins.className} h-[24px] w-[24px] flex items-center justify-center rounded-full text-[18px] text-primary font-normal bg-carminePink absolute -top-[9px] left-[15px]`}
                  >
                    {products.length > 0 ? products.length : 0}
                  </p>
                </span>
              </Link>
              {userInfo && (
                <div className="relative">
                  <span
                    className="h-[32px] w-[32px] hover:text-white -mt-2 hover:bg-carminePink rounded-full flex items-center justify-center cursor-pointer"
                    onClick={toggleUserDropdown}
                  >
                    <LuUser size={28}  />
                  </span>
                  <AnimatePresence>
                    {isUserDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
                      >
                        <ul className="py-2">
                          <Link
                            href="/orders"
                            className={`${poppins.className} block px-4 py-2 text-gray-700 hover:bg-gray-100`}
                            onClick={() => setIsUserDropdownOpen(false)}
                          >
                            Orders
                          </Link>
                          <Link
                            href="/delivered"
                            className={`${poppins.className} block px-4 py-2 text-gray-700 hover:bg-gray-100`}
                            onClick={() => setIsUserDropdownOpen(false)}
                          >
                            Delivered Orders
                          </Link>
                          <Link
                            href="/cancellations"
                            className={`${poppins.className} block px-4 py-2 text-gray-700 hover:bg-gray-100`}
                            onClick={() => setIsUserDropdownOpen(false)}
                          >
                            My Cancellations
                          </Link>
                          <button
                            className={`${poppins.className} w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100`}
                            onClick={handleLogout}
                          >
                            Logout
                          </button>
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>
          <motion.div
            initial={false}
            animate={isOpen ? "open" : "closed"}
            className="z-50 relative sm:hidden"
          >
            {isOpen ? (
              <RxCross1 size={30} onClick={toggleNavbar} />
            ) : (
              <RxHamburgerMenu size={30} onClick={toggleNavbar} />
            )}
          </motion.div>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="w-full right-0 bg-white h-screen fixed sm:hidden top-0 z-20"
              >
                <motion.div className="flex flex-col gap-8 mt-36">
                  {navLinks.map((item, index) => (
                    <motion.div key={index}>
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`${poppins.className} px-4 py-3 text-gray-900 hover:text-gray-800 font-medium transition duration-300 ease-in-out cursor-pointer block`}
                      >
                        {item.title}
                        <span className="absolute bottom-0 w-0 h-[2px] bg-carminePink transition-all duration-300 group-hover:w-full" />
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </Wrapper>
      </div>
    </>
  );
};

export default Header;