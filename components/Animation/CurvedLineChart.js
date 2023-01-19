import * as d3 from "d3";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Path, Svg } from "react-native-svg";
import tw from "../../styles/tailwindConf";

function CurvedLineChart(props) {
  const [points, setPoints] = useState([]);

  const { width, height, powerDecibel, minDecibels, maxDecibels } = props;

// set X scale
  const SetPlace = (place) => {
    return width/ powerDecibel.length * place;
  };
// set Y scale
  const convertDecibels = (decibel) => {
    if (decibel < minDecibels) {
      return height;
    } else if (decibel > maxDecibels) {
      return 20;
    } else {
      const decibelValue = minDecibels - maxDecibels;
      return (Math.abs(decibel) / Math.abs(decibelValue)) * height;
    }
  };
// update points to x and y
  const updatePoints = () => {
    const newPoints = powerDecibel.map((value, index) => [
      SetPlace(index),
      convertDecibels(value),
    ]);
    setPoints([
      [0, 0], // starting point 0
      ...newPoints,
      [width, convertDecibels(powerDecibel[powerDecibel.length-1])], // ending point
      [width, 0], // ending point
    ]);
  };

// first render
  useEffect(() => {
    if (width > 0) {
      updatePoints()
    }
  }, [width]);

  useEffect(() => {
    updatePoints()
  }, [props])
  


  const lineGenerator = d3.line().curve(d3.curveCardinal);

  const pathData = lineGenerator(points);


  return (
    <View style={tw`flex-1`}>

     <Svg width={width} height={height}>
        <Path d={pathData} fill="white" />
      </Svg> 
    </View>
  );
}



export default CurvedLineChart;
