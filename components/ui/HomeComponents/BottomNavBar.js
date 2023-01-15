import { View, Text } from 'react-native'
import React from 'react'
import tw from '../../../styles/tailwindConf'
import Home from '../../../assets/img/navbar-image/home.svg'
import MyInfo from '../../../assets/img/navbar-image/myInfo.svg'
import Test from '../../../assets/img/navbar-image/test.svg'
import Paragraph from '../Paragraph'

const BottomNavBar = () => {
  return (
    <View style={tw`absolute bottom-0 z-99 w-full h-20 bg-white flex-row flex justify-between items-center`}>
      <View style={tw`flex-1 flex justify-center items-center`}>
        <MyInfo width={40} height={33}/>
        <Paragraph>המידע שלי</Paragraph>
      </View>
      <View style={tw`flex-1 flex justify-center items-center`}>
        <Test width={40} height={33}/>
        <Paragraph>בדיקה</Paragraph>
      </View>
      <View style={tw`flex-1 flex justify-center items-center`}>
        <Home width={40} height={33}/>
        <Paragraph>בית</Paragraph>
      </View>
    </View>
  )
}

export default BottomNavBar