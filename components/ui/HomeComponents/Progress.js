import { View, Text, Pressable } from "react-native";
import React, { useEffect, useContext } from "react";
import tw from "../../../styles/tailwindConf";
import Title from "../Title";
import DayCircle from "./DayCircle";
import { FlatList } from "react-native";
import Paragraph from "../Paragraph";
import { getAdherence } from "../../../util/auth"
import { Context } from "../../../store/context";
const Progress = () => {

  const authCtx = useContext(Context);
  const res = authCtx.adherenceWeek;
  console.log("========================")
  console.log(res)
  //  useEffect(() => {
  //   const res = authCtx.adherenceWeek;
  //   console.log("========================")
  //   console.log(res)
  // }, [])


  const d = new Date();
  let day = d.getDay();
  const data = [
    {
      day: "א",
      check: true,
    },
    {
      day: "ב",
      check: true,
    },
    {
      day: "ג",
      check: false,
    },
    {
      day: "ד",
      check: true,
    },
    {
      day: "ה",
      check: true,
    },
    {
      day: "ו",
      check: true,
    },
    {
      day: "ש",
      check: false,
    },
  ];
  return (
    <View style={tw`w-full h-56  `}>
      <View style={tw`flex-1 m-5 p-4 bg-white rounded-xl flex justify-between items-center`}>
        <View style={tw`flex items-end w-full`}>

        <Title>התקדמות השבועית שלך</Title>
        </View>
        <View style={tw`mx-4 w-full h-0.5 bg-background rounded-full`} />
        <View
          style={tw`my-4 h-9 w-full flex-row-reverse flex justify-between items-center`}
        >
          {data.map((item,index) => ( index == day ? 
            <DayCircle item={item} isCurrentDay = {true} key={item.day} /> : <DayCircle item={item} key={item.day} />
          ))}
        </View>
        <View style={tw`mx-4 w-full h-0.5 bg-background rounded-full`} />
      
      <Pressable
          style={tw`my-3 bg-secondary w-90% h-10 rounded-full flex justify-center items-center `}
        >
          <Paragraph Style={`text-white`}>לכל המידע שלי</Paragraph>
        </Pressable>
      </View>

    </View>
  );
};

export default Progress;
