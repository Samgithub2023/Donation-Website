/* eslint-disable jsx-a11y/alt-text */
import React, { useRef, useState, useEffect } from "react";
import { getAllEvents } from "../../firebase";
import dummyImage from "../../images/dummy2.png";
import { setEvent } from "../../firebase";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { AiOutlineSearch } from "react-icons/ai";
import { useDataContext } from "../../context/ContextProvider";
import { relativeTime } from "../../modules/time";
import { sortEvents } from "../../modules/array";
import { NotFound } from "./../User/NotFound";

export default function Posts() {
  const [post, setPost] = useState("flex");
  const title = useRef();
  const description = useRef();
  const image = useRef();
  const url = useRef();
  const { ngo } = useAuth();
  const [eventType, setEventType] = useState("all");
  const [events, setEvents] = useState([]);
  const [fetchedEvents, setFetchedEvents] = useState([]);
  const { setNgoDataUpdated, ngoData: data } = useDataContext();
  const eventSearchInput = useRef();
  useEffect(() => {
    getAllEvents().then(({ success, events }) => {
      if (success) {
        console.log("Happened");
        console.log(events);
        setEvents(events);
        setFetchedEvents(events);
      }
    });
  }, []);

  async function submit(event) {
    event.preventDefault();
    const { success, error } = await setEvent(
      ngo,
      title.current.value,
      description.current.value,
      image.current.value,
      url.current.value
    );
    if (!success) return toast.error(error);
    setNgoDataUpdated(true);
    toast.success("New event added!");
  }

  const searchEventHandler = () => {
    setEventType("all");
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

  return (
    <>
      {/* <div
        className={`text-2xl text-gray-500 px-8 py-8 font-sans tracking-widest ${message} animate-pulse `}
      >
        Welcome back to DoNation
      </div> */}
      <div
        className="fixed bottom-6 right-14 p-3 font-poppins bg-gradient-to-r from-[rgba(143,198,253,.8)] to-[rgba(224,196,253,.8)] hover:from-[rgba(143,198,253,1)] hover:to-[rgba(224,196,253,1)] rounded-full flex items-center justify-center"
        title="New Post"
        onClick={() => {
          setPost("hidden");
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 font-bold hover:animate-[spin_1s_ease-in-out] text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
      </div>

      <div className="pt-12 sm:pt-10 mb-10 max-w-6xl px-8 xl:mx-auto  w-full ">
        <div className="flex gap-12 w-full ">
          <div className={` flex-col gap-12 w-full sm:w-2/3 ${post}`}>
            <div className="flex flex-col sm:hidden gap-4 justify-evenly items-center ">
              <div
                className="rounded-xl whitespace-pre-wrap px-8 py-2 w-full  text-lg bg-white shadow-lg shadow-slate-300 hover:shadow-md hover:-translate-y-0.5 active:scale-95 transition-all duration-300 cursor-pointer"
                style={{
                  backfaceVisibility: "hidden",
                }}
                onClick={() => {
                  setEvents(fetchedEvents);
                }}
              >
                All events
              </div>
              <div
                className="rounded-xl whitespace-pre-wrap px-8 py-2 w-full  text-lg bg-white shadow-lg shadow-slate-300 hover:shadow-md hover:-translate-y-0.5 active:scale-95 transition-all duration-300 cursor-pointer"
                style={{
                  backfaceVisibility: "hidden",
                }}
                onClick={() => {
                  setEvents(data?.events || []);
                  setEventType("our");
                }}
              >
                Our events
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
                <p className="text-center text-2xl text-slate-700 tracking-widest">
                  No event found
                </p>
                <NotFound />
              </div>
            )}
            {events &&
              events
                ?.sort(sortEvents)
                .map(
                  ({
                    title,
                    description,
                    image,
                    url,
                    date,
                    ngoImage,
                    name,
                  }) => (
                    <div
                      key={date}
                      className="flex flex-col px-8 py-4  rounded-3xl shadow-xl w-full gap-6 "
                    >
                      <a href={url} target="_blank" rel="noreferrer">
                        <div className="flex gap-6 items-center">
                          <img
                            src={
                              (eventType === "our" ? data?.image : ngoImage) ||
                              dummyImage
                            }
                            className="rounded-full w-16 h-16 object-cover"
                          />
                          <div className="flex flex-col p-1 gap-.5">
                            <div className="text-2xl text-gray-800 font-extralight">
                              {eventType === "our" ? data?.name : name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {relativeTime(date)}
                            </div>
                          </div>
                        </div>
                        <div>
                          <img src={image} className="w-full h-64"></img>
                        </div>
                      </a>
                      <div className="font-semibold text-2xl pl-3">{title}</div>
                      <div className="font-light leading-7 -mt-3">
                        {description}
                      </div>
                    </div>
                  )
                )}
          </div>
          <div
            className={`w-full sm:w-2/3 shadow-[-4px_0px_24px_rgba(0,0,0,.2)]  shadow-slate-300 rounded-3xl px-8 py-8 pt-16  flex-col gap-8 text-gray-600 relative ${
              post === "flex" ? "hidden" : "flex"
            }`}
          >
            <div
              className="absolute top-7 right-10"
              onClick={() => {
                setPost("flex");
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-gradient1b font-extrabold"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-thin">New events</h1>
            <form onSubmit={submit} className="flex flex-col gap-8 w-full">
              <div className="w-full">
                <input
                  className={`w-full px-4 py-2 text-lg shadow-[0px_0px_2px_rgba(0,0,0,.2)]  bg-gray-100 rounded-lg outline-4 outline-gradient1b`}
                  type="text"
                  placeholder="Event Name"
                  required
                  ref={title}
                ></input>
              </div>

              <div className="w-full">
                <textarea
                  rows={3}
                  className={`w-full px-4 py-2 text-lg shadow-[0px_0px_2px_rgba(0,0,0,.2)]  bg-gray-100 rounded-lg outline-4 outline-gradient1b`}
                  type="text"
                  placeholder="Event description"
                  required
                  ref={description}
                ></textarea>
              </div>
              <div className="w-full">
                <input
                  className={`w-full px-4 py-2 text-lg shadow-[0px_0px_2px_rgba(0,0,0,.2)]  bg-gray-100 rounded-lg outline-4 outline-gradient1b`}
                  type="text"
                  placeholder="Event banner image url"
                  required
                  ref={image}
                ></input>
              </div>
              <div className="w-full">
                <input
                  className={`w-full px-4 py-2 text-lg shadow-[0px_0px_2px_rgba(0,0,0,.2)]  bg-gray-100 rounded-lg outline-4 outline-gradient1b`}
                  type="text"
                  placeholder="Event url"
                  ref={url}
                ></input>
              </div>
              <button
                type="submit"
                //   className="bg-gradient-to-r from-gradient1a to-gradient1b py-3 text-3xl rounded-3xl hover:-translate-y-0.5 transition-all duration-200 hover:scale-[1.01] "
                // >
                className="font-semibold inline-block bg-gradient-to-r from-gradient1a to-gradient1b border rounded-lg px-4 py-2 m-2"
              >
                Submit
              </button>
            </form>
          </div>
          <div className="hidden sm:flex flex-col  w-1/3 gap-8">
            <div className="flex flex-col justify-center items-center w-full p-6 pt-12 rounded-2xl shadow-2xl gap-4 relative">
              <img
                src={data?.image || dummyImage}
                className="rounded-full shadow-xl w-20 h-20 object-cover"
              />
              <div className="text-2xl font-medium text-gray-700">
                {data?.name}
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div
                className="rounded-xl px-8 py-2  text-lg bg-white shadow-lg shadow-slate-200 hover:shadow-md hover:-translate-y-0.5 active:scale-95 transition-all duration-300 cursor-pointer"
                style={{
                  backfaceVisibility: "hidden",
                }}
                onClick={() => {
                  setEvents(fetchedEvents);
                }}
              >
                All events
              </div>
              <div
                className="rounded-xl px-8 py-2  text-lg bg-white shadow-lg shadow-slate-200 hover:shadow-md hover:-translate-y-0.5 active:scale-95 transition-all duration-300 cursor-pointer"
                style={{
                  backfaceVisibility: "hidden",
                }}
                onClick={() => {
                  setEvents(data?.events || []);
                  setEventType("our");
                }}
              >
                Our events
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
