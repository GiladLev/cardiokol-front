import { View } from "react-native";
import React from "react";
import tw from "../../styles/tailwindConf";
import Paragraph from "../ui/Paragraph";

const StatusVoice = ({firstText, secText}) => {
  return (
    <View style={tw`flex-1 items-center flex justify-center`}>
      <Paragraph Style={"font-bold text-lg"}>{firstText}</Paragraph>
      <Paragraph Style={"font-bold text-lg"}>{secText}</Paragraph>
    </View>
  );
};

export default StatusVoice;
