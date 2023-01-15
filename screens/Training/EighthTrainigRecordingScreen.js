import React from 'react'
import RecordScreen from '../../components/record/RecordScreen'
import Heart from '../../assets/img/hearts/elements8.svg'

const EighthTrainigRecordingScreen = () => {
  return (
    <>
    <RecordScreen 
      img={<Heart width={65} height={50}/>} 
      progress={"72% הושלמו"}
      audioMale={require("../../assets/audio/HE/MALE/SecondTestRecordingMale.m4a")}
      audioFemale={require("../../assets/audio/HE/FEMALE/SecondTestRecordingFemale.m4a")}
      nextScreen={"SaveTrainScreen"}
      mode={"Training"}
    />
    </>
  )
}
export default EighthTrainigRecordingScreen