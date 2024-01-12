// FloatingButton.js
import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const FloatingButton = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('CreateMyBook');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={handlePress} // Add this onPress handler
      >
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  container: {
    position: 'absolute',
    bottom: 70, // Adjust the position as needed
    right: 16,
    zIndex: 2, // Set a higher zIndex to appear above Bottom Navigator
  },
  button: {
    backgroundColor: 'red',
    width: 80,
    height: 80,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 40,
  },
};

export default FloatingButton;
