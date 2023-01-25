import { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Context } from "../store/context";
import AuthStack from "./AuthStack";
import AuthenticatedStack from "./AuthenticatedStack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getNetworkStateAsync } from 'expo-network';
import NoInternet from "../screens/Error/NoInternet";

export default function Navigation() {
    const authCtx = useContext(Context);
    const [networkState, setNetworkState] = useState(checkNetwork)
    const Stack = createNativeStackNavigator();

    console.log("==== isAuthenticated === " + authCtx.isAuthenticated + " ===");
    console.log("==== trainingStatus === " + authCtx.trainingStatus + " ===");
    console.log("==== Gender === " + authCtx.gender + " ===");

    async function checkNetwork() {
      const network = await getNetworkStateAsync();
      setNetworkState(network?.isConnected)
    }

    useEffect(() => {
      checkNetwork();
    }, [])
    
  
    return (

      <NavigationContainer>
        {networkState ? authCtx.isAuthenticated ? <AuthenticatedStack Stack={Stack}/> : <AuthStack Stack={Stack}/> : <NoInternet/> }
      </NavigationContainer>

    );
  }