import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, TextInput, ScrollView, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const EditProfileScreen = ({ route }) => {
  const { user, onClose, setUser } = route.params;
  const [displayName, setDisplayName] = useState(user.displayName);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [aboutMe, setAboutMe] = useState(user.aboutMe);

  const handleSaveEdit = async () => {
    if (user.id) {
      const userDocRef = doc(getFirestore(), 'users', user.id);
  
      try {
        await setDoc(userDocRef, {
          displayName,
          username: username || '',
          email,
          aboutMe,
        });
  
        console.log('User data updated in Firestore');
  
        const updatedUserSnapshot = await getDoc(userDocRef);
        const updatedUser = updatedUserSnapshot.data();
        setUser(updatedUser);
  
        onClose();
      } catch (error) {
        console.error('Error updating user data in Firestore', error.message);
      }
    }
  };  

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={() => onSaveUser()}>
          <Text>Save</Text>
        </Pressable>
      ),
    });
  }, [navigation]);

  return (
    <ScrollView>
      <Pressable>
        <Image source={require('../../assets/images/human.png')} style={styles.profileImage} />
      </Pressable>
      <View style={styles.inputContainer}>
        <View style={styles.inputBox}>
          <Text style={styles.inputLabel}>Display Name</Text>
          <TextInput
            style={styles.textInput}
            value={displayName}
            onChangeText={(text) => setDisplayName(text)}
            placeholder='Enter Name'
          />
        </View>
        <View style={styles.inputBox}>
          <Text style={styles.inputLabel}>Username</Text>
          <TextInput
            style={styles.textInput}
            value={username}
            onChangeText={(text) => setUsername(text)}
            placeholder='Enter Username'
          />
        </View>
        <View style={styles.inputBox}>
          <Text style={styles.inputLabel}>Email Address</Text>
          <TextInput
            style={styles.textInput}
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder='Enter Email'
          />
        </View>
        <View style={styles.inputBox}>
          <Text style={styles.inputLabel}>About me</Text>
          <TextInput
            style={[styles.textInput, { height: 80 }]}
            value={aboutMe}
            onChangeText={(text) => setAboutMe(text)}
            placeholder='Enter detail'
            multiline={true}
          />
        </View>
        <View style={{ paddingBottom: 30 }}>
          <Pressable style={styles.signUpButton} onPress={handleSaveEdit}>
            <Text style={styles.signUpButtonText}>
              Save Edit
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 50,
    alignSelf: 'center',
    marginTop: 20,
  },
  inputContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  inputBox: {
    marginBottom: 20,
  },
  inputLabel: {
    fontFamily: 'Arial',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  textInput: {
    backgroundColor: '#EAF6FF',
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    fontFamily: 'Arial',
    borderWidth: 1,  // เพิ่มเส้นกรอบ
    borderColor: 'blue', // สีเส้นกรอบ
  },
  signUpButton: {
    backgroundColor: '#E21E1E',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 30,
  },
  signUpButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    fontFamily: 'Arial',
  },
});

export default EditProfileScreen;
