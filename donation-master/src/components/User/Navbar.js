// import React from "react";
// import Logo from "../Logo";
// import ham from "../../images/ham.png";
// import User from "../../images/user-interface.png";
// import dummyImage from '../../images/dummy.webp'
// import { Link } from "react-router-dom";

// const Navbar = () => {
//   // function Menu(e){
//   //   let list = document.querySelector('ul');
//   //   e.name === 'menu' ? (e.name = "close",list.classList.add('top-[80px]') , list.classList.add('opacity-100')) :( e.name = "menu" ,list.classList.remove('top-[80px]'),list.classList.remove('opacity-100'))
//   // }

//   return (
//     <>
//       {/* <div className="flex flex-row sm:flex-col lg:flex-row bg-blue-200 sm:bg-green-600 lg:bg-red-400 border-b-4 drop-shadow-lg justify-between sm:justify-start lg:justify-between "> */}
//       <div className="flex flex-row sm:flex-col lg:flex-row border-b-4 drop-shadow-lg justify-between sm:justify-start lg:justify-between ">
//         <Link to="/">
//           <div className="flex flex-row m-4">
//             <Logo dimension={2} />
//             <p className="flex items-center font-bold text-xl justify-between sm:justify-start lg:justify-between mx-3 ">
//               DoNation
//             </p>
//           </div>
//         </Link>
//         <span className="right-0 text-3xl cursor-pointer mx-2 lg:hidden">
//           <img src={ham} alt="" />
//         </span>

//         <div className="flex justify-between sm:justify-start lg:justify-between ">
//           <ul className="lg:flex lg:items-center z-[-1] lg:z-auto lg:static absolute w-full left-0 lg:w-auto lg:py-0 py-4 lg:pl-0 pl-7 lg:opacity-100 opacity-0 top-[-400px] transition-all ease-in duration-500">
//             <Link to="/">
//               <li className="hidden lg:px-2 sm:block text-lg font-semibold  relative after:absolute after:content-[''] after:w-full after:-bottom-[.2rem]  after:-left-full after:h-[.2rem] after:hidden  after:bg-gradient-to-r after:from-gradient1a after:to-gradient1b hover:after:left-0 after:transition-all after:ease-in-out after:duration-500 hover:after:block hover:translate-x-0.5 ease-in-out duration-500 ">
//                 Dashboard
//               </li>
//             </Link>
//             <Link to="user/money">
//               <li className="hidden lg:px-2 sm:block text-lg font-semibold  relative after:absolute after:content-[''] after:w-full after:-bottom-[.2rem]  after:-left-full after:h-[.2rem] after:hidden  after:bg-gradient-to-r after:from-gradient1a after:to-gradient1b hover:after:left-0 after:transition-all after:ease-in-out after:duration-500 hover:after:block hover:translate-x-0.5 ease-in-out duration-500 ">
//                 Donate Money
//               </li>
//             </Link>
//             <Link to="user/donate">
//               <li className="hidden lg:px-2 sm:block text-lg font-semibold  relative after:absolute after:content-[''] after:w-full after:-bottom-[.2rem]  after:-left-full after:h-[.2rem] after:hidden  after:bg-gradient-to-r after:from-gradient1a after:to-gradient1b hover:after:left-0 after:transition-all after:ease-in-out after:duration-500 hover:after:block hover:translate-x-0.5 ease-in-out duration-500 ">
//                 Other Donations
//               </li>
//             </Link>
//             <Link to="user/donations">
//               <li className="hidden lg:px-2 sm:block text-lg font-semibold  relative after:absolute after:content-[''] after:w-full after:-bottom-[.2rem]  after:-left-full after:h-[.2rem] after:hidden  after:bg-gradient-to-r after:from-gradient1a after:to-gradient1b hover:after:left-0 after:transition-all after:ease-in-out after:duration-500 hover:after:block hover:translate-x-0.5 ease-in-out duration-500 ">
//                 Track Donation
//               </li>
//             </Link>
//             <Link to="user/profile">
//                 <img
//                 src={ dummyImage}
//                 className="w-12 h-12 rounded-full mx-4 cursor-pointer"
//                 alt="Ngo logo"
//               />
//             </Link>
//           </ul>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Navbar;

import { useState } from "react";
import Logo from "../Logo";
import dummyImage from "./../../images/dummy.webp";
import { Link, useLocation } from "react-router-dom";
import { HiMenu } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { useDataContext } from "../../context/ContextProvider";

export default function NavBarNgo() {
  const { userData: data } = useDataContext();
  const [hamMenu, setHamMenu] = useState(false);
  function showMenu() {
    setHamMenu(true);
  }
  function closeMenu() {
    setHamMenu(false);
  }

  window.addEventListener("resize", () => {
    if (window.innerWidth > 640) {
      setHamMenu(false);
    }
  });

  return (
    <>
      <div className="z-50 bg-white h-fit flex drop-shadow-lg justify-between  items-center pl-6 sm:pl-8 pr-6 sm:pr-8 py-3 sticky top-0">
        <Link to="/user">
          <div className="flex items-center gap-2 sm:gap-3 ">
            <Logo dimension={2} />

            <h1
              className="text-4xl text-transparent bg-clip-text bg-gradient-to-t from-colorPrimary to-colorSecondary hidden xsm:block"
            >
              DoNation
            </h1>
          </div>
        </Link>

        <div className="hidden justify-center items-center lg:flex gap-5 text-lg font-semibold">
          <Link to="/user">
            <div className="hidden lg:block text-lg tracking-wider font-semibold  relative after:absolute after:content-[''] after:w-full after:-bottom-[.2rem]  after:-left-full after:h-[.2rem] after:hidden  after:bg-gradient-to-r after:from-gradient1a after:to-gradient1b hover:after:left-0 after:transition-all after:ease-in-out after:duration-500 hover:after:block hover:translate-x-0.5 ease-in-out duration-500 ">
              Dashboard
            </div>
          </Link>
          <Link to="/user/money">
            <div className="hidden lg:block text-lg tracking-wider whitespace-pre-wrap font-semibold  relative after:absolute after:content-[''] after:w-full after:-bottom-[.2rem]  after:-left-full after:h-[.2rem] after:hidden  after:bg-gradient-to-r after:from-gradient1a after:to-gradient1b hover:after:left-0 after:transition-all after:ease-in-out after:duration-500 hover:after:block hover:translate-x-0.5 ease-in-out duration-500 ">
              Donate Money
            </div>
          </Link>
          <Link to="/user/donate">
            <div className="hidden lg:block text-lg tracking-wider font-semibold  relative after:absolute after:content-[''] after:w-full after:-bottom-[.2rem]  after:-left-full after:h-[.2rem] after:hidden  after:bg-gradient-to-r after:from-gradient1a after:to-gradient1b hover:after:left-0 after:transition-all after:ease-in-out after:duration-500 hover:after:block hover:translate-x-0.5 ease-in-out duration-500 ">
              Other Donations
            </div>
          </Link>
          <Link to="/user/donations">
            <div className="hidden lg:block text-lg tracking-wider font-semibold  relative after:absolute after:content-[''] after:w-full after:-bottom-[.2rem]  after:-left-full after:h-[.2rem] after:hidden  after:bg-gradient-to-r after:from-gradient1a after:to-gradient1b hover:after:left-0 after:transition-all after:ease-in-out after:duration-500 hover:after:block hover:translate-x-0.5 ease-in-out duration-500 ">
              Track Donations
            </div>
          </Link>

          <Link to="/user/profile">
            <img
              src={data?.image || dummyImage}
              className="w-12 h-12 rounded-full "
              alt="User logo"
            ></img>
          </Link>
        </div>

        <div
          className="rounded-full  p-2 bg-slate-50  text-slate-700 text-3xl font-extrabold lg:hidden  hover:bg-slate-200   hover:shadow-2xl hover:scale-105 "
          onClick={showMenu}
        >
          <HiMenu></HiMenu>
        </div>
      </div>

      <div
        className={`pt-28 z-20 fixed top-0 h-screen w-screen bg-gradient-to-bl from-gradient1a via-colorPrimary to-gradient1b items-start pl-6 xlg:pl-12 lg:pl-16  lg:hidden gap-6 ${
          hamMenu ? "flex flex-col " : "hidden "
        }`}
      >
        <div
          className="self-end pr-4 xsm:pr-8  text-3xl text-white p-3  rounded-full "
          onClick={closeMenu}
        >
          <IoMdClose></IoMdClose>
        </div>
        <Link to="/user">
          <div
            className="pb-3 text-xl tracking-widest hover:scale-105 hover:font-3xl transition-all hover:font-bold"
            onClick={closeMenu}
          >
            Dashboard
          </div>
        </Link>
        <Link to="/user/money">
          <div
            className="pb-3 text-xl tracking-widest hover:scale-105 hover:font-3xl transition-all hover:font-bold"
            onClick={closeMenu}
          >
            Donate Money
          </div>
        </Link>
        <Link to="/user/donate">
          <div
            className="pb-3 text-xl tracking-widest hover:scale-105 hover:font-3xl transition-all hover:font-bold"
            onClick={closeMenu}
          >
            Other Donations
          </div>
        </Link>
        <Link to="/user/donations">
          <div
            className="pb-3 text-xl tracking-widest hover:scale-105 hover:font-3xl transition-all hover:font-bold"
            onClick={closeMenu}
          >
            Track Donations
          </div>
        </Link>
        <Link to="/user/profile">
          <div
            className="pb-3 text-xl tracking-widest hover:scale-105 hover:font-3xl transition-all hover:font-bold"
            onClick={closeMenu}
          >
            Profile
          </div>
        </Link>
      </div>
    </>
  );
}
