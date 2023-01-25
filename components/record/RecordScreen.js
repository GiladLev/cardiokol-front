import React, { useCallback, useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, AppState } from "react-native";
import { Context } from "../../store/context";
import tw from "../../styles/tailwindConf";
import TopNav from "../../components/ui/Basic/TopNav";
import Microphone from "../../assets/img/record-images/microphone.svg";
import Title from "../../components/ui/Title";
import Paragraph from "../../components/ui/Paragraph";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import WaveAnimation from "../Animation/WaveAnimation";
import StatusVoice from "./StatusVoice";
import FadeInView from "../Animation/FadeInView";
import useRecord from "../../hooks/UseRecord";

export default function RecordScreen({
  img,
  progress,
  audioMale,
  audioFemale,
  nextScreen,
  mode,
}) {
  const testCtx = useContext(Context);
  const [isLowVoice, isHighVoice, isRecord, numSecond ] = useRecord(mode, nextScreen)

  return (
    <View style={tw`w-full h-full bg-background flex justify-between`}>
      <View>
        {testCtx.gender == "MALE" ? (
          <TopNav img={img} progress={progress} audio={audioMale} />
        ) : (
          <TopNav img={img} progress={progress} audio={audioFemale} />
        )}
      </View>
      <View style={tw`flex-1`}>
        <View style={tw`flex-2 flex justify-center pb-5`}>
          <View style={tw`flex-1`}>
            {isLowVoice ? (
              <StatusVoice
                firstText={"הקול חלש מידי"}
                secText={"יש להגביר את הקול"}
              />
            ) : isHighVoice ? (
              <StatusVoice
                firstText={"הקול חזק מידי"}
                secText={"יש להחליש את הקול"}
              />
            ) : null}
          </View>
          <View style={tw`flex-1.4`}>
            {isRecord ? (
              <WaveAnimation numSecond={numSecond} />
            ) : (
              <Image
                style={tw`flex-1 w-full`}
                source={require("../../assets/img/record-images/Breathing-loop.gif")}
              />
            )}
          </View>
        </View>

        <View style={tw`flex-1 w-full items-center flex justify-center`}>
          {testCtx.gender == "MALE" ? (
            <FadeInView>
              <Title Style={"text-xl"}>קח נשימה עמוקה</Title>
              <Title Style={"text-xl"}>ואמור אההה ארוך</Title>
            </FadeInView>
          ) : (
            <FadeInView>
              <Title Style={"text-xl"}>קחי נשימה עמוקה</Title>
              <Title Style={"text-xl"}>ואמרי אההה ארוך</Title>
            </FadeInView>
          )}
        </View>

        <View style={tw` flex-1 w-full items-center`}>
          <View
            style={tw`w-15 h-15 bg-recordCircle rounded-full items-center flex justify-center border border-colorBorder mb-5`}
          >
            {isRecord == false ? (
              <Microphone height={30} width={22} />
            ) : (
              <CountdownCircleTimer
                isPlaying={isRecord}
                duration={4}
                colors={["#219494"]}
                size={80}
                strokeWidth={5}
                onComplete={() => ({ delay: 2 })}
              >
                {({ remainingTime }) => (
                  <Paragraph Style={"text-xl mt-1"}>{remainingTime}</Paragraph>
                )}
              </CountdownCircleTimer>
            )}
          </View>

          {isRecord == false ? (
            <Paragraph Style={"text-base pb-5"}>מוכן להקלטה</Paragraph>
          ) : (
            <Paragraph Style={"text-base pb-5"}>מקליט</Paragraph>
          )}
        </View>
      </View>
    </View>
  );
}
