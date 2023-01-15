import { StatusBar } from "expo-status-bar";
import ContextProvider, { Context } from "./store/context";
import Root from "./navgation/Root";
import tw from "./styles/tailwindConf";
import { SafeAreaProvider } from 'react-native-safe-area-context';
export default function App() {
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
