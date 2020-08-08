import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {NumberDisplay} from './NumberDisplay.component';
import {Face} from './Face.component';

const Header: React.FC = () => {
  return (
    <View style={styles.header}>
      <NumberDisplay value={0} />
      <Face />
      <NumberDisplay value={23} />
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
