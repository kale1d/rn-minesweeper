import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {Cell} from '../components/Cell.component';
import Header from '../components/Header.component';
import {CellModel, CellValue, CellState} from '../models/Cell.model';
import {generateCells, openAdjacentCells} from '../utils/methods';
import {width, height, MAX_ROWS, MAX_COLS} from '../utils/constants';
import {FaceEnum} from '../models/Face.model';

interface Props {
  route: {key: string; name: string; params: {mines: number}};
}
export const Board: React.FC<Props> = ({route}) => {
  const mines = route.params.mines;
  const [cells, setCells] = useState<CellModel[][]>(generateCells(mines));
  const [face, setFace] = useState<FaceEnum>(FaceEnum.smile);
  const [timer, setTimer] = useState<number>(0);
  const [gameStart, setGameStart] = useState<boolean>(false);
  const [mineCounter, setMineCounter] = useState<number>(mines);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [wonGame, setWonGame] = useState<boolean>(false);

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

  useEffect(() => {
    if (gameOver) {
      setFace(FaceEnum.dead);
      setGameStart(false);
    }
  }, [gameOver, face]);

  useEffect(() => {
    if (wonGame) {
      setFace(FaceEnum.won);
      setGameStart(false);
      setMineCounter(0);
      Alert.alert(
        'You Win',
        'Congrats:)',
        [{text: 'OK', onPress: () => onRestartGame()}],
        {cancelable: false},
      );
    }
  }, [wonGame]);

  const onRestartGame = (): void => {
    setGameStart(false);
    setTimer(0);
    setCells(generateCells(mines));
    setMineCounter(mines);
    setGameOver(false);
    setFace(FaceEnum.smile);
    setWonGame(false);
  };

  const showAllBombs = (): CellModel[][] => {
    const currentCells = cells.slice();
    return currentCells.map((row, rowIndex) =>
      row.map((col, colIndex) => {
        if (col.value === CellValue.mine) {
          return {
            ...col,
            state: CellState.revealed,
          };
        }
        return col;
      }),
    );
  };
  const onFaceChange = () => {
    if (face === FaceEnum.smile) setFace(FaceEnum.surprise);
    if (face === FaceEnum.surprise) setFace(FaceEnum.smile);
  };

  const onOpenCell = (rowParam: number, colParam: number) => () => {
    let currentBoard = cells.slice();
    const currentCell = cells[rowParam][colParam];
    //set game start
    if (!gameStart) {
      if (currentCell.value === CellValue.mine) {
        Alert.alert(
          'Oh no you clicked a bomb :(',
          `Let's restart the game!`,
          [{text: 'OK', onPress: () => onRestartGame()}],
          {cancelable: false},
        );
      }
      setGameStart(true);
    }

    // If cell is flagged or visible don't do anything
    if (
      [CellState.flagged, CellState.revealed, CellState.unknown].includes(
        currentCell.state,
      )
    ) {
      return;
    }

    if (currentCell.value === CellValue.mine) {
      setGameOver(true);
      currentBoard = showAllBombs();
      currentBoard[rowParam][colParam].selectedBomb = true;
      setCells(currentBoard);
    } else if (currentCell.value === CellValue.none) {
      currentBoard = openAdjacentCells(currentBoard, rowParam, colParam);
      setCells(currentBoard);
    } else {
      currentBoard[rowParam][colParam].state = CellState.revealed;
    }

    // Check if every non mine cell is opened and check if you won the game

    let safeOpenCellsExists = false;
    for (let row = 0; row < MAX_ROWS; row++) {
      for (let col = 0; col < MAX_COLS; col++) {
        const currentCell = currentBoard[row][col];

        if (
          currentCell.value !== CellValue.mine &&
          currentCell.state === CellState.closed
        ) {
          safeOpenCellsExists = true;
          break;
        }
      }
    }

    if (!safeOpenCellsExists) {
      currentBoard = currentBoard.map((row) =>
        row.map((col) => {
          if (col.value === CellValue.mine) {
            return {
              ...col,
              state: CellState.flagged,
            };
          }
          return col;
        }),
      );
      setWonGame(true);
    }

    setCells(currentBoard);
  };

  const handleFlag = (rowParam: number, colParam: number) => () => {
    // Shallow copy of currentCells;
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
      if (currentCell.state === CellState.revealed) {
        return;
      } else if (currentCell.state === CellState.closed) {
        currentCells[rowParam][colParam].state = CellState.flagged;
        setCells(currentCells);
        setMineCounter(mineCounter - 1);
      } else if (currentCell.state === CellState.flagged) {
        currentCells[rowParam][colParam].state = CellState.unknown;
        setCells(currentCells);
      } else {
        currentCells[rowParam][colParam].state = CellState.closed;
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
          selectedBomb={col.selectedBomb}
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
