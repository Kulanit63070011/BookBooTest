// AppNavigation.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/user/WelcomeScreen';
import SignUpScreen from '../screens/user/SignUpScreen';
import CustomHeader from './CustomHeader';
import MyBookShelfScreen from '../screens/bookshelf/MyBookShelfScreen';
import CreateMyBookScreen from '../screens/bookshelf/CreateMyBookScreen';
import LoginScreen from '../screens/user/LoginScreen';
import CreateCommunityScreen from '../screens/community/CreateCommunityScreen';
import EditCommunityScreen from '../screens/community/EditCommunityScreen';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='EditCommunity'
        screenOptions={({ route }) => ({
          header: ({ scene }) => {
            const { name } = route;
            // Show custom header for "SignUp" screen
            // if (name === 'MyBookShelf') {
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
        <Stack.Screen
          name="MyBookShelf"
          options={{ headerShown: false }}
          component={MyBookShelfScreen}
        />
        <Stack.Screen
          name="CreateMyBook"
          options={{ headerShown: true }}
          component={CreateMyBookScreen}
        />
        <Stack.Screen
          name="CreateCommunity"
          options={{ headerShown: true }}
          component={CreateCommunityScreen}
        />
        <Stack.Screen
          name="EditCommunity"
          options={{ headerShown: true }}
          component={EditCommunityScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
