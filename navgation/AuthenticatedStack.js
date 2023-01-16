import TrainingWelcomeScreen from "../screens/Welcome/TrainingWelcomeScreen";
import PrepareToRecordScreen from "../screens/Status/PrepareToRecordScreen.js";
import PrepareToTrainingScreen from "../screens/Training/PrepareToTrainingScreen";
import FirstTrainigRecordingScreen from "../screens/Training/FirstTrainigRecordingScreen";
import ThirdTrainigRecordingScreen from "../screens/Training/ThirdTrainigRecordingScreen";
import FourthTrainigRecordingScreen from "../screens/Training/FourthTrainigRecordingScreen.js";
import FifthTrainigRecordingScreen from "../screens/Training/FifthTrainigRecordingScreen";
import SixthTrainigRecordingScreen from "../screens/Training/SixthTrainigRecordingScreen";
import SeventhTrainigRecordingScreen from "../screens/Training/SeventhTrainigRecordingScreen";
import EighthTrainigRecordingScreen from "../screens/Training/EighthTrainigRecordingScreen";
import NinthTrainigRecordingScreen from "../screens/Training/NinthTrainigRecordingScreen";
import TenthTrainigRecordingScreen from "../screens/Training/TenthTrainigRecordingScreen";
import EleventhTrainigRecordingScreen from "../screens/Training/EleventhTrainigRecordingScreen";
import TrainingCompleteScreen from "../screens/Training/TrainingCompleteScreen";
import SecondTestRecordSavedScreen from "../screens/TestSecond/SecondTestRecordSavedScreen";
import ThirdTestRecordSavedScreen from "../screens/TestThird/ThirdTestRecordSavedScreen";
import TestWelcomeScreen from "../screens/Welcome/TestWelcomeScreen";
import FirstTestRecordingScreen from "../screens/TestFirst/FirstTestRecordingScreen";
import SecondTestRecordingScreen from "../screens/TestSecond/SecondTestRecordingScreen";
import ThirdTestRecordingScreen from "../screens/TestThird/ThirdTestRecordingScreen";
import TestCompleteScreen from "../screens/Status/TestCompleteScreen";
import BackgroundNoiceScreen from "../screens/Error/BackgroundNoiceScreen";
import PitchFalseScreen from "../screens/Error/PitchFalseScreen";
import SaturetedFalseScreen from "../screens/Error/SaturetedFalseScreen";
import VadFalseScreen from "../screens/Error/VadFalseScreen";
import VowelFalseScreen from "../screens/Error/VowelFalseScreen";
import StopAlert from "../screens/Error/StopAlert";
import { Colors } from "../constants/styles";
import { Context } from "../store/context";
import { useContext } from "react";
import FirstTestRecordSavedScreen from "../screens/TestFirst/FirstTestRecordSavedScreen";
import SaveTrainScreen from "../screens/Status/SaveTrainScreen";
import SecondTrainigRecordingScreen from "../screens/Training/SecondTrainigRecordingScreen";
import ErrorToSendToBack from "../screens/Error/ErrorToSendToBack";
import WaveAnimation from "../components/Animation/WaveAnimation";
import RecordScreen from "../components/record/RecordScreen";
import CalendarTemplate from "../components/calendar/CalendarProgress";

export default function AuthenticatedStack({ Stack }) {
  const authCtx = useContext(Context);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#F1F1F1" },
        headerTintColor: Colors.grey200,
        contentStyle: { backgroundColor: "#F1F1F1" },
        headerShown: false,
        animation: "none",
      }}
    >
      {/* {authCtx.saveTrainingStatus("TRAINING_STATUS_PATIENT_CREATED")} //change to train - do error */}
      {authCtx.trainingStatus === "TRAINING_STATUS_PATIENT_CREATED" ||
      authCtx.trainingStatus == null ? (
        <Stack.Group
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Welcome" component={TrainingWelcomeScreen} />
          <Stack.Screen
            name="PrepareToRecord"
            component={PrepareToTrainingScreen}
          />
          <Stack.Screen
            name="FirstRecording"
            component={FirstTrainigRecordingScreen}
          />

          <Stack.Screen
            name="SecondRecording"
            component={SecondTrainigRecordingScreen}
          />
          <Stack.Screen
            name="ThirdRecording"
            component={ThirdTrainigRecordingScreen}
          />
          <Stack.Screen
            name="FourthRecording"
            component={FourthTrainigRecordingScreen}
          />

          <Stack.Screen
            name="FifthRecording"
            component={FifthTrainigRecordingScreen}
          />

          <Stack.Screen
            name="SixthRecording"
            component={SixthTrainigRecordingScreen}
          />

          <Stack.Screen
            name="SeventhRecording"
            component={SeventhTrainigRecordingScreen}
          />

          <Stack.Screen
            name="EighthRecording"
            component={EighthTrainigRecordingScreen}
          />

          <Stack.Screen
            name="NinthRecording"
            component={NinthTrainigRecordingScreen}
          />

          <Stack.Screen
            name="TenthRecording"
            component={TenthTrainigRecordingScreen}
          />

          <Stack.Screen
            name="EleventhRecording"
            component={EleventhTrainigRecordingScreen}
          />
          <Stack.Screen name="SaveTrainScreen" component={SaveTrainScreen} />
          <Stack.Screen
            name="TrainingComplete"
            component={TestCompleteScreen}
          />
          <Stack.Screen
            name="BackgroundNoice"
            component={BackgroundNoiceScreen}
          />
          <Stack.Screen name="PitchFalse" component={PitchFalseScreen} />
          <Stack.Screen
            name="SaturetedFalse"
            component={SaturetedFalseScreen}
          />
          <Stack.Screen name="VadFalse" component={VadFalseScreen} />
          <Stack.Screen name="VowelFalse" component={VowelFalseScreen} />
          <Stack.Screen name="StopAlert" component={StopAlert} />
          <Stack.Screen name="ErrorToSendToBack" component={ErrorToSendToBack} />
        </Stack.Group>
      ) : (
        <Stack.Group>
          <Stack.Screen name="Welcome" component={CalendarTemplate} />
          <Stack.Screen
            name="PrepareToRecord"
            component={PrepareToRecordScreen}
          />
          <Stack.Screen
            name="FirstRecording"
            component={FirstTestRecordingScreen}
          />
          <Stack.Screen
            name="FirstRecordSaved"
            component={FirstTestRecordSavedScreen}
          />
          <Stack.Screen
            name="SecondRecording"
            component={SecondTestRecordingScreen}
          />

          <Stack.Screen
            name="SecondRecordSaved"
            component={SecondTestRecordSavedScreen}
          />
          <Stack.Screen
            name="BackgroundNoice"
            component={BackgroundNoiceScreen}
          />
          <Stack.Screen name="PitchFalse" component={PitchFalseScreen} />
          <Stack.Screen
            name="SaturetedFalse"
            component={SaturetedFalseScreen}
          />
          <Stack.Screen name="VadFalse" component={VadFalseScreen} />
          <Stack.Screen name="VowelFalse" component={VowelFalseScreen} />
          <Stack.Screen name="StopAlert" component={StopAlert} />
          <Stack.Screen name="ErrorToSendToBack" component={ErrorToSendToBack} />

          <Stack.Screen
            name="ThirdRecording"
            component={ThirdTestRecordingScreen}
          />

          <Stack.Screen
            name="ThirdRecordSaved"
            component={ThirdTestRecordSavedScreen}
          />

          <Stack.Screen name="TestComplete" component={TestCompleteScreen} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
}
