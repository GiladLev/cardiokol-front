import AsyncStorage from "@react-native-async-storage/async-storage";
import AppLoading from "expo-app-loading";
import * as SplashScreen from "expo-splash-screen";
import "react-native-gesture-handler";
import axios from "axios";
import { useContext, useState } from "react";
import { Context } from "../store/context";
import { useEffect } from "react";
import Navigation from "./Navigation";
import { Platform } from "react-native";

export default function Root() {
  const [isTryingLogin, setIsTryingLogin] = useState(true);

  const authCtx = useContext(Context);

  async function showSplashScreen() {
    await SplashScreen.preventAutoHideAsync();
    if (isTryingLogin) {
      return <AppLoading />;
    }
    await SplashScreen.hideAsync();
  }

  useEffect(() => {
    async function getTrainingStatus() {
      
      // const storedAlgoId = await AsyncStorage.getItem("algoId");
      // console.log(storedAlgoId);

      // // const BASE_URL_IOS = '127.0.0.1'
      // // const BASE_URL_ANDROID = '10.0.2.2'
      // const BASE_URL_IOS = '84.229.159.145'
      // const BASE_URL_ANDROID = '84.229.159.145'
      // let url = `http://${BASE_URL_IOS}:5001/api/get_training_status/`  + storedAlgoId;

      // if (Platform.OS === "android") {
      //   url = `http://${BASE_URL_ANDROID}:5001/api/get_training_status/` + storedAlgoId;
      // }

      // console.log(url);
      // const response = await axios.get(url);

      // console.log(response.data);

      // let trnStatus = response.data.status;
      const trnStatus = await AsyncStorage.getItem("trainingStatus");
      authCtx.saveTrainingStatus(trnStatus);
    }

    getTrainingStatus();

    async function fetchName() {
      const storedName = await AsyncStorage.getItem("name");
      authCtx.saveName(storedName);
    }

    fetchName();

    async function fetchGender() {
      const storedGender = await AsyncStorage.getItem("gender");
      authCtx.saveGender(storedGender);
    }
    
    fetchGender();

    async function fetchPlayingStatus() {
      const storedPlayingStatus = await AsyncStorage.getItem("playingStatus");
      authCtx.savePlayingStatus(Boolean(storedPlayingStatus));
    }

    
    fetchPlayingStatus();

    async function fetchAdherence() {
      const storedAdherence = await AsyncStorage.getItem("adherenceWeek");
      // console.log(storedAdherence);
      authCtx.saveAdherenceWeek(storedAdherence);
    }
    
    fetchAdherence();

    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem("token");
      const storedId = await AsyncStorage.getItem("algoId");
      const storedPN = await AsyncStorage.getItem("approachId");
      const storedV = await AsyncStorage.getItem("feedback");

      console.log(storedId);
      if (storedToken) {
        authCtx.authenticate(storedToken);
      }

      setIsTryingLogin(false);
    }

    fetchToken();
  }, []);

  showSplashScreen()

  return <Navigation />;
}
