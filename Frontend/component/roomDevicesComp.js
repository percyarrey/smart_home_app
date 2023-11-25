import { Keyboard, StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'

/* ICONS */
import { Ionicons } from '@expo/vector-icons';


/* DATABASE */
import { updateData } from '../utils/crudRoomDevices';

/* SLIDER */
import Slider from '@react-native-community/slider';

export default function RoomDevicesComp({ activeItem, otherItems, setRoomItems }) {
    /* KEYBOARD BEHAVIOR */
    // Create a state variable to track the keyboard visibility
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardVisible(true);
        });
        const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardVisible(false);
        });

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

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
    
    /* HANDLE POWER PRESS */
    const handlePower = async () => {
        if (activeItem.power === 0) {
            activeItem.power = 50
            setSliderValue(50)
            setRoomItems(prev=>([
                activeItem,
                ...otherItems
            ]))
            updateData(activeItem.id, activeItem)
        }
        else {
            activeItem.power = 0
            setSliderValue(0)
            /* setRoomItems(prev=>([
                activeItem,
                ...otherItems
            ])) */
            updateData(activeItem.id, activeItem)
        }
    }


    /* HANDLE SLIDING */
    useEffect(()=>{
        setSliderValue(activeItem.power)
    },[activeItem])

    const [sliderValue,setSliderValue] = useState(activeItem.power)
    const handleSliderChange = async (value) => {
        value = Math.ceil(value)
        setSliderValue(value)
    };
    const handleSliderComplete = async (value) => {
        value = Math.ceil(value)
        activeItem.power = value
        updateData(activeItem.id, activeItem)
    };

    return (
        <View style={{ flex: 1 }}>
            {/* POWER BTN */}
            <View style={{ flex: 1, position: 'relative', justifyContent: 'center' }}>
                {
                    !isKeyboardVisible &&
                    <TouchableOpacity activeOpacity={0.9} onPress={handlePower}>
                        <View style={{ flexGrow: 1, justifyContent: 'center' }}>
                            <Animated.View
                                style={[
                                    styles.PowerbtnBorder,
                                    {
                                        transform: [{ scale:animateSize }], // Use transform with scale instead of width and height
                                        elevation:activeItem.power ? 0 : 10,
                                        backgroundColor:activeItem.power?'white':'#F8F8F8',
                                        shadowOpacity:activeItem.power ? 0 : 0.2,
                                    },
                                ]}
                            >
                            </Animated.View>
                        </View>
                        <View style={{ flex: 1, position: 'absolute', width: '100%', height: '100%', justifyContent: 'center' }}>
                            <View style={[styles.PowerbtnBorder2,{backgroundColor:activeItem.power? '#633321':'#F77718'}]}>
                                <View style={[styles.PowerbtnBorder3,{backgroundColor:activeItem.power? '#673420':'#FF6C3B'}]}>
                                    <Ionicons name='power-outline' color={activeItem.power ? '#FF6C3B' : 'white'} size={80} />

                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                }
            </View>

            {/* SLIDER */}
            <View style={{ justifyContent: 'flex-end', }}>

                <View style={{ opacity: activeItem.power ? 1 : 0.7 }}>
                    <Text style={{ fontFamily: 'rmedium', color: activeItem.power ? '#FF6C3B' : '#C4C4C4', marginLeft: 15 }}>POWER</Text>
                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', }}>
                        <Slider
                            style={{ flexGrow: 1, margin: 0, padding: 0 }}
                            minimumValue={1}
                            maximumValue={99}
                            value={activeItem.power}
                            onValueChange={handleSliderChange}
                            minimumTrackTintColor='#FF6C3B'
                            onSlidingComplete={handleSliderComplete}
                            thumbTintColor={activeItem.power ? '#FF6C3B' : '#C4C4C4'}
                            disabled={activeItem.power === 0}
                        />
                        <Text style={{ fontSize: 30, color: activeItem.power ? 'black' : '#C4C4C4' }}>{sliderValue}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    PowerbtnBorder: {
        width: '70%',
        height: '77%',
        maxHeight: 260,
        maxWidth: 260,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 1000,
        shadowColor: 'black',
        shadowOffset: {
            height: 20,
            width: 20,
        },
        shadowRadius: 5,
        marginStart: 'auto',
        marginRight: 'auto',
        borderColor: '#F8F8F8',
        borderWidth: 1,
        
    },
    PowerbtnBorder2: {
        width: '57%',
        height: '63%',
        maxHeight: 215,
        maxWidth: 215,
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
    }
});