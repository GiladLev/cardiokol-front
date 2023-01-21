import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Colors } from "../constants/styles";
import InputOTPScreen from "../screens/InputOTPScreen";
import LoginScreen from "../screens/LoginScreen";

export default function AuthStack({Stack}) {

    return (
      <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#F1F1F1' },
        headerTintColor: Colors.grey200,
        contentStyle: { backgroundColor: '#F1F1F1' },
        drawerPosition: "ltr",
        headerShown: false
      }}     
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="OTP" component={InputOTPScreen} />
      </Stack.Navigator>
    );
  }