import React from "react";
import "./Display.css";

export default function Button(props) {
  return <div className="display">{props.value}</div>;
}
