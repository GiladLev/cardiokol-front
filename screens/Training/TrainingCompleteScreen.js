import { useContext } from "react";
import { View, Alert, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Context } from "../../store/context";
import tw from "../../styles/tailwindConf";
import TopNav from "../../components/ui/Basic/TopNav";
import Title from "../../components/ui/Title";
import Button from "../../components/ui/Basic/Button";
import Paragraph from "../../components/ui/Paragraph";
import { sendECGRow } from "../../util/training";

import Facebook from "../../assets/img/complete-images/facebook.svg";
import HeartFinish from "../../assets/img/complete-images/HeartFinish.svg";
import Twitter from "../../assets/img/complete-images/twitter.svg";
import Whatsup from "../../assets/img/complete-images/whatsup.svg";
function TrainingCompleteScreen() {
  const trainingCtx = useContext(Context);
  const navigation = useNavigation();

  async function toHomeHandler() {
    try {
      console.log("sendECGRow")
      const result = await sendECGRow();
      console.log(result);
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
      {/* <TopNav audio={require('../../assets/audio/HE/TestComplete.m4a')} /> */}
      <TopNav />
      <View style={tw`w-full h-1/2`}>
        <View style={tw`flex-2 flex justify-center items-center`}>
          <HeartFinish width={212} height={170} />
        </View>

        <View style={tw`flex-1 flex justify-center items-center mb-10`}>
          <Title Style={"text-xl"}> הקלטות נשמרו בהצלחה</Title>
          <Title Style={"text-xl"}>והאימון הסתיים</Title>
        </View>
      </View>
      <View style={tw`w-full h-1/8 items-center`}>
        <Button onPress={toHomeHandler} Style={"text-white text-2xl font-bold"}>
          אישור
        </Button>
      </View>

      {/* <View style={tw`w-full h-1/8 flex justify-center items-center `}>
        <Paragraph Style={"text-xl"}>שיתוף</Paragraph>

        <View
          style={tw`flex-row flex justify-between items-center w-1/2 h-full `}
        >
          <Pressable>
          <Whatsup width={27} height={27}/>
          </Pressable>
          <Pressable>
            <Twitter width={27} height={27}/>
          </Pressable>
          <Pressable>
            <Facebook width={27} height={27}/>
          </Pressable>
        </View>
      </View> */}
    </View>
  );
}

export default TrainingCompleteScreen;
