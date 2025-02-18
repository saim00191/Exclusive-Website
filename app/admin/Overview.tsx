// 'use client'
// import { client } from "@/sanity/lib/client";
// import { Poppins } from "next/font/google";
// import { useEffect, useState } from "react";

// const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });



// const Overview = () => {
    
//  const [orders, setOrders] = useState([])

//  useEffect(() => {
//    // Sanity query to fetch orders of type "order"
//    const query = `*[type == "order"]`
   
//    // Fetch data from Sanity
//    const fetchOrders = async () => {
//      try {
//        const ordersData = await client.fetch(`*[type == "order"]`)
//          setOrders(ordersData)
//          console.log(ordersData.length)
//      } catch (error) {
//        console.error("Error fetching orders: ", error)
//      }
//    }

//    fetchOrders()
//  }, []) 
//   return (
//     <div className="flex items-center justify-between">
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
//         <div className="w-[283px] h-[164px] border-2 border-[#F0F0F0] bg-white rounded-[10px] ">
//           <div className="flex items-center h-[164px] w-full px-4 py-2 ">
//             <div className=" flex items-center justify-start w-full h-full">
//               <span className="w-[110px] h-[110px] rounded-full bg-green-500"></span>
//             </div>
//             <div className="flex flex-col items-center gap-y-4 justify-center w-full h-full">
//               <h4
//                 className={`${poppins.className} font-bold text-[16px] text-[#858585]`}
//               >
//                 Total Numbers of Users
//               </h4>
//               <div className="flex items-center justify-between gap-x-8">
//                 <p className={`${poppins.className} text-[#1CD1A1] text-[13px]`}>24</p>
//                 <svg
//                   width="63"
//                   height="26"
//                   viewBox="0 0 63 26"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     fill-rule="evenodd"
//                     clip-rule="evenodd"
//                     d="M0 26V10.3755L5.60289 18.645L11.8586 14.0553L17.1566 8.95548L22.5442 6.43643L27.8222 8.95548L33.8206 14.6354L39.481 8.95548L45.2619 14.0553L50.9223 3.80797C50.9223 3.80797 52.9538 5.69498 53.7891 7.26675C53.9586 7.58562 62.0776 -1.1916 62.7162 0.137052C63.3548 1.4657 62.7162 26 62.7162 26H0Z"
//                     fill="url(#paint0_linear_1_1240)"
//                   />
//                   <defs>
//                     <linearGradient
//                       id="paint0_linear_1_1240"
//                       x1="-25.6449"
//                       y1="-18.7048"
//                       x2="-25.6449"
//                       y2="28.4624"
//                       gradientUnits="userSpaceOnUse"
//                     >
//                       <stop stop-color="#1CD1A1" />
//                       <stop offset="1" stop-color="white" />
//                     </linearGradient>
//                   </defs>
//                 </svg>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="w-[283px] h-[164px] border-2 border-[#F0F0F0] bg-white rounded-[10px] ">
//           <div className="flex items-center h-[164px] w-full px-4 py-2 ">
//             <div className=" flex items-center justify-start w-full h-full">
//               <span className="w-[110px] h-[110px] rounded-full bg-green-500"></span>
//             </div>
//             <div className="flex flex-col items-center gap-y-4 justify-center w-full h-full">
//               <h4
//                 className={`${poppins.className} font-bold text-[16px] text-[#858585]`}
//               >
//                 Total Numbers of Users
//               </h4>
//               <div className="flex items-center justify-between gap-x-8">
//                 <p className={`${poppins.className} text-[#1CD1A1] text-[13px]`}>24</p>
//                 <svg
//                   width="63"
//                   height="26"
//                   viewBox="0 0 63 26"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     fill-rule="evenodd"
//                     clip-rule="evenodd"
//                     d="M0 26V10.3755L5.60289 18.645L11.8586 14.0553L17.1566 8.95548L22.5442 6.43643L27.8222 8.95548L33.8206 14.6354L39.481 8.95548L45.2619 14.0553L50.9223 3.80797C50.9223 3.80797 52.9538 5.69498 53.7891 7.26675C53.9586 7.58562 62.0776 -1.1916 62.7162 0.137052C63.3548 1.4657 62.7162 26 62.7162 26H0Z"
//                     fill="url(#paint0_linear_1_1240)"
//                   />
//                   <defs>
//                     <linearGradient
//                       id="paint0_linear_1_1240"
//                       x1="-25.6449"
//                       y1="-18.7048"
//                       x2="-25.6449"
//                       y2="28.4624"
//                       gradientUnits="userSpaceOnUse"
//                     >
//                       <stop stop-color="#1CD1A1" />
//                       <stop offset="1" stop-color="white" />
//                     </linearGradient>
//                   </defs>
//                 </svg>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="w-[283px] h-[164px] border-2 border-[#F0F0F0] bg-white rounded-[10px] ">
//           <div className="flex items-center h-[164px] w-full px-4 py-2 ">
//             <div className=" flex items-center justify-start w-full h-full">
//               <span className="w-[110px] h-[110px] rounded-full bg-green-500"></span>
//             </div>
//             <div className="flex flex-col items-center gap-y-4 justify-center w-full h-full">
//               <h4
//                 className={`${poppins.className} font-bold text-[16px] text-[#858585]`}
//               >
//                 Total Numbers of Users
//               </h4>
//               <div className="flex items-center justify-between gap-x-8">
//                 <p className={`${poppins.className} text-[#1CD1A1] text-[13px]`}>{orders.length}</p>
//                 <svg
//                   width="63"
//                   height="26"
//                   viewBox="0 0 63 26"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     fill-rule="evenodd"
//                     clip-rule="evenodd"
//                     d="M0 26V10.3755L5.60289 18.645L11.8586 14.0553L17.1566 8.95548L22.5442 6.43643L27.8222 8.95548L33.8206 14.6354L39.481 8.95548L45.2619 14.0553L50.9223 3.80797C50.9223 3.80797 52.9538 5.69498 53.7891 7.26675C53.9586 7.58562 62.0776 -1.1916 62.7162 0.137052C63.3548 1.4657 62.7162 26 62.7162 26H0Z"
//                     fill="url(#paint0_linear_1_1240)"
//                   />
//                   <defs>
//                     <linearGradient
//                       id="paint0_linear_1_1240"
//                       x1="-25.6449"
//                       y1="-18.7048"
//                       x2="-25.6449"
//                       y2="28.4624"
//                       gradientUnits="userSpaceOnUse"
//                     >
//                       <stop stop-color="#1CD1A1" />
//                       <stop offset="1" stop-color="white" />
//                     </linearGradient>
//                   </defs>
//                 </svg>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Overview;
