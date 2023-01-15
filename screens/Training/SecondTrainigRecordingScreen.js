import React from 'react'
import RecordScreen from '../../components/record/RecordScreen'
import Heart from '../../assets/img/hearts/elements2.svg'

const SecondTrainigRecordingScreen = () => {
  return (
    <>
    <RecordScreen 
      img={<Heart width={65} height={50}/>} 
      progress={"18% הושלמו"}
      audioMale={require("../../assets/audio/HE/MALE/SecondTestRecordingMale.m4a")}
      audioFemale={require("../../assets/audio/HE/FEMALE/SecondTestRecordingFemale.m4a")}
      nextScreen={"SaveTrainScreen"}
      mode={"Training"}
    />
    </>
  )
}
export default SecondTrainigRecordingScreen