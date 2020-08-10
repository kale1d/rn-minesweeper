export type CellModel = {
  value: CellValue;
  state: CellState;
}

export enum CellValue {
  none,
  one,
  two,
  three,
  four,
  five,
  six,
  seven,
  eight,
  mine
}

export enum CellState {
  open,
  visible,
  flagged
}

export interface AdjacentCells {
  topLeftCell: CellModel | null,
  topCell: CellModel | null,
  topRightCell: CellModel | null,
  leftCell: CellModel | null,
  rightCell: CellModel | null,
  bottomLeftCell: CellModel | null,
  bottomCell: CellModel | null,
  bottomRightCell: CellModel | null
}