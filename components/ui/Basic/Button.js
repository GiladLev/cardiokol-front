import { View, Text } from "react-native";
import React from "react";
import tw from "../../../styles/tailwindConf";
import Paragraph from "../Paragraph";
import { Pressable } from "react-native";

const Button = ({ children, onPress, Style }) => {

  return (
    <Pressable
      onPress={onPress}
      style={tw`bg-primary w-90% h-16 rounded-full flex justify-center items-center`}
    >
      <Paragraph Style={`${Style} font-bold text-white text-xl`}>{children}</Paragraph>
    </Pressable>
  );
};

export default Button;
