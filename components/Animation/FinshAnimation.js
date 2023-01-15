import Heart from "../../assets/img/AnimationFinshHeart/Heart.svg";
import HeartFinish from "../../assets/img/AnimationFinshHeart/HeartFinish.svg";

import React, { useState } from "react";
import { View, Image, StyleSheet, Animated } from "react-native";
import { useEffect } from "react";
import tw from "../../styles/tailwindConf";
import Paragraph from "../ui/Paragraph";

const FinshAnimation = () => {
  const [showImage, setShowImage] = useState(false);
  const [scaleValue] = useState(new Animated.Value(1));

  useEffect(() => {
    Animated.timing(scaleValue, {
      toValue: 1.7,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (

      <Animated.View style={[tw`flex-1 items-center flex justify-center`,{ transform: [{ scale: scaleValue }] }]}>
        <HeartFinish width={130} height={100} />
        <Paragraph Style={"text-xs m-2"}>100% הושלמו</Paragraph>
      </Animated.View>

  );
};

export default FinshAnimation;
