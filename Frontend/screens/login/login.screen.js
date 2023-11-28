import React, { useEffect, useState } from 'react';
import { Text, View, Button, Image, TextInput, ScrollView, TouchableOpacity, ToastAndroid } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

/* IMAGE */
import logo from '../../assets/icon.png'

/* ICONS */
import { Ionicons } from '@expo/vector-icons'


const LoginScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  })

  const [showPassword, setShowPassword] = useState(true)

  const [showError, setShowError] = useState('')

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

  const handlelogin = async () => {
    if (data.email && data.password) {
      setLoading(true)
      try {
        const response = await fetch(`http://192.168.8.100:3000/login`, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const res = await response.json()
        if (res.success == true) {
          ToastAndroid.show('User login Successfully', ToastAndroid.SHORT);
          navigation.navigate('Tabs');

        } else {
          const errorResponse = res.error;
          const jsonStartIndex = errorResponse.indexOf('{');
          const jsonString = errorResponse.substring(jsonStartIndex);

          // Parse the JSON string
          const jsonResponse = JSON.parse(jsonString);
          const errorMessage = jsonResponse.error.message;
          setShowError(errorMessage)
          ToastAndroid.show('Failed to login User', ToastAndroid.SHORT);
        }
      } catch (error) {
        console.log(error)
        ToastAndroid.show('Failed to login User !TRY AGAIN', ToastAndroid.SHORT);
      }
    }
    else {
      setShowError('Enter All Required Fields')
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
          <Text style={{ fontSize: 28, fontFamily: 'rbold' }}>LOGIN</Text>
        </View>
        <View>
          <Text style={{ color: 'red', textAlign: 'center', }}>{showError}</Text>
        </View>

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
          <Button title={loading ? "Loading" : "login"} onPress={handlelogin} color={'#FF6C3B'} />
        </View>
        <View style={{ justifyContent: 'center', flexDirection: 'row', marginTop: 20, opacity: 0.65, gap: 8, marginBottom: 20 }}>
          <Text style={{ fontFamily: 'rmedium' }}>Don't Have an Account?</Text>
          <TouchableOpacity activeOpacity={0.8} onPress={() => { navigation.navigate('RegisterScreen'); }}>
            <Text style={{ color: '#FF6C3B', fontFamily: 'rmedium' }}>Register</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
