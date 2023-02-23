import { View, Text, SafeAreaView } from "react-native";
import React, { useContext } from "react";
import Slider from "@react-native-community/slider";
import { Context } from "../../store/context";
import Paragraph from "../../components/ui/Paragraph";
import Title from "../../components/ui/Title";
import BottomNavBar from "../../components/ui/HomeComponents/BottomNavBar";
import tw from "../../styles/tailwindConf";
import HomeTopNav from "../../components/ui/HomeComponents/HomeTopNav";
const SettingScreen = () => {
  const store = useContext(Context);

  return (
    <SafeAreaView style={tw`w-full h-full bg-background pb-16`}>
      <HomeTopNav />
      <View style={tw` flex-1 items-center flex justify-center`}>
        <View style={tw`w-90% h-65% bg-white p-5 rounded-3xl items-center `}>
          <Title Style={"text-lg"}>הגדרות הקלטה</Title>
          <View style={tw` flex-1 items-center mt-5`}>
            <View style={tw`w-full flex-row flex justify-end`}>
              <Paragraph Style={"mr-5"}>{store.minDecibel}</Paragraph>
              <Paragraph >עוצמת רגישות:</Paragraph>
            </View>
            <Slider
              style={{ width: 200, height: 40 }}
              minimumValue={-30}
              maximumValue={-10}
              minimumTrackTintColor="#000000"
              maximumTrackTintColor="#000000"
              onValueChange={(value) => store.setMinDecibel(Math.round(value))}
            />
          </View>
        </View>
      </View>

      <BottomNavBar />
    </SafeAreaView>
    // <View style={tw`w-full h-full`}>

    //   <Title>הגדרות הקלטה</Title>
    //   <View>
    //     <Paragraph>
    //         {store.minDecibel}
    //     </Paragraph>
    //     <Slider
    //       style={{ width: 200, height: 40 }}
    //       minimumValue={-160}
    //       maximumValue={0}
    //       minimumTrackTintColor="#FFFFFF"
    //       maximumTrackTintColor="#000000"
    //       onValueChange = {(value)=>store.setMinDecibel(value)}
    //     />
    //   </View>
    //   <BottomNavBar/>
    // </View>
  );
};

export default SettingScreen;
