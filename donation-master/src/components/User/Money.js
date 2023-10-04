import React, { useEffect } from "react";
import about1 from "../../images/about1.png";
import { toast } from "react-toastify";
import { useDataContext } from "../../context/ContextProvider";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Money = () => {
  const { userData: data } = useDataContext();
  const { email } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!data) {
      toast.warn("Please complete your profile first");
      navigate("/user/profile");
    }
  });

  async function submit(event) {
    event.preventDefault();
    toast.success("Thanks for donating");
  }

  return (
    <>
      <div className="flex items-center justify-center w-full min-h-[90vh] h-fit bg-gradient-to-r from-gradient1a to-gradient1b">
        <div className="p-4  flex justify-center">
          <div className="flex flex-col md:flex-row mx-auto justify-center items-center">
            <div className="p-2 w-1/3 ">
              <img className="rounded-full" src={about1} alt="" />
            </div>
            <div className="p-2 flex flex-col gap-4 items-center">
              <h1 className="font-bold text-xl m-1">
                Please provide the following information for donations:
              </h1>
              <form onSubmit={submit} className="w-full">
                <div className="flex w-full flex-col gap-2">
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
                      placeholder="Amount"
                      required
                    ></input>
                  </div>

                  <button
                    type="submit"
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

export default Money;
