import React from "react";
import { EntypoFlag } from "react-entypo";
import "./flagsCounterComponent.css";

const FlagsCounter = ({ flags }) => {
  return (
    <div className="flag-counter">
      <EntypoFlag className="flag-counter-icon" />{" "}
      <span className="flag-counter-number">{flags}</span>
    </div>
  );
};

export default FlagsCounter;
