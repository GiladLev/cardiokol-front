import { useState, useEffect, useContext, useCallback } from "react";
import { Audio } from "expo-av";
import { Context } from "../store/context";
import { useFocusEffect, useNavigation } from "@react-navigation/native";


const usePlaySound = (sound, playInStart) => {
  const testCtx = useContext(Context);
  const playingStatus = testCtx.playingStatus == undefined ? true : testCtx.playingStatus;


  const [isPlaying, setIsPlaying] = useState(playingStatus);
  const [soundObject, setSoundObject] = useState(null);
  const { addListener } = useNavigation();

  useEffect(() => {
    async function loadSound() {
      const soundObject = new Audio.Sound();
      try {
        await soundObject.loadAsync(sound);
        setSoundObject(soundObject);
        const isPlayingNow = await (await soundObject.getStatusAsync()).isPlaying
        playingStatus && playInStart && !isPlayingNow && await soundObject.playAsync();
        playingStatus && playInStart && setIsPlaying(true);
      } catch (error) {
        console.log(error);
      }
    }

    if (sound) {
      loadSound();
    }

    return () => {
      if (soundObject) {
        soundObject?.stopAndUnloadAsync();
        setSoundObject(null);
      }
    };
  }, [sound]);
  useEffect(() => {
    const unsubscribeWhenBack = addListener('beforeRemove', () => {
      // Stop audio playback when beforeRemove
      if (soundObject) {
      soundObject?.stopAsync();
      setSoundObject(null);
      }
    });
    const unsubscribe = addListener('blur', () => {
      // Stop audio playback when the screen goes out of focus
      if (soundObject) {
      soundObject?.stopAsync();
      setSoundObject(null);
      }

    });
    return () => {
      unsubscribe()
      unsubscribeWhenBack()
    };
  }, [soundObject]);




  const togglePlay = async () => {
    if (isPlaying) {
      await soundObject.pauseAsync();
      setIsPlaying(false);
      testCtx.savePlayingStatus(false)
    } else {
      await soundObject.playAsync();
      setIsPlaying(true);
      testCtx.savePlayingStatus(true)
    }
  };

  return [isPlaying, togglePlay];
};

export default usePlaySound;
