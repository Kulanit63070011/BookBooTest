import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, TextInput } from 'react-native';

const CreateMyBookScreen = ({ visible, bookDetails, onClose, onDelete, onSave }) => {
  const [updatedDetails, setUpdatedDetails] = useState({
    // Set initial state based on bookDetails or provide default values
    title: bookDetails ? bookDetails.title : '',
    author: bookDetails ? bookDetails.author : '',
    purchaseDate: bookDetails ? bookDetails.purchaseDate : '',
    coverImage: bookDetails ? bookDetails.coverImage : '',
  });

  const handleInputChange = (property, value) => {
    setUpdatedDetails({
      ...updatedDetails,
      [property]: value,
    });
  };

  const handleSave = () => {
    onSave(updatedDetails);
  };

  return (
      <View style={styles.modalContainer}>
        <View style={styles.topBar}>
        </View>
        <View style={styles.modalContent}>
          <Text style={styles.label}>Cover Image:</Text>
          <TextInput
            style={styles.input}
            value={updatedDetails.coverImage}
            onChangeText={(text) => handleInputChange('coverImage', text)}
          />
          <Text style={styles.label}>Book Title:</Text>
          <TextInput
            style={styles.input}
            value={updatedDetails.title}
            onChangeText={(text) => handleInputChange('title', text)}
          />
          <Text style={styles.label}>Type:</Text>
          <TextInput
            style={styles.input}
            value={updatedDetails.type}
            onChangeText={(text) => handleInputChange('type', text)}
          />
          <Text style={styles.label}>Author:</Text>
          <TextInput
            style={styles.input}
            value={updatedDetails.author}
            onChangeText={(text) => handleInputChange('author', text)}
          />
          <Text style={styles.label}>Purchase Date:</Text>
          <TextInput
            style={styles.input}
            value={updatedDetails.purchaseDate}
            onChangeText={(text) => handleInputChange('purchaseDate', text)}
          />
          <Text style={styles.label}>About:</Text>
          <TextInput
            style={[styles.input, { height: 80 }]}
            value={updatedDetails.aboutBook}
            onChangeText={(text) => handleInputChange('aboutBook', text)}
            multiline={true}
          />
        </View>
        <TouchableOpacity onPress={handleSave} style={styles.actionButton}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
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
    width: '50%',
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default CreateMyBookScreen;
