import React from "react";

import imageOne from "./../images/care.webp";
import imageTwo from "./../images/giveIndia.webp";
import imageThree from "./../images/goonj.webp";
import imageFour from "./../images/nanhikali.webp";
import imageFive from "./../images/pratham.webp";


const Testimonials = () => {
  return (
    <div className="flex gap-14 flex-col mt-20 border-b-2 pb-12">
      <h1 className="text-2xl md:text-4xl font-bold text-center">
        As Recognised By
      </h1>
      <div className="flex gap-2 sm:gap-4 md:gap-8 justify-center w-100 ">
        <img className="w-[17%] md:w-[15%] h-10 sm:h-12 md:h-20 " src={imageOne} alt="Care India"></img>
        <img className="w-[17%] md:w-[15%] h-10 sm:h-12 md:h-20 " src={imageTwo} alt="Give India"></img>
        <img className="w-[17%] md:w-[15%] h-10 sm:h-12 md:h-20 " src={imageThree} alt="Goonj"></img>
        <img className="w-[17%] md:w-[15%] h-10 sm:h-12 md:h-20 " src={imageFour} alt="Nanhikali"></img>
        <img className="w-[17%] md:w-[15%] h-10 sm:h-12 md:h-20 " src={imageFive} alt="Pratham"></img>
      </div>

    </div>
  );
};

export default Testimonials;
