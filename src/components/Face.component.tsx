import React, {useEffect, useState} from 'react';
import {Image, View, StyleSheet, TouchableOpacity} from 'react-native';
import {FaceEnum} from '../models/Face.model';

interface FaceProps {
  face: FaceEnum;
  onRestart: () => void;
}
export const Face: React.FC<FaceProps> = ({face, onRestart}) => {
  const [pressed, setPressed] = useState<boolean>(false);
  const faceStyles: any[] = [styles.container];

  return (
    <TouchableOpacity onPress={onRestart}>
      <View style={faceStyles}>
        <Image style={{width: 30, height: 30}} source={face} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
    backgroundColor: '#c2c2c2',
    borderWidth: 2,
    borderStyle: 'solid',
    borderRightColor: '#7b7b7b',
    borderBottomColor: '#7b7b7b',
    borderLeftColor: '#fff',
    borderTopColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressed: {
    backgroundColor: '#797979',
    borderRightColor: '#fff',
    borderBottomColor: '#fff',
    borderLeftColor: '#7b7b7b',
    borderTopColor: '#7b7b7b',
  },
});
