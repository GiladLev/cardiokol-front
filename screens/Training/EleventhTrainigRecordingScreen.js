import React from 'react'
import RecordScreen from '../../components/record/RecordScreen'
import Heart from '../../assets/img/hearts/elements12.svg'

const EleventhTrainigRecordingScreen = () => {
  return (
    <>
    <RecordScreen 
      img={<Heart width={65} height={50}/>} 
      progress={"100% הושלמו"}
      audioMale={require("../../assets/audio/HE/MALE/ThirdTestRecordingMale.m4a")}
      audioFemale={require("../../assets/audio/HE/FEMALE/ThirdTestRecordingFemale.m4a")}
      nextScreen={"TrainingComplete"}
      mode={"Training"}
    />
    </>
  )
}
export default EleventhTrainigRecordingScreen