import React, { useState } from 'react';
import { View, Text, Pressable, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../backend/firebase';
import { createMyBookStyles } from '../../style/bookshelf/CreateMyBookStyle';

const CreateMyBookScreen = () => {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [bookType, setBookType] = useState('');
  const [author, setAuthor] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [aboutBook, setAboutBook] = useState('');

  // ฟังก์ชันที่ใช้ในการบันทึกข้อมูลหนังสือลงใน Firestore
  const handleSaveToFirestore = async (userBookshelfId, bookData) => {
    try {
      const bookshelfDocRef = doc(db, 'bookshelf', userBookshelfId);
      const bookshelfDocSnapshot = await getDoc(bookshelfDocRef);
  
      if (bookshelfDocSnapshot.exists()) {
        const booksArray = bookshelfDocSnapshot.data().books || [];
  
        // หา `bookId` ที่มีค่ามากที่สุดใน booksArray
        const maxBookId = Math.max(...booksArray.map(book => parseInt(book.id, 10)), -1);
  
        // กำหนด `bookId` ให้เพิ่มขึ้นจากค่า `maxBookId` ที่ได้มา
        const bookWithId = { ...bookData, id: String(maxBookId + 1) };
  
        // หากมีหนังสือ, ให้ทำการอัปเดต
        await updateDoc(bookshelfDocRef, {
          books: [...booksArray, bookWithId],
        });
  
        return bookWithId; // คืนค่าข้อมูลหนังสือที่สร้างใหม่พร้อม `bookId`
      } else {
        // หากยังไม่มีหนังสือ, ให้ทำการสร้างใหม่
        await setDoc(bookshelfDocRef, {
          books: [bookData],
        });
  
        return bookData; // คืนค่าข้อมูลหนังสือที่สร้างใหม่ (ไม่มี `bookId`)
      }
    } catch (error) {
      console.error('Error saving book to Firestore:', error.message);
      throw error;
    }
  };
  

  // ฟังก์ชันที่ใช้ในการบันทึกหนังสือ
  const handleSave = async () => {
    try {
      // ดึงข้อมูลผู้ใช้ปัจจุบัน
      const user = auth.currentUser;

      // ตรวจสอบว่ามีข้อมูลหรือไม่
      if (!title || !author) {
        alert('กรุณากรอกข้อมูลที่จำเป็น (ชื่อหนังสือและผู้แต่ง)');
        return;
      }

      if (user) {
        // ดึง user's bookshelf ID จาก Firestore
        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          const userBookshelfId = userDocSnapshot.data().bookshelfId;

          // ใช้ user's bookshelf ID ในการสร้างหรืออัปเดตเอกสารในคอลเล็กชัน "bookshelf"
          const bookData = {
            title,
            bookType,
            author,
            purchaseDate,
            aboutBook,
          };

          // รอให้หนังสือถูกบันทึกลงใน Firestore และรับข้อมูลหนังสือที่สร้างใหม่
          const newBookData = await handleSaveToFirestore(userBookshelfId, bookData);
          alert('บันทึกหนังสือเรียบร้อยแล้ว');

          // ใช้ข้อมูลหนังสือที่สร้างใหม่สำหรับการดำเนินการหรือแสดงผลเพิ่มเติม
          console.log('ข้อมูลหนังสือที่สร้างใหม่:', newBookData);

          
        } else {
          console.error('ไม่พบเอกสารผู้ใช้');
        }
      } else {
        console.error('ไม่พบผู้ใช้');
      }
      navigation.navigate('MyBookShelf', { refresh: true });
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการบันทึกหนังสือ', error.message);
    }
  };

  return (
    <View style={createMyBookStyles.modalContainer}>
      <View style={createMyBookStyles.modalContent}>
        <Text style={createMyBookStyles.label}>ชื่อหนังสือ:</Text>
        <TextInput
          style={createMyBookStyles.input}
          value={title}
          onChangeText={(text) => setTitle(text)}
        />
        <Text style={createMyBookStyles.label}>ประเภท:</Text>
        <TextInput
          style={createMyBookStyles.input}
          value={bookType}
          onChangeText={(text) => setBookType(text)}
        />
        <Text style={createMyBookStyles.label}>ผู้แต่ง:</Text>
        <TextInput
          style={createMyBookStyles.input}
          value={author}
          onChangeText={(text) => setAuthor(text)}
        />
        <Text style={createMyBookStyles.label}>วันที่ซื้อ:</Text>
        <TextInput
          style={createMyBookStyles.input}
          value={purchaseDate}
          onChangeText={(text) => setPurchaseDate(text)}
        />
        <Text style={createMyBookStyles.label}>เกี่ยวกับหนังสือ:</Text>
        <TextInput
          style={[createMyBookStyles.input, { height: 80 }]}
          value={aboutBook}
          onChangeText={(text) => setAboutBook(text)}
          multiline={true}
        />
      </View>
      <Pressable onPress={handleSave} style={[createMyBookStyles.actionButton, {userSelect: 'auto'}]}>
        <Text style={createMyBookStyles.buttonText}>บันทึก</Text>
      </Pressable>
    </View>
  );
};

export default CreateMyBookScreen;
