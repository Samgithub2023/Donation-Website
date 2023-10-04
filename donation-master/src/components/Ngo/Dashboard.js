/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDataContext } from "../../context/ContextProvider";
import { acceptDonation, getAllDonations } from "../../firebase";
import useAuth from "../../hooks/useAuth";
import dummyImage from "./../../images/dummy2.png";
import { sortEvents } from "../../modules/array";
import { NotFound } from "../User/NotFound";

const Dashboard = () => {
  const [dashboardAnimation, setDashboardAnimation] = useState("");
  const { ngoData: data } = useDataContext();
  const [donations, setDonations] = useState();
  const { ngo } = useAuth();
  console.log("donations", data);
  useEffect(() => {
    setTimeout(() => {
      setDashboardAnimation("hidden");
    }, 1000);
    if (!data) return;

    getAllDonations(data.pincode).then(({ success, donations }) => {
      if (success) setDonations(donations);
    });
  }, [data]);

  async function accept(uid, id) {
    const { success } = await acceptDonation(uid, id, ngo);
    if (!success) return toast.error("Some error occured...");
    toast.success("Donation accepted!");
    window.location.reload();
  }

  return (
    <>
      {!donations && dashboardAnimation === "hidden" && (
        <div className="w-screen h-screen flex justify-center items-center flex-col">
          <p className="text-center text-2xl text-slate-700 tracking-widest">
            No donation found at your pin code!!!
          </p>
          <NotFound />
        </div>
      )}
      {/* Animation of dahboard for showing palete */}
      <div className={`my-24 sm:mt-8 px-16 ${dashboardAnimation}`}>
        <div className=" shadow-2xl rounded-2xl p-16 max-w-lg w-full ">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-slate-300 h-10 w-10"></div>
            <div className="flex-1 space-y-6 py-1">
              <div className="h-2 bg-slate-300 rounded"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-slate-300 rounded col-span-2"></div>
                  <div className="h-2 bg-slate-300 rounded col-span-1"></div>
                </div>
                <div className="h-2 bg-slate-300 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* for the showcase of exact data */}
      <div
        className={`${
          dashboardAnimation === "" ? "hidden" : ""
        }  mt-24 mb-12 sm:mt-8`}
      >
        <div className=" px-2 xsm:px-12 grid xlg:grid-cols-3 lg:grid-cols-2 sm:grid-cols-1 gap-12 ">
          {donations &&
            donations
              .sort(sortEvents)
              ?.map(
                ({
                  uid,
                  name,
                  image,
                  mobile,
                  address,
                  id,
                  description,
                  status,
                  password,
                }) => (
                  <div
                    key={id}
                    className="shadow-[0_1px_16px_2px_rgba(0,0,0,.2)] rounded-xl  px-4 sm:px-8 py-6 flex border-transparent  flex-col gap-6 bg-slate-50 hover:bg-gray-100 hover:text-[#2dc1e4] hover:border-[#2dc1e4] border-2 transition-all duration-200 ease-in-out "
                  >
                    <div className="flex gap-10">
                      <img
                        src={image || dummyImage}
                        className="w-24 h-24  rounded-full shadow-2xl object-cover"
                      />
                      <div className="flex flex-col gap-2 text-black">
                        <div className="text-2xl tracking-widest text-neutral-500 font-light">
                          {name}
                        </div>
                        <div className="text-base tracking-wide">
                          <span className="text-lg font-semibold tracking-wider pr-1">
                            Pincode :
                          </span>
                          {data?.pincode}
                        </div>
                        <div className="text-base tracking-wide">
                          <span className="text-lg font-semibold tracking-wider pr-1">
                            Phone No :
                          </span>
                          {mobile}
                        </div>
                      </div>
                    </div>
                    <div>
                      <span className="text-xl font-medium ">Description:</span>
                      <div className="text-neutral-700 pt-2">{description}</div>
                    </div>
                    <div>
                      <span className="text-xl font-medium ">Address:</span>
                      <div className="text-neutral-700 pt-2">{address}</div>
                    </div>
                    <div className={`${status === "pending" ? "hidden" : ""}`}>
                      <span className="text-xl font-medium ">OTP:</span>
                      <div className="text-neutral-700 pt-2">{password}</div>
                    </div>
                    <div
                      className={`flex flex-col gap-2 sm:flex-row sm:gap-0 justify-between items-center ${
                        status === "pending" ? "" : "hidden"
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row  gap-4 items-center">
                        <button
                          onClick={() => accept(uid, id)}
                          className="bg-green-400 text-white rounded-2xl px-6 py-2 text-xl font-medium  hover:bg-gray-100 hover:text-green-400 hover:border-green-400 border-2 border-transparent transition-all duration-200 ease-in-out "
                        >
                          Accept
                        </button>
                        <button className="text-red-400 border-2 border-red-400 rounded-2xl px-6 py-2 text-xl font-medium  hover:bg-red-400 hover:text-gray-100   transition-all duration-200 ease-in-out ">
                          Decline
                        </button>
                      </div>
                    </div>
                  </div>
                )
              )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
