import React from "react";
import "../assets/styles/card.scss";

export default ({ title, value, ...props }) => {
  return (
    <div style={props.style} className={"card " + props.className}>
      <span>{title}</span>
      <span>{value}</span>
    </div>
  );
};
