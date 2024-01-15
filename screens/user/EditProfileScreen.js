import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import { signUpStyles } from '../../style/user/SignUpStyle';

const EditProfileScreen = ({ visible, communityDetails, onClose, onDelete, onSave }) => {
  const navigation = useNavigation();
  return (
    <View>
      <ScrollView >
        <TouchableOpacity>
          <Image source={require('../../assets/images/human.png')} style={signUpStyles.profileImage} />
        </TouchableOpacity>
        <View style={signUpStyles.inputContainer}>
          <View style={{ marginBottom: 20 }}>
            <Text style={signUpStyles.inputLabel}>Display Name</Text>
            <TextInput
              style={signUpStyles.textInput}
              value="Kulanit Cool"
              placeholder='Enter Name'
            />
          </View>
          <View style={{ marginBottom: 20 }}>
            <Text style={signUpStyles.inputLabel}>Username</Text>
            <TextInput
              style={signUpStyles.textInput}
              value="John555"
              placeholder='Enter Username'
            />
          </View>
          <View style={{ marginBottom: 20 }}>
            <Text style={signUpStyles.inputLabel}>Email Address</Text>
            <TextInput
              style={signUpStyles.textInput}
              value="cool@gmail.com"
              placeholder='Enter Email'
            />
          </View>
          <View style={{ marginBottom: 20 }}>
            <Text style={signUpStyles.inputLabel}>Password</Text>
            <TextInput
              style={signUpStyles.textInput}
              secureTextEntry
              value="test12345"
              placeholder='Enter Password'
            />
          </View>
          <View style={{ marginBottom: 20 }}>
            <Text style={signUpStyles.inputLabel}>Password Confirm</Text>
            <TextInput
              style={signUpStyles.textInput}
              secureTextEntry
              value="test12345"
              placeholder='Enter Password'
            />
          </View>
          <View style={{ marginBottom: 20 }}>
            <Text style={signUpStyles.inputLabel}>About me</Text>
            <TextInput
              style={[signUpStyles.textInput, { height: 80 }]}
              value="yoooooooooooo"
              placeholder='Enter detail'
              multiline={true}
            />
          </View>
          <View style={[signUpStyles.socialButtonContainer, { marginBottom: 20 }]}>
            <TouchableOpacity style={signUpStyles.socialButton}>
              <Image source={require('../../assets/icons/apple.png')} style={signUpStyles.socialButtonImage} />
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', justifyContent: 'center', spaceX: 12 }}>
              <TouchableOpacity style={{ padding: 8, backgroundColor: '#f0f0f0', borderRadius: 20 }}>
                <Image source={require('../../assets/icons/apple.png')} style={{ width: 40, height: 40 }} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ paddingBottom: 30 }}>
            <TouchableOpacity style={signUpStyles.signUpButton}>
              <Text style={signUpStyles.signUpButtonText}>
                Save Edit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  )
};

export default EditProfileScreen;