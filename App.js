import { StatusBar } from "expo-status-bar";
import ContextProvider, { Context } from "./store/context";
import Root from "./navgation/Root";
import tw from "./styles/tailwindConf";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { I18nManager } from "react-native";
import { useContext, useEffect } from "react";
import * as Updates from "expo-updates";
import { useKeepAwake } from "expo-keep-awake";
I18nManager.forceRTL(false);

I18nManager.allowRTL(false);
export default function App() {
  const testCtx = useContext(Context);

  useKeepAwake();
  useEffect(() => {
    I18nManager.forceRTL(false);

    I18nManager.allowRTL(false);
    I18nManager.isRTL ? Updates.reloadAsync() : null;
    

  }, []);
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
