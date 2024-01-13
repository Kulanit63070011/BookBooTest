import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput } from 'react-native';
import { createCommuStyles } from '../../style/community/CrerateCommuStyle';
import BottomNavigator from '../../navigation/BottomNavigator';

const CreateCommunityScreen = ({ visible, communityDetails, onClose, onDelete, onSave }) => {
  const [updatedDetails, setUpdatedDetails] = useState({
    name: communityDetails ? communityDetails.name : '',
    description: communityDetails ? communityDetails.description : '',
    category: communityDetails ? communityDetails.category : '',
    coverImage: communityDetails ? communityDetails.coverImage : '',
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
    <View style={createCommuStyles.modalContainer}>
      <View style={createCommuStyles.topBar}>
        {/* Your top bar components */}
      </View>
      <View style={createCommuStyles.modalContent}>
        <Text style={createCommuStyles.label}>Community Image:</Text>
        <TextInput
          style={createCommuStyles.input}
          value={updatedDetails.coverImage}
          onChangeText={(text) => handleInputChange('coverImage', text)}
        />
        <Text style={createCommuStyles.label}>Community Name:</Text>
        <TextInput
          style={createCommuStyles.input}
          value={updatedDetails.name}
          onChangeText={(text) => handleInputChange('name', text)}
        />
        <Text style={createCommuStyles.label}>Category:</Text>
        <TextInput
          style={createCommuStyles.input}
          value={updatedDetails.category}
          onChangeText={(text) => handleInputChange('category', text)}
        />
        <Text style={createCommuStyles.label}>Description:</Text>
        <TextInput
          style={[createCommuStyles.input, { height: 80 }]}
          value={updatedDetails.description}
          onChangeText={(text) => handleInputChange('description', text)}
          multiline={true}
        />
      </View>
      <TouchableOpacity onPress={handleSave} style={createCommuStyles.actionButton}>
        <Text style={createCommuStyles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateCommunityScreen;
