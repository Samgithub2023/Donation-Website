import React, { useRef } from "react";
import login from "../images/Login.png";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { loginNgo, loginUser } from "../firebase";
import { useNavigate } from "react-router-dom";
import RegisterNavBar from "./RegisterNavBar";

const Login = ({ type }) => {
  const navigate = useNavigate();
  const email = useRef();
  const password = useRef();
  async function submit(event) {
    event.preventDefault();
    if (type === "User") {
      const { success, error } = await loginUser(
        email.current.value,
        password.current.value
      );
      if (!success) return toast.error(error);
      toast.success("Logged in successfully!");
      navigate("/user");
    } else if (type === "Ngo") {
      const { success, error } = await loginNgo(
        email.current.value,
        password.current.value
      );
      if (!success) return toast.error(error);
      toast.success("Logged in successfully!");
      navigate("/ngo");
    }
  }

  return (
    <>
      <RegisterNavBar />
      {/* <div className="flex justify-center items-center m-8">
        <img className="w-1/3" src={login} alt="" />
        <form
          className="flex flex-col w-1/3 justify-center m-4"
          onSubmit={submit}
        >
          <h1 className="flex justify-center text-3xl font-bold my-4">
            {type.toUpperCase()} Login
          </h1>
          <input
            ref={email}
            className="px-4 py-3 border rounded-lg my-2 bg-gray-100 hover:bg-white"
            type="text"
            placeholder="Email"
            required
          />
          <input
            ref={password}
            className="px-4 py-3 border rounded-lg my-2 bg-gray-100 hover:bg-white"
            type="password"
            placeholder="Password"
            required
          />
          <button className="font-semibold w-1/3 my-2 mx-auto btn bg-gradient-to-r from-gradient1a to-gradient1b border rounded-lg px-4 py-2 m-2">
            Login
          </button>
          <p className="text-sm text-blue-600 my-2 flex justify-end cursor-pointer underline">
            Forgot password?
          </p>
          <p className=" flex my-2 justify-center text-sm">
            Don't have an account? &nbsp;{" "}
            <Link to={`/${type.toLowerCase()}/signup`}>
              <span className="text-blue-600 cursor-pointer underline">
                {" "}
                Register here
              </span>
            </Link>
          </p>
        </form>
      </div> */}

      <div className="flex flex-col md:flex-row justify-center items-center">
        <img className="w-2/3 md:w-1/3 mx-10" src={login} alt="" />
        <form
          className="flex flex-col w-4/5 max-w-lg  justify-center m-4"
          onSubmit={submit}
        >
          <h1 className=" text-center leading-10 text-3xl font-bold my-4">
            {type.toUpperCase()} Login
          </h1>
          <input
            ref={email}
            className="px-4 w-full py-3 border rounded-lg my-2 bg-gray-100 hover:bg-white"
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
            Login
          </button>
          <p className=" flex my-2 justify-center text-sm">
            Don't have an account? &nbsp;{" "}
            <Link to={`/${type.toLowerCase()}/signup`}>
              <span className="text-blue-600 cursor-pointer underline">
                {" "}
                Register here
              </span>
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
