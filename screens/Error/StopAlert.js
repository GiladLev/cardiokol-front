import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import tw from "../../styles/tailwindConf";
import Title from "../../components/ui/Title";
import Heart from "../../assets/img/error-images/hearts.svg";
import TemplateError from "../../components/ui/Design/TemplateError";

const StopAlert = () => {
  return (
    <View style={tw`h-full w-full bg-backgroundError`}>
      <TemplateError
        nextScreen={"Welcome"}
        audio={require("../../assets/audio/HE/NoRecord.m4a")}
        head={"הבדיקה נעצרה"}
        secondHead={"כי לא זיהינו הקלטה"}
        body={
          <>
             <Heart width={130} height={140} />

            <View style={tw`flex justify-center items-center mt-5`}>
              <Title Style={`text-xl`}>אפשר לעשות בדיקה</Title>
              <Title Style={`text-xl`}>חוזרת כשתהיה מוכן</Title>
            </View>
          </>
        }
        textButton={"הבנתי"}
      />
    </View>
  );
};

export default StopAlert;
