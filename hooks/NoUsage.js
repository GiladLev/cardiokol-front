import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import usePlaySound from "./PlaySoundHook";

const useNoUsage = (isStartRecord) => {
  const [isShowing, setIsShowing] = useState(false);
  const [is15sOver, setIs15sOver] = useState(false);
  const audio = require('../assets/audio/HE/WeAreReadyLetsStart.m4a')
  const playInStart = false
  const [isPlaying, togglePlay] = usePlaySound(audio, playInStart);
  const navigation = useNavigation();
  useEffect(() => {
    const timeout15S = setTimeout(() => {
      console.log("15 seconds passed");
      !isStartRecord && setIs15sOver(true)
    }, 15000);

    const timeout30S = setTimeout(() => {
      console.log("30 seconds passed");
      !isStartRecord && togglePlay()
    }, 30000);

    return () => {
      clearTimeout(timeout15S);
      clearTimeout(timeout30S);
    };
  }, []);

  return isShowing;
};

export default useNoUsage;
