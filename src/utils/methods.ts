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

      let numberOfmines = 0;

      // If row and column are equal to 0 cant be a topLeftmine
      const topLeftmine = rowIndex > 0 && colIndex > 0 ? cells[rowIndex - 1][colIndex - 1] : null;
      // If row is equal to 0 can't be a topmine
      const topmine = rowIndex > 0 ? cells[rowIndex - 1][colIndex] : null;
      // If row is equal to 0 and total number of columns is greater than cols can't be a mine
      const topRightmine = rowIndex > 0 && colIndex < (MAX_COLS - 1) ? cells[rowIndex - 1][colIndex + 1] : null;
      // If col is equal to 0 can't be a mine on the left
      const leftmine = colIndex > 0 ? cells[rowIndex][colIndex - 1] : null;
      // If col is greater than the number of columns can't be a right mine
      const rightmine = colIndex < (MAX_COLS - 1) ? cells[rowIndex][colIndex + 1] : null;
      // If the row is greater thant the number of rows and the col is equal to 0 can't be a mine
      const bottomLeftmine = rowIndex < (MAX_ROWS - 1) && colIndex > 0 ? cells[rowIndex + 1][colIndex - 1] : null;
      // If the row is greater than the number of rows it can't be a mine
      const bottommine = rowIndex < (MAX_ROWS - 1) ? cells[rowIndex + 1][colIndex] : null;
      // If row and column are greater thant the max number of rows and columns can't be a mine
      const bottomRightmine = rowIndex < (MAX_ROWS - 1) && colIndex < (MAX_COLS - 1) ? cells[rowIndex + 1][colIndex + 1] : null;

      if (topLeftmine?.value === CellValue.mine) numberOfmines++;
      if (topmine?.value === CellValue.mine) numberOfmines++;
      if (topRightmine?.value === CellValue.mine) numberOfmines++;
      if (leftmine?.value === CellValue.mine) numberOfmines++;
      if (rightmine?.value === CellValue.mine) numberOfmines++;
      if (bottomLeftmine?.value === CellValue.mine) numberOfmines++;
      if (bottommine?.value === CellValue.mine) numberOfmines++;
      if (bottomRightmine?.value === CellValue.mine) numberOfmines++;

      if (numberOfmines > 0) cells[rowIndex][colIndex] = { ...currentCell, value: numberOfmines };
    }
  }
  return cells;
}