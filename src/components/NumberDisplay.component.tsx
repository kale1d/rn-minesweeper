import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

type DisplayProps = {
  value: number;
};
export const NumberDisplay: React.FC<DisplayProps> = ({value}) => {
  return (
    <View style={styles.numberDisplay}>
      <Text style={styles.text}>
        {value < 0
          ? `-${Math.abs(value).toString().padStart(2, '0')}`
          : value.toString().padStart(3, '0')}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  numberDisplay: {
    width: 100,
    height: 48,
    backgroundColor: '#000',
  },
  text: {
    color: 'red',
    fontSize: 40,
    textAlign: 'center',
  },
});
