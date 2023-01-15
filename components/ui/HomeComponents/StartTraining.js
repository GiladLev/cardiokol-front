import { View, Text } from "react-native";
import React from "react";
import tw from "../../../styles/tailwindConf";
import { Pressable } from "react-native";
import Paragraph from "../Paragraph";

// svg Images
import Picture from "../../../assets/img/Welocome-images/picture.svg";
import Record from "../../../assets/img/Welocome-images/record.svg";
import Time from "../../../assets/img/Welocome-images/time.svg";

const StartTraining = ({ startTrainingHandler }) => {
  return (
    <View style={tw` w-full h-85 flex items-center`}>
      <View style={tw`w-90% h-full bg-white p-5 rounded-3xl items-center flex justify-between`}>
        <Picture width={308} height={181} />
        <View
          style={tw`flex-row flex justify-center items-center w-full h-1/12`}
        >
          <View style={tw`flex-row items-center mx-2`}>
            <Paragraph>1-3 דקות</Paragraph>
            <Time width={15} height={20} style={tw`mx-2`} />
          </View>
          <View style={tw`flex-row items-center `}>
            <Paragraph>בדיקה קולית</Paragraph>
            <Record width={15} height={20} style={tw`mx-2`} />
          </View>
        </View>

        <Pressable
          onPress={startTrainingHandler}
          style={tw`bg-primary w-90% h-1/6 rounded-full flex justify-center items-center `}
        >
          <Text style={tw` font-bold text-lg text-white`}>התחלת אימון</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default StartTraining;
