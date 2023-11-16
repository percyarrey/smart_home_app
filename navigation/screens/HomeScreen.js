import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
/* import { useNavigation } from '@react-navigation/native' */
import React, { useEffect, useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import { profile } from '../../contants/images'

/* PAGES *
 


/* FLOATING ACTION BUTTON */


import FloatingButton from '../../component/FAB'


/* DATABASE */
import * as SQLite from 'expo-sqlite';
import { deleteData, fetchAllData, insertData, updateData } from '../../utils/crudRoom';


/* const rooms = [
  { name: 'Bathroom', icon: 'ios-water-outline', numOfDevices: 2 },
  { name: 'Living Room', icon: 'ios-tv-outline', numOfDevices: 4 },
  { name: 'Kitchen', icon: 'ios-restaurant-outline', numOfDevices: 3 },
  { name: 'Bedroom', icon: 'ios-bed-outline', numOfDevices: 3 },
  { name: 'Study Room', icon: 'ios-desktop-outline', numOfDevices: 1 },
]; */

const HomeScreen = ({ navigation }) => {
  const [active, setAcive] = useState(0)
  const [loading, setLoading] = useState(true)
  const [rooms, setRooms] = useState([])
  useEffect(() => {
    (
      async () => {
        await fetchAllData()
          .then((res) => {
            setRooms(res)
          })
          .finally(() => {
            setLoading(false)
          })

      }
    )()
  }, []);

  const handleSave = async (data) => {
    /*  var newData = { name: data.name, icon: data.icon } */
    insertData(data);

    await fetchAllData()
      .then((res) => {
        setRooms(res)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const renderRoomItem = (item, index) => {
    const handleLongPress = () => {
      Alert.alert(
        'Confirmation',
        'Do you wish to delete?',
        [
          {
            text: 'Cancel',
            style: 'default'
          },
          {
            text: 'Delete',
            style: 'destructive',

            onPress: async () => {
              // Perform delete action here
              deleteData(item.id)
              setRooms(await fetchAllData())
              console.log('Item deleted');
            },
          },
        ],
        { cancelable: true }
      );
    };

    const handleShortPress = () => {
      setAcive(index);
      navigation.navigate("RoomDevices", { room: item })
    }
    return (
      <View style={{ flex: 1, paddingHorizontal: 10, paddingTop: 10, maxWidth: '50%' }}>
        <TouchableOpacity onLongPress={handleLongPress} onPress={handleShortPress} >
          <View style={{ flex: 1, height: 150, borderRadius: 15, borderColor: '#C4C4C4', borderWidth: 0.6, padding: 9, shadowColor: '#C4C4C4', backgroundColor: index === active ? '#FF6C3B' : 'transparent' }}>
            <View style={{ flex: 1, justifyContent: 'space-between' }}>
              <Ionicons name={item.icon} color={index === active ? 'white' : '#FF6C3B'} size={35} />
              <View>
                <Text style={{ fontFamily: 'rbold', fontSize: 20, color: index === active ? 'white' : 'black' }}>{item.name}</Text>
                <Text style={{ opacity: 0.7, fontWeight: '500', fontFamily: 'rregular', color: index === active ? 'white' : 'black' }}>{item.numofDevices === 0 ? 'No Device Found' : item.numofDevices === 1 ? '1 device' : `${item.numofDevices} devices`}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    )
  };

  /* NAVIGATION */
  /* const navigation = useNavigation() */


  return (
    <View style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 15 }}>

      {/* WELCOME */}
      <View style={{ justifyContent: 'space-between', marginTop: 20, flexDirection: 'row' }}>
        <View>
          <Text style={{ opacity: 0.5, fontWeight: '500', fontFamily: 'rregular' }}>Welcome home</Text>
          <Text style={{ fontFamily: 'rbold', fontSize: 30, marginTop: 0 }}>Alex Tobey</Text>
        </View>
        <View>
          <Image source={profile} resizeMode='cover' style={{ width: 50, height: 50, borderRadius: 5 }} />
        </View>
      </View>

      {/* POWER USAGE */}
      <View style={{ flexDirection: 'row', marginTop: 32, gap: 15, alignItems: 'center' }}>
        <View style={{ borderColor: '#BBBBBB', borderWidth: 1, borderRadius: 25, alignItems: 'center', justifyContent: 'center', width: 52, height: 52, opacity: 0.6 }}>
          <Ionicons name={'flash-outline'} color={'black'} size={30} />
        </View>

        <View>
          <View style={{ flexDirection: 'row', }}>
            <Text style={{ fontSize: 27, fontWeight: '700' }}>20.3</Text>
            <Text style={{ fontWeight: '600', marginTop: 10, fontSize: 18, marginLeft: 3 }}>kwh</Text>
          </View>
          <Text style={{ opacity: 0.58, fontWeight: '500', fontFamily: 'rregular', top: -4 }}>Power usage for today</Text>
        </View>
      </View>

      <View style={styles.horizontalLine} >

      </View>
      {/* ROOMS */}
      <Text style={{ paddingBottom: 8, opacity: 0.4, textAlign: 'center', fontSize: 12, paddingTop: 4 }}>Press and hold to <Text style={{ fontFamily: 'rbold' }}>Delete</Text></Text>
      {
        loading ?
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color='#FF6C3B' />
          </View> :
          <FlatList
            data={rooms}
            numColumns={2}
            renderItem={({ item, index }) => (renderRoomItem(item, index))}
            keyExtractor={(item, index) => (index)}
          />
      }
      <FloatingButton onSave={handleSave} />
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  horizontalLine: {
    borderBottomColor: '#CDCDCD',
    borderBottomWidth: 1,
    marginTop: 32,
  },
})