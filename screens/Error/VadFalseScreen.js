import { View, Text, Image, Pressable } from "react-native";
import React, { useContext } from "react";
import tw from "../../styles/tailwindConf";
import Title from "../../components/ui/Title";
import { useNavigation } from "@react-navigation/native";
import Heart from "../../assets/img/error-images/hearts.svg";
import TemplateError from "../../components/ui/Design/TemplateError";
import { Context } from "../../store/context";

const VadFalseScreen = () => {
  const authCtx = useContext(Context);
  const trainingStatus =  authCtx.trainingStatus === "TRAINING_STATUS_PATIENT_CREATED" || authCtx.trainingStatus == null


  return (
    <View style={tw`h-full w-full bg-backgroundError`}>
      <TemplateError
        nextScreen={"testError"}
        audio={require("../../assets/audio/HE/Vad.m4a")}
        head={"הבדיקה נעצרה"}
        secondHead={"הקלטה היתה קצרה מידי"}
        body={
          <>
            <Heart width={130} height={140} />

            <View style={tw`flex justify-center items-center mt-5`}>
              <Title Style={`text-xl`}>נסו להשלים 6 שניות</Title>
              <Title Style={`text-xl`}>מלאות של אההה</Title>
            </View>
          </>
        }
        textButton={trainingStatus ? "להמשיך באימון" : "להמשיך בבדיקה"}
      />
    </View>
  );
};

export default VadFalseScreen;
