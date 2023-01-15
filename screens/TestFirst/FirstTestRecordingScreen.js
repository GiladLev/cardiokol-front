import { View, Text } from "react-native";
import React from "react";
import RecordScreen from "../../components/record/RecordScreen";
import Heart from "../../assets/img/hearts/elements3.svg";

const FirstTestRecordingScreen = () => {
  return (
    <>
      <RecordScreen
        img={<Heart width={65} height={50} />}
        progress={"33% הושלמו"}
        audioMale={require("../../assets/audio/HE/MALE/FirstTestRecordingMale.m4a")}
        audioFemale={require("../../assets/audio/HE/FEMALE/FirstTestRecordingFemale.m4a")}
        nextScreen={"FirstRecordSaved"}
        mode={"Test"}
      />
    </>
  );
};

export default FirstTestRecordingScreen;
