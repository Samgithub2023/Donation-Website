import React, { useState } from "react";
// import styled from 'styled-components';
// import PropTypes from "prop-types";
import userLogo from "./images.jpg";
// #region constants

// #endregion

// #region styled-components

// #endregion

// #region functions

// #endregion

// #region component

/**
 *
 */
const DashBoardMoreDetails = () => {
  const [status, setStatus] = useState("accepted");

  return (
    <div
      className="mt-28 sm:mt-10 mx-2 sm:mx-10 px-10 py-8 sm:px-10 flex flex-col gap-8 rounded-xl  shadow-2xl shadow-slate-400
    "
    >
      <div className="flex  gap-4 sm:gap-10 ">
        <div>
          <img src={userLogo} className="w-24 h-24 rounded-full" />
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="font-extralight tracking-wider text-2xl">
            Shivansh Arora
          </div>
          <div className="text-lg text-gradient1b">
            <strong className="pr-2 text-xl font-semibold  text-black">
              Pincode :
            </strong>
            110035
          </div>
          <div className="text-gradient1b">
            <strong className="pr-1 sm:pr-2 text-lg font-semibold text-black">
              Phone No :
            </strong>
            9876543210
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-2xl font-semibold ">Description</div>
        <div className="px-1 text-gradient1b font-medium">
          Wants to donate some cloths of children of age 12-15
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-2xl font-semibold">Locality</div>
        <div className="px-1 text-gradient1b font-medium">Janakpuri</div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-2xl font-semibold">Address</div>
        <div className="px-1 text-gradient1b font-medium">
          C-4 , Street no.10,Block C , Janakpuri , New Delhi
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-2xl font-semibold">Email</div>
        <div className="px-1 text-gradient1b font-medium" type="email">
          goyal12345goel@gmail.com
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-2xl font-semibold">Alternate Mobile no</div>
        <div className="px-1 text-gradient1b font-medium" type="email">
          9123456780
        </div>
      </div>
      <div
        className={` flex-col gap-2 sm:flex-row sm:gap-0  justify-between items-center ${
          status === "requested" ? "flex" : "hidden"
        } `}
      >
        <div>
          <button className="bg-gradient-to-r from-[#2dc1e4] to-[#e8ecc7]  text-gray-100 rounded-2xl px-6 py-2 text-xl font-medium hover:bg-gray-100 hover:text-[#2dc1e4] hover:border-[#2dc1e4] hover:border-2 transition-all duration-200 ease-in-out ">
            More info
          </button>
        </div>
        <div className="flex flex-col sm:flex-row  gap-4 items-center">
          <button className="bg-green-400 text-white rounded-2xl px-6 py-2 text-xl font-medium  hover:bg-gray-100 hover:text-green-400 hover:border-green-400 hover:border-2 transition-all duration-200 ease-in-out ">
            Accept
          </button>
          <button className="text-red-400 border-2 border-red-400 rounded-2xl px-6 py-2 text-xl font-medium  hover:bg-red-400 hover:text-gray-100 hover:border-none  transition-all duration-200 ease-in-out ">
            Decline
          </button>
        </div>
      </div>
      <div className={`${status === ("accepted" || "") ? "block" : "hidden"} `}>
        <div className="flex gap-4 items-center mb-7">
          <div className="text-2xl font-extrabold ">Status</div>
          <div className={` text-xl text-red-400 font-bold relative`}>
            Active
            <span className="flex h-5 w-5 absolute top-1/2 -right-7 -translate-y-1/2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-5 w-5 bg-red-400"></span>
            </span>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <div className="text-xl font-bold">OTP</div>
          <div className="text-purple-400 text-2xl font-bold">65432178</div>
        </div>
      </div>
      <div
        className={`${status === ("completed" || "") ? "block" : "hidden"} `}
      >
        <div className="flex gap-4 items-center mb-7">
          <div className="text-2xl font-extrabold ">Status</div>

          <div className={` text-xl text-green-400 font-bold relative`}>
            Completed
            <span className="flex h-5 w-5 absolute top-1/2 -right-7 -translate-y-1/2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-5 w-5 bg-green-400"></span>
            </span>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <div className="text-xl font-bold">OTP</div>
          <div className="text-purple-400 text-2xl font-bold">65432178</div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardMoreDetails;
