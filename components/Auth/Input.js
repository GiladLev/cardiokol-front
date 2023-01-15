import { View, Text, TextInput, StyleSheet, Image } from "react-native";
import { Colors } from "../../constants/styles";
import { useEffect, useState } from "react";
import Paragraph from "../ui/Paragraph";
import tw from "../../styles/tailwindConf";
function Input({
  label,
  keyboardType,
  secure,
  onUpdateValue,
  value,
  isInvalid,
  placeholder,
  source,
  image,
  error,
  lengthValid,
  kind,
}) {
  // const [text, setText] = useState('');
  const [isValdtaion, setIsValdtaion] = useState(false);

  useEffect(() => {
    if (kind === "phone") {
      // if (value.match(/^\(?[\d]{3}\)?[\s-]?[\d]{3}[\s-]?[\d]{4}$/)) {
      if (value.match(/^\+?\d{10}$/)) {
        // Validate phone number
        setIsValdtaion(true);
      } else {
        setIsValdtaion(false);
      }
    } else {
      if (value.match(/^\d{9}$/)) {
        setIsValdtaion(true);
      } else {
        setIsValdtaion(false);
      }
    }
  }, [value]);
  return (
    <View style={tw`w-full`}>
      <View style={tw`items-end w-full`}>
        <Paragraph Style={"text-base"} style={[styles.label]}>
          {value ? label : ""}
        </Paragraph>
      </View>
      <View
        style={[
          styles.SectionStyle,
          error ? styles.inputerror : isValdtaion ? styles.inputInvalidGood : null,

          tw`flex justify-end items-center `,
        ]}
      >
        <TextInput
          style={[styles.input, error ? styles.inputInvalid : null]}
          autoCapitalize={false}
          keyboardType={keyboardType}
          secureTextEntry={secure}
          onChangeText={onUpdateValue}
          value={value}
          placeholder={placeholder}
        />
        <View style={tw`ml-2`}>{image}</View>
      </View>
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  input: {
    textAlign: "right",
    flexDirection: "row",
    backgroundColor: Colors.whight100,
    fontSize: 24,
    color: Colors.grey900,
    opacity: 1,
  },
  inputerror: {
    color: Colors.pink500,
    borderColor: Colors.pink500,
  },
  SectionStyle: {
    flexDirection: "row",
    height: "48%",
    paddingHorizontal: 18,
    marginBottom: "13%",
    backgroundColor: Colors.whight100,
    borderRadius: 10,
    fontSize: 18,
    color: Colors.grey900,
    borderWidth: 1,
    borderColor: Colors.grey200,
    opacity: 1,
  },
  inputInvalid: {
    color: Colors.pink500,
    borderColor: Colors.pink500,
  },
  inputvalid: {
    color: Colors.blue300,
    borderColor: Colors.blue300,
  },
  ImageStyle: {
    paddingHorizontal: 10,
    marginHorizontal: "2%",
    resizeMode: "stretch",
  },
  label: {
    color: Colors.grey200,
    marginBottom: 4,
    fontSize: 16,
    color: Colors.grey900,
    opacity: 1,
  },
  inputInvalidGood: {
    borderColor: Colors.blue300,
  },

});
