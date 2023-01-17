import axios from "axios";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
// const BASE_URL_IOS = '127.0.0.1'
// const BASE_URL_ANDROID = '10.0.2.2'
const BASE_URL_IOS = '84.229.159.145'
const BASE_URL_ANDROID = '84.229.159.145'
/*******************************************************************************************************************************/
/*********************************************************    START TRAINING   *************************************************/
/*******************************************************************************************************************************/

export async function training() {
  let url = `http://${BASE_URL_IOS}:5001/api/start_training`;

  if (Platform.OS === "android") {
    url = `http://${BASE_URL_ANDROID}:5001/api/start_training`;
  }

  const storedAlgoId = await AsyncStorage.getItem("algoId");
  console.log(storedAlgoId);

  var body = new FormData();
  body.append("patient_algo_id", storedAlgoId);

  const response = await axios.post(url, body, {
    headers: {
      "Content-Type": "multipart/form-data",
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

export async function startTraining() {
  return training();
}

/*******************************************************************************************************************************/
/*************************************************    SEND TRAINING  RECORDING *************************************************/
/*******************************************************************************************************************************/

export async function sendTrnRecord(uri) {
  var re = "file://";
  const path_to_file = uri.replace(re, "");
  var record = {
    uri: path_to_file,
    type: "audio/wav",
    name: "record.wav",
  };

  let url = `http://${BASE_URL_IOS}:5001/api/send_training_wav`;

  const storedAlgoId = await AsyncStorage.getItem("algoId");
  console.log(storedAlgoId);
  const storedSessionId = await AsyncStorage.getItem("sessionId");
  console.log(storedSessionId);
  const storedApproachId = await AsyncStorage.getItem("approachId");
  console.log(storedApproachId);

  if (Platform.OS === "android") {
    url = `http://${BASE_URL_ANDROID}:5001/api/send_training_wav`;

    // const media = {
    //   name: "record.wav",
    //   type: "audio/wav",
    //   uri: uri,
    // };

    // var body = new FormData();
    // body.append("patient_algo_id", storedAlgoId);
    // body.append("approach_id", storedApproachId);
    // body.append("session_id", storedSessionId);
    // body.append("wav", media);

    // console.log('===========================')
    // console.log(body)

    // const response = await axios.post(url, body, {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // });

    // console.log(response.data);
    // let result = response.data.result;
    // return result;

    var data = new FormData();
    data.append("wav", {
                        name: "record.wav",
                        type: "audio/wav",
                        uri: uri,
                        }, "record.wav");
                        data.append("patient_algo_id", storedAlgoId);
                        data.append("approach_id", storedApproachId);
                        data.append("session_id", storedSessionId);
     
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-Type', 'multipart/form-data');
    xhr.setRequestHeader('Accept-Encoding', 'gzip, deflate, br');
    xhr.send(data);
    console.log(xhr);
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

export async function sendTrainingRecord(uri) {
  return sendTrnRecord(uri);
}



/*******************************************************************************************************************************/
/*********************************************************    SEND ECG ROW   *************************************************/
/*******************************************************************************************************************************/

export async function sendECG() {
  let url = `http://${BASE_URL_IOS}:5001/api/send_ecg`;

  if (Platform.OS === "android") {
    url = `http://${BASE_URL_ANDROID}:5001/api/send_ecg`;
  }

  const storedAlgoId = await AsyncStorage.getItem("algoId");
  const storedPatientId = await AsyncStorage.getItem("id");
  console.log(storedAlgoId)
  console.log(storedPatientId)



  var body = new FormData();
  body.append("patient_algo_id", storedAlgoId);
  body.append("patient_id", storedPatientId);

  const response = await axios.post(url, body, {
    headers: {
      "Content-Type": "multipart/form-data",
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

export async function sendECGRow() {
  return sendECG();
}

/*******************************************************************************************************************************/
/*********************************************************    GET TRAINING STATUS   *************************************************/
/*******************************************************************************************************************************/

export async function getTrnStatus() {
  const storedAlgoId = await AsyncStorage.getItem("algoId");
  console.log(storedAlgoId);

  let url = `http://${BASE_URL_IOS}:5001/api/get_training_status/`  + storedAlgoId;

  if (Platform.OS === "android") {
    url = `http://${BASE_URL_ANDROID}:5001/api/get_training_status/` + storedAlgoId;
  }

  console.log(url);
  const response = await axios.get(url);

  console.log(response.data);

  let trnStatus = response.data.status;

  return trnStatus
}

export async function getTrainingStatus() {
  return getTrnStatus();
}
