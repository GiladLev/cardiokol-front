import { View, Text, Image } from "react-native";
import React from "react";
import tw from "../../../styles/tailwindConf";
import Paragraph from "../Paragraph";

import More from "../../../assets/img/Welocome-images/moreIcon.svg";
import Title from "../Title";

const MedicalRecommend = () => {
  return (
    <View style={tw`w-full h-100 bg-white pr-15 relative my-5`}>
      {/* top title */}
      <View style={tw`h-14 w-full flex-row items-center flex justify-between`}>
        <View style={tw`flex-row px-2 items-center`}>
          <More width={13} height={13} style={tw`px-5`} />
          <Paragraph Style={"text-secondary text-base"}>עוד המלצות</Paragraph>
        </View>

        <View >
          <Paragraph Style={"text-base"}>המלצות קהילת</Paragraph>
          <Paragraph Style={"text-base"}>קרדיוקול</Paragraph>
        </View>
      </View>

      {/* Body */}

      <View style={tw`w-full items-end`}>
        <Title Style={"text-lg"}>בדיקה יומיומית קולית, הרופאים</Title>
        <Title Style={"text-lg"}>שלנו מסבירים</Title>
        
        <Image
          style = {tw`rounded-xl mt-2 w-90% h-70%`}
          source={require("../../../assets/img/Welocome-images/ImageContent.png")}
        />
      </View>

      <Image style={tw`absolute right-2 top-2`}
          source={require("../../../assets/img/Welocome-images/subjectImage.png")}
        />
    </View>
  );
};

export default MedicalRecommend;
