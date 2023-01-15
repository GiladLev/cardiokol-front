import { useContext } from "react";
import { View, Alert, Animated, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Context } from "../../store/context";
import tw from "../../styles/tailwindConf";
import TopNav from "../../components/ui/Basic/TopNav";
import Title from "../../components/ui/Title";
import Button from "../../components/ui/Basic/Button";
import Paragraph from "../../components/ui/Paragraph";
import { sendECGRow, getTrainingStatus } from "../../util/training";

import Facebook from "../../assets/img/complete-images/facebook.svg";
import HeartFinish from "../../assets/img/complete-images/HeartFinish.svg";
import Twitter from "../../assets/img/complete-images/twitter.svg";
import Whatsup from "../../assets/img/complete-images/whatsup.svg";
import FinshAnimation from "../../components/Animation/FinshAnimation";
import { useState } from "react";
import { useEffect } from "react";
function TestCompleteScreen() {
  const authCtx = useContext(Context);
  const trainingStatus =  authCtx.trainingStatus === "TRAINING_STATUS_PATIENT_CREATED" || authCtx.trainingStatus == null
  const navigation = useNavigation();
  const [scaleValue] = useState(new Animated.Value(1));
  useEffect(() => {
    Animated.timing(scaleValue, {
      toValue: 1.4,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, []);
  async function toHomeHandler() {
    try {
      if (trainingStatus){
        const result = await sendECGRow();
        console.log(result);

        const curTrainingStatus = await getTrainingStatus();
        authCtx.saveTrainingStatus(curTrainingStatus);  
      } 
      navigation.navigate("Welcome");
    } catch (error) {
      console.log(error);
    }
  }

  function next() {
    navigation.navigate("NoInternet");
  }

  return (
    <View style={tw`w-full h-full mt-5`}>
      <TopNav audio={trainingStatus ? null : require("../../assets/audio/HE/TestComplete.m4a")} isCompleteScreen={true}/>

      <View style={tw`w-full h-1/2`}>
        <View style={tw`flex-2 flex justify-around items-center`}>
          {/* <HeartFinish width={212} height={170} />
          <Paragraph Style={"text-base"}>100% הושלמו</Paragraph> */}
          <FinshAnimation/>
        </View>

        <Animated.View style={[tw`flex-1 flex justify-center items-center mb-10`, { transform: [{ scale: scaleValue }] }]}>
          <Title Style={"text-sm"}> הקלטות נשמרו בהצלחה</Title>
          <Title Style={"text-sm"}>{trainingStatus ? `האימון הסתיים` : `הבדיקה הסתיימה`}</Title>
        </Animated.View>
      </View>
      <View style={tw`w-full h-1/8 items-center`}>
        <Button onPress={toHomeHandler} Style={"text-white text-2xl font-bold"}>
          אישור
        </Button>
      </View>

      <View style={tw`w-full h-1/8 flex justify-center items-center `}>
        <Paragraph Style={"text-xl"}>שיתוף</Paragraph>

        <View
          style={tw`flex-row flex justify-between items-center w-1/2 h-full `}
        >
          <Pressable>
            <Whatsup width={27} height={27} />
          </Pressable>
          <Pressable>
            <Twitter width={27} height={27} />
          </Pressable>
          <Pressable>
            <Facebook width={27} height={27} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

export default TestCompleteScreen;
