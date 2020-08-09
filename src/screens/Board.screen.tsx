import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import {Cell} from '../components/Cell.component';
import Header from '../components/Header.component';
import {CellModel, CellValue, CellState} from '../models/Cell.model';
import {generateCells} from '../utils/methods';
import {width, height} from '../utils/constants';

interface Props {}
export const Board: React.FC<Props> = (Props) => {
  const [cells, setCells] = useState<CellModel[][]>(generateCells());

  const renderCells = (): React.ReactNode => {
    return cells.map((row, rowIndex) =>
      row.map((col, colIndex) => (
        <Cell
          row={rowIndex}
          col={colIndex}
          state={col.state}
          value={col.value}
          key={`${rowIndex}-${colIndex}`}
        />
      )),
    );
  };
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.board}>{renderCells()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#c2c2c2',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  board: {
    marginTop: 16,
    backgroundColor: '#c0c0c0',
    borderWidth: 4,
    borderStyle: 'solid',
    borderRightColor: '#999',
    borderBottomColor: '#999',
    borderLeftColor: '#000',
    borderTopColor: '#000',
    width: width,
    maxHeight: height,
    flex: 1,
    flexWrap: 'wrap',
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
