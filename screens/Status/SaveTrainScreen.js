import React, { useContext } from "react";
import Heart1 from "../../assets/img/hearts/topelements1.svg";
import Heart2 from "../../assets/img/hearts/elements2.svg";
import Heart3 from "../../assets/img/hearts/elements3.svg";
import Heart4 from "../../assets/img/hearts/elements4.svg";
import Heart5 from "../../assets/img/hearts/elements5.svg";
import Heart6 from "../../assets/img/hearts/elements6.svg";
import Heart7 from "../../assets/img/hearts/elements7.svg";
import Heart8 from "../../assets/img/hearts/elements8.svg";
import Heart9 from "../../assets/img/hearts/elements9.svg";
import Heart10 from "../../assets/img/hearts/elements11.svg";
import HeartFull from "../../assets/img/hearts/elementsFull.svg";
import SaveTrainScreenTemplate from "../../components/SaveScreen/SaveTrainScreen";
import { Context } from "../../store/context";
function SaveTrainScreen() {
  const numOfRecord = useContext(Context).numOfRecord;
  const screens = [
    "FirstRecording",
    "SecondRecording",
    "ThirdRecording",
    "FourthRecording",
    "FifthRecording",
    "SixthRecording",
    "SeventhRecording",
    "EighthRecording",
    "NinthRecording",
    "TenthRecording",
    "EleventhRecording",
  ];
  const recordingNumberTitle = [
    "ראשונה",
    "שניה",
    "שלישית",
    "רביעית",
    "חמישית",
    "שישית",
    "שביעית",
    "שמינית",
    "תשיעית",
    "עשירית",
    "אחרונה",
  ];
  const hearts = [
    <Heart1 width={65} height={50} />,
    <Heart2 width={65} height={50} />,
    <Heart3 width={65} height={50} />,
    <Heart4 width={65} height={50} />,
    <Heart5 width={65} height={50} />,
    <Heart6 width={65} height={50} />,
    <Heart7 width={65} height={50} />,
    <Heart8 width={65} height={50} />,
    <Heart9 width={65} height={50} />,
    <Heart10 width={65} height={50} />,
    <HeartFull width={65} height={50} />,
  ];

  function percentage(num) {
    return Math.round((num / 11) * 100);
  }
  return (
    <>
      <SaveTrainScreenTemplate
        img={hearts[numOfRecord]}
        recordingNumber={numOfRecord}
        progress={`${percentage(numOfRecord + 1)}% הושלמו`}
        nextScreen={screens}
        recordingNumberTitle={recordingNumberTitle[numOfRecord]}
        // audio={require("../../assets/audio/HE/FirstTestRecordSaved.m4a")}
      />
    </>
  );
}

export default SaveTrainScreen;
