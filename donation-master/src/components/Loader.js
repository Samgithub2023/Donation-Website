import React from "react";
import Logo from "./Logo";
import PropTypes from "prop-types";

const Loader = (props) => {
  return (
    <div className="loader w-screen h-screen  flex justify-center items-center   ">
      <Logo dimension={props.dimension} loader={true} />
    </div>
  );
};
Loader.defaultProp = {
  dimension: 10,
};
Loader.prototype = {
  dimension: PropTypes.number.isRequired,
};

export default Loader;
