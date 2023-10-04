/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { setUserData } from "../../firebase";
import useAuth from "../../hooks/useAuth";
import dummyImage from "../../images/dummy.webp";
import bgImage from "./userImage.jpg";
import { toast } from "react-toastify";
import { useDataContext } from "../../context/ContextProvider";
import { logout } from "../../firebase";
import logOutIcon from "./../../images/confirmation.webp";

export default function UserProfile() {
  const [edit, setEdit] = useState(true);
  const [page, setpage] = useState("profile");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatched, setPasswordMatched] = useState(false);
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");
  const { user, email } = useAuth();
  const { userData: data, setUserDataUpdated } = useDataContext();
  const name = useRef();
  const image = useRef();
  const mobile = useRef();
  const address = useRef();
  const pincode = useRef();

  async function handleLogout() {
    const { success } = await logout();
    if (!success) return toast.error("Some error occured...");
    toast.success("Logged out successfully");
  }

  function hiddenModal() {
    setpage("profile");
  }

  async function submit(event) {
    event.preventDefault();
    const { success } = await setUserData(
      user,
      name.current.value,
      image.current.value,
      mobile.current.value,
      address.current.value,
      pincode.current.value
    );
    if (!success) return toast.error("Some error occurred...");
    setUserDataUpdated(true);
    window.location.reload();
    // toast.success("Profile updated successfully!");
  }

  useEffect(() => {
    if (
      password === confirmPassword &&
      password !== "" &&
      confirmPassword !== ""
    ) {
      setPasswordMatched(true);
    } else {
      setPasswordMatched(false);
    }
  }, [password, confirmPassword]);

  return (
    <>
      <div className={`${page === "logout" ? "" : "hidden"}`}>
        <div className={`relative  logoutPanel z-10  `}>
          <div
            className={`fixed top-1/2 left-1/2  z-10 -translate-x-1/2 -translate-y-1/2 `}
          >
            <div className="bg-white flex flex-col gap-6  items-center px-16 py-8 rounded-3xl border-t-8 border-t-green-400 ">
              <img
                src={logOutIcon}
                alt="Log out"
                className="w-24 animate-[spin_1s_ease-in-out]"
              />
              <h1 className="text-xl tracking-wide">
                Are you sure you want to logout
              </h1>
              <div className="flex gap-8 ">
                <button
                  className="tracking-wider rounded-2xl text-xl font-semibold bg-[#7ed56f] px-6 py-2 text-gray-100 transition-all duration-200 hover:scale-105 hover:-translate-y-1 ngo-logout-cancel"
                  onClick={hiddenModal}
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="tracking-wider rounded-2xl text-xl font-semibold bg-[#28b485]  px-6 py-2 text-white transition-all duration-200 hover:scale-105 hover:-translate-y-1 ngo-logout-confirm"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
          <div
            className="fixed top-0 left-0 w-screen h-screen bg-black/50 overlay z-5 "
            onClick={hiddenModal}
          ></div>
        </div>
      </div>
      <div className="mb-10">
        <div className="max-w-7xl  2xl:mx-auto mx-12 mt-8 ">
          <h1 className="text-3xl font-bold">Settings</h1>
          <div className="flex flex-col sm:flex-row gap-12 sm:gap-28 mt-8">
            <div className="flex flex-row sm:flex-col  gap-5">
              <div
                className={`text-xl cursor-pointer ${
                  page === "profile" ? "font-bold text-2xl" : ""
                }`}
                onClick={() => {
                  setpage("profile");
                }}
              >
                Profile
              </div>
              <div
                className={`hidden sm:block text-xl cursor-pointer ${
                  page === "password" ? "font-bold text-2xl" : ""
                }`}
                onClick={() => {
                  setpage("password");
                }}
              >
                Password
              </div>
              <div
                className={`text-xl cursor-pointer ${
                  page === "logout" ? "font-bold text-2xl" : ""
                }`}
                onClick={() => {
                  setpage("logout");
                }}
              >
                Logout
              </div>
            </div>
            <div className="w-full ">
              <div className="h-36 rounded-tl-3xl w-full backgroundImageUser relative ">
                <img
                  src={data?.image || dummyImage}
                  alt="User Logo"
                  className="absolute rounded-full w-28 h-28 top-[85%] left-8"
                ></img>
                <div className="absolute top-full left-44 mt-4 flex flex-col gap-1">
                  <h1 className="text-xl sm:text-2xl font-bold tracking-wide">
                    {data?.name}
                  </h1>
                  <h1 className="sm:hidden  font-light tracking-widest text-xs">
                    Update is not possible in mobile browser
                  </h1>
                  <h1 className="hidden md:block font-light tracking-widest text-xs">
                    Update your profile and personal details
                  </h1>
                </div>
              </div>
              <form
                onSubmit={submit}
                className={`gap-10 mt-36 w-full flex-col relative ${
                  page === "profile" ? "flex" : "hidden"
                }`}
              >
                <div className="hidden sm:flex absolute -top-36 right-0 mt-4  gap-4 items-center">
                  <button
                    type="button"
                    className={`bg-gray-200 text-black font-semibold px-4 py-2 rounded-xl ${
                      edit ? "hidden" : ""
                    }`}
                    onClick={() => {
                      setEdit(true);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type={!edit ? "button" : "submit"}
                    className="bg-black text-white px-4 py-2 rounded-xl"
                    onClick={() => {
                      edit ? setEdit(false) : setEdit(true);
                    }}
                  >
                    {edit ? "Update" : "Save Changes"}
                  </button>
                </div>
                <div className="flex flex-col mt-4 sm:flex-row gap-6 sm:gap-12 w-full ">
                  <div className="text-xl font-medium w-full sm:w-1/2">
                    Username
                  </div>
                  <div className="w-full">
                    <input
                      disabled={edit}
                      ref={name}
                      className={`w-full px-6 py-2 text-lg ${
                        edit ? "text-gray-600" : ""
                      }  bg-gray-100 rounded-lg`}
                      type="text"
                      required={true}
                      minLength={1}
                      defaultValue={data?.name}
                    ></input>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 w-full ">
                  <div className="text-xl font-medium w-full sm:w-1/2">
                    <div>Logo URL</div>
                    <div className="font-light text-sm mt-1">
                      This will be displayed on your profile{" "}
                    </div>
                  </div>
                  <div className="w-full">
                    <input
                      disabled={edit}
                      ref={image}
                      className={`w-full px-6 py-2 text-lg ${
                        edit ? "text-gray-600" : ""
                      }  bg-gray-100 rounded-lg`}
                      type="text"
                      defaultValue={data?.image}
                    ></input>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 w-full ">
                  <div className="text-xl font-medium w-full sm:w-1/2">
                    <div>Email</div>
                  </div>
                  <div className="w-full">
                    <input
                      disabled
                      className={`w-full px-6 py-2 text-lg ${
                        edit ? "text-gray-600" : ""
                      }  bg-gray-100 rounded-lg`}
                      type="email"
                      value={email}
                    ></input>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 w-full ">
                  <div className="text-xl font-medium w-full sm:w-1/2">
                    <div>Contact No.</div>
                  </div>
                  <div className="w-full">
                    <input
                      disabled={edit}
                      ref={mobile}
                      className={`w-full px-6 py-2 text-lg ${
                        edit ? "text-gray-600" : ""
                      }  bg-gray-100 rounded-lg`}
                      type="text"
                      required={true}
                      minLength={1}
                      defaultValue={data?.mobile}
                    ></input>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 w-full ">
                  <div className="text-xl font-medium w-full sm:w-1/2">
                    <div>Address</div>
                  </div>
                  <div className="w-full">
                    <textarea
                      rows={2}
                      disabled={edit}
                      ref={address}
                      className={`w-full px-6 py-2 text-lg ${
                        edit ? "text-gray-600" : ""
                      }  bg-gray-100 rounded-lg`}
                      type="text"
                      required={true}
                      minLength={1}
                      defaultValue={data?.address}
                    ></textarea>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 w-full ">
                  <div className="text-xl font-medium w-full sm:w-1/2">
                    <div>Pincode</div>
                  </div>
                  <div className="w-full">
                    <input
                      disabled={edit}
                      ref={pincode}
                      className={`w-full px-6 py-2 text-lg ${
                        edit ? "text-gray-600" : ""
                      }  bg-gray-100 rounded-lg`}
                      type="text"
                      required={true}
                      minLength={1}
                      defaultValue={data?.pincode}
                    ></input>
                  </div>
                </div>
              </form>
              <form
                className={` gap-10 mt-36 w-full flex-col ${
                  page === "password" ? "flex" : "hidden"
                }`}
              >
                <div className="flex gap-12 w-full items-center">
                  <div className="text-xl font-medium w-1/2">
                    <div>New password</div>
                  </div>
                  <div className="w-full">
                    <input
                      required={true}
                      minLength={8}
                      className={`w-full px-6 py-2 text-lg ${
                        edit ? "text-gray-600" : ""
                      }  bg-gray-100 rounded-lg password`}
                      type="text"
                      placeholder="New password"
                      onKeyDown={() => {
                        setPassword(document.querySelector(".password").value);
                      }}
                    ></input>
                  </div>
                </div>
                <div className="flex gap-12 w-full items-center">
                  <div className="text-xl font-medium w-1/2">
                    <div>Confirm password</div>
                  </div>
                  <div className="w-full relative">
                    <input
                      type={confirmPasswordType}
                      required={true}
                      minLength={8}
                      className={`password-show w-full px-6 py-2 text-lg ${
                        edit ? "text-gray-600" : ""
                      }  bg-gray-100 rounded-lg confirmPassword`}
                      placeholder="Confirm Password"
                      onKeyDown={() => {
                        setConfirmPassword(
                          document.querySelector(".confirmPassword").value
                        );
                      }}
                    ></input>
                    <div
                      className="absolute right-6 top-1/2 -translate-y-1/2"
                      onClick={() => {
                        if (confirmPasswordType === "text") {
                          setConfirmPasswordType("password");
                        } else {
                          setConfirmPasswordType("text");
                        }
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-5 w-5 ${
                          confirmPasswordType === "text" ? "hidden" : ""
                        }`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                          clipRule="evenodd"
                        />
                        <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-5 w-5 ${
                          confirmPasswordType === "password" ? "hidden" : ""
                        }`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path
                          fillRule="evenodd"
                          d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between mb-12 ">
                  <div className="text-left">
                    <h1
                      className={`text-xl ${
                        passwordMatched ? "text-green-400" : "text-red-400"
                      } ${password || confirmPassword ? "block" : "hidden"}`}
                    >
                      Password{" "}
                      {`${passwordMatched ? "Matched" : "not matched"}`}
                    </h1>
                  </div>
                  <button
                    className={`bg-black text-white px-4 py-2 rounded-xl ${
                      passwordMatched ? "" : "hidden"
                    }`}
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
