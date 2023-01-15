import React, { useContext, useEffect } from "react";
import RecordScreen from "../../components/record/RecordScreen";
import Heart from "../../assets/img/hearts/topelements1.svg";
import { Context } from "../../store/context";

const FirstTestRecordingScreen = () => {
  const trainingCtx = useContext(Context);
  useEffect(() => {
    trainingCtx.saveNumOfRecord(0);
  }, [])
  
  return (
    <>
      <RecordScreen
        img={<Heart width={65} height={50} />}
        progress={"9% הושלמו"}
        audioMale={require("../../assets/audio/HE/MALE/FirstTestRecordingMale.m4a")}
        audioFemale={require("../../assets/audio/HE/FEMALE/FirstTestRecordingFemale.m4a")}
        nextScreen={"SaveTrainScreen"}
        mode={"Training"}
      />
    </>
  );
};
export default FirstTestRecordingScreen;
