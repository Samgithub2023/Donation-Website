import React, { useRef } from "react";
import login from "../images/Register.webp";
import { Link } from "react-router-dom";
import { signupNgo, signupUser } from "../firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import RegisterNavBar from "./RegisterNavBar";

const Register = ({ type }) => {
  const navigate = useNavigate();
  const email = useRef();
  const password = useRef();
  async function submit(event) {
    event.preventDefault();
    if (type === "User") {
      const { success, error } = await signupUser(
        email.current.value,
        password.current.value
      );
      if (!success) return toast.error(error);
      toast.success("Signed up successfully!");
      navigate("/user");
    } else if (type === "Ngo") {
      const { success, error } = await signupNgo(
        email.current.value,
        password.current.value
      );
      if (!success) return toast.error(error);
      toast.success("Signed up successfully!");
      navigate("/ngo");
    }
  }

  return (
    <>
      <RegisterNavBar />
      <div className="flex flex-col md:flex-row justify-center items-center">
        <img className="w-2/3 md:w-1/3 mx-10" src={login} alt="" />
        <form className="flex flex-col  justify-center m-4" onSubmit={submit}>
          <h1 className=" text-center leading-10 text-3xl font-bold my-4">
            Register with DoNation ({type.toUpperCase()})
          </h1>
          <input
            ref={email}
            className="px-4 py-3 border rounded-lg my-2 bg-gray-100 hover:bg-white"
            type="email"
            placeholder="Email"
            required
          />
          <input
            ref={password}
            className="px-4 py-3 border rounded-lg my-2 bg-gray-100 hover:bg-white"
            type="password"
            placeholder="Password"
            required
            minLength={6}
          />
          <button
            type="submit"
            className="font-semibold w-full my-2 mx-auto btn bg-gradient-to-r from-gradient1a to-gradient1b border rounded-lg px-4 py-2 m-2"
          >
            Register
          </button>
          <p className=" flex my-2 justify-center text-sm">
            Already have an account? &nbsp;
            <Link to={`/${type.toLowerCase()}/login`}>
              <span className="text-blue-600 cursor-pointer underline">
                Login here
              </span>
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;
