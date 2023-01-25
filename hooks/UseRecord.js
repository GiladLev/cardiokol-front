import { useState, useEffect, useContext, useCallback } from "react";
import { Audio } from "expo-av";
import { sendTestRecord } from "../util/testing";
import { sendTrainingRecord } from "../util/training";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Context } from "../store/context";
import { AppState } from "react-native";
const useRecord = (mode, nextScreen) => {
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
  const [onLoad, setOnLoad] = useState(true);
  const [numSecond, setNumSecond] = useState(0);

  const playingStatus = testCtx.playingStatus;
  let timeout;
  let timeout15s;
  let timeout30s;

  // waveAnimation
  const SampleTimeMillis = 100;
  const recordDuration = 4000;
  const numOfSample = Math.round(recordDuration / SampleTimeMillis);

  useEffect(() => {
    if (onLoad) {
      const fillTheArr = Array(numOfSample)
        .fill()
        .map(() => -170);

      testCtx.saveFinishDecibel(fillTheArr);
      setOnLoad(false);
    }
  }, []);

  useEffect(() => {
    timeout = setTimeout(
      () => {
        startRecording();
      },
      playingStatus ? 4700 : 3000
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

  useEffect(() => {
    async function statusMetering() {
      if (isFirst) {
        if (metering > -30 && isFirst) {
          setIsRecord(true);
          await recording?.stopAndUnloadAsync();
          setRecording(null);
          setDurationMillis(0);
          setMetering(-160);
          console.log("stop record &&&&&&&&&&&&&&&&");
          startRecording();
          console.log("start new record");
          setIsFirst(false);
        }
      } else {
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
          const index = Math.round(durationMillis / 60);
          let index2 = numSecond;
          while (index2 < index && !isFirst) {
            newPowerDecibel[index2++] = metering;
          }

          testCtx.saveFinishDecibel(newPowerDecibel);
          setNumSecond(index);
        }
      }
    }
    statusMetering();
  }, [metering]);

  useEffect(() => {
    if (durationMillis > recordDuration && !isFirst && !send) {
      console.log("stop record &&&&&&&&&&&&&&&&");
      setSend(true);
      stopRecording();
    }
  }, [durationMillis, CountAhh]);

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
    if (CountAhh > 15) {
      navigation.replace("VadFalse");
    } else {
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
  }

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

  AppState.addEventListener("change", (state) => {
    if (state === "background") {
      stopRecordingAndReset();
    }
  });

  return [isLowVoice, isHighVoice, isRecord, numSecond];
};

export default useRecord;
