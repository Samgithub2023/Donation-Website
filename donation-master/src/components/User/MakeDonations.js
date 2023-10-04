import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useDataContext } from "../../context/ContextProvider";
import { initiateDonation } from "../../firebase";
import useAuth from "../../hooks/useAuth";
import about1 from "../../images/about1.png";
import { useNavigate } from "react-router-dom";

const MakeDonations = () => {
  const { userData: data, setUserDataUpdated } = useDataContext();
  const { user, email } = useAuth();
  const navigate = useNavigate();
  const description = useRef();

  async function submit(event) {
    event.preventDefault();
    const { success } = await initiateDonation(user, description.current.value);
    if (!success) return toast.error("Some error occurred...");
    setUserDataUpdated(true);
    window.location.href = "/user/donations";
    // toast.success('Donation initiated')
  }

  useEffect(() => {
    if (!data) {
      toast.warn("Please complete your profile first");
      navigate("/user/profile");
    }
  });

  return (
    <>
      <div className="flex items-center justify-center w-full min-h-[90vh] h-fit bg-gradient-to-r from-gradient1a to-gradient1b">
        <div className="p-4  flex justify-center">
          <div className="flex flex-col md:flex-row mx-auto justify-center items-center">
            <div className=" w-2/3 md:w-1/3 ">
              <img className="rounded-full" src={about1} alt="" />
            </div>
            <div className="p-2 flex flex-col gap-4 items-center">
              <h1 className="font-bold text-xl m-1 text-center">
                Please provide the following information for donations:
              </h1>
              <form onSubmit={submit} className="w-full">
                <div className="w-full flex flex-col gap-2">
                  <div className="w-full flex flex-col md:flex-row gap-4">
                    <input
                      className={`w-full px-4 py-2 text-lg shadow-[0px_0px_2px_rgba(0,0,0,.2)]  bg-gray-100 rounded-lg outline-4 outline-gradient1b`}
                      type="text"
                      placeholder="Name"
                      value={data?.name}
                      required
                    ></input>
                    <input
                      className={`w-full px-4 py-2 text-lg shadow-[0px_0px_2px_rgba(0,0,0,.2)]  bg-gray-100 rounded-lg outline-4 outline-gradient1b`}
                      type="email"
                      value={email}
                      required
                    ></input>
                  </div>

                  <div className="w-full flex flex-col md:flex-row gap-4">
                    <input
                      className={`w-full px-4 py-2 text-lg shadow-[0px_0px_2px_rgba(0,0,0,.2)]  bg-gray-100 rounded-lg outline-4 outline-gradient1b`}
                      type="phone"
                      placeholder="Mobile"
                      defaultValue={data?.mobile}
                      required
                    ></input>
                    <input
                      className={`w-full px-4 py-2 text-lg shadow-[0px_0px_2px_rgba(0,0,0,.2)]  bg-gray-100 rounded-lg outline-4 outline-gradient1b`}
                      type="number"
                      placeholder="Pincode"
                      defaultValue={data?.pincode}
                      required
                    ></input>
                  </div>

                  <div className="w-full flex flex-col md:flex-row gap-4">
                    <input
                      className={`w-full px-4 py-2 text-lg shadow-[0px_0px_2px_rgba(0,0,0,.2)]  bg-gray-100 rounded-lg outline-4 outline-gradient1b`}
                      type="text"
                      placeholder="Address"
                      defaultValue={data?.address}
                      required
                    ></input>
                  </div>

                  <div className="w-full flex flex-col md:flex-row gap-4">
                    <textarea
                      rows={3}
                      minLength={30}
                      className={`w-full px-4 py-2 text-lg shadow-[0px_0px_2px_rgba(0,0,0,.2)]  bg-gray-100 rounded-lg outline-4 outline-gradient1b`}
                      type="text"
                      placeholder="Description"
                      ref={description}
                      required
                    ></textarea>
                  </div>
                  {/* <input
                    className="rounded-md  px-2 py-1 m-1 bg-gray-100 hover:bg-white"
                    type="email"
                    value={email}
                  />
                  <input
                    className="rounded-md  px-2 py-1 m-1 bg-gray-100 hover:bg-white"
                    type="phone"
                    placeholder="Mobile"
                    defaultValue={data?.mobile}
                  />
                  <input
                    className="rounded-md  px-2 py-1 m-1 bg-gray-100 hover:bg-white"
                    type="number"
                    placeholder="Pincode"
                    defaultValue={data?.pincode}
                  />
                  <input
                    className="rounded-md  px-2 py-1 m-1 bg-gray-100 hover:bg-white"
                    type="text"
                    placeholder="Address"
                    defaultValue={data?.address}
                  /> */}
                  {/* <input
                    ref={description}
                    className="rounded-md  px-2 py-1 m-1 bg-gray-100 hover:bg-white"
                    type="text"
                    placeholder="Description (Regarding type of donation)"
                    required
                  /> */}
                  <button
                    type="submit"
                    //   className="bg-gradient-to-r from-gradient1a to-gradient1b py-3 text-3xl rounded-3xl hover:-translate-y-0.5 transition-all duration-200 hover:scale-[1.01] "
                    // >
                    className="font-semibold inline-block bg-gradient-to-r bg-gradient1a to-gradient1b border-4  rounded-lg px-4 py-2 m-2  tracking-wide hover:-translate-y-.5 active:scale-95 cursor-pointer transition-all duration-500"
                  >
                    SUBMIT
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MakeDonations;
