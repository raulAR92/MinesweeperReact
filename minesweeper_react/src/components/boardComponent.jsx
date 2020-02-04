import React, { Component } from "react";
import Block from "./blockComponent";
import "./boarComponent.css";

class Board extends Component {
  constructor() {
    super();
    let matrix = [];
    let array = [];

    array.push({
      isMarked: false,
      clicked: false,
      value: -1
    });
    array.push({
      isMarked: false,
      clicked: false,
      value: 2
    });
    array.push({
      isMarked: false,
      clicked: false,
      value: 1
    });
    matrix.push(array);
    array = [];

    array.push({
      isMarked: false,
      clicked: false,
      value: 2
    });
    array.push({
      isMarked: false,
      clicked: false,
      value: -1
    });
    array.push({
      isMarked: false,
      clicked: false,
      value: 1
    });
    matrix.push(array);
    array = [];

    array.push({
      isMarked: false,
      clicked: false,
      value: 1
    });
    array.push({
      isMarked: false,
      clicked: false,
      value: 1
    });
    array.push({
      isMarked: false,
      clicked: false,
      value: 1
    });
    matrix.push(array);
    this.state = { matrix };
  }

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
    const { matrix } = this.state;
    console.log(matrix);
    return (
      <div className="board">
        {" "}
        {matrix.map((row, i) => {
          return (
            <div key={i} className="row">
              {row.map((block, j) => {
                return (
                  <Block
                    key={j}
                    value={block.value}
                    isMarked={block.isMarked}
                    clicked={block.clicked}
                    onDig={this.handleClick}
                    onFlag={this.handleRightClick}
                    iIndex={i}
                    jIndex={j}
                  ></Block>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
}

export default Board;
