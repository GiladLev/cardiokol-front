import React, { useCallback, useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, AppState } from "react-native";
import Button from "../../components/ui/Button";
import { Audio } from "expo-av";
import { sendTestRecord } from "../../util/testing";
import { sendTrainingRecord } from "../../util/training";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Context } from "../../store/context";
import tw from "../../styles/tailwindConf";
import TopNav from "../../components/ui/Basic/TopNav";
import Microphone from "../../assets/img/record-images/microphone.svg";
import Hurt from "../../assets/img/record-images/hurt.svg";
import Title from "../../components/ui/Title";
import Paragraph from "../../components/ui/Paragraph";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import WaveAnimation from "../Animation/WaveAnimation";
import StatusVoice from "./StatusVoice";
import FadeInView from "../Animation/FadeInView";

export default function RecordScreen({
  img,
  progress,
  audioMale,
  audioFemale,
  nextScreen,
  mode,
}) {
  const [recording, setRecording] = useState();
  const navigation = useNavigation();
  const testCtx = useContext(Context);
  const [isRecord, setIsRecord] = useState(false);
  const [metering, setMetering] = useState(-160);
  const [durationMillis, setDurationMillis] = useState(0);
  const [isFirst, setIsFirst] = useState(true);
  const [isLowVoice, setIsLowVoice] = useState(false);
  const [isHighVoice, setIsHighVoice] = useState(false);
  const [CountAhh, setCountAhh] = useState(0);
  const [send, setSend] = useState(false);
  const [lastDecibel, setLastDecibel] = useState([-160, -160]);
  const playingStatus = testCtx.playingStatus;
  let timeout;
  let timeout15s;
  let timeout30s;

  // waveAnimation
  const SampleTimeMillis = 100;
  const recordDuration = 6000;
  const numOfSample = Math.round(recordDuration / SampleTimeMillis);
  useEffect(() => {
    const fillTheArr = Array(numOfSample)
      .fill()
      .map(() => -170);
    testCtx.saveFinishDecibel(fillTheArr);
  }, []);

  const [numSecond, setNumSecond] = useState(0);
  useEffect(() => {
    timeout = setTimeout(
      () => {
        startRecording();
      },
      playingStatus ? 5000 : 3000
    );
    timeout15s = setTimeout(() => {
      if (isFirst && !isRecord && !send) {
        console.log("pass 15s without record");
      }
    }, 15000);
    timeout30s = setTimeout(() => {
      if (isFirst && !isRecord && !send) {
        console.log("pass 30s without record");
        setRecording(null);
        navigation.replace("StopAlert");
      }
    }, 30000);
    return () => {
      clearTimeout(timeout);
      clearTimeout(timeout15s);
      clearTimeout(timeout30s);
      const stopRecordingAndReset = async () => {
        await recording?.stopAndUnloadAsync();
        setRecording(null);
      };
      if (recording) {
        stopRecordingAndReset();
      }
    };
  }, []);
  const stopRecordingAndReset = async () => {
    await recording?.stopAndUnloadAsync();
    setRecording(null);
  };
  useFocusEffect(
    useCallback(() => {
      const unsubscribe = navigation.addListener("beforeRemove", () => {
        // stop recording and save the audio to the media library when the screen is about to be removed
        
        if (recording) {
          stopRecordingAndReset();
        }
      });

      // the return value of the useFocusEffect callback will be called when the screen is no longer focused
      return unsubscribe;
    }, [navigation, recording])
  );


  AppState.addEventListener('change', (state) => {
    if (state === 'background') {
      stopRecordingAndReset()
    }
  });



  useEffect(() => {
    async function statusMetering() {
      if (metering > -30 && isFirst) {
        setIsRecord(true);
        setRecording(undefined);
        await recording?.stopAndUnloadAsync();
        console.log("stop record &&&&&&&&&&&&&&&&");
        startRecording();
        console.log("start new record");
        setIsFirst(false);
      }
      // Check low volume
      if (metering < -80 && isRecord) {
        setIsLowVoice(true);
      }
      if (metering > -80 && isRecord) {
        setIsLowVoice(false);
      }
      if (metering > -5 && isRecord) {
        setIsHighVoice(true);
      }
      if (metering < -5 && isRecord) {
        setIsHighVoice(false);
      }
      // Check if the user says aha
      if (metering < -50 && isRecord) {
        setCountAhh(CountAhh + 1);
      }
      if (!isFirst && numSecond < numOfSample) {
        const newPowerDecibel = testCtx.finishDecibel;
        const index = Math.round(durationMillis / 80) 

        console.log(durationMillis);
        let index2 = numSecond;
        while (index2 < index){
          newPowerDecibel[index2++] = metering
          console.log(index2);
        }

        testCtx.saveFinishDecibel(newPowerDecibel);
        setNumSecond(index);
      }
    }
    statusMetering();
  }, [metering]);

  

  // useEffect(() => {
  //   if (CountAhh > 2) {
  //     navigation.replace("VadFalse");
  //   }
  // }, [CountAhh]);

  useEffect(() => {
    if (durationMillis > 6000 && !isFirst && !send) {
      console.log("stop record &&&&&&&&&&&&&&&&");
      setSend(true);
      stopRecording();
    }
  }, [durationMillis]);

  async function startRecording() {
    try {
      console.log("Requeting submission...");

      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      console.log("Start recording....");
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync({
        ...Audio.RecordingOptionsPresets.HIGH_QUALITY,
        isMeteringEnabled: true,
      });
      recording.setProgressUpdateInterval(SampleTimeMillis);
      recording.setOnRecordingStatusUpdate((status) => {
        // console.log("metering:", status.metering);
        // console.log("duration in milisec:", status.durationMillis);
        setMetering(status.metering);
        // setLastDecibel((lastDecibel) => [...lastDecibel, status.metering]);
        setDurationMillis(status.durationMillis);
      });

      await recording.startAsync();
      setRecording(recording);
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    console.log("Stopping recording...");
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    const uri = await recording?.getURI();
    console.log("Recording stopped and stored at", uri);

    if (mode == "Training") {
      const result = await sendTrainingRecord(uri);
      // setSend(true);
    } else {
      const result = await sendTestRecord(uri);
      // setSend(true);
    }
    navigation.replace(nextScreen);
  }

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
              <WaveAnimation numSecond={numSecond}/>
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
                duration={6}
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
