import React, { useContext } from "react";
import { View, Alert, Image, ScrollView, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Context } from "../../store/context";
import { startTest } from "../../util/testing";
import tw from "../../styles/tailwindConf";
import Paragraph from "../../components/ui/Paragraph";
import StartTest from "../../components/ui/HomeComponents/StartTest";
import { SafeAreaView } from "react-native";
import BottomNavBar from "../../components/ui/HomeComponents/BottomNavBar";
import Information from "../../components/ui/HomeComponents/Information";
import MedicalRecommend from "../../components/ui/HomeComponents/MedicalRecommend";
import IconButton from "../../components/ui/IconButton";
import Progress from "../../components/ui/HomeComponents/Progress";
import { Audio } from "expo-av";
import Setting from "../../assets/img/Welocome-images/settings.svg";
import Help from "../../assets/img/Welocome-images/help.svg";
import { useEffect } from "react";
function TestWelcomeScreen() {
  const navigation = useNavigation();
  
  const trainingCtx = useContext(Context);
  const name = trainingCtx.name;

  const curHour = new Date().getHours();

  const greeting =
    curHour >= 0 && curHour <= 12
      ? ` בוקר טוב, ${name}`
      : curHour > 12 && curHour <= 18
      ? `צוהריים טובים, ${name}`
      : `ערב טוב, ${name}`;

  React.useEffect(() => {
    async function Permissions() {
      console.log("Requeting submission...");

      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
    }
    Permissions();
  }, []);

  async function startTestHandler() {

    try {
      let result = await startTest();

      trainingCtx.saveApproachId(result.approachId);
      trainingCtx.saveSessionId(result.sessionId);

      navigation.navigate("PrepareToRecord");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <SafeAreaView style={tw`w-full h-full bg-background pb-16`}>
      <ScrollView>
        <View
          style={tw`w-full h-14 flex-row flex justify-between items-center`}
        >
          <View style={tw` flex-row mx-3`}>
            {/* <IconButton
              icon="exit"
              color={"#000000"}
              size={24}
              onPress={trainingCtx.logout}
            /> */}
            <Setting width={35} height={35} style={tw`mr-4`} />
            <Pressable onPress={trainingCtx.logout}>

            <Help width={35} height={35} />
            </Pressable>
          </View>
          <Paragraph Style={`mr-2 text-lg`}>{greeting}</Paragraph>
        </View>

        <StartTest startTestHandler={startTestHandler} />

        <Information />

        <Progress />

        <MedicalRecommend />
      </ScrollView>
      <BottomNavBar />
    </SafeAreaView>
  );
}

export default TestWelcomeScreen;
