import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Board} from './src/screens/Board.screen';
import {Home} from './src/screens/Home.screen';

type RootStackParamList = {
  Home: undefined;
  Game: {mines: number};
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{title: 'Game Options'}}
        />
        <Stack.Screen
          name="Game"
          component={Board}
          options={{title: 'MineSweeper'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
