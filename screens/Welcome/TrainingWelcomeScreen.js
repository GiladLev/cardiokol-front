import React, { useContext, useEffect } from "react";
import { View, Alert, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Context } from "../../store/context";
import { startTraining } from "../../util/training";
import tw from "../../styles/tailwindConf";
import Paragraph from "../../components/ui/Paragraph";
import StartTraining from "../../components/ui/HomeComponents/StartTraining";
import { SafeAreaView } from "react-native";
import BottomNavBar from "../../components/ui/HomeComponents/BottomNavBar";
import Information from "../../components/ui/HomeComponents/Information";
import MedicalRecommend from "../../components/ui/HomeComponents/MedicalRecommend";
import Progress from "../../components/ui/HomeComponents/Progress";
import IconButton from "../../components/ui/IconButton";
import { Audio } from "expo-av";
import Setting from "../../assets/img/Welocome-images/settings.svg";
import Help from "../../assets/img/Welocome-images/help.svg";
import { Colors } from "react-native/Libraries/NewAppScreen";
function TrainingWelcomeScreen() {
  const trainingCtx = useContext(Context);
  const navigation = useNavigation();

  const name = trainingCtx.name;

  const curHour = new Date().getHours();

  const greeting =
    curHour >= 0 && curHour <= 12
      ? ` בוקר טוב, ${name}`
      : curHour > 12 && curHour <= 18
      ? `צהריים טובים, ${name}`
      : `ערב טוב, ${name}`;

  React.useEffect(() => {
    async function Permissions() {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
    }
    Permissions();
  }, []);

  async function startTrainingHandler() {
    try {
      let result = await startTraining();

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
          <View style={tw`flex-row mx-3`}>
            <IconButton
              icon="exit"
              color={"#F1F1F1"}
              size={24}
              onPress={trainingCtx.logout}
            />
            <Setting width={35} height={35} style={tw`mr-4`} />
            <Help width={35} height={35} />
          </View>
          <Paragraph Style={`mr-2 text-lg`}>{greeting}</Paragraph>
        </View>

        <StartTraining startTrainingHandler={startTrainingHandler} />

        <Information />

        <Progress />

        <MedicalRecommend />
      </ScrollView>
      <BottomNavBar />
    </SafeAreaView>
  );
}

export default TrainingWelcomeScreen;
