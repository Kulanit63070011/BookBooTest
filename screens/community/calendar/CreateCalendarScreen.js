import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, TextInput, Alert } from 'react-native';
import { createCommuStyles } from '../../../style/community/CreateCommuStyle';
import { db } from '../../../backend/firebase';
import { collection, addDoc, doc, getDoc } from 'firebase/firestore'; // แก้ไขนี้เพื่อใช้งาน doc และ getDoc
import { auth } from '../../../backend/firebase'; // เพิ่มบรรทัดนี้
import { serverTimestamp } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const CreateCalendarScreen = ({ visible, communityDetails, onClose, onDelete, onSave, route }) => {
    const { communityId } = route.params || {}; // รับค่า communityId จาก route.params
    const communityRef = doc(db, 'communities', communityId);
    const navigation = useNavigation();

    console.log('Community Id:', communityId); // เพิ่ม console log เพื่อตรวจสอบค่า communityId

    const [communityData, setCommunityData] = useState(null);

    useEffect(() => {
        if (!communityId) {
            console.error('Community ID is missing');
            return;
        }

        const fetchCommunity = async () => {
            const communityRef = doc(db, 'communities', communityId); // ใช้ communityId เพื่อดึงข้อมูลชุมชน
            const communitySnap = await getDoc(communityRef);
            setCommunityData(communitySnap.data());
        };

        fetchCommunity();
    }, [communityId]);

    console.log('Community Data:', communityData); // เพิ่ม console log เพื่อตรวจสอบค่า communityData

    const [updatedDetails, setUpdatedDetails] = useState({
        name: communityData ? communityData.name : '',
        description: communityData ? communityData.description : '',
        category: communityData ? communityData.category : '',
        coverImage: communityData ? communityData.coverImage : '',
        startDate: '', // เพิ่มใหม่
        startTime: '', // เพิ่มใหม่
        reminderDate: '', // เพิ่มใหม่
        reminderTime: '', // เพิ่มใหม่
    });

    const handleInputChange = (property, value) => {
        setUpdatedDetails({
            ...updatedDetails,
            [property]: value,
        });
    };

    const handleSave = async () => {
        try {
            const user = auth.currentUser;
            if (!user || !communityId) {
                console.error('User or community ID is missing');
                return;
            }
    
            // ตรวจสอบรูปแบบข้อมูลก่อนบันทึก
            if (!isValidFormat(updatedDetails.startDate, updatedDetails.startTime)) {
                Alert.alert('โปรดใส่ข้อมูลในรูปแบบ dd/mm/yyyy และ hh:mm');
                return;
            }
    
            // ตรวจสอบวันที่และเวลาที่ถูกต้อง
            if (!isValidDate(updatedDetails.startDate) || !isValidTime(updatedDetails.startTime)) {
                Alert.alert('วันที่หรือเวลาไม่ถูกต้อง');
                return;
            }
    
            await addDoc(collection(db, 'communities', communityId, 'Calendars'), {
                ...updatedDetails,
                createdBy: user.uid,
                createdAt: serverTimestamp(),
            });
            // Navigate to calendarCommunity with communityId
            navigation.navigate('CalendarCommunity', { communityId });
        } catch (error) {
            console.error('Error adding calendar:', error.message);
        }
    };    
    
    // ตรวจสอบรูปแบบวันที่
    const isValidDate = (dateString) => {
        const [day, month, year] = dateString.split('/');
        const date = new Date(year, month - 1, day);
        return date.getDate() === parseInt(day, 10) && date.getMonth() + 1 === parseInt(month, 10) && date.getFullYear() === parseInt(year, 10);
    };
    
    // ตรวจสอบรูปแบบเวลา
    const isValidTime = (timeString) => {
        const [hours, minutes] = timeString.split(':');
        return parseInt(hours, 10) >= 0 && parseInt(hours, 10) < 24 && parseInt(minutes, 10) >= 0 && parseInt(minutes, 10) < 60;
    };    

    const isValidFormat = (dateString, timeString) => {
        const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
        const timePattern = /^\d{2}:\d{2}$/;
    
        return datePattern.test(dateString) && timePattern.test(timeString);
    };
    
    return (
        <View style={createCommuStyles.modalContainer}>
            <View style={createCommuStyles.topBar}>
            </View>
            <View style={createCommuStyles.modalContent}>
                <Text style={createCommuStyles.label}>ชื่อกิจกรรม:</Text>
                <TextInput
                    style={createCommuStyles.input}
                    value={updatedDetails.name}
                    onChangeText={(text) => handleInputChange('name', text)}
                />
                <Text style={createCommuStyles.label}>วันที่เริ่มกิจกรรม:</Text>
                <TextInput
                    style={createCommuStyles.input}
                    value={updatedDetails.startDate}
                    onChangeText={(text) => handleInputChange('startDate', text)}
                />
                <Text style={createCommuStyles.label}>เวลาเริ่มกิจกรรม:</Text>
                <TextInput
                    style={createCommuStyles.input}
                    value={updatedDetails.startTime}
                    onChangeText={(text) => handleInputChange('startTime', text)}
                />
                <Text style={createCommuStyles.label}>รายละเอียด:</Text>
                <TextInput
                    style={[createCommuStyles.input, { height: 80 }]}
                    value={updatedDetails.description}
                    onChangeText={(text) => handleInputChange('description', text)}
                    multiline={true}
                />
                <Text style={createCommuStyles.label}>วันที่แจ้งเตือน:</Text>
                <TextInput
                    style={[createCommuStyles.input, { height: 80 }]}
                    value={updatedDetails.reminderDate}
                    onChangeText={(text) => handleInputChange('reminderDate', text)}
                    multiline={true}
                />
                <Text style={createCommuStyles.label}>เวลาแจ้งเตือน:</Text>
                <TextInput
                    style={[createCommuStyles.input, { height: 80 }]}
                    value={updatedDetails.reminderTime}
                    onChangeText={(text) => handleInputChange('reminderTime', text)}
                    multiline={true}
                />
            </View>
            <Pressable onPress={handleSave} style={createCommuStyles.actionButton}>
                <Text style={createCommuStyles.buttonText}>สร้าง</Text>
            </Pressable>
        </View>
    );
};

export default CreateCalendarScreen;