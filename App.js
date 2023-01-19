import { StatusBar } from "expo-status-bar";
import ContextProvider, { Context } from "./store/context";
import Root from "./navgation/Root";
import tw from "./styles/tailwindConf";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { I18nManager } from "react-native";
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    I18nManager.forceRTL(false);
    I18nManager.allowRTL(false);
  
  }, [])
  return (
    <>
      <StatusBar style="dark" />
      <ContextProvider>
        <SafeAreaProvider style={tw`flex-1 pt-8`}>
          <Root />
        </SafeAreaProvider>
      </ContextProvider>
    </>
  );
}
