/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDataContext } from "../../context/ContextProvider";
import { completeDonation, getNgoData } from "../../firebase";
import useAuth from "../../hooks/useAuth";

export default function TrackDonationCard({
  id,
  status,
  description,
  ngoid,
  date,
}) {
  function capitalise(value) {
    return value?.[0]?.toUpperCase() + value?.substring(1);
  }
  const [color] = useState(status === "accepted" ? "green" : "red");
  const [dropDown, setDropDown] = useState("up");
  const [data, setData] = useState();
  const { user } = useAuth();
  const password = useRef();
  const { setUserDataUpdated } = useDataContext();

  useEffect(() => {
    getNgoData(ngoid).then(({ success, data }) => {
      if (success) setData(data);
    });
  }, []);

  async function submit(event) {
    event.preventDefault();
    const { success, error } = await completeDonation(
      user,
      id,
      password.current.value
    );
    if (!success) return toast.error(error);
    setUserDataUpdated(true);
    toast.success("Donation completed");
  }

  return (
    <div
      className={`border-2  border-${color}-400 bg-white rounded-3xl px-12 py-4 flex flex-col gap-4  w-full`}
    >
      <div className="flex flex-col sm:flex-row  ">
        <div className={`mr-5 font-bold text-2xl text-${color}-400`}>
          Status
        </div>
        <div className="text-xl">{capitalise(status)}</div>
      </div>
      <div className="flex flex-col sm:flex-row  ">
        <div className={`mr-5 font-bold text-2xl  text-${color}-400`}>
          Accepting NGO
        </div>

        <Link
          to={ngoid ? `/ngo/${ngoid}` : "/user/donations"}
          className="text-2xl text-gray-600 "
        >
          {capitalise(data?.name || "NA")}
        </Link>
      </div>
      <div className="flex flex-col sm:flex-row  gap-4">
        <div className={` font-bold text-xl text-${color}-400`}>
          Description
        </div>
        <div className="text-xl">{capitalise(description)}</div>
      </div>
      <form
        onSubmit={submit}
        className={`flex flex-col sm:flex-row sm:items-center gap-6 mt-2  ${
          status === "active" ? "" : "hidden"
        }`}
      >
        <h1 className={`text-${color}-400 text-2xl font-bold`}>OTP</h1>
        <div className="flex flex-col sm:flex-row w-full gap-10 ">
          <input
            type="password"
            className="w-full px-4 py-2 bg-red-50 focus:bg-white focus:outline-4 focus:outline-red-300 rounded-xl"
            ref={password}
          />
          <button
            className={`bg-${color}-400 rounded-xl text-white px-6 py-2 uppercase text-xl`}
          >
            Submit
          </button>
        </div>
      </form>

      <div className=" flex items-center gap-3">
        <div className={`text-${color}-400 text-xl`}>
          {dropDown === "up" ? "More Details" : "Less Details"}
        </div>
        <div className={`${dropDown === "up" ? "block" : "hidden"}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-8 w-8  text-${color}-400 bg-${color}-50 p-1 rounded-full   `}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
            onClick={() => {
              setDropDown("down");
            }}
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
        <div className={`${dropDown === "down" ? "" : "hidden"}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-6 w-6  text-${color}-400 `}
            onClick={() => {
              setDropDown("up");
            }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M5 15l7-7 7 7"
            />
          </svg>
        </div>
      </div>
      <div
        className={` ${dropDown === "up" ? "hidden" : ""} flex gap-4 flex-col`}
      >
        <div className={`flex flex-col sm:flex-row gap-4 `}>
          <div className={` font-bold text-xl text-${color}-400`}>Date</div>
          <div className="text-lg">{new Date(date).toLocaleString()}</div>
        </div>
        {/* <div className="flex flex-col sm:flex-row gap-4 ">
          <div className={` font-bold text-xl font-mono text-${color}-400`}>
            Date donation completed
          </div>
          <div className="text-lg"> {dateDonationCompleted}</div>
        </div> */}
      </div>
    </div>
  );
}
