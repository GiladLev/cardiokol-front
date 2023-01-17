import React, { useContext, useState } from "react";
import { View, Animated, Dimensions, Platform } from "react-native";
import { useEffect } from "react";
import Wave from "../../assets/img/AnimationWave/voiceRecordingWave.svg";
import CoverWave from "../../assets/img/AnimationWave/coverWave.svg";
import tw from "../../styles/tailwindConf";
import Graph from "./Graph";
import { Context } from "../../store/context";
const WaveAnimation = ({ isSaveScreen, lastDecibel }) => {
  const testCtx = useContext(Context);
  const [positionAnimation] = useState(new Animated.Value(isSaveScreen ? 1: 0));
  const screenWidth = Dimensions.get("screen").width;
  const screenHeight = Dimensions.get("screen").height;

  useEffect(() => {
    startAnimation();
  }, []);

  const startAnimation = () => {
    Animated.timing(positionAnimation, {
      toValue: 1,
      duration: 7000,
      useNativeDriver: false,
    }).start();
  };

  const imageStyle = {
    position: "absolute",
    top: 0,
    zIndex: 2,
    left: positionAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: Platform.OS === 'ios' ? [0, screenWidth - 50] : [0, screenWidth - 20],
    }),
  };


  return (
    <View style={tw`flex-1`} >
      <View style={tw`flex-1`}>
        <View style={{ position: "absolute", top: 0, left: 0 }}>
          <Wave width={screenWidth} />
        </View>
        <Graph
          powerDecibel={testCtx.finishDecibel}
          lastDecibel={lastDecibel}
          isSaveScreen={isSaveScreen}
        />
      </View>


        <Animated.View style={imageStyle}>
          <CoverWave width={screenWidth} />
        </Animated.View>

    
    </View>
  );
};

export default WaveAnimation;
