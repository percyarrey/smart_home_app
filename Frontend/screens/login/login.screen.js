import React, { useEffect, useState } from 'react';
import { Text, View, Button, Image, TextInput, ScrollView, TouchableOpacity, ToastAndroid } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

/* ASYNC STORAGE */
import AsyncStorage from '@react-native-async-storage/async-storage';

/* IMAGE */
import logo from '../../assets/icon.png'

/* ICONS */
import { Ionicons } from '@expo/vector-icons'

/* BACKEND */
import Config from 'react-native-config'


const RegisterScreen = ({ navigation }) => {

  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  })

  /* const handleLogin = async () => {
    // Store the login flag as 'true' in AsyncStorage
    await AsyncStorage.setItem('hasLoggedIn', 'true');
    // Navigate to the main page
    navigation.navigate('Tabs');
  }; */

  const [showPassword, setShowPassword] = useState(true)

  const [showError, setShowError] = useState(false)

  const [data, setData] = useState({
    email: '',
    password: ''
  })

  const handleChange = (key, value) => {
    setData(prevData => ({
      ...prevData,
      [key]: value
    }));
  };

  const handleLogin = async () => {
    if (data.email&& data.password) {
      try {
        const response = await fetch(`http://192.168.190.243:3000/login`, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const res = await response.json()
        console.log(res)
        // Handle successful response

        ToastAndroid.show('User Login Successfully', ToastAndroid.SHORT);
      } catch (error) {
        console.log('Network request failed:', error.message);
        ToastAndroid.show('Failed to login User !TRY AGAIN', ToastAndroid.SHORT);
      }
    }
    else {
      setShowError(true)
    }
  };

  return (
    <SafeAreaView style={{ paddingHorizontal: 15, flex: 1 }}>
      <View style={{ alignItems: 'center', marginTop: 50 }}>
        <Image source={logo} resizeMode='cover' style={{ width: 80, height: 80, borderRadius: 5, paddingVertical: 40 }} />
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 9, opacity: 0.7 }}>
        <Text style={{ fontSize: 28, fontFamily: 'rmedium' }}>Smart</Text>
        <Text style={{ fontSize: 28, fontFamily: 'rmedium', color: '#FF6C3B' }}>Villa</Text>
      </View>
      <ScrollView style={{ marginTop: 30 }}>
        <View>
          <Text style={{ fontSize: 28, fontFamily: 'rbold' }}>Login</Text>
        </View>

        {
          showError && 
          <View>
            <Text style={{ color: 'red', textAlign: 'center', }}>Enter All Required Fields</Text>
          </View>
        }


        <View style={{ marginTop: 20 }}>
          <TextInput
            style={{ backgroundColor: 'white', height: 50, borderRadius: 3 }}
            placeholder='Email'
            onChangeText={value => handleChange('email', value)}
          />
        </View>

        <View style={{ marginTop: 20, position: 'relative' }}>
          <TextInput
            style={{ backgroundColor: 'white', height: 50, borderRadius: 3 }}
            placeholder='Password'
            secureTextEntry={showPassword}
            onChangeText={value => handleChange('password', value)}
          />

          {
            showPassword ?
              <Ionicons
                name="eye"
                size={26}
                color="grey"
                style={{ position: 'absolute', right: 17, top: 12 }}
                onPress={() => { setShowPassword(prev => (!prev)) }} // Show/hide password
              />
              :
              <Ionicons
                name="eye-off"
                size={26}
                color="grey"
                style={{ position: 'absolute', right: 17, top: 12 }}
                onPress={() => { setShowPassword(prev => (!prev)) }} // Show/hide password
              />
          }
        </View>

        <View style={{ marginTop: 20 }}>
          <Button title="Login" onPress={handleLogin} color={'#FF6C3B'} />
        </View>
        <View style={{ justifyContent: 'center', flexDirection: 'row', marginTop: 20, opacity: 0.65, gap: 8, marginBottom: 20 }}>
          <Text style={{ fontFamily: 'rmedium' }}>Do not have an Account?</Text>
          <TouchableOpacity activeOpacity={0.8} onPress={() => { navigation.navigate('RegisterScreen'); }}>
            <Text style={{ color: '#FF6C3B', fontFamily: 'rmedium' }}>Register</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
