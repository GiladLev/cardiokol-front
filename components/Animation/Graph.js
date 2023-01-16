import { View, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import CurvedLineChart from "./CurvedLineChart";
import tw from "../../styles/tailwindConf";
import { useContext } from "react";
import { Context } from "../../store/context";

const Graph = (props) => {
  const { powerDecibel, lastDecibel } = props;

  const DecibelsValue = useContext(Context).finishDecibel;
  const [allDecibels, setAllDecibels] = useState(powerDecibel);
  const [minDecibels] = useState(-60)
  const [maxDecibels] = useState(-15)
  // Get the dimensions of the screenf
  const [width, setwidth] = useState(0);
  const [height, setheight] = useState(0);
  function handleLayout(event) {
    const {
      nativeEvent: { layout },
    } = event;
    const { width, height } = layout;
    setwidth(width);
    setheight(height-60);
  }
  const SetPlace = (place) => {
    return (width / 16) * place;
  };

  // Filtering the information to measure a second and enter it into the structure
  const [points, setPoints] = useState([]);
  useEffect(() => {
    const newPoints = DecibelsValue.map((value, index)=> (index === 0 || index === 1 ? [SetPlace(index), convertDecibels(-160)] : [SetPlace(index), convertDecibels(value)]))

    
    setPoints([
      [0, 0], // starting point 0
      ...newPoints, 
      [width, 0], // ending point 25

    ]);
  }, [width]);


  const FilteringData = (arrOfDecibel) => {

    const newPoints = points.map((point, index) => {
      return index === 0 || index === 25
        ? point
        : [point[0], convertDecibels(arrOfDecibel[index])];
    });

    setPoints(newPoints);
  };

  useEffect(() => {
    setAllDecibels(powerDecibel);
    FilteringData(allDecibels);
  }, [props]);

  // Convert decibels to graphic representation
  const convertDecibels = (decibel) => {
    if (decibel < minDecibels || decibel == undefined) {
 
      return height;
    } else if (decibel > maxDecibels) { 
      return 1/4*height;
    } else {
      const decibelValue = minDecibels - maxDecibels
      return decibel/decibelValue*1/2*height;

    }
  };
  return (
    <View style={tw`flex-1 ${Platform.OS === 'android' ? `mx-0.8` : `mx-4.5`}`} onLayout={handleLayout}>
      <CurvedLineChart width={width} height={height+60} points={points} />
    </View>
  );
};

export default Graph;
