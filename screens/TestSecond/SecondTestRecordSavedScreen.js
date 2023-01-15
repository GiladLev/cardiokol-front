import React from "react";
import SaveScreen from "../../components/SaveScreen/SaveScreen";
import Heart from "../../assets/img/hearts/elements6.svg";
function SecondTestRecordSavedScreen() {
  return (
    <SaveScreen
      img={<Heart width={65} height={50} />}
      recordingNumberTitle={"הקלטה השניה נשמרה"}
      recordingNumber={2}
      progress={"66% הושלמו"}
      nextScreen={"ThirdRecording"}
      audio={require("../../assets/audio/HE/SecondTestRecordSaved.m4a")}
    />
  );
}

export default SecondTestRecordSavedScreen;
