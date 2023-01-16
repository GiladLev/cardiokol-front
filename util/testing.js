import axios from "axios";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// const BASE_URL_IOS = '127.0.0.1'
// const BASE_URL_ANDROID = '10.0.2.2'
const BASE_URL_IOS = '84.229.159.145'
const BASE_URL_ANDROID = '84.229.159.145'
/*******************************************************************************************************************************/
/*********************************************************    START TEST   *****************************************************/
/*******************************************************************************************************************************/

export async function test() {
  let url = `http://${BASE_URL_IOS}:5001/api/start_test`;

  if (Platform.OS === "android") {
    url = `http://${BASE_URL_ANDROID}:5001/api/start_test`;
  }

  const storedAlgoId = await AsyncStorage.getItem("algoId");
  console.log(storedAlgoId);

  var body = new FormData();
  body.append("patient_algo_id", storedAlgoId);

  console.log(body);

  const response = await axios.post(url, body, {
    headers: {
      "content-type": "multipart/form-data",
    },
  });

  console.log(response.data);

  const expenseObj = {
    approachId: response.data.approach_id,
    sessionId: response.data.session_id,
  };
  console.log(expenseObj);
  return expenseObj;
}

export async function startTest() {
  return test();
}

/*******************************************************************************************************************************/
/*****************************************************    SEND TEST  RECORDING *************************************************/
/*******************************************************************************************************************************/

export async function sendTstRecord(uri) {
  var re = "file://";
  const path_to_file = uri.replace(re, "");

  var record = {
    uri: path_to_file,
    type: "audio/wav",
    name: "record.wav",
  };

  let url = `http://${BASE_URL_IOS}:5001/api/send_test_wav`;

  const storedAlgoId = await AsyncStorage.getItem("algoId");
  console.log(storedAlgoId);
  const storedSessionId = await AsyncStorage.getItem("sessionId");
  console.log(storedSessionId);
  const storedApproachId = await AsyncStorage.getItem("approachId");
  console.log(storedApproachId);

  if (Platform.OS === "android") {
    url = `http://${BASE_URL_ANDROID}:5001/api/send_test_wav`;
    // url = `http://10.0.2.2:5001/api/send_test_wav`;

  var data = new FormData();
  data.append("wav", {
                      name: "record.wav",
                      type: "audio/wav",
                      uri: uri,
                      }, "record.wav");
                      data.append("patient_algo_id", storedAlgoId);
                      data.append("approach_id", storedApproachId);
                      data.append("session_id", storedSessionId);


    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-Type', 'multipart/form-data');
    xhr.setRequestHeader('Accept-Encoding', 'gzip, deflate, br');
    xhr.send(data);

    console.log(xhr);

    // let res = await fetch(url, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'multipart/form-data'
    //   },
    //   body: data
    // });

      // const response = await axios({
      //   method: "post",
      //   url: url,
      //   files: data,
      //   mimetype: "multipart/form-data",
      //   headers: { "Content-Type": "multipart/form-data" },
      // });

    return "done";
  }

  var body = new FormData();
  body.append("patient_algo_id", storedAlgoId);
  body.append("approach_id", storedApproachId);
  body.append("session_id", storedSessionId);
  body.append("wav", record);
  console.log('===========================')
  console.log(body)
  const response = await axios.post(url, body);

  console.log(response.data);

  let result = response.data.result;

  return result;
}

export async function sendTestRecord(uri) {
  return sendTstRecord(uri);
}

/*******************************************************************************************************************************/
/*********************************************************    get_wav_validity_status_in_session   *****************************************************/
/*******************************************************************************************************************************/

export async function validityStatusInSession() {
  const storedAlgoId = await AsyncStorage.getItem("algoId");
  const storedSessionId = await AsyncStorage.getItem("sessionId");

  let url = `http://${BASE_URL_IOS}:5001/api/get_wav_validity_status_in_session`;

  if (Platform.OS === "android") {
    url = `http://${BASE_URL_ANDROID}:5001/api/get_wav_validity_status_in_session`;
  }

  let body = new FormData();
  body.append("patient_algo_id", storedAlgoId);
  body.append("session_id", storedSessionId);

  const response = await axios.post(url, body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  const expenseObj = {
    success: response.data.success,
    message: response.data.message,
  };
  console.log(expenseObj);
  return expenseObj;
}

export async function getWavValidityStatusInSession() {
  return validityStatusInSession();
}



