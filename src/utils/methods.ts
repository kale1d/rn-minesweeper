import { CellModel, CellValue, CellState } from "../models/Cell.model";
import { MAX_ROWS, MAX_COLS } from "./constants";


/**
 *  Creates two dimension array with columns and rows
 */
export const generateCells = (): CellModel[][] => {
  const cells: CellModel[][] = []
  for (let row = 0; row < MAX_ROWS; row++) {
    cells.push([]);
    for (let col = 0; col < MAX_COLS; col++) {
      const cell: CellModel = {
        value: CellValue.none,
        state: CellState.open,
      };
      cells[row].push(cell);
    }
  }
  return cells;
};