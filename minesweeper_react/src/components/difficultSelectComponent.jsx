import React from "react";
import difficultLevels from "../common/difficultLevels";
import "./difficultSelectComponent.css";

const DifficultSelect = ({ onDifficultChange, difficult }) => {
  return (
    <div>
      <select
        className="difficult-select"
        value={difficult.id}
        onChange={event => onDifficultChange(event)}
      >
        {difficultLevels.map((dl, i) => {
          return (
            <option key={i} value={dl.id}>
              {dl.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default DifficultSelect;
