const calculeMatrix = difficult => {
  const setHints = (y, x, matrix, difficult) => {
    for (let i = y - 1; i <= y + 1; i++) {
      if (i >= 0 && i < difficult.y) {
        for (let j = x - 1; j <= x + 1; j++) {
          if (j >= 0 && j < difficult.x && !(j === x && y === i)) {
            if (matrix[i][j].value !== -1) {
              matrix[i][j].value = matrix[i][j].value + 1;
            }
          }
        }
      }
    }
  };

  let matrix = new Array(difficult.y);
  // declare matrix
  for (let i = 0; i < matrix.length; i++) {
    let row = new Array(difficult.x);
    for (let j = 0; j < row.length; j++) {
      row[j] = {
        isMarked: false,
        clicked: false,
        value: 0
      };
    }
    matrix[i] = row;
  }
  //set mines
  let minesSet = 0;
  while (minesSet < difficult.mines) {
    let x = Math.floor(Math.random() * difficult.x);
    let y = Math.floor(Math.random() * difficult.y);
    if (matrix[y][x].value === 0) {
      matrix[y][x].value = -1;
      minesSet++;
    }
  }

  //set numbers
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j].value === -1) {
        setHints(i, j, matrix, difficult);
      }
    }
  }

  return matrix;
};

const showZeros = (y, x, matrix, difficult) => {
  for (let i = y - 1; i <= y + 1; i++) {
    if (i >= 0 && i < difficult.y) {
      for (let j = x - 1; j <= x + 1; j++) {
        if (
          j >= 0 &&
          j < difficult.x &&
          !(j === x && y === i) &&
          matrix[i][j].value !== -1 &&
          !matrix[i][j].clicked
        ) {
          matrix[i][j].clicked = true;
          matrix[i][j].isMarked = false;
          if (matrix[i][j].value === 0) {
            matrix = showZeros(i, j, matrix, difficult);
          }
        }
      }
    }
  }
  return matrix;
};

const calculeDetails = (matrix, mines) => {
  let points = 0;
  let notClicked = 0;
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j].isMarked) {
        mines--;
        if (matrix[i][j].value === -1) {
          points++;
        }
      }
      if (!matrix[i][j].clicked) {
        notClicked++;
      }
    }
  }
  return { flags: mines, points, notClicked };
};

export default { calculeMatrix, showZeros, calculeDetails };
