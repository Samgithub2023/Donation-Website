/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState, useRef } from "react";
import dummyImage from "../../images/dummy.webp";
import { getAllEvents } from "../../firebase";
import { useDataContext } from "../../context/ContextProvider";
import { relativeTime } from "../../modules/time";
import { sortEvents } from "../../modules/array";
import { AiOutlineSearch } from "react-icons/ai";
import { NotFound } from "./NotFound";
export default function UserHome() {
  // document.querySelector("body").style.overflowX = "hidden";

  const [events, setEvents] = useState([]);
  const [fetchedEvents, setFetchedEvents] = useState();

  const { userData: data } = useDataContext();
  const eventSearchInput = useRef();

  const searchEventHandler = () => {
    const value = eventSearchInput.current.value;
    const tempEvents = [];
    console.log(fetchedEvents);
    fetchedEvents.forEach((event) => {
      if (
        Object.values(event)
          .join("")
          .toLowerCase()
          .includes(value.toLowerCase())
      ) {
        tempEvents.push(event);
      }
    });
    setEvents(tempEvents);
  };

  useEffect(() => {
    getAllEvents().then(({ success, events }) => {
      if (success) {
        setEvents(events);
        setFetchedEvents(events);
      }
    });
  }, []);

  return (
    <>
      <div className="pt-12 sm:pt-10 mb-10 max-w-6xl px-8 xl:mx-auto  w-full ">
        <div className="flex gap-12 w-full ">
          <div className="flex-col gap-12 w-full sm:w-2/3 flex">
            <div className="flex flex-col xsm:flex-row sm:hidden gap-4 justify-evenly xsm:items-center ">
              <div
                className="rounded-xl whitespace-pre-wrap px-8 py-2 w-full  text-lg bg-white shadow-lg shadow-slate-300 hover:shadow-md hover:-translate-y-1 active:scale-95 transition-all duration-300"
                style={{
                  backfaceVisibility: "hidden",
                }}
                onClick={() => {
                  setEvents(fetchedEvents);
                }}
              >
                All events
              </div>
              <div className="flex gap-2 items-center w-full">
                <input
                  className={`w-full px-6 py-2 text-lg border-2 border-slate-400  rounded-lg outline-4 outline-gradient1b transition-all duration-300`}
                  type="text"
                  placeholder="Search Events"
                  ref={eventSearchInput}
                ></input>
                <div
                  className="text-2xl hover:scale-110 transition-all duration-200 active:scale-95 cursor-pointer"
                  onClick={searchEventHandler}
                >
                  <AiOutlineSearch />
                </div>
              </div>
            </div>
            {events.length === 0 && (
              <div className="">
                <NotFound />
                <p className="text-center text-2xl text-slate-700 tracking-widest">
                  No event found
                </p>
              </div>
            )}
            {events &&
              events
                ?.sort(sortEvents)
                .map(
                  ({
                    name,
                    title,
                    description,
                    image,
                    ngoImage,
                    url,
                    date,
                  }) => (
                    <div
                      key={date}
                      className="flex flex-col px-8 py-4 bg-[#eee] rounded-3xl shadow-2xl w-full gap-6"
                    >
                      <div className="flex gap-6 items-center">
                        <img
                          src={ngoImage || dummyImage}
                          className="rounded-full w-16 h-16"
                        />
                        <div className="flex flex-col p-1 gap-.5">
                          <div className="text-2xl tracking-wider text-gray-800 font-extralight">
                            {name}
                          </div>
                          <div className="text-sm text-gray-500 tracking-wide">
                            {relativeTime(date)}
                          </div>
                        </div>
                      </div>
                      <div>
                        <img
                          src={image || dummyImage}
                          className="w-full h-64"
                        ></img>
                      </div>
                      <div className="font-semibold text-2xl pl-3 ">
                        {title}
                      </div>
                      <div className="font-light leading-7 -mt-3">
                        {description}
                      </div>
                    </div>
                  )
                )}
          </div>
          <div className="hidden sm:flex flex-col  w-1/3 gap-8">
            <div className="flex flex-col justify-center items-center w-full p-6 pt-12 rounded-2xl shadow-2xl gap-4 relative">
              <img
                src={data?.image || dummyImage}
                className="rounded-full shadow-xl w-20 h-20"
              />
              <div className="text-2xl font-medium whitespace-pre-wrap tracking-wide text-gray-700">
                {data?.name}
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div
                className="rounded-xl px-8 py-2  text-lg bg-white shadow-lg shadow-slate-200 hover:shadow-md hover:-translate-y-1 active:scale-95 transition-all duration-300"
                style={{
                  backfaceVisibility: "hidden",
                }}
                onClick={() => {
                  setEvents(fetchedEvents);
                }}
              >
                All events
              </div>
              <div className="flex gap-2 items-center">
                <input
                  className={`w-full px-6 py-2 text-lg border-2 border-slate-400  rounded-lg outline-4 outline-gradient1b transition-all duration-300`}
                  type="text"
                  placeholder="Search Events"
                  ref={eventSearchInput}
                ></input>
                <div
                  className="text-2xl hover:scale-110 transition-all duration-200 active:scale-95 cursor-pointer"
                  onClick={searchEventHandler}
                >
                  <AiOutlineSearch />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
