import React, { useState } from 'react';
import { View, Text, TextInput, Button, Modal, StyleSheet } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons'

import { Picker } from '@react-native-picker/picker';


const RoomPopup = ({ visible, onSave, onCancel }) => {
    const roomIcons = {
        Living_Room: 'ios-home-outline',
        Bedroom: 'ios-bed-outline',
        Kitchen: 'ios-restaurant-outline',
        Bathroom: 'ios-water-outline',
        Corridor: 'ios-walk-outline',
        Others: 'ios-albums-outline',
      };

    const [name, setName] = useState('');
    const [category, setCategory] = useState('');

    const handleSave = () => {
        if (name && category) {
            var icon = roomIcons[category]
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
        <Modal visible={visible} animationType="fade" transparent={true}>
            <View style={styles.container}>
                <View style={styles.dialog}>
                    <Text style={styles.title}>Add a Room</Text>

                    {showError && <Text style={styles.errorText}>Please fill the Form</Text>}

                    <TextInput
                        style={styles.input}
                        placeholder="Name of room"
                        value={name}
                        onChangeText={setName}
                    />
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ alignItems: 'center', justifyContent: 'center', width: '10%' }}>
                            {category && <Ionicons name={roomIcons[category]} size={24} color="#FF6C3B" />}
                        </View>
                        <Picker
                            style={{ width: '90%' }}
                            selectedValue={category}
                            onValueChange={setCategory}
                        >
                            <Picker.Item label="Room Type" value="" />
                            <Picker.Item label="Living Room" value="Living_Room" />
                            <Picker.Item label="Bedroom" value="Bedroom" />
                            <Picker.Item label="Kitchen" value="Kitchen" />
                            <Picker.Item label="Bathroom" value="Bathroom" />
                            <Picker.Item label="Corridor" value="Corridor" />
                            <Picker.Item label="Others" value="others" />
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

export default RoomPopup;