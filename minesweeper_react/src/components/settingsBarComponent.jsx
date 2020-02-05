import React, { Component } from "react";
import "./settingsBasComponent.css";
import DifficultSelect from "./difficultSelectComponent";
import FlagsCounter from "./flagsCounterComponent";

class SettingsBar extends Component {
  state = {};
  render() {
    const { onDifficultChange, difficult, flags } = this.props;
    return (
      <div className="settings-bar">
        <DifficultSelect
          onDifficultChange={onDifficultChange}
          difficult={difficult}
        ></DifficultSelect>
        <FlagsCounter flags={flags}></FlagsCounter>
      </div>
    );
  }
}

export default SettingsBar;
