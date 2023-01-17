import { View, Text } from "react-native";
import React from "react";
import tw from "../../../styles/tailwindConf";
import Paragraph from "../Paragraph";

const DayCircle = ({ item, isCurrentDay }) => {
  return (
    <>
    <View
      style={tw`relative  w-8 h-8 rounded-full border border-line items-center flex justify-center ${
        item.check === "half" ? "bg-half" : item.check ? "bg-secondary" : "bg-dayCircle"
      } `}
    >
      <Paragraph
        Style={`text-base font-bold ${
          item.check ? "text-white" : "text-black"
        }`}
      >
        {item.day}
      </Paragraph>

      <View style={tw`${isCurrentDay ? `absolute border-2 border-currentDay rounded-full  w-10 h-10 ` : null}`}/>
    </View>
    </>
  );
};

export default DayCircle;
