import React, { Component } from "react";
import SettingsBar from "./settingsBarComponent";
import Board from "./boardComponent";
import difficultLevels from "../common/difficultLevels";
import utils from "../common/utils";
import "./gameZoneComponent.css";
import SoundComponent from "./soundsComponent";
import sounds from "../common/sounds";

class GameZone extends Component {
  state = {};
  constructor() {
    super();
    let difficult = difficultLevels.filter(d => d.id === 2);
    const matrix = utils.calculeMatrix(difficult[0]);
    this.state = {
      difficult: difficult[0],
      matrix: matrix,
      flags: difficult[0].mines,
      points: 0
    };
  }

  handleLevelChange = event => {
    const difficultID = parseInt(event.target.value);
    this.restartGame(difficultID);
  };

  setBoard = matrix => {
    this.setState(() => {
      return { matrix };
    });
  };

  handleClick = (i, j) => {
    let matrixToUpdate = [...this.state.matrix];
    const { difficult } = this.state;
    let block = { ...matrixToUpdate[i][j] };
    if (!block.isMarked && !block.clicked) {
      block.clicked = true;
      matrixToUpdate[i][j] = block;
      if (block.value !== 0 && block.value !== -1) {
        var sound = document.getElementById(sounds.click.filename);
        sound.play();
      }
      if (block.value === 0) {
        var sound = document.getElementById(sounds.revealArea.filename);
        sound.play();
        matrixToUpdate = utils.showZeros(i, j, matrixToUpdate, difficult);
      }
      const details = utils.calculeDetails(matrixToUpdate, difficult.mines);
      this.setState(() => {
        return {
          matrix: matrixToUpdate,
          flags: details.flags,
          points: details.points
        };
      });
      if (block.value === -1) {
        var sound = document.getElementById(sounds.mine.filename);
        sound.play();
        this.endGame();
      }
      this.checkIfWin(details.points, details.flags, difficult.mines);
    }
  };

  handleRightClick = (i, j, e) => {
    e.preventDefault();
    let matrixToUpdate = [...this.state.matrix];
    let { difficult } = this.state;
    let block = { ...matrixToUpdate[i][j] };
    if (!block.clicked) {
      block.isMarked = !block.isMarked;
      matrixToUpdate[i][j] = block;
      const details = utils.calculeDetails(matrixToUpdate, difficult.mines);
      this.setState(() => {
        return {
          matrix: matrixToUpdate,
          flags: details.flags,
          points: details.points
        };
      });
      this.checkIfWin(details.points, details.flags, difficult.mines);
    }
  };

  restartGame = (difficultID = 2) => {
    let difficult = difficultLevels.filter(d => d.id === difficultID);
    const matrix = utils.calculeMatrix(difficult[0]);
    this.setState(() => {
      return {
        matrix,
        difficult: difficult[0],
        flags: difficult[0].mines,
        points: 0
      };
    });
  };

  endGame = () => {
    alert("you loose");
    this.restartGame();
  };

  checkIfWin(points, flags, mines) {
    if (points === mines) {
      if (flags >= 0) {
        alert("you win!");
      }
    }
    if (points === mines - 1) {
      if (flags >= 0) {
        alert("you win!");
      }
    }
  }

  render() {
    const { difficult, matrix, flags } = this.state;
    return (
      <div className={"game-zone " + difficult.className}>
        <SoundComponent></SoundComponent>
        <SettingsBar
          difficult={difficult}
          onDifficultChange={this.handleLevelChange}
          flags={flags}
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
