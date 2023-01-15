import { View, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import CurvedLineChart from "./CurvedLineChart";
import tw from "../../styles/tailwindConf";
import { useContext } from "react";
import { Context } from "../../store/context";

const Graph = (props) => {
  const { powerDecibel } = props;
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
    return (width / 9) * place;
  };

  // Filtering the information to measure a second and enter it into the structure
  const [points, setPoints] = useState([]);
  useEffect(() => {

    setPoints([
      [0, 0],
      [SetPlace(0), convertDecibels(-160)], // 1
      [SetPlace(1), convertDecibels(DecibelsValue[0])], // 2
      [SetPlace(2), convertDecibels(DecibelsValue[1])], //3
      [SetPlace(3), convertDecibels(DecibelsValue[2])], //4
      [SetPlace(4), convertDecibels(DecibelsValue[3])], //5
      [SetPlace(5), convertDecibels(DecibelsValue[4])], //6
      [SetPlace(6), convertDecibels(DecibelsValue[5])], //7
      [SetPlace(7), convertDecibels(DecibelsValue[6])], //8
      [width, convertDecibels(DecibelsValue[7])], //9
      [width, 0],
    ]);
  }, [width]);


  const FilteringData = (arrOfDecibel) => {
    // const measuresOneSec = arrOfDecibel.filter((e, index) => {
    //   return index % 2 !== 0;
    // });
    const newPoints = points.map((point, index) => {
      return index === 0 || index === 1 || index === 2 || index === 10
        ? point
        : [point[0], convertDecibels(arrOfDecibel[index - 2])];
    });

    setPoints(newPoints);
  };
  useEffect(() => {
    setAllDecibels(powerDecibel);
    FilteringData(allDecibels);
  }, [props]);

  // Convert decibels to graphic representation
  const convertDecibels = (decibel) => {
    if (decibel < minDecibels) { 
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
