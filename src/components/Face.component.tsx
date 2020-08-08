import React from 'react';
import {Button, Image, View} from 'react-native';

const img = require('./../assets/images/smile.png');

interface Props {}
export const Face: React.FC<Props> = (Props) => {
  return (
    <View style={{justifyContent: 'center', alignContent: 'center'}}>
      <Image style={{width: 30, height: 30}} source={img} />
    </View>
  );
};
