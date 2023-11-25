import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

import Ionicons from '@expo/vector-icons/Ionicons'

const SettingScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 15 }}>
      <View style={{ marginTop: 5, borderBottomWidth: 2, paddingBottom: 8, borderColor: "#CFCFCF" }}>
        <Text style={{ fontFamily: 'rbold', fontSize: 20, color: '#FF6C3B', }}>SETTINGS</Text>
      </View>

      {/* PROFILE */}
      <View style={{ marginTop: 20 }}>
        {/*PRIVACY */}
        <TouchableOpacity>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
            <View style={{ flexDirection: 'row', gap: 20, }}>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Ionicons name='lock-closed' size={30} color={'#FF6C3B'} />
              </View>
              <View style={{ width: '75%' }}>
                <Text style={{ fontFamily: 'rbold', fontSize: 20 }}>Privacy</Text>
                <Text ellipsizeMode={'tail'} numberofLines={2} style={{ fontFamily: 'rmedium', opacity: 0.6, }}>Lock or open a room</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        {/*NOTIFICATION */}
        <TouchableOpacity>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 25 }}>
            <View style={{ flexDirection: 'row', gap: 20, }}>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Ionicons name='notifications' size={30} color={'#FF6C3B'} />
              </View>
              <View style={{ width: '75%' }}>
                <Text style={{ fontFamily: 'rbold', fontSize: 20 }}>Notification</Text>
                <Text ellipsizeMode={'tail'} numberofLines={2} style={{ fontFamily: 'rmedium', opacity: 0.6, }}>Turn On and Off Notification</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        {/*parental control*/}
        <TouchableOpacity>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 25 }}>
            <View style={{ flexDirection: 'row', gap: 20, }}>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Ionicons name='shield-checkmark' size={30} color={'#FF6C3B'} />
              </View>
              <View style={{ width: '75%' }}>
                <Text style={{ fontFamily: 'rbold', fontSize: 20 }}>Parental control</Text>
                <Text ellipsizeMode={'tail'} numberofLines={2} style={{ fontFamily: 'rmedium', opacity: 0.6, }}>Family options</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        {/*App language */}
        <TouchableOpacity>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 25 }}>
            <View style={{ flexDirection: 'row', gap: 20, }}>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Ionicons name='globe-outline' size={30} color={'#FF6C3B'} />
              </View>
              <View style={{ width: '75%' }}>
                <Text style={{ fontFamily: 'rbold', fontSize: 20 }}>App language</Text>
                <Text ellipsizeMode={'tail'} numberofLines={2} style={{ fontFamily: 'rmedium', opacity: 0.6, }}>English (device's language)</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        {/*Help */}
        <TouchableOpacity>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 25 }}>
            <View style={{ flexDirection: 'row', gap: 20, }}>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Ionicons name='help-circle' size={30} color={'#FF6C3B'} />
              </View>
              <View style={{ width: '75%' }}>
                <Text style={{ fontFamily: 'rbold', fontSize: 20 }}>Help</Text>
                <Text ellipsizeMode={'tail'} numberofLines={2} style={{ fontFamily: 'rmedium', opacity: 0.6, }}>Help center, contact us, privacy policy</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>

      </View>
    </View>
  )
}

export default SettingScreen

const styles = StyleSheet.create({})