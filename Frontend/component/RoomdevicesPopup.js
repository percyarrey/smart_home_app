import React, { useState } from 'react';
import { View, Text, TextInput, Button, Modal, StyleSheet } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons'

import { Picker } from '@react-native-picker/picker';


const RoomdevicesPopup = ({ visible, onSave, onCancel }) => {
    const roomdevicesIcons = {
        Television:'ios-tv-outline',
        Laptop:'ios-laptop-outline',
        Smartphone:'ios-phone-portrait-outline',
        Speaker:'ios-volume-high-outline',
        Camera:'ios-camera-outline',
        Microwave:'ios-restaurant-outline',
        Refrigerator:'ios-snow-outline',
        WashingMachine:'ios-water-outline',
        Others: 'ios-albums-outline',
      };
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');

    const handleSave = () => {
        if (name && category) {
            var icon = roomdevicesIcons[category]
            console.log(icon)
            onSave({ name, icon });
            setName('');
            setCategory('');
        }else{
            setShowError(true)
        }
    };

    const handleCancel =()=>{
        setShowError(false)
        onCancel()
    }

    const [showError, setShowError] = useState(false);

    return (
        <Modal visible={visible} animationType="fade" transparent={true} >
            <View style={styles.container}>
                <View style={styles.dialog}>
                    <Text style={styles.title}>Add a Device</Text>

                    {showError && <Text style={styles.errorText}>Please fill the Form</Text>}

                    <TextInput
                        style={styles.input}
                        placeholder="Name of Device"
                        value={name}
                        onChangeText={setName}
                    />
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ alignItems: 'center', justifyContent: 'center', width: '10%' }}>
                            {category && <Ionicons name={roomdevicesIcons[category]} size={24} color="#FF6C3B" />}
                        </View>
                        <Picker
                            style={{ width: '90%' }}
                            selectedValue={category}
                            onValueChange={setCategory}
                        >
                            <Picker.Item label="Device Type" value="" />
                            {
                                Object.entries(roomdevicesIcons).map((e,index)=>{
                                   keys = Object.keys(roomdevicesIcons)
                                    
                                    return(
                                        (<Picker.Item key={index} label={keys[index]} value={keys[index]} />)
                                    )
                                })
                            }
                        </Picker>
                    </View>
                    <View style={styles.buttonsContainer}>
                        <Button title="Cancel" onPress={handleCancel} color="#E07878" />
                        <Button title="Add" onPress={handleSave} color="#FF6C3B" />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    dialog: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    icon: {
        marginLeft: 5,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
});

export default RoomdevicesPopup;