import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator, Button, Alert, Animated } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useRoute } from '@react-navigation/native';

import { Ionicons } from '@expo/vector-icons';


import { fetchAllData, insertData, deleteData, fetchById } from '../utils/crudRoomDevices';
import RoomdevicesPopup from '../component/RoomdevicesPopup';

const RoomDevices = ({ navigation }) => {

  const [active, setAcive] = useState(0)

  const route = useRoute();
  const { room } = route.params;

  const [popupVisible, setPopupVisible] = useState(false);
  const handleSave = async (data) => {
    data.power = 0
    data.roomid = room.id
    console.log(data)
    setPopupVisible(false);
    insertData(data);

    await fetchById(room.id)
      .then((res) => {
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
              await fetchById(room.id)
                .then((res) => {
                  setRoomItems(res)
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
      <TouchableOpacity onPress={() => { setAcive(index) }} onLongPress={handleLongPress}>
        <View style={styles.roomItem}>
          <View style={styles.iconContainer(index, active)}>
            <Ionicons name={item.icon} size={24} color={index === active ? 'white' : '#504F4F'} />
          </View>
          <Text style={{ marginTop: 4, color: index === active ? '#FF6C3B' : 'grey' }}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    )
  };


  /* ANIMATE */
  const sizeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    /* Animated */
    Animated.loop(
      Animated.timing(sizeAnim, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: false, // Set useNativeDriver to false
        isInteraction: true,
      })
    ).start()

  }, [sizeAnim]);

  const animateSize = sizeAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.08, 1],
  });
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
                  </View>
                  :
                  <View style={{ height: 60, alignItems: 'center', justifyContent: 'center' }}>
                    <View><Text style={{ fontSize: 18, opacity: 0.7, color: '#462990' }}>No device Found</Text></View>
                  </View>
              }
            </View>
            {/* MAIN */}
            <View style={{ flex: 1, paddingRight: 15, }}>
              <View style={styles.horizontalLine} >
                
              </View>

              <View style={{ flex: 1, position: 'relative', justifyContent: 'center' }}>
                <TouchableOpacity activeOpacity={0.9}>
                  <View style={{flexGrow:1,justifyContent:'center'}}>
                    <Animated.View
                      style={[
                        styles.PowerbtnBorder,
                        {
                          transform: [{ scale: animateSize }], // Use transform with scale instead of width and height
                        },
                      ]}
                    >
                    </Animated.View>
                  </View>
                  <View style={{ flex: 1, position: 'absolute', width: '100%', height: '100%', justifyContent: 'center' }}>
                    <View style={styles.PowerbtnBorder2}>
                      <View style={styles.PowerbtnBorder3}>
                        <Ionicons name='power-outline' color={'white'} size={80} />

                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={{ justifyContent: 'flex-end', paddingBottom: 30 }}>
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
    marginTop: 32,
  },
  PowerbtnBorder: {
    width: '70%',
    height: '70%',
    maxHeight: 260,
    maxWidth: 260,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 1000,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 20,
      width: 20,
    },
    elevation: 10,
    shadowRadius: 5,
    marginStart: 'auto',
    marginRight: 'auto',
    borderColor: '#F8F8F8',
    borderWidth: 1,
    backgroundColor: '#F8F8F8',

  },
  PowerbtnBorder2: {
    width: '57%',
    height: '57%',
    maxHeight: 260,
    maxWidth: 260,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 1000,
    shadowColor: 'black',
    shadowOpacity: 1,
    shadowOffset: {
      height: 20,
      width: 20,
    },
    elevation: 10,
    shadowRadius: -10,
    marginStart: 'auto',
    marginRight: 'auto',
    backgroundColor: '#F77718',
  },
  PowerbtnBorder3: {
    width: '70%',
    height: '70%',
    maxHeight: 260,
    maxWidth: 260,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 1000,
    shadowColor: 'black',
    marginStart: 'auto',
    marginRight: 'auto',
    backgroundColor: '#FF6C3B'
  }
});