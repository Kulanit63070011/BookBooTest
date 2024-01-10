import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import React from 'react'
import { themeColors } from '../theme'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import { loginStyles } from '../style/LoginStyle';
import BottomNavigtor from '../navigation/BottomNavigator';

export default function SignUpScreen() {
  const navigation = useNavigation();
  return (
    <View style={loginStyles.container}>
      <SafeAreaView>
        <View>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeftIcon size={20} color="white" />
          </TouchableOpacity>
        </View>
        <View style={loginStyles.titleContainer}>
          <Text style={loginStyles.title}>Log in</Text>
        </View>
      </SafeAreaView>
      <View style={loginStyles.contentContainer}>
        <View style={loginStyles.inputContainer}>
          <View style={{ marginBottom: 20 }}>
            <Text style={loginStyles.inputLabel}>Username</Text>
            <TextInput
              style={loginStyles.textInput}
              value="Test555"
              placeholder='Enter Username'
            />
          </View>
          <View style={{ marginBottom: 35 }}>
            <Text style={loginStyles.inputLabel}>Password</Text>
            <TextInput
              style={loginStyles.textInput}
              secureTextEntry
              value="test12345"
              placeholder='Enter Password'
            />
          </View>
          <View style={{ marginBottom: 20 }}>
            <TouchableOpacity style={loginStyles.signUpButton}>
              <Text style={loginStyles.signUpButtonText}>
                Log in
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={loginStyles.text}>
          Or
        </Text>
        <View style={[loginStyles.socialButtonContainer, {paddingBottom:20}]}>
          <View style={{ flexDirection: 'row', justifyContent: 'center', spaceX: 12 }}>
            <TouchableOpacity style={loginStyles.socialButton}>
              <Image source={require('../assets/icons/google.png')} style={loginStyles.socialButtonImage} />
            </TouchableOpacity>
            <TouchableOpacity style={{ padding: 8, backgroundColor: '#f0f0f0', borderRadius: 20 }}>
              <Image source={require('../assets/icons/apple.png')} style={{ width: 40, height: 40 }} />
            </TouchableOpacity>
            <TouchableOpacity style={{ padding: 8, backgroundColor: '#f0f0f0', borderRadius: 20 }}>
              <Image source={require('../assets/icons/facebook.png')} style={{ width: 40, height: 40 }} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={loginStyles.loginLinkContainer}>
          <Text style={loginStyles.loginLinkText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={loginStyles.loginLink}> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
      <BottomNavigtor></BottomNavigtor>
    </View>
  )
}