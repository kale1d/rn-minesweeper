import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Image,
  GestureResponderEvent,
} from 'react-native';
import {width, height} from '../utils/constants';
import {CellState, CellValue} from '../models/Cell.model';

const mine = require('./../assets/images/bomb.png');
const flag = require('./../assets/images/flag.png');
const unknown = require('./../assets/images/unknown.png');

type CellProps = {
  row: number;
  col: number;
  state: CellState;
  value: CellValue;
  selectedBomb?: boolean;
  onCellPressIn: () => void;
  onCellPressOut: () => void;
  onOpenCell(
    rowParam: number,
    colParam: number,
  ): (e: GestureResponderEvent) => void;
  onLongPressCell(
    rowParam: number,
    colParam: number,
  ): (e: GestureResponderEvent) => void;
};
export const Cell: React.FC<CellProps> = ({
  row,
  col,
  state,
  value,
  selectedBomb,
  onCellPressIn,
  onCellPressOut,
  onOpenCell,
  onLongPressCell,
}) => {
  const cellByKindStyle: any[] = [styles.cell];
  const textColor: any[] = [styles.text];
  if (value === CellValue.one) textColor.push(styles.blue);
  if (value === CellValue.two) textColor.push(styles.green);
  if (value === CellValue.three) textColor.push(styles.red);
  if (value === CellValue.four) textColor.push(styles.purple);
  const renderCell = (): React.ReactNode => {
    if (state === CellState.revealed) {
      cellByKindStyle.push(styles.opened);
      if (value === CellValue.mine) {
        if (selectedBomb) cellByKindStyle.push(styles.bgRed);
        return <Image style={{width: 35, height: 35}} source={mine} />;
      } else if (value === CellValue.none) {
        return null;
      }
      return <Text style={[textColor]}>{value}</Text>;
    } else if (state === CellState.flagged) {
      //Add Flag
      return <Image style={{width: 35, height: 35}} source={flag} />;
    } else if (state === CellState.unknown) {
      return (
        <Image
          style={{
            width: 20,
            height: 20,
          }}
          source={unknown}
        />
      );
    }
    return null;
  };

  return (
    <>
      <TouchableWithoutFeedback
        onPress={onOpenCell(row, col)}
        onPressIn={onCellPressIn}
        onPressOut={onCellPressOut}
        onLongPress={onLongPressCell(row, col)}>
        <View style={cellByKindStyle}>{renderCell()}</View>
      </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  cell: {
    width: width / 10 - 1,
    height: height / 10 - 1,
    backgroundColor: '#c2c2c2',
    borderWidth: 2,
    borderStyle: 'solid',
    borderRightColor: '#7b7b7b',
    borderBottomColor: '#7b7b7b',
    borderLeftColor: '#fff',
    borderTopColor: '#fff',
    alignContent: 'center',
    justifyContent: 'center',
  },
  opened: {
    backgroundColor: '#A8A8A8',
    borderRightColor: '#fff',
    borderBottomColor: '#fff',
    borderLeftColor: '#7b7b7b',
    borderTopColor: '#7b7b7b',
  },
  bgRed: {
    backgroundColor: 'red',
  },
  text: {
    textAlign: 'center',
    fontWeight: '700',
  },
  blue: {
    color: 'blue',
  },
  green: {
    color: 'green',
  },
  red: {
    color: 'red',
  },
  purple: {
    color: 'purple',
  },
});
