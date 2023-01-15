import { useContext } from "react";
import { StyleSheet, Text, View, Alert, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Context } from "../../store/context";
import { startTest } from "../../util/testing";

import tw from "../../styles/tailwindConf";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import TopNav from "../../components/ui/Basic/TopNav";
import Card from "../../components/ui/Basic/Card";

import PhoneHold from "../../assets/img/beforeFirstRecord-images/phoneHold.svg";
import SilenceIcon from "../../assets/img/beforeFirstRecord-images/silenceIcon.svg";
import Button from "../../components/ui/Basic/Button";
import { SafeAreaView } from "react-native";

function PrepareToTrainingScreen() {
  const trainingCtx = useContext(Context);
  const navigation = useNavigation();

  async function startTestHandler() {
    navigation.navigate("FirstRecording");
  }

  return (
    <SafeAreaView style={tw`w-full h-full bg-background mt-5`}>
      {/* nav */}
      <View>
        {trainingCtx.gender == "MALE" ? (
          <TopNav
            audio={require("../../assets/audio/HE/MALE/PrepareToRecordMale.m4a")}
          />
        ) : (
          <TopNav
            audio={require("../../assets/audio/HE/FEMALE/PrepareToRecordFemale.m4a")}
          />
        )}
      </View>

      {/* body */}
      <View style={tw`flex-2 flex  justify-around items-center`}>
        <Card
          firstText={"בדקו שאתם"}
          secondText={"בסביבה שקטה"}
          img={<SilenceIcon width={70} height={70} />}
        />

        <Card
          firstText={"החזיקו את הטלפון"}
          secondText={"קרוב אליכם"}
          img={<PhoneHold width={70} height={70} />}
        />
      </View>

      <View style={tw`flex-2 items-center justify-center`}>
        <Button
          onPress={startTestHandler}
          Style={"text-white text-2xl font-bold"}
        >
          התחלת אימון
        </Button>
      </View>
    </SafeAreaView>
  );
}

export default PrepareToTrainingScreen;
