import React, { useState } from "react";
// import styled from "styled-components";
import PropTypes from "prop-types";

const Logo = (props) => {
  const [loader] = useState(props.loader ? "circle" : "");
  return (
    <div
      className=""
      style={{
        padding: (3 / 8) * props.dimension + "rem",
      }}
    >
      <div
        className={`grid grid-rows-2 grid-cols-2 relative `}
        style={{
          width: props.dimension + "rem",
          height: props.dimension + "rem",
        }}
      >
        <div
          className={` ${loader} absolute w-[37.5%] h-[37.5%]  -top-[18.75%] -left-[18.75%] rounded-full  border-yellow-400   `}
          style={{
            borderWidth: (1 / 16) * props.dimension + "rem",
          }}
        ></div>
        <div
          className={`${loader} absolute w-[37.5%] h-[37.5%]  -top-[18.75%] -right-[18.75%] rounded-full  border-green-400   `}
          style={{
            borderWidth: (1 / 16) * props.dimension + "rem",
          }}
        ></div>
        <div
          className={`${loader} absolute w-[37.5%] h-[37.5%]  -bottom-[18.75%] -left-[18.75%] rounded-full  border-blue-400   `}
          style={{
            borderWidth: (1 / 16) * props.dimension + "rem",
          }}
        ></div>
        <div
          className={`${loader} absolute w-[37.5%] h-[37.5%]  -bottom-[18.75%] -right-[18.75%] rounded-full  border-purple-400   `}
          style={{
            borderWidth: (1 / 16) * props.dimension + "rem",
          }}
        ></div>

        <div className="absolute w-1/2 h-1/2  top-0 left-0">
          <div className="relative w-full h-full">
            <div className="absolute z-0 right-0 top-0 bg-gradient-to-r w-full h-full from-yellow-300 via-yellow-400 to-yellow-500  triangle-left-top-big"></div>
            <div className="absolute z-10 right-[37.5%] top-[25%] w-[37.5%] h-[37.5%] bg-white triangle-left-top-small"></div>
            {/* <div className="relative right-0 top-0 w-20 h-20 bg-blue-200 circle-left-top-big"></div>
          <div className="relative right-0 top-0 w-20 h-20 bg-blue-200 circle-left-top-small"></div> */}
          </div>
        </div>
        <div className="absolute w-1/2 h-1/2  top-0 right-0">
          <div className="relative w-full h-full">
            <div className="absolute z-0 right-0 top-0  w-full h-full bg-gradient-to-l from-green-300  via-green-400 to-green-500 triangle-right-top-big"></div>
            <div className="absolute z-10 left-[37.5%] top-[25%] w-[37.5%] h-[37.5%] bg-white triangle-right-top-small"></div>
            {/* <div className="relative right-0 top-0 w-20 h-20 bg-blue-200 circle-left-top-big"></div>
          <div className="relative right-0 top-0 w-20 h-20 bg-blue-200 circle-left-top-small"></div> */}
          </div>
        </div>
        <div className="absolute w-1/2 h-1/2 bottom-0 left-0">
          <div className="relative w-full h-full">
            <div className="absolute z-0 left-0 top-0 w-full h-full bg-gradient-to-r from-blue-300  via-blue-400 to-blue-500 triangle-left-bottom-big"></div>
            <div className="absolute z-10 left-[25%] bottom-[25%] w-[37.5%] h-[37.5%] bg-white triangle-left-bottom-small"></div>
            {/* <div className="relative right-0 top-0 w-20 h-20 bg-blue-200 circle-left-top-big"></div>
          <div className="relative right-0 top-0 w-20 h-20 bg-blue-200 circle-left-top-small"></div> */}
          </div>
        </div>
        <div className="absolute w-1/2 h-1/2 bottom-0 right-0">
          <div className="relative w-full h-full">
            <div className="absolute z-0 right-0 top-0 w-full h-full bg-gradient-to-r from-purple-300  via-purple-400 to-purple-500 triangle-right-bottom-big"></div>
            <div className="absolute z-10 right-[25%] bottom-[25%] w-[37.5%] h-[37.5%] bg-white triangle-right-bottom-small"></div>
            {/* <div className="relative right-0 top-0 w-20 h-20 bg-blue-200 circle-left-top-big"></div>
          <div className="relative right-0 top-0 w-20 h-20 bg-blue-200 circle-left-top-small"></div> */}
          </div>
        </div>
      </div>
    </div>
  );
};
Logo.defaultProp = {
  dimension: 8,
  loader: false,
};
Logo.propTypes = {
  dimension: PropTypes.number.isRequired,
  loader: PropTypes.bool,
};

export default Logo;
