import React from "react";
import { useDataContext } from "../../context/ContextProvider";
import TrackDonationCard from "./TrackDonationCard";

const TrackDonation = () => {
  const { userData } = useDataContext()
  const donations = userData?.donations

  return (
    <div className="max-w-6xl mx-16 my-10 xl:mx-auto flex gap-4 xl:gap-16 ">
      <div className=" gap-4 shadow-2xl rounded-3xl py-2 px-5 pb-10 w-1/2 xl:w-1/3 hidden xl:flex xl:flex-col h-full">
        <div className=" px-4 py-3 font-bold text-2xl">Donation Report</div>
        <div className="rounded-3xl shadow-slate-400 shadow-2xl pl-4 py-4 mb-2 text-xl bg-blue-300">
          Total Donation : {donations?.length || 0}
        </div>
        <div className="rounded-3xl shadow-slate-400 shadow-2xl pl-4 py-4 mb-2 text-xl bg-lime-300">
          Active Donation : {donations?.filter(({ status }) => status === 'pending' || status === 'accepted').length || 0}
        </div>
        <div className="rounded-3xl shadow-slate-400 shadow-2xl pl-4 py-4 mb-2 text-xl bg-green-300">
          Completed Donation : {donations?.filter(({ status }) => status === 'completed').length || 0}
        </div>
      </div>
      <div className="flex flex-col w-full xl:w-2/3 gap-10">
        {donations?.map(({id, ngo, ...donation}) => <TrackDonationCard
          key={id}
          ngoid={ngo}
          {...donation}
        />)}
      </div>
    </div>
  );
};

export default TrackDonation;
