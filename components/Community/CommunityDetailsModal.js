import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CommunityDetailsModal = ({ visible, communityDetails, onClose, onDelete, onJoinCommunity }) => {
  if (!visible || !communityDetails) {
    return null;
  }

  const { name, description } = communityDetails;
  const [updatedDetails, setUpdatedDetails] = useState({
    name,
    description,
  });

  const handleInputChange = (property, value) => {
    setUpdatedDetails({
      ...updatedDetails,
      [property]: value,
    });
  };

  const handleJoinCommunity = () => {
    onJoinCommunity(updatedDetails);
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Icon name="close" size={30} color="white" />
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View style={styles.modalContent}>
            <Text style={styles.label}>Community Image:</Text>
            <TextInput
              style={styles.input}
              value={updatedDetails.name}
              onChangeText={(text) => handleInputChange('name', text)}
            />

            <Text style={styles.label}>Community Name:</Text>
            <TextInput
              style={styles.input}
              value={updatedDetails.name}
              onChangeText={(text) => handleInputChange('name', text)}
            />

            <Text style={styles.label}>Description:</Text>
            <TextInput
              style={[styles.input, { height: 80 }]}
              value={updatedDetails.description}
              onChangeText={(text) => handleInputChange('description', text)}
              multiline={true}
            />
          </View>
        </ScrollView>
        <TouchableOpacity onPress={handleJoinCommunity} style={styles.actionButton}>
          <Text style={styles.buttonText}>Join Community</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  topBar: {
    paddingTop: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  closeButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  modalContent: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 5,
  },
  actionButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default CommunityDetailsModal;
