import { View, Text, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native'
import React from 'react'
import { themeColors } from '../theme'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import { signUpStyles } from '../style/SignUpStyle';

export default function SignUpScreen() {
  const navigation = useNavigation();
  return (
    <View style={signUpStyles.container}>
      <SafeAreaView>
        <View>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeftIcon size={20} color="white"/>
          </TouchableOpacity>
        </View>
        <View style={signUpStyles.titleContainer}>
          <Text style={signUpStyles.title}>Register</Text>
        </View>
      </SafeAreaView>
      <ScrollView style={signUpStyles.contentContainer}>
        <TouchableOpacity>
          <Image source={require('../assets/images/human.png')} style={signUpStyles.profileImage} />
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
              <Image source={require('../assets/icons/google.png')} style={signUpStyles.socialButtonImage} />
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', justifyContent: 'center', spaceX: 12 }}>
              <TouchableOpacity style={{ padding: 8, backgroundColor: '#f0f0f0', borderRadius: 20 }}>
                <Image source={require('../assets/icons/apple.png')} style={{ width: 40, height: 40 }} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{paddingBottom: 30}}>
            <TouchableOpacity style={signUpStyles.signUpButton}>
              <Text style={signUpStyles.signUpButtonText}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

