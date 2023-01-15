import { View, Text, Image, Pressable } from "react-native";
import React, { useContext } from "react";
import tw from "../../styles/tailwindConf";
import Title from "../../components/ui/Title";
import { useNavigation } from "@react-navigation/native";
import Heart from "../../assets/img/error-images/hearts.svg";
import TemplateError from "../../components/ui/Design/TemplateError";
import { Context } from "../../store/context";

const ErrorToSendToBack = () => {
  const navigation = useNavigation();
  const authCtx = useContext(Context);
  const trainingStatus =  authCtx.trainingStatus === "TRAINING_STATUS_PATIENT_CREATED" || authCtx.trainingStatus == null
  async function continueHandler() {
    try {
      navigation.navigate("ThirdRecording");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={tw`h-full w-full bg-backgroundError`}>
      <TemplateError
        nextScreen={"testError"}
        // audio={require("../../assets/audio/HE/Vad.m4a")}
        head={"בעיית תקשורת"}
        secondHead={"הקלטה לא נשלחה"}
        body={
          <>
            <Heart width={130} height={140} />

            <View style={tw`flex justify-center items-center mt-5`}>
              <Title Style={`text-xl`}>נסו לעשות את</Title>
              <Title Style={`text-xl`}>הבדיקה שוב תודה</Title>
            </View>
          </>
        }
        textButton={trainingStatus ? "להמשיך באימון" : "להמשיך בבדיקה"}
      />
    </View>
  );
};

export default ErrorToSendToBack;
