import {  Text } from 'react-native'
import React from 'react'
import {
    Heebo_900Black, useFonts,
  } from '@expo-google-fonts/dev';
import tw from '../../styles/tailwindConf';
const Title = ({children, Style}) => {
    let [fontsLoaded] = useFonts({
        Heebo_900Black,
      });
      if (!fontsLoaded) {
        null}
      else{
        return (
            <Text style={[tw`${Style}`, {fontFamily: "Heebo_900Black"}]}>{children}</Text>
        )}
}

export default Title