import { View, Text, Pressable } from "react-native";

import React, { useEffect, useContext, useState } from "react";

import tw from "../../../styles/tailwindConf";
import Title from "../Title";
import DayCircle from "./DayCircle";
import Paragraph from "../Paragraph";
import { getAdherence } from "../../../util/auth";

import { Context } from "../../../store/context";
import { useNavigation } from "@react-navigation/native";

const Progress = () => {
  const authCtx = useContext(Context);
  const [datesCheck, setDatesCheck] = useState(null);
  const navigation = useNavigation();

  const d = new Date();
  let day = d.getDay();

  const data = [
    {
      day: "א",
      check: false,
    },
    {
      day: "ב",
      check: false,
    },
    {
      day: "ג",
      check: false,
    },
    {
      day: "ד",
      check: false,
    },
    {
      day: "ה",
      check: false,
    },
    {
      day: "ו",
      check: false,
    },
    {
      day: "ש",
      check: false,
    },
  ];
  const [date, setDate] = useState(data);

  const getDates = async () => {
    const dates = await (await getAdherence(day+1)).adh;

    setDatesCheck(JSON.parse(dates));
  };

  useEffect(() => {
    getDates();
  }, []);
  useEffect(() => {
    console.log(datesCheck);
    if (datesCheck) {
      datesCheck.reverse().map((item, index) => {
        try{
          
          if (item.s_count === 1 ) {
            data[index].check = "half";
          }
          else if (item.s_count >= 2 ) {
            data[index].check = true;
          }
          else{
            data[index].check = false;;
          }
        }
        catch(err){
          console.log(err);
        }
        
      });

      setDate(data);
    }
  }, [datesCheck]);

  return (
    <View style={tw`w-full h-56  `}>
      <View
        style={tw`flex-1 m-5 p-4 bg-white rounded-xl flex justify-between items-center`}
      >
        <View style={tw`flex items-end w-full`}>
          <Title>התקדמות השבועית שלך</Title>
        </View>
        <View style={tw`mx-4 w-full h-0.5 bg-background rounded-full`} />
        <View
          style={tw`my-4 h-9 w-full flex-row-reverse flex justify-between items-center`}
        >
          {date.map((item, index) =>
            index == day ? (
              <DayCircle item={item} isCurrentDay={true} key={item.day} />
            ) : (
              <DayCircle item={item} key={item.day} />
            )
          )}
        </View>
        <View style={tw`mx-4 w-full h-0.5 bg-background rounded-full`} />

        <Pressable
          style={tw`my-3 bg-secondary w-90% h-10 rounded-full flex justify-center items-center `}
          onPress={() => {
            navigation.navigate("Calendar");
          }}
        >
          <Paragraph Style={`text-white`}>לכל המידע שלי</Paragraph>
        </Pressable>
      </View>
    </View>
  );
};

export default Progress;
