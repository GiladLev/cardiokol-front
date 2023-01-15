import { useState } from "react";
import {
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import tw from "../../styles/tailwindConf";
import AuthForm from "./AuthForm";
import TopHeart from "../../assets/img/login-images/top-heart.svg";
import Paragraph from "../ui/Paragraph";
import ErrorLogin from "../ui/Basic/errorLogin";
import { Keyboard } from 'react-native';
function AuthContent({ isLogin, onAuthenticate, error }) {

  const keyboardVisible = Keyboard.isVisible;
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(keyboardVisible)
  Keyboard.addListener('keyboardDidShow', () => {
    setIsKeyboardVisible(true)
  });
  
  Keyboard.addListener('keyboardDidHide', () => {
    setIsKeyboardVisible(false)
  });

  const [credentialsInvalid, setCredentialsInvalid] = useState({
    id: false,
    phoneNumber: false,
    confirmId: false,
    confirmPhoneNumber: false,
  });
  
  const curHour = new Date().getHours() 
  const greeting = curHour >= 0 && curHour <= 12 ? `בוקר טוב`
  : curHour > 12 && curHour <= 18 ? `צהריים טובים` 
  : `ערב טוב` ;

  function submitHandler(credentials) {
    let { id, phoneNumber, confirmId, confirmPhoneNumber } = credentials;

    id = id.trim();
    phoneNumber = phoneNumber.trim();

    const idIsValid = id.length > 8;
    const phoneNumberIsValid = phoneNumber.length > 6;
    const idsAreEqual = id === confirmId;
    const phoneNumbersAreEqual = phoneNumber === confirmPhoneNumber;

    if (
      !idIsValid ||
      !phoneNumberIsValid ||
      (!isLogin && (!idsAreEqual || !phoneNumbersAreEqual))
    ) {

      setCredentialsInvalid({
        id: !idIsValid,
        confirmId: !idIsValid || !idsAreEqual,
        phoneNumber: !phoneNumberIsValid,
        confirmPhoneNumber: !phoneNumberIsValid || !phoneNumbersAreEqual,
      });
      return;
    }
    onAuthenticate({ id, phoneNumber });
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={tw`flex-1 bg-dayCircle`}
    >
      <View style={tw`flex-1 items-center flex justify-center p-5`}>
        <TopHeart width={100} height={80} />
        <Paragraph Style={"text-2xl font-bold mt-3"}>{greeting}</Paragraph>
      </View>
      {error && !isKeyboardVisible && <View style={tw`flex-1`}>
        
          <ErrorLogin
            text1={"לא הצלחנו לזהות את תעודת הזהות או מספר טלפון"}
            text2={"יש לנסות שוב"}
          />
  
      </View>}
      <View style={tw`flex-2`}>
        <AuthForm
          error={error}
          isLogin={isLogin}
          onSubmit={submitHandler}
          credentialsInvalid={credentialsInvalid}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

export default AuthContent;