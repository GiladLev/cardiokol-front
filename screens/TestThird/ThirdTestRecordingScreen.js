import { View, Text } from 'react-native'
import React from 'react'
import RecordScreen from '../../components/record/RecordScreen'
import Heart from '../../assets/img/hearts/elements6.svg'

const ThirdTestRecordingScreen = () => {
  return (
    <>
    <RecordScreen 
      img={<Heart width={65} height={50}/>} 
      progress={"66% הושלמו"}
      audioMale={require("../../assets/audio/HE/MALE/ThirdTestRecordingMale.m4a")}
      audioFemale={require("../../assets/audio/HE/FEMALE/ThirdTestRecordingFemale.m4a")}
      nextScreen={"ThirdRecordSaved"}
      mode={"Test"}
    />
    </>
  )
}
export default ThirdTestRecordingScreen
