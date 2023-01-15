import React from "react";
import SaveScreen from "../../components/SaveScreen/SaveScreen";
import Heart from "../../assets/img/hearts/elements3.svg";
function FirstTestRecordSavedScreen() {
  return (
    <SaveScreen
      img={<Heart width={65} height={50} />}
      recordingNumberTitle={"הקלטה הראשונה נשמרה"}
      recordingNumber={1}
      progress={"33% הושלמו"}
      nextScreen={"SecondRecording"}
      audio={require("../../assets/audio/HE/FirstTestRecordSaved.m4a")}
    />
  );
}

export default FirstTestRecordSavedScreen;
