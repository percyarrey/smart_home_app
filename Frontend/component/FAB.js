import React, { useState } from 'react';
import { View, TouchableOpacity, Modal, StyleSheet, Button, } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import PopupDialog from './RoomPopup';
import RoomPopup from './RoomPopup';
const styles = StyleSheet.create({
  fabContainer: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
  fabButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FF6C3B',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 10,
  },
});



const FloatingButton = ({onSave}) => {
  const [popupVisible, setPopupVisible] = useState(false);
  const handleSave = (data) => {
    setPopupVisible(false);
    onSave(data)
  };

  const handleCancel = () => {
    setPopupVisible(false);
  };


  return (
    <View style={styles.fabContainer}>
      <TouchableOpacity
        style={styles.fabButton}
        onPress={() => setPopupVisible(true)}
      >
        <RoomPopup
          visible={popupVisible}
          onSave={handleSave}
          onCancel={handleCancel}
        />
        <Ionicons name="add" color="white" size={35} />
      </TouchableOpacity>
        
    </View>
  );
};

export default FloatingButton;