import React, { Component } from "react";
import "./settingsBasComponent.css";
import DifficultSelect from "./difficultSelectComponent";

class SettingsBar extends Component {
  state = {};
  render() {
    const { onDifficultChange, difficult } = this.props;
    return (
      <div className="settings-bar">
        <DifficultSelect
          onDifficultChange={onDifficultChange}
          difficult={difficult}
        ></DifficultSelect>
      </div>
    );
  }
}

export default SettingsBar;
