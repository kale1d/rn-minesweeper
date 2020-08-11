import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export const Home: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Game', {mines: 10})}>
        <Text style={styles.text}>EASY</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Game', {mines: 20})}>
        <Text style={styles.text}>MEDIUM</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Game', {mines: 30})}>
        <Text style={styles.text}>HARD</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#c2c2c2',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#c2c2c2',
    borderWidth: 2,
    borderStyle: 'solid',
    borderRightColor: '#7b7b7b',
    borderBottomColor: '#7b7b7b',
    borderLeftColor: '#fff',
    borderTopColor: '#fff',
    alignContent: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: '900',
  },
});
