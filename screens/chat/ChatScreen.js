import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, FlatList } from 'react-native';
import { chatStyles } from '../../style/chat/ChatStyle';
import { db } from '../../backend/firebase';
import { getAuth } from 'firebase/auth';
import { useNavigation, useRoute } from '@react-navigation/native';
import { collection, addDoc, setDoc, query, doc, onSnapshot, orderBy, getDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

const ChatScreen = () => {
  const route = useRoute();
  const partnerId = route.params.partnerId;
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [currentUser, setCurrentUser] = useState(null); // สร้าง state เพื่อเก็บข้อมูลของผู้ใช้ปัจจุบัน
  const navigation = useNavigation();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user); // เมื่อมีการเปลี่ยนแปลงในการเข้าสู่ระบบ ให้เก็บข้อมูลผู้ใช้ปัจจุบันไว้ใน state
      if (!user) {
        navigation.navigate('Login');
      }
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (!currentUser) return;
  
    const auth = getAuth();
    const chatRoomId1 = currentUser.uid + '_' + partnerId;
    const chatRoomId2 = partnerId + '_' + currentUser.uid;
    const chatRoomRef1 = doc(db, 'chatRooms', chatRoomId1);
    const chatRoomRef2 = doc(db, 'chatRooms', chatRoomId2);
  
    const messagesQuery1 = query(
      collection(db, 'chatRooms', chatRoomId1, 'messages'),
      orderBy('timestamp', 'asc')
    );
  
    const messagesQuery2 = query(
      collection(db, 'chatRooms', chatRoomId2, 'messages'),
      orderBy('timestamp', 'asc')
    );
  
    const unsubscribeMessages1 = onSnapshot(messagesQuery1, (snapshot) => {
      const messagesData = snapshot.docChanges().filter(change => change.type === 'added').map(change => change.doc.data());
      console.log("Messages from chatRoom1:", messagesData);
      setMessages(prevMessages => prevMessages.concat(messagesData));
    });
  
    const unsubscribeMessages2 = onSnapshot(messagesQuery2, (snapshot) => {
      const messagesData = snapshot.docChanges().filter(change => change.type === 'added').map(change => change.doc.data());
      console.log("Messages from chatRoom2:", messagesData);
      setMessages(prevMessages => prevMessages.concat(messagesData));
    });
  
    return () => {
      unsubscribeMessages1();
      unsubscribeMessages2();
    };
  }, [currentUser, partnerId]);  

  const handleSend = async () => {
    if (inputText.trim()) {
      try {
        const auth = getAuth();
        const memberId = currentUser.uid;
        const chatRoomId = memberId + '_' + partnerId;
        const chatRoomRef = doc(db, 'chatRooms', chatRoomId);
        const chatRoomSnapshot = await getDoc(doc(db, 'chatRooms', chatRoomId));
  
        if (!chatRoomSnapshot.exists()) {
          console.log('Creating a new chat room');
          const newChatRoomRef = doc(db, 'chatRooms', chatRoomId);
          await setDoc(newChatRoomRef, {
            members: [memberId, partnerId],
          });
        }
  
        await addDoc(collection(db, 'chatRooms', chatRoomId, 'messages'), {
          text: inputText,
          senderId: memberId,
          receiverId: partnerId,
          timestamp: new Date().toISOString(),
        });
  
        setInputText('');
      } catch (error) {
        console.error('Error sending message:', error.message);
      }
    }
  };
  
  const renderItem = ({ item }) => (
    <View style={chatStyles.messageContainer}>
      <View style={chatStyles.messageContent}>
        <Text style={chatStyles.messageTime}>{item.timestamp}</Text>
        {item.senderId === currentUser.uid ? (
          <Text style={chatStyles.messageText}>You: {item.text}</Text>
        ) : (
          <Text style={chatStyles.messageText}>User 2: {item.text}</Text>
        )}
      </View>
    </View>
  );

  const sortedMessages = messages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

  return (
    <View style={chatStyles.container}>
      <FlatList
        data={sortedMessages}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        inverted={true}
      />
      <View style={chatStyles.inputContainer}>
        <TextInput
          style={chatStyles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type your message..."
        />
        <Pressable style={chatStyles.sendButton} onPress={handleSend}>
          <Text style={chatStyles.sendButtonText}>Send</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ChatScreen;
