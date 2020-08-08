import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {width, height} from '../utils/constants';
interface Props {}
export const Cell: React.FC<Props> = (Props) => {
  return (
    <View style={styles.cell}>
      <Text style={{color: 'white'}}>1</Text>
    </View>
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
  },
});
