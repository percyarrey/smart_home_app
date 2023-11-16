import * as Font from 'expo-font';
import { useState, useEffect } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, } from '@react-navigation/native';

/* SCREEN */
import RoomDevices from './screens/RoomDevices';
import Tabs from './navigation/Tabs';

/* ICONS */
/* import { Ionicons } from '@expo/vector-icons'; */

export default function App() {
  const Stack = createNativeStackNavigator();
  const [fontsLoaded, setFontsLoaded] = useState(false);
  useEffect(() => {
    loadFonts();
  }, []);
  async function loadFonts() {
    await Font.loadAsync({
      rblack: require('./assets/fonts/Roboto-Black.ttf'),
      rblackitalic: require('./assets/fonts/Roboto-BlackItalic.ttf'),
      rbold: require('./assets/fonts/Roboto-Bold.ttf'),
      rbolditalic: require('./assets/fonts/Roboto-BoldItalic.ttf'),
      ritalic: require('./assets/fonts/Roboto-Italic.ttf'),
      rlight: require('./assets/fonts/Roboto-Light.ttf'),
      rlightitalic: require('./assets/fonts/Roboto-LightItalic.ttf'),
      rmedium: require('./assets/fonts/Roboto-Medium.ttf'),
      rmediumi: require('./assets/fonts/Roboto-MediumItalic.ttf'),
      rregular: require('./assets/fonts/Roboto-Regular.ttf'),
      rthin: require('./assets/fonts/Roboto-Thin.ttf'),
      rthini: require('./assets/fonts/Roboto-ThinItalic.ttf'),
    });
    setFontsLoaded(true);
  }

  if (!fontsLoaded) return null;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Tabs' component={Tabs} options={{ headerShown: false }} />
          <Stack.Screen name='RoomDevices' component={RoomDevices} options={{
            headerShadowVisible: false,
            headerTitleStyle: { color: 'black', fontFamily: 'rbold' }
          }} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}