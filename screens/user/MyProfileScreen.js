import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { myProfileStyles } from '../../style/user/MyProfileStyle';
import { auth } from '../../backend/firebase';
import { getDoc } from 'firebase/firestore';
import { doc } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { updateDoc } from 'firebase/firestore';

const MyProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const userAuth = auth.currentUser;

      if (userAuth) {
        const userId = userAuth.uid;
        const userDocRef = doc(getFirestore(), 'users', userId);

        try {
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUser({
              id: userId,
              displayName: userData.displayName || 'Default Display Name',
              email: userData.email || 'Default Email',
              aboutMe: userData.aboutMe || 'Default About Me'
            });
          } else {
            console.error('User document does not exist in Firestore');
          }
        } catch (error) {
          console.error('Error fetching user data from Firestore', error.message);
        }
      } else {
        setUser({
          id: null,
          displayName: 'Default Display Name',
          email: 'Default Email',
          aboutMe: 'Default About Me',  // เพิ่ม aboutMe ที่นี่
        });
      }
    };

    const unsubscribe = auth.onAuthStateChanged(() => {
      fetchUserData();
    });

    return () => unsubscribe();
  }, []);

  if (!user) {
    return (
      <View style={myProfileStyles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const handleLogout = async () => {
    try {
      await auth.signOut();
      console.log('User signed out');
      // นำผู้ใช้ไปยังหน้าล็อกอินหลังจากการล็อกเอาท์สำเร็จ
      navigation.navigate('Welcome');
    } catch (error) {
      console.error('Logout failed', error.message);
    }
  };

  const handleEditProfile = async () => {
    navigation.navigate('EditProfile', {
      visible: true,
      user: {
        id: user.id,
        displayName: user.displayName,
        username: user.username,
        email: user.email,
        aboutMe: user.aboutMe,
      },
      onSave: async (updatedUser) => {
        // ทำการอัพเดท state หรือทำการ refresh หน้าข้อมูล
        setUser(updatedUser);
  
        // เพิ่มการอัพเดทข้อมูลใน Firestore โดยใช้ user.id
        const userDocRef = doc(getFirestore(), 'users', updatedUser.id);
  
        try {
          await updateDoc(userDocRef, {
            displayName: updatedUser.displayName,
            username: updatedUser.username,
            email: updatedUser.email,
            aboutMe: updatedUser.aboutMe,
          });
          console.log('User data updated in Firestore'); // เพิ่มบรรทัดนี้
        } catch (error) {
          console.error('Error updating user data in Firestore', error.message);
        }
      },
      onClose: () => {
        // ปิด Modal
        navigation.navigate('MyProfile');
      },
    });
  };
  
  return (
    <View style={myProfileStyles.container}>
      <View style={myProfileStyles.profileContainer}>
        {/* <Image style={myProfileStyles.profileImage} /> */}
        <Text style={myProfileStyles.displayName}>{user.displayName}</Text>
        <Text style={myProfileStyles.email}>{user.email}</Text>
        <Text style={myProfileStyles.aboutMe}>{user.aboutMe}</Text>
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