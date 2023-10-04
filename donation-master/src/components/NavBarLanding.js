import { useState } from "react";
import Logo from "./Logo";
// import {} from 'react-dom';
import { Link, useLocation } from "react-router-dom";
import { HiMenu } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";

export default function NavBarLanding() {
  const [hamMenu, setHamMenu] = useState(false);
  const location = useLocation();
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
        <Link to="/">
          <div className="flex items-center gap-2 sm:gap-3 ">
            <Logo dimension={2} />

            <h1
              className="text-4xl text-transparent bg-clip-text bg-gradient-to-t from-colorPrimary to-colorSecondary hidden lg:block"
            >
              DoNation
            </h1>
          </div>
        </Link>

        <div className="hidden justify-center items-center sm:flex gap-8 text-lg font-semibold">
          <a href="#about">
            <div className="hidden sm:block text-lg tracking-widest font-semibold  relative after:absolute after:content-[''] after:w-full after:-bottom-[.2rem]  after:-left-full after:h-[.2rem] after:hidden  after:bg-gradient-to-r after:from-gradient1a after:to-gradient1b hover:after:left-0 after:transition-all after:ease-in-out after:duration-500 hover:after:block hover:translate-x-0.5 ease-in-out duration-500 ">
              About
            </div>
          </a>
          <Link to="/ngos">
            <div className="hidden sm:block text-lg tracking-widest font-semibold  relative after:absolute after:content-[''] after:w-full after:-bottom-[.2rem]  after:-left-full after:h-[.2rem] after:hidden  after:bg-gradient-to-r after:from-gradient1a after:to-gradient1b hover:after:left-0 after:transition-all after:ease-in-out after:duration-500 hover:after:block hover:translate-x-0.5 ease-in-out duration-500 ">
              NGOs
            </div>
          </Link>
          <a href="#testimonials">
            <div className="hidden sm:block text-lg  relative after:absolute after:content-[''] after:w-full after:-bottom-[.2rem]  after:-left-full after:h-[.2rem] after:hidden  after:bg-gradient-to-r after:from-gradient1a after:to-gradient1b hover:after:left-0 after:transition-all after:ease-in-out after:duration-500 hover:after:block hover:translate-x-0.5 ease-in-out duration-500 ">
              Testimonials
            </div>
          </a>
        </div>

        <div
          className="rounded-full  p-2 bg-slate-50  text-slate-700 text-3xl font-extrabold sm:hidden  hover:bg-slate-200   hover:shadow-2xl hover:scale-105 "
          onClick={showMenu}
        >
          <HiMenu></HiMenu>
        </div>
      </div>

      <div
        className={`pt-28 z-20 fixed top-0 h-screen w-screen bg-gradient-to-bl from-gradient1a via-colorPrimary to-gradient1b items-start pl-6 xsm:pl-12 sm:pl-16  sm:hidden gap-6 ${
          hamMenu ? "flex flex-col " : "hidden "
        }`}
      >
        <div
          className="self-end pr-4 xsm:pr-8  text-3xl text-white p-3  rounded-full "
          onClick={closeMenu}
        >
          <IoMdClose></IoMdClose>
        </div>
        <a href="#about" onClick={closeMenu}>
          <div className="pb-3 text-xl tracking-widest hover:scale-105 hover:font-3xl transition-all hover:font-bold">
            About
          </div>
        </a>
        <Link to="/ngos">
          <div className="pb-3 text-xl tracking-widest hover:scale-105 hover:font-3xl transition-all hover:font-bold">
            NGOs
          </div>
        </Link>
        <a href="#testimonials" onClick={closeMenu}>
          <div className="pb-3 text-xl tracking-widest hover:scale-105 hover:font-3xl transition-all hover:font-bold">
            Testimonials
          </div>
        </a>
      </div>
    </>
  );
}
