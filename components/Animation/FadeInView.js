import React, { useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import tw from '../../styles/tailwindConf';

export default function FadeInView({ children }) {
  const [fadeAnim1] = useState(new Animated.Value(0))
  const [fadeAnim2] = useState(new Animated.Value(0))


  React.useEffect(() => {
    Animated.timing(fadeAnim1, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true
    }).start(() => {
    Animated.timing(fadeAnim2, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true
    }).start();
    });
  }, [fadeAnim1, fadeAnim2])

  return (
    <View style={tw`items-center`}>
    <Animated.View
      style={[tw`items-center`, {

        opacity: fadeAnim1,
      }]}
    >
      {children[0]}
    </Animated.View>
    <Animated.View
      style={[tw`items-center mr-1`, {

        opacity: fadeAnim2,
      }]}
    >
      {children[1]}
    </Animated.View>
  </View>
  );
}

