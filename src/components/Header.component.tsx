import React from 'react';
import {View, StyleSheet} from 'react-native';
import {NumberDisplay} from './NumberDisplay.component';
import {Face} from './Face.component';
import {FaceEnum} from '../models/Face.model';

type HeaderProps = {
  face: FaceEnum;
  time: number;
  mines: number;
  onRestart: () => void;
};
const Header: React.FC<HeaderProps> = ({face, time, mines, onRestart}) => {
  return (
    <View style={styles.header}>
      <NumberDisplay value={mines} />
      <Face onRestart={onRestart} face={face} />
      <NumberDisplay value={time} />
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    width: '100%',
    backgroundColor: '#c0c0c0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderWidth: 4,
    borderStyle: 'solid',
    borderRightColor: '#fff',
    borderBottomColor: '#fff',
    borderLeftColor: '#7b7b7b',
    borderTopColor: '#7b7b7b',
  },
});
export default Header;
