import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useState } from 'react';

export const Context = createContext({
  id: 0,
  algoId: 0,
  phoneNumber: '',
  token: '',
  isAuthenticated: false,
  isVerified: false,
  approachId: 0,
  sessionId: 0,
  feedback: '',
  trainingStatus: '',
  name: '',
  gender: '',
  playingStatus: true,
  numOfRecord: 0,
  finishDecibel: [-160,-160,-160,-160,-160,-160],
  adherenceWeek: null,
  saveNumOfRecord: (number) =>{},
  saveId: (id) => {},
  saveAlgoId: (algoId) => {},
  savePhoneNumber: (phoneNumber) => {},
  authenticate: (token) => {},
  verify: () => {},
  logout: () => {},
  saveApproachId: (approachId) => {},
  saveSessionId: (sessionId) => {},
  saveFeedback: (feedback) => {},
  saveTrainingStatus: (trainingStatus) => {},
  saveName: (name) => {},
  saveGender: (gender) => {},
  savePlayingStatus: (playingStatus) => {},
  saveFinishDecibel: (finishDecibel) => {},
  saveAdherenceWeek: (adherenceWeek) => {},
});

function ContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();
  const [authId, setAuthId] = useState();
  const [authAlgoId, setAuthAlgoId] = useState();
  const [authPhoneNumber, setAauthPhoneNumber] = useState();
  const [isVerified, setIsVerified] = useState();
  const [trainingApproachId, setTrainingApproachId] = useState();
  const [trainingSessionId, setTrainingSessionId] = useState();
  const [testFeedback, setTestFeedback] = useState();
  const [authTrainingStatus, setAuthTrainingStatus] = useState();
  const [authName, setAuthName] = useState();
  const [authGender, setAuthGender] = useState();
  const [authAdherenceWeek, setAuthAdherenceWeek] = useState();
  const [testPlayingStatus, setTestPlayingStatus] = useState(true);
  const [testnumOfRecord, setTestNumOfRecord] = useState(0);
  let fillTheArr = Array(12).fill().map(() => -160);
  const [finishDecibel, setFinishDecibel] = useState(fillTheArr);
  
  function saveAdherenceWeek(adherenceWeek) {
    setAuthAdherenceWeek(adherenceWeek);
    adherenceWeek && AsyncStorage.setItem('adherenceWeek', adherenceWeek);
  }
  
  function saveFinishDecibel(arrOfFinishDecibel) {
    setFinishDecibel(arrOfFinishDecibel);
  }
  function saveNumOfRecord(number) {
    setTestNumOfRecord(number);
    number && AsyncStorage.setItem('numOfRecord', number.toString());
  }
  function savePlayingStatus(playingStatus) {
    setTestPlayingStatus(playingStatus);
    playingStatus && AsyncStorage.setItem('playingStatus', playingStatus.toString());
  }

  function saveGender(gender) {
    setAuthGender(gender);
    gender && AsyncStorage.setItem('gender', gender);
  }

  function saveName(name) {
    setAuthName(name);
    name && AsyncStorage.setItem('name', name);
  }

  function saveTrainingStatus(trainingStatus) {
    setAuthTrainingStatus(trainingStatus);
    trainingStatus && AsyncStorage.setItem('trainingStatus', trainingStatus);
  }

  function saveFeedback(feedback) {
    setTestFeedback(feedback);
    feedback && AsyncStorage.setItem('feedback', feedback);
  }

  function saveApproachId(approachId) {
    setTrainingApproachId(approachId);
    approachId && AsyncStorage.setItem('approachId', approachId);
  }

  function saveSessionId(sessionId) {
    setTrainingSessionId(sessionId);
    sessionId && AsyncStorage.setItem('sessionId', sessionId);
  }

  function verify() {
    setIsVerified(true);
    AsyncStorage.setItem('isVerified', 'true');
  }

  function authenticate(token) {
    setAuthToken(token);
    token && AsyncStorage.setItem('token', token);
  }

  function saveId(id) {
    setAuthId(id);
    id && AsyncStorage.setItem('id', id);
  }

  function saveAlgoId(algoId) {
    setAuthAlgoId(algoId);
    algoId && AsyncStorage.setItem('algoId', algoId);
  }

  function savePhoneNumber(phoneNumber) {
    setAauthPhoneNumber(phoneNumber);
    phoneNumber && AsyncStorage.setItem('phoneNumber', phoneNumber);
  }

  function logout() {
    setAuthToken(null);
    AsyncStorage.removeItem('token');
    setAuthTrainingStatus(null);
    AsyncStorage.removeItem('trainingStatus');
  }

  const value = {
    id: authId,
    algoId: authAlgoId,
    phoneNumber: authPhoneNumber,
    token: authToken,
    isAuthenticated: !!authToken,
    savePhoneNumber: savePhoneNumber,
    saveId: saveId,
    saveAlgoId: saveAlgoId,
    authenticate: authenticate,
    logout: logout,
    verify: verify,
    isVerified: true,
    approachId: trainingApproachId,
    sessionId: trainingSessionId,
    saveApproachId: saveApproachId,
    saveSessionId: saveSessionId,
    feedback: testFeedback,
    saveFeedback: saveFeedback,
    trainingStatus: authTrainingStatus,
    saveTrainingStatus: saveTrainingStatus,
    name: authName,
    saveName: saveName,
    gender: authGender,
    saveGender: saveGender,
    playingStatus: testPlayingStatus,
    savePlayingStatus: savePlayingStatus,
    numOfRecord: testnumOfRecord,
    saveNumOfRecord: saveNumOfRecord,
    saveFinishDecibel: saveFinishDecibel,
    finishDecibel: finishDecibel,
    adherenceWeek: authAdherenceWeek,
    saveAdherenceWeek: saveAdherenceWeek
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}



export default ContextProvider;