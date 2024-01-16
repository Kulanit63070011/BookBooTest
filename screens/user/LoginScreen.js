import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import { loginStyles } from '../../style/user/LoginStyle';
import { auth } from '../../backend/firebase';
import { signInWithEmailAndPassword } from '../../backend/firebase';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      // ทำการล็อกอินด้วย Firebase Authentication
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Login successful');
      navigation.navigate('MyProfile')
      // ทำสิ่งที่ต้องการหลังจากล็อกอิน
    } catch (error) {
      console.error('Login failed', error.message);
      // จัดการข้อผิดพลาด
    }
  };

  return (
    <View style={loginStyles.container}>
      <SafeAreaView>
        <View style={loginStyles.titleContainer}>
          <Text style={loginStyles.title}>Log in</Text>
        </View>
      </SafeAreaView>
      <View style={loginStyles.contentContainer}>
        <View style={loginStyles.inputContainer}>
          <View style={{ marginBottom: 20 }}>
            <Text style={loginStyles.inputLabel}>Email</Text>
            <TextInput
              style={loginStyles.textInput}
              value={email}
              placeholder='Enter Email'
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          <View style={{ marginBottom: 35 }}>
            <Text style={loginStyles.inputLabel}>Password</Text>
            <TextInput
              style={loginStyles.textInput}
              secureTextEntry
              value={password}
              placeholder='Enter Password'
              onChangeText={(text) => setPassword(text)}
            />
          </View>
          <View style={{ marginBottom: 20 }}>
            <TouchableOpacity style={loginStyles.signUpButton} onPress={handleLogin}>
              <Text style={loginStyles.signUpButtonText}>
                Log in
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={loginStyles.text}>
          Or
        </Text>
        <View style={[loginStyles.socialButtonContainer, { paddingBottom: 20 }]}>
          <View style={{ flexDirection: 'row', justifyContent: 'center', spaceX: 12 }}>
            <TouchableOpacity style={loginStyles.socialButton}>
              <Image source={require('../../assets/icons/google.png')} style={loginStyles.socialButtonImage} />
            </TouchableOpacity>
            <TouchableOpacity style={{ padding: 8, backgroundColor: '#f0f0f0', borderRadius: 20 }}>
              <Image source={require('../../assets/icons/apple.png')} style={{ width: 40, height: 40 }} />
            </TouchableOpacity>
            <TouchableOpacity style={{ padding: 8, backgroundColor: '#f0f0f0', borderRadius: 20 }}>
              <Image source={require('../../assets/icons/facebook.png')} style={{ width: 40, height: 40 }} />
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

    </View>
  )
}