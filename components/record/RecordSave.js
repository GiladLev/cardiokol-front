import React, { useContext } from "react";
import { View, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Context } from "../../store/context";
import tw from "../../styles/tailwindConf";
import TopNav from "../../components/ui/Basic/TopNav";
import Title from "../../components/ui/Title";
import Hurt from "../../assets/img/record-images/hurt.svg";
import CheckoOn from "../../assets/img/record-images/checkoOn.svg";
import CheckOff from "../../assets/img/record-images/checkOff.svg";
import Wave from "../../assets/img/AnimationWave/wave.svg";
function RecordSave() {
  const trainingCtx = useContext(Context);
  const navigation = useNavigation();

  React.useEffect(() => {
    setTimeout(() => {
      console.log("5 sec.");
      continueHandler();
    }, 5000);
  }, []);

  async function continueHandler() {
    try {
      navigation.navigate("SecondRecording");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={tw`w-full h-full bg-background flex justify-between pt-5`}>
      <TopNav
        img={<Hurt width={65} height={50} />}
        audio={require("../../assets/audio/HE/FirstTestRecordSaved.m4a")}
      />
      <View style={tw`h-1/4  w-full `}>
        <Wave />
      </View>

      <View style={tw`w-full h-1/3`}>
        <View style={tw`w-full items-center pb-5`}>
          <Title Style={"text-xl"}>ההקלטה הראשונה נשמרה</Title>
          <Title Style={"text-xl"}>תודה</Title>
        </View>
        <View
          style={tw`w-full flex-row flex justify-around items-center px-30`}
        >
          <CheckOff width={27} height={29} />
          <CheckOff width={27} height={29} />
          <CheckoOn width={27} height={29} />
        </View>
      </View>
    </View>
  );
}

export default RecordSave;
