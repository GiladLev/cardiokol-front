import { useContext, useEffect } from "react";
import {  View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Context } from "../../store/context";

import tw from "../../styles/tailwindConf";
import TopNav from "../../components/ui/Basic/TopNav";
import Card from "../../components/ui/Basic/Card";

import PhoneHold from "../../assets/img/beforeFirstRecord-images/phoneHold.svg";
import SilenceIcon from "../../assets/img/beforeFirstRecord-images/silenceIcon.svg";
import Button from "../../components/ui/Basic/Button";

function PrepareToRecord() {
  const trainingCtx = useContext(Context);
  const navigation = useNavigation();
  useEffect(() => {
    trainingCtx.saveNumOfRecord(0)
  }, [])
  

  function startTestHandler() {
    
    navigation.navigate("FirstRecording");
  }

  return (
    <View style={tw`w-full h-full bg-background mt-5`}>
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
          firstText={trainingCtx.gender == "MALE" ? "בדוק שאתה" : "בדקי שאת"}
          secondText={"בסביבה שקטה"}
          img={<SilenceIcon width={70} height={70} />}
        />

        <Card
          firstText={trainingCtx.gender == "MALE" ? "החזיק את הטלפון" : "החזיקי את הטלפון"}
          secondText={"קרוב אליך"}
          img={<PhoneHold width={70} height={70} />}
        />
      </View>

      <View style={tw`flex-2 items-center justify-center`}>
        <Button
          onPress={startTestHandler}
          Style={"text-white font-bold"}
        >
          התחלת בדיקה
        </Button>
      </View>
    </View>
  );
}

export default PrepareToRecord;
