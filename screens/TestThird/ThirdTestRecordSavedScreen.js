import React from "react";

import SaveScreen from "../../components/SaveScreen/SaveScreen";
import Heart from "../../assets/img/hearts/elements11.svg";
function ThirdTestRecordSavedScreen() {
  return (
    <SaveScreen
      img={<Heart width={65} height={50} />}
      recordingNumberTitle={"הקלטה השלישית נשמרה"}
      recordingNumber={3}
      progress={"99% הושלמו"}
      nextScreen={"TestComplete"}
      audio={require("../../assets/audio/HE/ThirdTestRecordSavedScreen.m4a")}
    />
  );
}

export default ThirdTestRecordSavedScreen;
