import { View, Text } from "react-native";
import React, { useContext } from "react";
import tw from "../../../styles/tailwindConf";
import Button from "../Basic/Button";
import TopNav from "../Basic/TopNav";
import Paragraph from "../Paragraph";
import { Context } from "../../../store/context";
import {
  CommonActions,
  StackActions,
  useNavigation,
} from "@react-navigation/native";
const TemplateError = ({
  head,
  body,
  textButton,
  secondHead,
  audio,
  nextScreen,
}) => {
  const testCtx = useContext(Context);
  const navigation = useNavigation();
  function nextTestHandler() {
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
    
    const nextPage =
      nextScreen === "testError" ? screens[testCtx.numOfRecord] : nextScreen;
    navigation.replace(nextPage);
  }
  return (
    <View style={tw`flex-1`}>
      {audio ? <TopNav audio={audio} /> : null}
      <View style={tw`flex-1 flex justify-center items-center`}>
        <Paragraph Style={"font-bold text-lg"}>{head}</Paragraph>
        {secondHead && (
          <Paragraph Style={"font-bold text-lg"}>{secondHead}</Paragraph>
        )}
      </View>
      <View style={tw`flex-1 items-center flex justify-around`}>{body}</View>
      <View style={tw`flex-1 items-center flex justify-center`}>
        <Button Style={"text-lg"} onPress={nextTestHandler}>
          {textButton}
        </Button>
      </View>
    </View>
  );
};

export default TemplateError;
