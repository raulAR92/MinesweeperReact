import React, { Component } from "react";
import "./blockComponents.css";
import { EntypoFlag, EntypoBlock } from "react-entypo";

class Block extends Component {
  render() {
    const {
      value,
      isMarked,
      clicked,
      onDig,
      onFlag,
      iIndex,
      jIndex
    } = this.props;
    if (isMarked) {
      return (
        <div
          className={"block " + (clicked ? "clicked" : "non-clicked")}
          onClick={() => onDig(iIndex, jIndex)}
          onContextMenu={event => onFlag(iIndex, jIndex, event)}
        >
          <EntypoFlag className="flag-icon" />
        </div>
      );
    } else {
      return (
        <div
          className={"block " + (clicked ? "clicked" : "non-clicked")}
          onClick={() => onDig(iIndex, jIndex)}
          onContextMenu={event => onFlag(iIndex, jIndex, event)}
        >
          <span className={value === -1 ? "hide" : ""}>{value}</span>
          <div className={value === -1 ? "" : "hide"}>
            <EntypoBlock className="bomb-icon" />
          </div>
        </div>
      );
    }
  }
}

export default Block;
