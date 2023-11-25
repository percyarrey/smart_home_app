import React from 'react';
import { Text, View,Button } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

/* ASYNC STORAGE */
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({navigation}) => {

    const handleLogin = async () => {
        // Store the login flag as 'true' in AsyncStorage
        await AsyncStorage.setItem('hasLoggedIn', 'true');
        // Navigate to the main page
        navigation.navigate('Tabs');
      };
    
      return (
        <SafeAreaView>
          <Text>Welcome to the App! Please log in.</Text>
          <Button title="Log In" onPress={handleLogin} />
        </SafeAreaView>
      );
};

export default LoginScreen;
