import React, { useState, useContext } from "react";
import AuthContent from "../components/Auth/AuthContent";
import { Context } from "../store/context";
import { login } from "../util/auth";

function LoginScreen({ navigation }) {
  const authCtx = useContext(Context);
  const [error, setError] = useState(false);

  async function loginHandler({ id, phoneNumber }) {
    phoneNumber = phoneNumber.substring(1);
    phoneNumber = `+972${phoneNumber}`;
    try {
      const result = await login(id, phoneNumber);
      authCtx.saveAlgoId(result.algoId);
      authCtx.saveId(id);
      authCtx.savePhoneNumber(phoneNumber);
      if (result.success == "True") {
        navigation.navigate("OTP");
      } else {
        setError(true);
      }
    } catch (error) {
      setError(true);
    }
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} error={error} />;
}

export default LoginScreen;
