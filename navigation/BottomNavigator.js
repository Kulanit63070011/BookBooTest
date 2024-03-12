import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Pressable, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BottomNavigator = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Pressable style={styles.navItem} onPress={() => navigation.navigate('AllCommunity')}>
                <Image source={require('../assets/images/human.png')} style={styles.icon} />
                <Text style={styles.navText}>Community</Text>
            </Pressable>
            <Pressable style={styles.navItem} onPress={() => navigation.navigate('MyCommunity')}>
                <Image source={require('../assets/images/human.png')} style={styles.icon} />
                <Text style={styles.navText}>Market</Text>
            </Pressable>
            <Pressable style={styles.navItem} onPress={() => navigation.navigate('AllChat')}>
                <Image source={require('../assets/images/human.png')} style={styles.icon} />
                <Text style={styles.navText}>Chat</Text>
            </Pressable>
            <Pressable style={styles.navItem} onPress={() => navigation.navigate('MyProfile')}>
                <Image source={require('../assets/images/human.png')} style={styles.icon} />
                <Text style={styles.navText}>Profile</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        backgroundColor: '#7743DB',
        bottom: 0, left: 0, right: 0, zIndex: 1
    },
    navItem: {
        flex: 1,
        height: 65,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: 35,
        height: 35,
        alignSelf: 'center',
    },
    navText: {
        alignSelf: 'center',
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default BottomNavigator;