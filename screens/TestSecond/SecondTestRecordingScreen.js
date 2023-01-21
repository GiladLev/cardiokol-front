import { View, Text } from 'react-native'
import React from 'react'
import RecordScreen from '../../components/record/RecordScreen'
import Heart from '../../assets/img/hearts/elements3.svg'

const SecondTestRecordingScreen = () => {

  return (
    <>
    <RecordScreen 
      img={<Heart width={65} height={50}/>} 
      progress={"33% הושלמו"}
      audioMale={require("../../assets/audio/HE/MALE/SecondTestRecordingMale.m4a")}
      audioFemale={require("../../assets/audio/HE/FEMALE/SecondTestRecordingFemale.m4a")}
      nextScreen={"SecondRecordSaved"}
      mode={"Test"}
    />
    </>
    
  )
}

export default SecondTestRecordingScreen
