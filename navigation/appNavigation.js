// AppNavigation.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import CustomHeader from './CustomHeader';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Welcome'
        screenOptions={({ route }) => ({
          header: ({ scene }) => {
            const { name } = route;
            // Show custom header for "SignUp" screen
            // if (name === 'SignUp') {
            //   return <CustomHeader title={name} />;
            // }

            // Hide title for "Login" screen
            if (name === 'Login' || 'SignUp') {
              return <CustomHeader title="" />;
            }

            // Default behavior for other screens
            return <CustomHeader title={name} />;
          },
          
          headerShown: true,
        })}
      >
        <Stack.Screen
          name="Welcome"
          options={{ headerShown: false }}
          component={WelcomeScreen}
        />
        <Stack.Screen
          name="Login"
          options={{ headerShown: true }}
          component={LoginScreen}
        />
        <Stack.Screen
          name="SignUp"
          options={{ title: 'Sign Up' }}
          component={SignUpScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
