import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Calendar } from "react-native-calendars";
import tw from "../../styles/tailwindConf";
import { getAdherence } from "../../util/auth";
import Title from "../ui/Title";

const CalendarTemplate = () => {
  const [dates, setDate] = useState();
  const [markedDates, setmMrkedDates] = useState({});

  const getDates = async () => {
    const newDates = await (await getAdherence(0)).adh;

    setDate(JSON.parse(newDates));
  };

  useEffect(() => {
    getDates();
  }, []);
  useEffect(() => {

    const newDates = {};
    dates?.forEach((item) => {
      if (item.s_count === 1) {
        newDates[item.date] = {
          marked: true,
          selected: true,
          selectedColor: "#AFD3D3",
          dotColor: '#AFD3D3',
          selectedTextColor: "black",
        };
      } else if (item.s_count >= 2) {
        newDates[item.date] = {
          marked: true,
          selected: true,
          selectedColor: "#219494",
          dotColor: '#219494',
          selectedTextColor: "white",
          
        };
      }
      else {
        newDates[item.date] = {
          marked: true,
          selected: true,
          selectedColor: "#FE515C",
          dotColor: '#FE515C',
          selectedTextColor: "white",
        };
      }
    });
    setmMrkedDates(newDates);
  }, [dates]);

  return (
    <View style={tw`flex-1 items-center flex justify-center`}>
      {dates ? <Calendar hideExtraDays={true} markedDates={markedDates} /> : <Title>טוען...</Title>}
    </View>
  );
};

export default CalendarTemplate;
