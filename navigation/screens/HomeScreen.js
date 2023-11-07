import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native'
/* import { useNavigation } from '@react-navigation/native' */
import React, { useEffect, useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import { profile } from '../../contants/images'

/* PAGES *
 


/* FLOATING ACTION BUTTON */


import FloatingButton from './component/FAB'


/* DATABASE */
import * as SQLite from 'expo-sqlite';
import { deleteData, fetchAllData, insertData } from './utils/cruddb';

const db = SQLite.openDatabase('smart_home.db'); // Replace 'your_database_name' with your preferred name

// Function to execute SQL queries
const executeSql = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        sql,
        params,
        (_, result) => resolve(result),
        (_, error) => reject(error)
      );
    });
  });
};

export const setupDatabase = async () => {
  // Create tables or perform any other initialization tasks here
  // Example:
  const createTableQuery = `
  CREATE TABLE IF NOT EXISTS rooms (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    icon TEXT,
    numofDevices INTEGER DEFAULT 0
  );
`;

  try {
    await executeSql(createTableQuery);
    console.log('Database setup complete');
  } catch (error) {
    console.log('Error setting up database:', error);
  }
};
/* const rooms = [
  { name: 'Bathroom', icon: 'ios-water-outline', numOfDevices: 2 },
  { name: 'Living Room', icon: 'ios-tv-outline', numOfDevices: 4 },
  { name: 'Kitchen', icon: 'ios-restaurant-outline', numOfDevices: 3 },
  { name: 'Bedroom', icon: 'ios-bed-outline', numOfDevices: 3 },
  { name: 'Study Room', icon: 'ios-desktop-outline', numOfDevices: 1 },
]; */

const HomeScreen = ({navigation}) => {
  const [active, setAcive] = useState(0)
  const [rooms, setRooms] = useState([])
  useEffect(() => {
    setupDatabase();
    (
      async () => {
        setRooms(await fetchAllData())
      }
    )()
  }, []);

  const handleSave = async (data) => {
    var newData = { name: data.name, icon: data.icon, numOfDevices: 0 }
    insertData(newData)
    setRooms(await fetchAllData())
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
      navigation.navigate("RoomDetails")
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

      <View style={styles.horizontalLine} />
      {/* ROOMS */}
      {/* <ScrollView>
        <View style={{ flex: 1 }}>
            {rooms.map((room, index) => (
            <View key={index} style={styles.gridItem}>
              {renderRoomItem(room)}
            </View>
          ))}
        </View>
      </ScrollView> */}
      <Text style={{ paddingBottom: 8, opacity: 0.4, textAlign: 'center', fontSize: 12, paddingTop: 4 }}>Press and hold to <Text style={{ fontFamily: 'rbold' }}>Delete</Text></Text>
      <FlatList
        data={rooms}
        numColumns={2}
        renderItem={({ item, index }) => (renderRoomItem(item, index))}
        keyExtractor={(item, index) => (index)}
      />
      <FloatingButton onSave={handleSave} />
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  horizontalLine: {
    borderBottomColor: '#B8B8BB',
    borderBottomWidth: 0.2,
    marginTop: 32,
  },
})