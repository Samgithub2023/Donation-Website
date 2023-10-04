import react, { useState } from "react";
import { Link } from "react-router-dom";
import poster from "../images/landing.webp";

export default function RegisterBannerLanding() {
    return (<div className='bg-[url("images/background.png")] bg-cover bg-no-repeat bg-center w-100 min-h-screen h-fit  pt-36 pb-20 px-10 flex flex-col sm:flex-row sm:justify-center  '>
        <div className="block sm:hidden text-left ">
            <img
                className="animate-bounce"
                src={poster}
                alt=""
            />
        </div>
        <div className="mx-4">
            <h1 className="text-4xl font-bold">Donate!</h1>
            <p className="text-xl my-8">
                Be part of a good cause. Show some love and donate to the society.
            </p>
            <div className="flex flex-col  md:flex-row">
                <Link
                    to="/user/signup"><span
                        className="font-semibold inline-block bg-gradient-to-r from-gradient1a to-gradient1b border rounded-lg px-4 py-2 m-2"
                    >
                        Register as Donor
                    </span>
                </Link>
                <Link
                    to="/ngo/signup"><span
                        className="font-semibold inline-block bg-gradient-to-r from-gradient1a to-gradient1b border rounded-lg px-4 py-2 m-2"
                    >
                        Register as NGO
                    </span>
                </Link>

            </div>
        </div>
        <div className="hidden sm:block mx-4">
            <img
                className="animate-bounce"
                src={poster}
                alt=""
            />
        </div>

    </div>);
}