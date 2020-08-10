import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, Dimensions, Alert} from 'react-native';
import {Cell} from '../components/Cell.component';
import Header from '../components/Header.component';
import {CellModel, CellValue, CellState} from '../models/Cell.model';
import {generateCells} from '../utils/methods';
import {width, height, MINES} from '../utils/constants';
import {FaceEnum} from '../models/Face.model';

interface Props {}
export const Board: React.FC<Props> = (Props) => {
  const [cells, setCells] = useState<CellModel[][]>(generateCells());
  const [face, setFace] = useState<FaceEnum>(FaceEnum.smile);
  const [timer, setTimer] = useState<number>(0);
  const [gameStart, setGameStart] = useState<boolean>(false);
  const [pressedCell, setPressedCell] = useState<CellState>(CellState.open);
  const [mineCounter, setMineCounter] = useState<number>(MINES);
  useEffect(() => {
    if (gameStart && timer < 999) {
      const time = setInterval(() => {
        setTimer(timer + 1);
      }, 1000);
      return () => {
        clearInterval(time);
      };
    }
  }, [gameStart, timer]);

  const onRestartGame = (): void => {
    if (gameStart) {
      setGameStart(false);
      setTimer(0);
      setCells(generateCells());
      setMineCounter(MINES);
    }
  };
  const onFaceChange = () => {
    if (face === FaceEnum.smile) setFace(FaceEnum.surprise);
    if (face === FaceEnum.surprise) setFace(FaceEnum.smile);
  };

  const onOpenCell = (rowParam: number, colParam: number) => () => {
    //set game start
    if (!gameStart) setGameStart(true);
  };

  const handleFlag = (rowParam: number, colParam: number) => () => {
    const currentCells = cells.slice();
    const currentCell = cells[rowParam][colParam];
    if (!gameStart) {
      Alert.alert(
        'You need to click a cell to start',
        'Sorry :)',
        [{text: 'OK'}],
        {cancelable: false},
      );
    } else {
      if (currentCell.state === CellState.visible) {
        return;
      } else if (currentCell.state === CellState.open) {
        currentCells[rowParam][colParam].state = CellState.flagged;
        setCells(currentCells);
        setMineCounter(mineCounter - 1);
      } else {
        currentCells[rowParam][colParam].state = CellState.open;
        setMineCounter(mineCounter + 1);
      }
    }
  };

  const renderCells = (): React.ReactNode => {
    return cells.map((row, rowIndex) =>
      row.map((col, colIndex) => (
        <Cell
          row={rowIndex}
          col={colIndex}
          state={col.state}
          value={col.value}
          key={`${rowIndex}-${colIndex}`}
          onCellPressIn={onFaceChange}
          onCellPressOut={onFaceChange}
          onOpenCell={onOpenCell}
          onLongPressCell={handleFlag}
          pressed={pressedCell}
        />
      )),
    );
  };
  return (
    <View style={styles.container}>
      <Header
        onRestart={onRestartGame}
        face={face}
        time={timer}
        mines={mineCounter}
      />
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
