import React, { useState, useEffect, useRef, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Alert,
  Platform,
} from "react-native";
import { Colors } from "../constants/styles";
import Button from "../components/ui/Button";
import { verifyOtp, resendOtp } from "../util/auth";
import AuthContent from "../components/Auth/AuthContent";
import { Context } from "../store/context";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import Paragraph from "../components/ui/Paragraph";
import Title from "../components/ui/Title";
import OptHeart from "../assets/img/login-images/opt.svg";
import Back from "../assets/img/login-images/back.svg";
import tw from "../styles/tailwindConf";
import { Pressable } from "react-native";
import ErrorLogin from "../components/ui/Basic/errorLogin";
import { useNavigation } from "@react-navigation/native";
import { Keyboard } from "react-native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const codeCount = 4;

function InputOTPScreen() {
  const [isVerified, setIsVerified] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCtx = useContext(Context);
  const navigation = useNavigation();

  let textInput = useRef(null);
  const inputRef = useRef(null);
  let clockCall = null;
  const lenthInput = 4;
  const defaultCountdown = 5;
  const [internalVal, setInternalVal] = useState("");
  const [countdown, setCountdown] = useState(defaultCountdown);
  const [enableResend, setEnableResend] = useState(false);
  const [error, setError] = useState(false);

  const keyboardVisible = Keyboard.isVisible;
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(keyboardVisible)
  Keyboard.addListener('keyboardDidShow', () => {
    setIsKeyboardVisible(true)
  });
  
  Keyboard.addListener('keyboardDidHide', () => {
    setIsKeyboardVisible(false)
  });
  useEffect(() => {
    clockCall = setInterval(() => {
      decrementClock();
    }, 1000);
    return () => {
      clearInterval(clockCall);
    };
  });

  const decrementClock = () => {
    if (countdown === 0) {
      setEnableResend(true);
      setCountdown(0);
      clearInterval(clockCall);
    } else {
      setCountdown(countdown - 1);
    }
  };

  async function onChangeText(val) {
    setInternalVal(val);
    if (val.length === lenthInput) {
      setIsAuthenticating(true);
      try {
        const result = await verifyOtp(val);
        console.log(result);
        console.log(result.adherence);

        authCtx.authenticate(result.token);
        authCtx.saveAlgoId(result.algoId);
        authCtx.saveName(result.name);
        authCtx.saveGender(result.gender);
        authCtx.saveTrainingStatus(result.status);
        authCtx.saveAdherenceWeek(result.adherence);

        if (result.token != "") {
        } else {
          setIsAuthenticating(false);
          setError(true);
        //   Alert.alert(
        //     "Verification failed!",
        //     "Could not log you in. Please check OTP or try again later!"
        //   );
        }
      } catch (error) {
        setIsAuthenticating(false);
        setError(true);
        // Alert.alert(
        //   "Verification failed!",
        //   "Could not log you in. Please check OTP or try again later!"
        // );
      }
      console.log(isAuthenticating);

      if (isAuthenticating) {
        return <LoadingOverlay message="Logging you in..." />;
      }

      //   return <AuthContent isLogin onAuthenticate={onChangeText} />;
    }
  }
  console.log(error, "Error");
  async function onResendOTP() {
    try {
      const result = await resendOtp();
      console.log(result);

      if (result != "ok") {
        console.log("Resend otp failed !", "Try again later!");
      }
    } catch (error) {
      console.log("Resend otp failed !", "Try again later!");
    }
    console.log("resend");
    setInternalVal("");
  }

  const onChangeNumber = () => {
    setInternalVal("");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={tw`flex-1`}
    >
      <View style={tw`flex-1 items-center flex justify-center mt-10`}>
        <OptHeart width={100} height={80} />
        <TouchableOpacity
          style={tw`absolute right-3 top-3`}
          onPress={() => navigation.goBack()}
        >
          <Back />
        </TouchableOpacity>
      </View>

      {error && !isKeyboardVisible ? <ErrorLogin text1={"הקוד אינו תקין"} text2={"אנא נסו שוב"}/>: null}

      <View style={tw`flex-1 items-center flex justify-center`}>
        <Paragraph Style={`text-lg`}>ברגעים אלו נשלח אליך קוד לנייד</Paragraph>
        <Title Style={`text-xl`}>יש להקליד את הקוד כאן</Title>
      </View>

      <View>
        <TextInput
          ref={inputRef}
          onChangeText={onChangeText}
          style={{ opacity: 0 }}
          value={internalVal}
          maxLength={lenthInput}
          keyboardType="number-pad"
          selectionColor={Colors.whight300}
        />
        <View style={styles.containerInput}>
          {Array(lenthInput)
            .fill()
            .map((data, index) => (
              <Pressable
                onPress={() => inputRef.current.focus()}
                key={index}
                style={[
                  styles.cellView,
                  {
                    borderColor:
                      error ? 
                      Colors.error500 :
                      index < internalVal.length
                        ? Colors.primary500
                        : Colors.primary800,
                  },
                ]}
              >
                <Text style={styles.cellText}>
                  {internalVal && internalVal.length >= 0
                    ? internalVal[index]
                    : ""}
                </Text>
              </Pressable>
            ))}
        </View>
        {error && <Pressable onPress={()=>{
          setInternalVal('')
          setError(false)
      }} style={tw`w-full items-center`}><Paragraph Style={"underline text-lg"}>ניקוי קוד</Paragraph></Pressable>  }
      </View>

      <View style={styles.bottomView}>
        <TouchableOpacity
          style={tw`flex-1 items-center flex justify-center`}
          onPress={onResendOTP}
        >
          <Title Style={"text-xl underline"}>שילחו לי שוב את הקוד</Title>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

export default InputOTPScreen;

const styles = StyleSheet.create({
  rootContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  container: {
    flex: 1,
    marginTop: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  containerAvoidingView: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
  titleStyle: {
    marginTop: 50,
    marginBottom: 50,
    fontSize: 16,
    alignContent: "center",
  },
  containerInput: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  cellView: {
    paddingVertical: 11,
    width: 53,
    height: 60,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    
  },
  cellText: {
    textAlign: "center",
    fontSize: 16,
  },
  bottomView: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 50,
    alignItems: "flex-end",
  },
  btnChangeNumber: {
    width: 150,
    height: 50,
    borderRadius: 10,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  textChange: {
    color: Colors.primary800,
    alignContent: "center",
    fontSize: 15,
  },
  btnResend: {
    width: 150,
    height: 50,
    borderRadius: 10,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  textResend: {
    alignItems: "center",
    fontSize: 15,
    color: Colors.primary800,
  },
  form: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    marginTop: 50,
    backgroundColor: Colors.primary100,
  },
  input: {
    marginHorizontal: 4,
    fontSize: 32,
    textAlign: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    borderColor: "#ddd",
    borderWidth: 1,
    width: width / (codeCount + 2),
    height: height / 14,
    // width: 0,
    // height: 0
  },
});
