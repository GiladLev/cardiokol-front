import { View, Text } from 'react-native'
import React from 'react'
import tw from '../../../styles/tailwindConf'
import ErrorImg from '../../../assets/img/login-images/error.svg'
import Paragraph from '../Paragraph'

const ErrorLogin = ({text1, text2}) => {
  return (
    <View style={tw`items-center flex-1`}>
    <View style={tw`h-32 w-90% items-end flex justify-center border border-colorBorder bg-backgroundErrorLogin rounded-xl p-5`}>
      <ErrorImg style={tw`mb-2`}/>
      <Paragraph Style={"text-base"}>{text1}</Paragraph>
      <Paragraph Style={"font-bold text-base"}>{text2}</Paragraph>
    </View>

    </View>

  )
}

export default ErrorLogin