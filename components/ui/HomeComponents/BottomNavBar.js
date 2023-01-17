import { View, Text, Pressable } from 'react-native'
import React from 'react'
import tw from '../../../styles/tailwindConf'
import Home from '../../../assets/img/navbar-image/home.svg'
import MyInfo from '../../../assets/img/navbar-image/myInfo.svg'
import Test from '../../../assets/img/navbar-image/test.svg'
import Paragraph from '../Paragraph'
import { useNavigation } from '@react-navigation/native'

const BottomNavBar = () => {
  const navigation = useNavigation();
  return (
    <View style={tw`absolute bottom-0 z-99 w-full h-20 bg-white flex-row flex justify-between items-center`}>
      <Pressable style={tw`flex-1 flex justify-center items-center`}>
        <MyInfo width={40} height={33}/>
        <Paragraph>המידע שלי</Paragraph>
      </Pressable>
      <Pressable style={tw`flex-1 flex justify-center items-center`} onPress={() => navigation.replace("PrepareToRecord")}>
        <Test width={40} height={33}/>
        <Paragraph>בדיקה</Paragraph>
      </Pressable>
      <Pressable style={tw`flex-1 flex justify-center items-center`} onPress={() => navigation.replace("Welcome")}>
        <Home width={40} height={33}/>
        <Paragraph>בית</Paragraph>
      </Pressable>
    </View>
  )
}

export default BottomNavBar