import { StyleSheet, Image, View, Text, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { profile } from '../../contants/images'


import Ionicons from '@expo/vector-icons/Ionicons'


const ProfileScreen = ({ navigation }) => {
  /* PASSWORD */
  const password = 'PERCY'
  const [showpassword, setShowPassword] = useState(false)
  return (
    <View style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 15 }}>
      <View style={{ marginTop: 5, borderBottomWidth: 2, paddingBottom: 8, borderColor: "#CFCFCF" }}>
        <Text style={{ fontFamily: 'rbold', fontSize: 20, color: '#FF6C3B', }}>PROFILE</Text>
      </View>
      <View style={{ alignItems: 'center' }}>
        <View>
          <Image source={profile} resizeMode='cover' style={{ width: 150, height: 150, borderRadius: 150, marginTop: 30 }} />
          <TouchableOpacity>
            <View style={{ backgroundColor: '#FF6C3B', borderRadius: 100, paddingHorizontal: 10, position: 'absolute', bottom: 5, right: 0, paddingVertical: 10 }}>
              <Ionicons name='camera-sharp' color={'white'} size={30} />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* PROFILE */}
      <View style={{ marginTop: 20 }}>
        {/* NAME */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
          <View style={{ flexDirection: 'row', gap: 20, }}>
            <View style={{ height: 60, justifyContent: 'center', alignItems: 'center' }}>
              <Ionicons name='person' size={30} color={'#FF6C3B'} />
            </View>
            <View style={{ width: '75%' }}>
              <Text style={{ fontFamily: 'rmedium', opacity: 0.6 }}>Name:</Text>
              <Text style={{ fontFamily: 'rbold', fontSize: 20 }}>Percy</Text>
              <Text ellipsizeMode={'tail'} numberofLines={2} style={{ fontFamily: 'rmedium', opacity: 0.6, }}>This is the user name you sign up with, tap the pencil to edit</Text>
            </View>
          </View>
          <View style={{ height: 60, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity>
              <Ionicons name='pencil' size={30} color={'#FF6C3B'} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Email */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 30 }}>
          <View style={{ flexDirection: 'row', gap: 20, }}>
            <View style={{ height: 60, justifyContent: 'center', alignItems: 'center' }}>
              <Ionicons name='mail' size={30} color={'#FF6C3B'} />
            </View>
            <View>
              <Text style={{ fontFamily: 'rmedium', opacity: 0.6 }}>Email:</Text>
              <Text style={{ fontFamily: 'rbold', fontSize: 20 }}>Percy</Text>
            </View>
          </View>
          <View style={{ height: 60, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity>
              <Ionicons name='pencil' size={30} color={'#FF6C3B'} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Password */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 30 }}>
          <View style={{ flexDirection: 'row', gap: 20, }}>
            <View style={{ height: 60, justifyContent: 'center', alignItems: 'center' }}>
              <Ionicons name='lock-closed' size={30} color={'#FF6C3B'} />
            </View>
            <View>
              <Text style={{ fontFamily: 'rmedium', opacity: 0.6 }}>Password:</Text>
              <Text type='password' style={{ fontFamily: 'rbold', fontSize: 20 }}>{showpassword ? password : '*'.repeat(password.length)}</Text>
            </View>
          </View>
          <View style={{ height: 60, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => { setShowPassword(prev => !prev) }}>
              <Ionicons name={showpassword ? 'eye-off' : 'eye'} size={30} color={'#FF6C3B'} />
            </TouchableOpacity>
          </View>
        </View>

      </View>
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})