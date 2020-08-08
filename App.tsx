import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {Board} from './src/screens/Board.screen';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{flex: 1}}>
        <Board />
      </SafeAreaView>
    </>
  );
};

export default App;
