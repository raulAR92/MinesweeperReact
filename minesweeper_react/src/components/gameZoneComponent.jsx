import React, { Component } from "react";
import SettingsBar from "./settingsBarComponent";
import Board from "./boardComponent";
import difficultLevels from "../common/difficultLevels";
import utils from "../common/utils";
import "./gameZoneComponent.css";
import SoundComponent from "./soundsComponent";
import sounds from "../common/sounds";
import ModalComponent from "../common/modalComponent";

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
      points: 0,
      shake: false,
      modalData: {
        show: false,
        title: "title",
        bodyData: "body"
      }
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
        let sound = document.getElementById(sounds.click.filename);
        sound.play();
      }
      if (block.value === 0) {
        let sound = document.getElementById(sounds.revealArea.filename);
        sound.play();
        this.shakeBoard();
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
        this.shakeBoard();
        let sound = document.getElementById(sounds.mine.filename);
        sound.play();
        this.endGame(details);
      }
      this.checkIfWin(
        details.points,
        details.flags,
        difficult.mines,
        details.notClicked
      );
    }
  };

  shakeBoard = () => {
    const toggleShake = () => {
      this.setState(() => {
        return { shake: false };
      });
    };

    this.setState(() => {
      return { shake: true };
    });
    setTimeout(() => {
      toggleShake();
    }, 1000);
  };

  handleRightClick = (i, j, e) => {
    e.preventDefault();
    let matrixToUpdate = [...this.state.matrix];
    let { difficult } = this.state;
    let block = { ...matrixToUpdate[i][j] };
    if (!block.clicked) {
      let sound = document.getElementById(sounds.flag.filename);
      sound.play();
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
      this.checkIfWin(
        details.points,
        details.flags,
        difficult.mines,
        details.notClicked
      );
    }
  };

  restartGame = difficultID => {
    let difficult = null;
    if (difficultID === undefined) {
      difficult = this.state.difficult;
    } else {
      difficult = difficultLevels.filter(d => d.id === difficultID)[0];
    }
    const matrix = utils.calculeMatrix(difficult);
    this.setState(() => {
      return {
        matrix,
        difficult: difficult,
        flags: difficult.mines,
        points: 0
      };
    });
  };

  endGame = details => {
    let { matrix } = this.state;
    const coordinates = utils.getMinesCoordinates(matrix);
    console.log(coordinates);
    let showedMines = 0;
    /*while (showedMines < coordinates.length) {
      setTimeout(() => {
        const coordinate = coordinates[showedMines];
        let { matrix: matrixToUpdate } = { ...this.state.matrix };
        matrixToUpdate[coordinate.i][coordinate.j].clicked = true;
        this.setState(() => {
          return { matrix: matrixToUpdate };
        });
        showedMines++;
      }, 1000);
    }*/
    const score = "Score: " + details.points;
    this.handleOpenModal("You Loose!", score);
  };

  checkIfWin(points, flags, mines, notClicked) {
    const score = "Score: " + points;
    if (points === mines) {
      if (flags >= 0) {
        this.handleOpenModal("You Win!", score);
      }
    }
    if (notClicked === points) {
      if (flags >= 0) {
        this.handleOpenModal("You Win!", score);
      }
    }
  }

  handleCloseModal = () => {
    let { modalData } = { ...this.state };
    modalData.show = false;
    this.setState({ modalData });
    let sound = document.getElementById(sounds.loop.filename);
    sound.pause();
    this.restartGame();
  };

  handleOpenModal = (title, body) => {
    let { modalData } = { ...this.state };
    modalData.show = true;
    modalData.title = title;
    modalData.bodyData = body;
    let sound = document.getElementById(sounds.loop.filename);
    sound.loop = true;
    sound.play();
    this.setState({ modalData });
  };

  render() {
    const { difficult, matrix, flags, shake, modalData } = this.state;
    let gameZoneClasses = "game-zone";
    gameZoneClasses += " " + difficult.className;
    return (
      <div className={gameZoneClasses}>
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
          shake={shake}
        ></Board>
        <ModalComponent
          show={modalData.show}
          closeButton={this.handleCloseModal}
          title={modalData.title}
          bodyData={modalData.bodyData}
        ></ModalComponent>
      </div>
    );
  }
}

export default GameZone;
