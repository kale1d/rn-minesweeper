export interface CellModel {
  value: CellValue;
  state: CellState;
  selectedBomb?: boolean;
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
  closed,
  revealed,
  flagged,
  unknown
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