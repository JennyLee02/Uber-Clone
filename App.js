import React from "react";
import { KeyboardAvoidingView, Platform} from 'react-native';
import { Provider } from "react-redux";
import HomeScreen from "./screens/HomeScreen";
import MapScreen from "./screens/MapScreen";
import { store } from "./store";
import { SafeAreaProvider } from "react-native-safe-area-context";
import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import {createStackNavigator} from '@react-navigation/stack'
import tw from "tailwind-react-native-classnames";


//1) set up redux

export default function App() {
  const Stack = createStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
          <KeyboardAvoidingView 
          //if the ios platform is being used, use the padding, otherwise use the height. 
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === 'ios' ? -64 : 0}
          //without flex, nothing will show on the screen
          style={tw`flex-1`}>
            <Stack.Navigator>
              <Stack.Screen
                name='HomeScreen'
                component={HomeScreen}
                options={{
                  //this will hide "HomeScreen" from the top of the screen.
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name='MapScreen'
                component={MapScreen}
                options={{
                  //this will hide "MapScreen" from the top of the screen.
                  headerShown: false,
                }}
              />
            </Stack.Navigator>
          </KeyboardAvoidingView>
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
}


