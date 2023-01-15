import { useState } from "react";
import { StyleSheet, View, Text } from "react-native";

import Input from "./Input";
import Button from "../ui/Basic/Button";
import tw from "../../styles/tailwindConf";
import Phone from "../../assets/img/login-images/phone.svg";
import Id from "../../assets/img/login-images/id.svg";
function AuthForm({ isLogin, onSubmit, credentialsInvalid, error }) {
  const [enteredId, setEnteredId] = useState("");
  const [enteredConfirmId, setEnteredConfirmId] = useState("");
  const [enteredPhoneNumber, setEnteredPhoneNumber] = useState("");
  const [enteredConfirmPhoneNumber, setEnteredConfirmPhoneNumber] =
    useState("");

  const {
    id: idIsInvalid,
    confirmId: idsDontMatch,
    phoneNumber: phoneNumberIsInvalid,
    confirmPhoneNumber: phoneNumbersDontMatch,
  } = credentialsInvalid;

  const idLengthValid = 9
  const phoneNumberLengtValid = 14
  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "id":
        setEnteredId(enteredValue);
        break;
      case "confirmId":
        setEnteredConfirmId(enteredValue);
        break;
      case "phoneNumber":
        setEnteredPhoneNumber(enteredValue);
        break;
      case "confirmPhoneNumber":
        setEnteredConfirmPhoneNumber(enteredValue);
        break;
    }
  }

  function submitHandler() {
    console.log(enteredPhoneNumber)
    onSubmit({
      id: enteredId,
      confirmId: enteredConfirmId,
      phoneNumber: enteredPhoneNumber,
      confirmPhoneNumber: enteredConfirmPhoneNumber,
    });
  }

  return (
    <View style={tw`p-2 flex-1`}>
      <View style={tw`flex-2 flex justify-center`}>
        <View style={tw`flex-1`}>

        <Input
          error={error}
          label="מספר תעודת זהות"
          onUpdateValue={updateInputValueHandler.bind(this, "id")}
          value={enteredId}
          keyboardType="numeric"
          isInvalid={idIsInvalid}
          placeholder="מספר תעודת זהות"
          image={<Id />}
          lengthValid={idLengthValid}
          kind={"id"}
  
        />
        </View>
        <View style={tw`flex-1 `}>

        <Input
          error={error}
          label="מספר טלפון"
          onUpdateValue={updateInputValueHandler.bind(this, "phoneNumber")}
          keyboardType="numeric"
          value={enteredPhoneNumber}
          isInvalid={phoneNumberIsInvalid}
          placeholder="מספר טלפון"
          image={<Phone />}
          lengthValid={phoneNumberLengtValid}
          kind={"phone"}
        />
        </View>

      </View>
      <View style={tw`flex-1 items-center flex justify-center`}>
        <Button Style={"font-bold text-white text-2xl"} onPress={submitHandler}>התחברות</Button>
      </View>
    </View>
  );
}

export default AuthForm;

