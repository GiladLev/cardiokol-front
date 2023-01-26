import React, { useContext, useRef, useState } from "react";
import { View, Animated, Dimensions, Platform } from "react-native";
import { useEffect } from "react";
import Wave from "../../assets/img/AnimationWave/voiceRecordingWave4Sec.svg";
import CoverWave from "../../assets/img/AnimationWave/coverWave.svg";
import tw from "../../styles/tailwindConf";
import Graph from "./Graph";
import { Context } from "../../store/context";
const WaveAnimation = ({ isSaveScreen, lastDecibel }) => {
  const testCtx = useContext(Context);
  const delay = Platform.OS === 'ios' ? 20 : 400
  const [positionAnimation] = useState(
    new Animated.Value(isSaveScreen ? 1 : 0)
  );
  const screenWidth = Dimensions.get("screen").width;

  // Get the dimensions of the screenf
  const [width, setwidth] = useState(0);
  const [height, setheight] = useState(0);
  function handleLayout(event) {
    const {
      nativeEvent: { layout },
    } = event;
    const { width, height } = layout;
    setwidth(width);
    setheight(height);
  }

  useEffect(() => {
    startAnimation();
  }, []);

  const startAnimation = () => {
    Animated.timing(positionAnimation, {
      toValue: 1,
      duration: 4000,
      delay: delay,
      useNativeDriver: false,
    }).start();
  };

  const imageStyle = {
    flex: 1,

    position: "absolute",
    top: -25,
    zIndex: 99,
    
    left: positionAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, screenWidth-20],
    }),
  };

  return (
    <View style={tw`flex-1 relative`} onLayout={handleLayout}>
      <View style={tw`w-${width} h-${height} relative`}>
        <View style={tw`absolute top-0 `}>
          <Wave width={width} height={height} />
        </View>
        <Graph
          powerDecibel={testCtx.finishDecibel}
          lastDecibel={lastDecibel}
          isSaveScreen={isSaveScreen}
          width={width}
          height={height * 0.7}
        />
      </View>
      <Animated.View style={imageStyle}>
        <CoverWave width={width*1.1} height={height*1.1} />
      </Animated.View>
    </View>
  );
};

export default WaveAnimation;
