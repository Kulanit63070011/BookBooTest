import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { themeColors } from '../theme';
import { useNavigation } from '@react-navigation/native';
import WelcomeStyle from '../style/WelcomeStyle';

export default function WelcomeScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: themeColors.bg }}>
      <View style={WelcomeStyle.container}>
        <View style={WelcomeStyle.titleContainer}>
          <Text style={WelcomeStyle.title}>Book</Text>
          <Text style={WelcomeStyle.title}>Boo</Text>
        </View>
        <View style={WelcomeStyle.imageContainer}>
          <Image source={require("../assets/images/signup.png")} style={WelcomeStyle.image} />
        </View>
        <View style={WelcomeStyle.buttonContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={WelcomeStyle.button}>
            <Text style={WelcomeStyle.buttonText}>Log in</Text>
          </TouchableOpacity>
          <View style={WelcomeStyle.loginContainer}>
            <Text style={WelcomeStyle.loginText}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={WelcomeStyle.loginLink}> Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
