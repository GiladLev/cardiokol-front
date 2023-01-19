import React, { useContext, useEffect } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Context } from "../../store/context";
import { getWavValidityStatusInSession } from "../../util/testing";

import tw from "../../styles/tailwindConf";
import TopNav from "../../components/ui/Basic/TopNav";
import Title from "../../components/ui/Title";
import CheckOff from "../../assets/img/record-images/checkoOn.svg";
import CheckoOn from "../../assets/img/record-images/checkOff.svg";
import { Dimensions } from "react-native";
import WaveAnimation from "../Animation/WaveAnimation";
const screenWidth = Dimensions.get("screen").width;
function SaveScreen({
  recordingNumber,
  recordingNumberTitle,
  progress,
  nextScreen,
  audio,
  img,
}) {
  const testCtx = useContext(Context);
  const navigation = useNavigation();
  const numCheck =
    recordingNumber === 1
      ? [true, false, false]
      : recordingNumber === 2
      ? [true, true, false]
      : [true, true, true];
  useEffect(() => {
    testCtx.saveNumOfRecord(recordingNumber);
    const timeout = setTimeout(() => {
      console.log("5 sec.");
      continueHandler();
    }, 5000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  async function checkValidVoice() {
    try {
      let result = await getWavValidityStatusInSession();
      testCtx.saveFeedback(result.message);
      if (result.message == "Successful") {
        navigation.replace("ThirdRecording");
        console.log(result.success);
      } else {
        {
          result.message == "background noise"
            ? navigation.replace("BackgroundNoice")
            : result.message == "the voice is not stable and bumpy"
            ? navigation.replace("PitchFalse")
            : result.message == "the recording is not saturated"
            ? navigation.replace("SaturetedFalse")
            : result.message == "the aaaaa in the recording is long enough"
            ? navigation.replace("VadFalse")
            : result.message == "not a good aaaa (maybe oooo or eeeee)"
            ? navigation.replace("VowelFalse")
            : navigation.replace("ThirdRecording");
        }

        console.log(result.message);
      }
    } catch (error) {
      console.log(error);
      navigation.replace("ErrorToSendToBack");
    }
  }

  function continueHandler() {
    recordingNumber === 2 ? checkValidVoice() : navigation.replace(nextScreen);
  }

  return (
    <View style={tw`w-full h-full bg-background`}>
      <View>
        <TopNav img={img} audio={audio} progress={progress} />
      </View>
      <View style={tw`flex-1`}>
        <View style={tw`flex-2 flex justify-center pb-5`}>
          <View style={tw`flex-1`} />
          <View style={tw`flex-1.4`}>
            <WaveAnimation isSaveScreen={true} />
          </View>

          <View style={tw`flex-1 items-center flex justify-center`}>
            <Title Style={"text-xl"}>{recordingNumberTitle}</Title>
            <Title Style={"text-xl"}>תודה</Title>
          </View>
          <View
            style={tw`flex-1 flex-row-reverse flex justify-around items-center px-30`}
          >
            {numCheck.map((item, index) =>
              item ? (
                <CheckOff width={27} height={29} key={index} />
              ) : (
                <CheckoOn width={27} height={29} key={index} />
              )
            )}
          </View>
        </View>
      </View>
    </View>
  );
}

export default SaveScreen;
