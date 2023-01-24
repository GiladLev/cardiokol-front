import { View, Text } from "react-native";
import React, { useContext } from "react";
import Slider from "@react-native-community/slider";
import { Context } from "../../store/context";
import Paragraph from "../../components/ui/Paragraph";
import Title from "../../components/ui/Title";
import BottomNavBar from "../../components/ui/HomeComponents/BottomNavBar";
import tw from "../../styles/tailwindConf";
const SettingScreen = () => {
  const store = useContext(Context);

  return (
    <View style={tw`w-full h-full`}>
      <Title>הגדרות הקלטה</Title>
      <View>
        <Paragraph>
            {store.minDecibel}
        </Paragraph>
        <Slider
          style={{ width: 200, height: 40 }}
          minimumValue={-160}
          maximumValue={0}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
          onValueChange = {(value)=>store.setMinDecibel(value)}
        />
      </View>
      <BottomNavBar/>
    </View>
  );
};

export default SettingScreen;
