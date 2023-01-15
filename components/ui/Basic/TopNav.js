import { View, Text } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { Audio } from "expo-av";
import { Context } from "../../../store/context";

import Arrow from "../../../assets/img/topNavBar-images/arrow.svg";
import Voulume from "../../../assets/img/topNavBar-images/volume.svg";
import VoulumeOff from "../../../assets/img/topNavBar-images/volume-off.svg";
import tw from "../../../styles/tailwindConf";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Paragraph from "../Paragraph";
import usePlaySound from "../../../hooks/PlaySoundHook";
const TopNav = ({ img, audio, progress, isCompleteScreen }) => {
  const navigation = useNavigation();

  const [isPlaying, togglePlay] = usePlaySound(audio, true, navigation);

  return (
    <View
      style={tw`w-full h-24 flex-row flex justify-between items-center px-5 `}
    >
      <View style={tw`flex-1`}>
        {audio ? (
          <Pressable onPress={() => togglePlay()}>
            <View>
              {isPlaying ? (
                <Voulume width={20} height={20} />
              ) : (
                <VoulumeOff width={20} height={20} />
              )}
            </View>
          </Pressable>
        ) : null}
      </View>

      <View style={tw`pt-10 items-center flex-1`}>
        {img ? (
          <>
            {img}
            <Paragraph>{progress}</Paragraph>
          </>
        ) : null}
      </View>
      <View style={tw`flex-1 items-end`}>
        {!isCompleteScreen && <Pressable
          onPress={() => navigation.replace("Welcome")}
          style={tw`w-10 h-10 bg-white flex items-center justify-center rounded-full`}
        >
          <Arrow width={7} height={13} />
        </Pressable>}
      </View>
    </View>
  );
};

export default TopNav;
