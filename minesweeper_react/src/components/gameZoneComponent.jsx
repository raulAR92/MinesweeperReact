import React, { Component } from "react";
import SettingsBar from "./settingsBarComponent";
import Board from "./boardComponent";
import difficultLevels from "../common/difficultLevels";
import utils from "../common/utils";
import "./gameZoneComponent.css";

class GameZone extends Component {
  state = {};
  constructor() {
    super();
    let difficult = difficultLevels.filter(d => d.id === 2);
    console.log(utils);
    const matrix = utils.calculeMatrix(difficult[0]);
    this.state = {
      difficult: difficult[0],
      matrix: matrix
    };
  }

  handleLevelChange = event => {
    const difficultID = parseInt(event.target.value);
    console.log(difficultLevels);
    let newLevel = difficultLevels.filter(d => d.id === difficultID);
    let newMatrix = utils.calculeMatrix(newLevel[0]);
    this.setState(() => {
      return { difficult: newLevel[0], matrix: newMatrix };
    });
  };

  setBoard = matrix => {
    this.setState(() => {
      return { matrix };
    });
  };

  handleClick = (i, j) => {
    let matrixToUpdate = [...this.state.matrix];
    let block = { ...matrixToUpdate[i][j] };
    if (!block.isMarked && !block.clicked) {
      block.clicked = true;
      matrixToUpdate[i][j] = block;
      this.setState(() => {
        return { matrix: matrixToUpdate };
      });
    }
  };

  handleRightClick = (i, j, e) => {
    e.preventDefault();
    let matrixToUpdate = [...this.state.matrix];
    let block = { ...matrixToUpdate[i][j] };
    if (!block.clicked) {
      block.isMarked = !block.isMarked;
      matrixToUpdate[i][j] = block;
      this.setState(() => {
        return { matrix: matrixToUpdate };
      });
    }
  };

  render() {
    const { difficult } = this.state;
    const { matrix } = this.state;
    return (
      <div className={"game-zone " + difficult.className}>
        <SettingsBar
          difficult={difficult}
          onDifficultChange={this.handleLevelChange}
        ></SettingsBar>
        <Board
          matrix={matrix}
          difficultClass={difficult.className}
          onDig={this.handleClick}
          onFlag={this.handleRightClick}
        ></Board>
      </div>
    );
  }
}

export default GameZone;
