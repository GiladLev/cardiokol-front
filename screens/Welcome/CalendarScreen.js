import { View, Text } from "react-native";
import React, { useContext } from "react";
import tw from "../../styles/tailwindConf";
import { SafeAreaView } from "react-native-safe-area-context";

import BottomNavBar from "../../components/ui/HomeComponents/BottomNavBar";
import CalendarTemplate from "../../components/calendar/CalendarProgress";

import HomeTopNav from "../../components/ui/HomeComponents/HomeTopNav";
const CalendarScreen = () => {
  return (
    <SafeAreaView style={tw`w-full h-full bg-background pb-16`}>
      <HomeTopNav />
      <View style={tw` flex-1 items-center flex justify-center`}>
        <View
          style={tw`w-90% h-65% bg-white p-5 rounded-3xl items-center flex justify-between`}
        >
          <CalendarTemplate />
        </View>
      </View>

      <BottomNavBar />
    </SafeAreaView>
  );
};

export default CalendarScreen;
