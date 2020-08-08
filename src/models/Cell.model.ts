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
  bomb
}

export enum CellState {
  open,
  visible,
  flagged
}