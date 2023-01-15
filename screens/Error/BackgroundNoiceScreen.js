import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import tw from "../../styles/tailwindConf";
import TopNav from "../../components/ui/Basic/TopNav";
import Title from "../../components/ui/Title";
import Button from "../../components/ui/Basic/Button";
import { useNavigation } from "@react-navigation/native";
import Heart from "../../assets/img/error-images/hearts.svg";

const BackgroundNoice = () => {
  const navigation = useNavigation();

  async function continueHandler() {
    try {
      navigation.navigate("ThirdRecording");
    } catch (error) {
      console.log(error);
    }
  }
  {
  }
  return (
    <View style={tw`h-full w-full bg-backgroundError pt-5`}>
      <TopNav audio={require("../../assets/audio/HE/BackgroundNoice.m4a")} />

      <View style={tw`h-1/2 w-full flex justify-around items-center  `}>
        <View style={tw`flex justify-center items-center`}>
          <Title Style={`text-xl`}>זיהנו שיש רעשי רקע</Title>
          <Title Style={`text-xl`}>וזה מפריע להקלטה</Title>
        </View>

        <Heart width={110} height={88} />

        <View style={tw`flex justify-center items-center`}>
          <Title Style={`text-2xl`}>עבור למקום שקט</Title>
          <Title Style={`text-2xl`}>ונוכל להמשיך בבדיקה</Title>
        </View>
      </View>

      <View style={tw`w-full h-1/8 flex justify-center items-center mt-4`}>
        <Button
          onPress={continueHandler}
          Style={"text-white font-bold text-2xl"}
        >
          להמשיך בבדיקה
        </Button>
      </View>
    </View>
  );
};

export default BackgroundNoice;

