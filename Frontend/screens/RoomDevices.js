import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator, Button, Alert, ToastAndroid } from 'react-native'
import React, { useEffect, useState, } from 'react'
import { useRoute } from '@react-navigation/native';

import { Ionicons } from '@expo/vector-icons';

/* CRUD OFFLINE DB */
import { insertData, deleteData, fetchById, updateData } from '../utils/crudRoomDevices';
import RoomdevicesPopup from '../component/RoomdevicesPopup';

/* COMPONENT */
import RoomDevicesComp from '../component/roomDevicesComp';


const RoomDevices = ({ navigation }) => {



  /* ACTIVE AND ROOM */
  const [activeItem, setActiveItem] = useState([])

  const route = useRoute();
  const { room } = route.params;


  const [popupVisible, setPopupVisible] = useState(false);
  const handleSave = async (data) => {
    data.power = 0
    data.roomid = room.id
    console.log(data)
    setPopupVisible(false);
    insertData(data);
    ToastAndroid.show(data.name + ' device added Succesfully', ToastAndroid.SHORT);

    await fetchById(room.id)
      .then((res) => {
        setActiveItem(res[0])
        setRoomItems(res)
      })
      .finally(() => {
        setLoading(false)
      })
  };

  const handleCancel = () => {
    setPopupVisible(false);
  };

  useEffect(() => {
    navigation.setOptions({
      title: room.name,
      headerLeft: () => (
        <Ionicons
          name="chevron-back"
          size={24}
          color="#462990"
          style={{ marginLeft: 0, marginRight: 20 }}
          onPress={() => navigation.goBack()} // Navigate back
        />
      ),
    })
  })

  /* const roomItems = [
    { name: 'Television', icon: 'ios-tv-outline' },
    { name: 'Laptop', icon: 'ios-laptop-outline' },
    { name: 'Smartphone', icon: 'ios-phone-portrait-outline' },
    { name: 'Speaker', icon: 'ios-volume-high-outline' },
    { name: 'Camera', icon: 'ios-camera-outline' },
    { name: 'Microwave', icon: 'ios-restaurant-outline' },
    { name: 'Refrigerator', icon: 'ios-snow-outline' },
    { name: 'Washing Machine', icon: 'ios-water-outline' },
  ]; */

  /* DATABASE */
  const [roomItems, setRoomItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (
      async () => {
        await fetchById(room.id)
          .then((res) => {
            setActiveItem(res[0])
            setRoomItems(res)

          })
          .finally(() => {
            setLoading(false)
          })
      }
    )()
  }, [])


  /* RENDER ROOMS ITEMS */
  const renderRoomItem = (index, item) => {
    if (item.name.length > 9) {
      item.name = item.name.slice(0, 9) + '...'
    }

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
              ToastAndroid.show(item.name + ' deleted Succesfully', ToastAndroid.SHORT);
              await fetchById(room.id)
                .then((res) => {
                  setRoomItems(res)
                  setActiveItem[0]
                })
                .finally(() => {
                  setLoading(false)
                })
              console.log('Item deleted');
            },
          },
        ],
        { cancelable: true }
      );
    };

    return (
      <TouchableOpacity onPress={() => { setActiveItem(item) }} onLongPress={handleLongPress}>
        <View style={styles.roomItem}>
          <View style={styles.iconContainer(item.id, activeItem.id)}>
            <Ionicons name={item.icon} size={24} color={item.id === activeItem.id ? 'white' : '#504F4F'} />

            {item.power != 0 && item.id !== activeItem.id && <View style={[styles.roomPower, { backgroundColor: '#FF6C3B' }]}></View>}
          </View>
          <Text style={{ marginTop: 4, color: item.id === activeItem.id ? '#FF6C3B' : 'grey' }}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    )
  };


  return (

    <View style={{ paddingLeft: 15, flex: 1, backgroundColor: 'white' }}>
      {
        loading ?
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color='#FF6C3B' />
          </View> :
          <View style={{ flex: 1 }}>

            {/* DEVICES */}
            <View>
              {
                roomItems.length != 0 ?
                  <View>
                    <Text style={{ opacity: 0.4, textAlign: 'center', fontSize: 12, paddingBottom: 4 }}>Press and hold to <Text style={{ fontFamily: 'rbold' }}>Delete</Text></Text>
                    <FlatList
                      data={roomItems}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={({ item, index }) => (renderRoomItem(index, item))}
                      contentContainerStyle={styles.container}
                    />
                    <View style={styles.horizontalLine} >

                    </View>
                  </View>
                  :
                  <View style={{ height: 60, alignItems: 'center', justifyContent: 'center' }}>
                    <View><Text style={{ fontSize: 18, opacity: 0.7, color: '#462990' }}>No device Found</Text></View>
                  </View>
              }
            </View>
            {/* MAIN */}
            <View style={{ flex: 1, paddingRight: 15, }}>
              <View style={{ flex: 1 }}>
                {/* COMPONENT */}
                {
                  roomItems.length != 0 &&
                  <RoomDevicesComp activeItem={activeItem} otherItems={roomItems.filter(e => (e.id !== activeItem.id))} setRoomItems={setRoomItems} />
                }
              </View>


              <View style={{ justifyContent: 'flex-end', paddingBottom: 30, }}>
                {/* ADD A DEVICE */}
                <View style={{ borderRadius: 10, overflow: 'hidden' }}>
                  <RoomdevicesPopup
                    visible={popupVisible}
                    onSave={handleSave}
                    onCancel={handleCancel}
                  />
                  <Button title='add device' color={'#FF6C3B'} onPress={() => { setPopupVisible(!popupVisible) }} />
                </View>
              </View>
            </View>
          </View>
      }
    </View>
  )
}

export default RoomDevices

const styles = StyleSheet.create({
  container: {
    marginLeft: 20,
  },
  roomItem: {
    alignItems: 'center',
    marginRight: 19,
    position: 'relative'

  },
  roomPower: {
    position: 'absolute',
    height: 15,
    width: 15,
    borderRadius: 100,
    top: 2,
    right: 2

  },
  iconContainer: (index, active) => ({
    width: 55,
    height: 55,
    borderRadius: 32,
    backgroundColor: index === active ? '#FF6C3B' : '#ebebeb',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  horizontalLine: {
    borderBottomColor: '#CDCDCD',
    borderBottomWidth: 1,
    marginTop: 30,
  },

});