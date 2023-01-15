import axios from "axios";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// const BASE_URL_IOS = '127.0.0.1'
// const BASE_URL_ANDROID = '10.0.2.2'
const BASE_URL_IOS = '84.229.159.145'
const BASE_URL_ANDROID = '84.229.159.145'
/*******************************************************************************************************************************/
/**********************************************************    LOGIN   *********************************************************/
/*******************************************************************************************************************************/

async function authenticate(id, phoneNumber) {
  let url = `http://${BASE_URL_IOS}:5001/api/login`;

  if (Platform.OS === "android") {
    url = `http://${BASE_URL_ANDROID}:5001/api/login`;
  }
  const response = await axios.post(url, {
    id: id,
    phone_number: phoneNumber,
  });

  console.log(response.data);

  const expenseObj = {
    algoId: response.data.patient_algo_id,
    token: response.data.access_token,
    success: response.data.success,
  };
  console.log(expenseObj);
  const result = response.data.access_token;
  const patient_algo_id = response.data.patient_algo_id;

  return expenseObj;

  // const token = response.data.access_token;

  // const success = response.data.success;
  // return success
}

export async function login(id, phoneNumber) {
  return authenticate(id, phoneNumber);
}

/*******************************************************************************************************************************/
/******************************************************    CHECK OTP   *********************************************************/
/*******************************************************************************************************************************/

export async function verify(otp) {
  let url = `http://${BASE_URL_IOS}:5001/api/check_otp`;

  if (Platform.OS === "android") {
    url = `http:/${BASE_URL_ANDROID}:5001/api/check_otp`;
  }

  const storedId = await AsyncStorage.getItem("id");
  const storedPN = await AsyncStorage.getItem("phoneNumber");

  const response = await axios.post(url, {
    otp: otp,
    id: storedId,
    phone_number: storedPN,
  });

  console.log(response.data);

  const expenseObj = {
    algoId: response.data.patient_algo_id,
    token: response.data.access_token,
    name: response.data.name,
    gender: response.data.gender,
    status: response.data.status,
  };
  console.log(expenseObj);

  return expenseObj;
}

export async function verifyOtp(id, phoneNumber) {
  return verify(id, phoneNumber);
}

/*******************************************************************************************************************************/
/*************************************************************    RESEND OTP   *************************************************/
/*******************************************************************************************************************************/

export async function resend() {
  let url = `http://${BASE_URL_IOS}:5001/api/resend_otp`;

  if (Platform.OS === "android") {
    url = `http:/${BASE_URL_ANDROID}:5001/api/resend_otp`;
  }

  const storedId = await AsyncStorage.getItem("id");
  const storedPN = await AsyncStorage.getItem("phoneNumber");

  const response = await axios.post(url, {
    id: storedId,
    phone_number: storedPN,
  });

  console.log(response.data);

  //const result = response.data.success ;
  const result = response.data.success;

  return result;
}

export async function resendOtp(id, phoneNumber) {
  return resend(id, phoneNumber);
}

/*******************************************************************************************************************************/
/*********************************************************    START TRAINING   *************************************************/
/*******************************************************************************************************************************/

export async function training() {
  let url = `http://${BASE_URL_IOS}:5001/api/start_training`;

  const storedAlgoId = await AsyncStorage.getItem("algoId");
  console.log(storedAlgoId);

  var body = new FormData();
  body.append("patient_algo_id", storedAlgoId);

  console.log(body);

  if (Platform.OS === "android") {
    url = `http://${BASE_URL_ANDROID}:5001/api/start_training`;

    // var xhr = new XMLHttpRequest();
    // xhr.open('POST', 'http://84.229.159.18:5001/api/start_training');
    // xhr.send(body);

    const response_a = await axios.post(url, body);

    console.log(response_a);

    const expenseObj = {
      approachId: response_a.approachId,
      sessionId: response_a.approachId,
    };
    console.log(expenseObj);
    return expenseObj;
  }

  // const storedAlgoId = await AsyncStorage.getItem('algoId');
  // console.log(storedAlgoId)

  // var body = new FormData();
  // body.append('patient_algo_id', storedAlgoId);

  const response = await axios.post(url, body);

  console.log(response.data);

  const expenseObj = {
    approachId: response.data.approach_id,
    sessionId: response.data.session_id,
  };
  console.log(expenseObj);
  return expenseObj;
}

export async function startTraining() {
  return training();
}


