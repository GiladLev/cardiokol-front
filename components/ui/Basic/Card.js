import { View, Text } from 'react-native'
import React from 'react'


import Inform from "../../../assets/img/beforeFirstRecord-images/Inform.svg"

import tw from '../../../styles/tailwindConf'

const Card = ({firstText, secondText, img, ThreeRow}) => {

  return (
    <View
          style={tw` relative w-90% h-28 border border-colorBorder rounded-lg bg-white flex-row items-center`}
        >
          <View style={tw`flex-3 mr-5 items-end`}>
            <Text style={tw`font-bold text-xl`}>{firstText}</Text>
            <Text style={tw`font-bold text-xl`}>{secondText}</Text>
            {ThreeRow && <Text style={tw`font-bold text-lg`}>{ThreeRow}</Text>}
            
          </View>
          <View style={tw`flex-1`}>
            {img}
          </View>

          <Inform style={tw`absolute right-1 top-1.5`} width={22} height={22}/>
        </View>
  )
}

export default Card