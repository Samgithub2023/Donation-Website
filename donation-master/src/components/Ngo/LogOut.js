// import React, { useState } from "react";

// import { toast } from 'react-toastify'
// import { logout } from "../../firebase";

// export default function LogOut() {
//   const [showLogout, setLogOut] = useState("");

//   // function hiddenModal() {
//   //   setLogOut("hidden");
//   // }

//   async function handleLogout() {
//     const { success } = await logout()
//     if (!success) return toast.error('Some error occured...')
//     toast.success('Logged out successfully')
//   }

//   return (
//     <>
//       <div
//         className={`relative w-screen h-screen logoutPanel z-10  ${showLogout}`}
//       >
//         <div
//           className={`fixed top-1/2 left-1/2  z-10 -translate-x-1/2 -translate-y-1/2 `}
//         >
//           <div className="bg-white flex flex-col gap-6  items-center px-16 py-8 rounded-3xl border-t-8 border-t-green-400 ">
//             <img
//               src={logOutIcon}
//               alt="Log out"
//               className="w-24 animate-[spin_1s_ease-in-out]"
//             />
//             <h1 className="text-xl tracking-wide">
//               Are you sure you want to logout
//             </h1>
//             <div className="flex gap-8 ">
//               <button
//                 className="tracking-wider rounded-2xl text-xl font-semibold bg-[#7ed56f] px-6 py-2 text-gray-100 transition-all duration-200 hover:scale-105 hover:-translate-y-1 ngo-logout-cancel"
//                 onClick={hiddenModal}
//               >
//                 Cancel
//               </button>
//               <button onClick={handleLogout}
//                 className="tracking-wider rounded-2xl text-xl font-semibold bg-[#28b485]  px-6 py-2 text-white transition-all duration-200 hover:scale-105 hover:-translate-y-1 ngo-logout-confirm"
//               >
//                 Confirm
//               </button>
//             </div>
//           </div>
//         </div>
//         <div
//           className="fixed top-0 left-0 w-screen h-screen bg-black/50 overlay z-5 "
//           onClick={hiddenModal}
//         ></div>
//       </div>
//     </>
//   );
// }
