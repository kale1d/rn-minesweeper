import { CellModel, CellValue, CellState } from "../models/Cell.model";
import { MAX_ROWS, MAX_COLS, MINES } from "./constants";


/**
 * Creates two dimension array with columns and rows
 * Generates mines randomly
 */
export const generateCells = (): CellModel[][] => {
  //cambiar nombre a Board tiene mas sentido igual al modelo
  const cells: CellModel[][] = [];
  let minesPlaced = 0;

  // Generate columns and rows for the board
  for (let row = 0; row < MAX_ROWS; row++) {
    cells.push([]);
    for (let col = 0; col < MAX_COLS; col++) {
      const cell: CellModel = {
        value: CellValue.none,
        state: CellState.open, // cambiar a open y cambir el nombre de open tambien 
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

    if (currentCell.value !== CellValue.bomb) {
      cells[row][col] = { ...cells[row][col], value: CellValue.bomb }
    }
    minesPlaced++;
  }

  // Calculate the number of surrounding bombs around each cell

  for (let rowIndex = 0; rowIndex < MAX_ROWS; rowIndex++) {
    for (let colIndex = 0; colIndex < MAX_COLS; colIndex++) {
      const currentCell = cells[rowIndex][colIndex];
      if (currentCell.value === CellValue.bomb) continue;

      let numberOfBombs = 0;

      // If row and column are equal to 0 cant be a topLeftBomb
      const topLeftBomb = rowIndex > 0 && colIndex > 0 ? cells[rowIndex - 1][colIndex - 1] : null;
      // If row is equal to 0 can't be a topBomb
      const topBomb = rowIndex > 0 ? cells[rowIndex - 1][colIndex] : null;
      // If row is equal to 0 and total number of columns is greater than cols can't be a bomb
      const topRightBomb = rowIndex > 0 && colIndex < (MAX_COLS - 1) ? cells[rowIndex - 1][colIndex + 1] : null;
      // If col is equal to 0 can't be a bomb on the left
      const leftBomb = colIndex > 0 ? cells[rowIndex][colIndex - 1] : null;
      // If col is greater than the number of columns can't be a right bomb
      const rightBomb = colIndex < (MAX_COLS - 1) ? cells[rowIndex][colIndex + 1] : null;
      // If the row is greater thant the number of rows and the col is equal to 0 can't be a bomb
      const bottomLeftBomb = rowIndex < (MAX_ROWS - 1) && colIndex > 0 ? cells[rowIndex + 1][colIndex - 1] : null;
      // If the row is greater than the number of rows it can't be a bomb
      const bottomBomb = rowIndex < (MAX_ROWS - 1) ? cells[rowIndex + 1][colIndex] : null;
      // If row and column are greater thant the max number of rows and columns can't be a bomb
      const bottomRightBomb = rowIndex < (MAX_ROWS - 1) && colIndex < (MAX_COLS - 1) ? cells[rowIndex + 1][colIndex + 1] : null;

      if (topLeftBomb?.value === CellValue.bomb) numberOfBombs++;
      if (topBomb?.value === CellValue.bomb) numberOfBombs++;
      if (topRightBomb?.value === CellValue.bomb) numberOfBombs++;
      if (leftBomb?.value === CellValue.bomb) numberOfBombs++;
      if (rightBomb?.value === CellValue.bomb) numberOfBombs++;
      if (bottomLeftBomb?.value === CellValue.bomb) numberOfBombs++;
      if (bottomBomb?.value === CellValue.bomb) numberOfBombs++;
      if (bottomRightBomb?.value === CellValue.bomb) numberOfBombs++;

      if (numberOfBombs > 0) cells[rowIndex][colIndex] = { ...currentCell, value: numberOfBombs };
    }
  }
  return cells;
}