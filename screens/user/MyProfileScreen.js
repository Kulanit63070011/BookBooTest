import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { myProfileStyles } from '../../style/user/MyProfileStyle';

const MyProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState({
    id: 1,
    displayName: 'John Doe',
    email: 'john.doe@example.com',
    profileImage: require('../../assets/images/human.png'), // Replace with your image source
  });

  useEffect(() => {
    // Fetch user details from your authentication system or API
    // For now, use a static user object as an example
  }, []);

  const handleEditProfile = () => {
    navigation.navigate('EditProfileScreen');
  };

  const handleLogout = () => {
    navigation.navigate('LoginScreen');
  };

  return (
    <View style={myProfileStyles.container}>
      <View style={myProfileStyles.profileContainer}>
        <Image source={user.profileImage} style={myProfileStyles.profileImage} />
        <Text style={myProfileStyles.displayName}>{user.displayName}</Text>
        <Text style={myProfileStyles.email}>{user.email}</Text>
      </View>
      <TouchableOpacity style={myProfileStyles.editProfileButton} onPress={handleEditProfile}>
        <Text>Edit Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={myProfileStyles.logoutButton} onPress={handleLogout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MyProfileScreen;