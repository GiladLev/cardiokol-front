import { View, Text } from "react-native";
import React, { useContext } from "react";
import tw from "../../styles/tailwindConf";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Context } from "../../store/context";
import Setting from "../../assets/img/Welocome-images/settings.svg";
import Help from "../../assets/img/Welocome-images/help.svg";
import Paragraph from "../../components/ui/Paragraph";
import BottomNavBar from "../../components/ui/HomeComponents/BottomNavBar";
import CalendarTemplate from "../../components/calendar/CalendarProgress";
import Title from "../../components/ui/Title";
const CalendarScreen = () => {


  const trainingCtx = useContext(Context);
  const name = trainingCtx.name;
  const curHour = new Date().getHours();
  const greeting =
    curHour >= 0 && curHour <= 12
      ? ` בוקר טוב, ${name}`
      : curHour > 12 && curHour <= 18
      ? `צהריים טובים, ${name}`
      : `ערב טוב, ${name}`;
  return (
    <SafeAreaView style={tw`w-full h-full bg-background pb-16`}>
      <View style={tw`w-full h-14 flex-row flex justify-between items-center`}>
        <View style={tw` flex-row mx-3`}>
          <Setting width={35} height={35} style={tw`mr-4`} />

          <Help width={35} height={35} />
        </View>
        <Paragraph Style={`mr-2 text-lg`}>{greeting}</Paragraph>
      </View>
    <View style={tw` flex-1 items-center flex justify-center`}>

      <View style={tw`w-90% h-65% bg-white p-5 rounded-3xl items-center flex justify-between`}>
        <CalendarTemplate/>
      </View>
    </View>


        
      <BottomNavBar />
    </SafeAreaView>
  );
};

export default CalendarScreen;
