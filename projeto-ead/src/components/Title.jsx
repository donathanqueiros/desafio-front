import React from "react";
import "../assets/styles/title.scss";

const Title = ({ value, ...props }) => {
  return (
    <h5 style={props.style} className={"title " + props.className}>
      {value}
    </h5>
  );
};

export default Title;
