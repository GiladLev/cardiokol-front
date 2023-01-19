import { View, Platform, Text } from "react-native";
import React, { useEffect, useState } from "react";
import CurvedLineChart from "./CurvedLineChart";
import tw from "../../styles/tailwindConf";
import { useContext } from "react";
import { Context } from "../../store/context";

const Graph = (props) => {
  const { powerDecibel, width, height } = props;
  const [minDecibels] = useState(-100);
  const [maxDecibels] = useState(-4)
  return (
    <View
      style={tw`w-full h-full pb-3`}
    >
      <CurvedLineChart width={width} height={height} powerDecibel={powerDecibel} minDecibels={minDecibels} maxDecibels={maxDecibels}/>
    </View>
  );
};

export default Graph;
