import React, { useEffect, useState } from 'react';
import { Text, View, Button, Image, TextInput, ScrollView, TouchableOpacity } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

/* ASYNC STORAGE */
import AsyncStorage from '@react-native-async-storage/async-storage';

/* IMAGE */
import logo from '../../assets/icon.png'

/* ICONS */
import { Ionicons } from '@expo/vector-icons';

const LoginScreen = ({ navigation }) => {

  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  })

  const handleLogin = async () => {
    // Store the login flag as 'true' in AsyncStorage
    await AsyncStorage.setItem('hasLoggedIn', 'true');
    // Navigate to the main page
    navigation.navigate('Tabs');
  };

  const handleRegister = async () => {
    // Navigate to the main page
    navigation.navigate('RegisterScreen');
  };

  const [showPassword, setShowPassword] = useState(true)

  const [data, setData] = useState({
    email:'',
    password:''
  })

  const handleChange = (key, value) => {
    setData(prevData => ({
      ...prevData,
      [key]: value
    }));
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
                onPress={() => { setShowPassword(prev => (!prev)) }} // Navigate back
              />
              :
              <Ionicons
                name="eye-off"
                size={26}
                color="grey"
                style={{ position: 'absolute', right: 17, top: 12 }}
                onPress={() => { setShowPassword(prev => (!prev)) }} // Navigate back
              />
          }
        </View>

        <View style={{ marginTop: 20 }}>
          <Button title="Log In" onPress={handleLogin} color={'#FF6C3B'} />
        </View>
        <View style={{ justifyContent: 'center', flexDirection: 'row', marginTop: 20, opacity: 0.65, gap: 8, marginBottom: 20 }}>
          <Text style={{ fontFamily: 'rmedium' }}>Do not have an Account?</Text>
          <TouchableOpacity activeOpacity={0.8} onPress={handleRegister}>
            <Text style={{ color: '#FF6C3B', fontFamily: 'rmedium' }}>Register</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
