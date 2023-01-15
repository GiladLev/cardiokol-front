import { View } from "react-native";
import React, { useContext } from "react";
import tw from "../../styles/tailwindConf";
import TopNav from "../../components/ui/Basic/TopNav";
import Title from "../../components/ui/Title";
import Button from "../../components/ui/Basic/Button";
import { useNavigation } from "@react-navigation/native";
import Heart from "../../assets/img/error-images/hearts.svg";

const SaturetedFalseScreen = () => {
  const navigation = useNavigation();
  const testCtx = useContext(Context);

  async function continueHandler() {
    try {
      navigation.navigate("ThirdRecording");
    } catch (error) {
      Alert.alert(console.log(error));
    }
  }
  {
  }
  return (
    <View style={tw`h-full w-full bg-backgroundError pt-5`}>
      <View>
        {testCtx.gender == "MALE" ? (
          <TopNav
            audio={require("../../assets/audio/HE/MALE/SaturetedMale.m4a")}
          />
        ) : (
          <TopNav
            audio={require("../../assets/audio/HE/FEMALE/SaturetedFemale.m4a")}
          />
        )}
      </View>

      <TopNav audio={require("../../assets/audio/HE/BackgroundNoice.m4a")} />

      <View style={tw`h-1/2 w-full flex justify-around items-center  `}>
        <View style={tw`flex justify-center items-center`}>
          <Title Style={`text-xl`}>הקול חלש מידי</Title>
          <Title Style={`text-xl`}>יש להגביר את הקול</Title>
        </View>

        <Heart width={110} height={88} />

        <View style={tw`flex justify-center items-center`}>
          {testCtx.gender == "MALE" ? (
            <Title Style={`text-2xl`}>נסה להמשיך עם קול חזק</Title>
          ) : (
            <Title Style={`text-2xl`}>נסי להמשיך עם קול חזק</Title>
          )}
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

export default SaturetedFalseScreen;
