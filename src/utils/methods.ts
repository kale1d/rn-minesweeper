import { CellModel, CellValue, CellState, AdjacentCells } from "../models/Cell.model";
import { MAX_ROWS, MAX_COLS } from "./constants";


const generateAdjacentCells = (cells: CellModel[][], rowParam: number, colParam: number): AdjacentCells => {

  // If row and column are equal to 0 cant be a topLeftCell
  const topLeftCell = rowParam > 0 && colParam > 0 ? cells[rowParam - 1][colParam - 1] : null;
  // If row is equal to 0 can't be a topCell
  const topCell = rowParam > 0 ? cells[rowParam - 1][colParam] : null;
  // If row is equal to 0 and total number of columns is greater than cols can't be a mine
  const topRightCell = rowParam > 0 && colParam < (MAX_COLS - 1) ? cells[rowParam - 1][colParam + 1] : null;
  // If col is equal to 0 can't be a mine on the left
  const leftCell = colParam > 0 ? cells[rowParam][colParam - 1] : null;
  // If col is greater than the number of columns can't be a right mine
  const rightCell = colParam < (MAX_COLS - 1) ? cells[rowParam][colParam + 1] : null;
  // If the row is greater thant the number of rows and the col is equal to 0 can't be a mine
  const bottomLeftCell = rowParam < (MAX_ROWS - 1) && colParam > 0 ? cells[rowParam + 1][colParam - 1] : null;
  // If the row is greater than the number of rows it can't be a mine
  const bottomCell = rowParam < (MAX_ROWS - 1) ? cells[rowParam + 1][colParam] : null;
  // If row and column are greater thant the max number of rows and columns can't be a mine
  const bottomRightCell = rowParam < (MAX_ROWS - 1) && colParam < (MAX_COLS - 1) ? cells[rowParam + 1][colParam + 1] : null;

  return {
    topLeftCell,
    topCell,
    topRightCell,
    leftCell,
    rightCell,
    bottomLeftCell,
    bottomCell,
    bottomRightCell
  }
}
/**
 * Creates two dimension array with columns and rows
 * Generates mines randomly
 */
export const generateCells = (MINES: number): CellModel[][] => {
  //cambiar nombre a Board tiene mas sentido igual al modelo
  const cells: CellModel[][] = [];
  let minesPlaced = 0;

  // Generate columns and rows for the board
  for (let row = 0; row < MAX_ROWS; row++) {
    cells.push([]);
    for (let col = 0; col < MAX_COLS; col++) {
      const cell: CellModel = {
        value: CellValue.none,
        state: CellState.closed,
      };
      cells[row].push(cell);
    }
  }

  // Generate random mines in cells
  while (minesPlaced < MINES) {
    // Creates a random number between number of rows
    const row = Math.floor(Math.random() * MAX_ROWS);
    //Creates a random number between number of columns
    const col = Math.floor(Math.random() * MAX_COLS);
    const currentCell = cells[row][col];

    if (currentCell.value !== CellValue.mine) {
      cells[row][col] = { ...cells[row][col], value: CellValue.mine }
    }
    minesPlaced++;
  }

  // Calculate the number of surrounding mines around each cell

  for (let rowIndex = 0; rowIndex < MAX_ROWS; rowIndex++) {
    for (let colIndex = 0; colIndex < MAX_COLS; colIndex++) {
      const currentCell = cells[rowIndex][colIndex];
      if (currentCell.value === CellValue.mine) continue;

      let numberOfMines = 0;
      const {
        topLeftCell,
        topCell,
        topRightCell,
        leftCell,
        rightCell,
        bottomLeftCell,
        bottomCell,
        bottomRightCell
      } = generateAdjacentCells(cells, rowIndex, colIndex);

      if (topLeftCell?.value === CellValue.mine) numberOfMines++;
      if (topCell?.value === CellValue.mine) numberOfMines++;
      if (topRightCell?.value === CellValue.mine) numberOfMines++;
      if (leftCell?.value === CellValue.mine) numberOfMines++;
      if (rightCell?.value === CellValue.mine) numberOfMines++;
      if (bottomLeftCell?.value === CellValue.mine) numberOfMines++;
      if (bottomCell?.value === CellValue.mine) numberOfMines++;
      if (bottomRightCell?.value === CellValue.mine) numberOfMines++;

      if (numberOfMines > 0) cells[rowIndex][colIndex] = { ...currentCell, value: numberOfMines };
    }
  }
  return cells;
}

export const openAdjacentCells = (cells: CellModel[][], rowParam: number, colParam: number): CellModel[][] => {
  let newCells = cells.slice();
  const {
    topLeftCell,
    topCell,
    topRightCell,
    leftCell,
    rightCell,
    bottomLeftCell,
    bottomCell,
    bottomRightCell
  } = generateAdjacentCells(cells, rowParam, colParam);
  newCells[rowParam][colParam].state = CellState.revealed;

  // If the value of the cell is none we will run again this function to recursively 
  // iterates again cells in the next adjacent cell
  if (topLeftCell?.state === CellState.closed && topLeftCell.value !== CellValue.mine) {
    if (topLeftCell.value === CellValue.none) {
      newCells = openAdjacentCells(newCells, rowParam - 1, colParam - 1);
    } else {
      newCells[rowParam - 1][colParam - 1].state = CellState.revealed;
    }
  }
  if (topCell?.state === CellState.closed && topCell.value !== CellValue.mine) {
    if (topCell.value === CellValue.none) {
      newCells = openAdjacentCells(newCells, rowParam - 1, colParam);
    } else {
      newCells[rowParam - 1][colParam].state = CellState.revealed;
    }
  }
  if (topRightCell?.state === CellState.closed && topRightCell.value !== CellValue.mine) {
    if (topRightCell.value === CellValue.none) {
      newCells = openAdjacentCells(newCells, rowParam - 1, colParam + 1);
    } else {
      newCells[rowParam - 1][colParam + 1].state = CellState.revealed;
    }
  }
  if (leftCell?.state === CellState.closed && leftCell.value !== CellValue.mine) {
    if (leftCell.value === CellValue.none) {
      newCells = openAdjacentCells(newCells, rowParam, colParam - 1);
    } else {
      newCells[rowParam][colParam - 1].state = CellState.revealed;
    }
  }
  if (rightCell?.state === CellState.closed && rightCell.value !== CellValue.mine) {
    if (rightCell.value === CellValue.none) {
      newCells = openAdjacentCells(newCells, rowParam, colParam + 1);
    } else {
      newCells[rowParam][colParam + 1].state = CellState.revealed;
    }
  }
  if (bottomLeftCell?.state === CellState.closed && bottomLeftCell.value !== CellValue.mine) {
    if (bottomLeftCell.value === CellValue.none) {
      newCells = openAdjacentCells(newCells, rowParam + 1, colParam - 1);
    } else {
      newCells[rowParam + 1][colParam - 1].state = CellState.revealed;
    }
  }
  if (bottomCell?.state === CellState.closed && bottomCell.value !== CellValue.mine) {
    if (bottomCell.value === CellValue.none) {
      newCells = openAdjacentCells(newCells, rowParam + 1, colParam);
    } else {
      newCells[rowParam + 1][colParam].state = CellState.revealed;
    }
  }
  if (bottomRightCell?.state === CellState.closed && bottomRightCell.value !== CellValue.mine) {
    if (bottomRightCell.value === CellValue.none) {
      newCells = openAdjacentCells(newCells, rowParam + 1, colParam + 1);
    } else {
      newCells[rowParam + 1][colParam + 1].state = CellState.revealed;
    }
  }

  return newCells;
}