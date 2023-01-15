import {  Text } from 'react-native'
import React from 'react'
import {
    Heebo_100Thin,
Heebo_300Light,
Heebo_400Regular,
Heebo_500Medium,
Heebo_700Bold,
Heebo_800ExtraBold,
Heebo_900Black, useFonts,
  } from '@expo-google-fonts/dev';
import tw from '../../styles/tailwindConf';
const Paragraph = ({children, Style}) => {
  let [fontsLoaded] = useFonts({
        Heebo_400Regular,
      });
      if (!fontsLoaded) {
        null}
      else{
        return (
            <Text style={[  tw` ${Style} `, {fontFamily: "Heebo_400Regular"}]}>{children}</Text>
        )}
}

export default Paragraph