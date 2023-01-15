import React, { useContext } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Context } from "../../store/context";
import { getWavValidityStatusInSession } from "../../util/testing";

import tw from "../../styles/tailwindConf";
import TopNav from "../../components/ui/Basic/TopNav";
import { Image } from "react-native";
import Title from "../../components/ui/Title";
import Hurt from "../../assets/img/record-images/hurt.svg";
import CheckOn from "../../assets/img/record-images/checkoOn.svg";
import CheckOff from "../../assets/img/record-images/checkOff.svg";
import Button from "../../components/ui/Basic/Button";
import { useEffect } from "react";
import Heart from "../../assets/img/hearts/elements3.svg";
import WaveAnimation from "../../components/Animation/WaveAnimation";

function SaveTrainScreenTemplate({
  img,
  progress,
  nextScreen,
  audio,
  recordingNumberTitle
}) {
  const trainingCtx = useContext(Context);
  const navigation = useNavigation();


  function sumIsPositive(n) {
    const res = new Array(11).fill(false);
    for (let i = 0; i < n + 1; i++) {
      res[i] = true;
    }
    return res;
  }
  const numCheck = sumIsPositive(trainingCtx.numOfRecord);
  const FirstNumCheck = numCheck.slice(0, 5);
  const SecondNumCheck = numCheck.slice(5, 11);

  // useEffect(() => {
  //
  //   const timeout = setTimeout(() => {
  //     console.log("5 sec.");
  //     continueHandler();
  //   }, 5000);
  //   return () => {
  //     clearTimeout(timeout);
  //   };
  // }, []);

  function continueHandler() {
    navigation.navigate(nextScreen[trainingCtx.numOfRecord+1]);
    trainingCtx.saveNumOfRecord(trainingCtx.numOfRecord+1);
  }

  return (
    <View style={tw`w-full h-full bg-background`}>
      <TopNav img={img} audio={audio} progress={progress} />
      <View style={tw`flex-2 flex justify-center pb-5`}>
        <View style={tw`flex-1`} />
        <View style={tw`flex-1`}>
          <WaveAnimation isSaveScreen={true} />
        </View>
        <View style={tw`flex-1 items-center flex justify-end`}>
          <Title Style={"text-xl"}>{`הקלטה ${recordingNumberTitle} נשמרה`}</Title>
          <Title Style={"text-xl"}>תודה</Title>
        </View>
        <View style={tw`flex-1 items-center flex justify-center`}>
          <View
            style={tw`w-full flex-row-reverse flex justify-around items-center px-25 pt-5 pb-5`}
          >
            {FirstNumCheck.map((item, index) => {
              return item ? (
                <CheckOn width={27} height={29} key={index}/>
              ) : (
                <CheckOff width={27} height={29} key={index}/>
              );
            })}
          </View>
          <View
            style={tw`w-full flex-row-reverse flex justify-around items-center px-20 pb-5`}
          >
            {SecondNumCheck.map((item, index) => {
              return item ? (
                <CheckOn width={27} height={29} key={index}/>
              ) : (
                <CheckOff width={27} height={29} key={index}/>
              );
            })}
          </View>
        </View>
        <View style={tw`flex-1 w-full items-center flex justify-center`}>
          <Button
            onPress={continueHandler}
            Style={"text-white text-2xl font-bold"}
          >
            להמשיך באימון
          </Button>
        </View>
      </View>
    </View>
  );
}

export default SaveTrainScreenTemplate;
