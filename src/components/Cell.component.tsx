import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import {width, height} from '../utils/constants';
import {CellState, CellValue} from '../models/Cell.model';

const bomb = require('./../assets/images/bomb.png');
const flag = require('./../assets/images/flag.png');

type CellProps = {
  row: number;
  col: number;
  state: CellState;
  value: CellValue;
};
export const Cell: React.FC<CellProps> = ({row, col, state, value}) => {
  const [pressed, setPressed] = useState<number>(0);
  const cellByKindStyle: any[] = [styles.cell];
  const textColor: any[] = [styles.text];

  const onOpen = () => {
    setPressed(CellState.visible);
    console.log(state);
    console.log(pressed);
  };
  if (pressed) cellByKindStyle.push(styles.opened);
  if (value === CellValue.one) textColor.push(styles.blue);
  if (value === CellValue.two) textColor.push(styles.green);
  if (value === CellValue.three) textColor.push(styles.red);

  const renderCell = (): React.ReactNode => {
    if (state === CellState.visible) {
      if (value === CellValue.bomb) {
        return <Image style={{width: 35, height: 35}} source={bomb} />;
      } else if (value === CellValue.none) {
        return null;
      }
      return <Text style={[textColor]}>{value}</Text>;
    } else if (state === CellState.flagged) {
      //Add Flag
      return <Image style={{width: 35, height: 35}} source={flag} />;
    }
    return null;
  };
  return (
    <>
      <TouchableWithoutFeedback onPress={onOpen}>
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
});
