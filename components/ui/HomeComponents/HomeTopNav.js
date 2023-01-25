import { View, Text, Pressable } from "react-native";
import React, { useContext } from "react";
import { Context } from "../../../store/context";
import { useNavigation } from "@react-navigation/core";
import tw from "../../../styles/tailwindConf";

import Setting from "../../../assets/img/Welocome-images/settings.svg";
import Help from "../../../assets/img/Welocome-images/help.svg";
import Paragraph from "../Paragraph";
const HomeTopNav = () => {
  const trainingCtx = useContext(Context);
  const name = trainingCtx.name;

  const curHour = new Date().getHours();
  const navigation = useNavigation();
  const greeting =
    curHour >= 0 && curHour <= 12
      ? ` בוקר טוב, ${name}`
      : curHour > 12 && curHour <= 18
      ? `צהריים טובים, ${name}`
      : `ערב טוב, ${name}`;
  return (
    <View style={tw`w-full h-14 flex-row flex justify-between items-center`}>
      <View style={tw` flex-row mx-3`}>
        <Pressable onPress={() => navigation.navigate("Setting")}>
          <Setting width={35} height={35} style={tw`mr-4`} />
        </Pressable>
        <Pressable onPress={trainingCtx.logout}>
          <Help width={35} height={35} />
        </Pressable>
      </View>
      <Paragraph Style={`mr-2 text-lg`}>{greeting}</Paragraph>
    </View>
  );
};

export default HomeTopNav;
