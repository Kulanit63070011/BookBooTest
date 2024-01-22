import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, Pressable, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import BottomNavigator from '../../navigation/BottomNavigator';
import FloatingButton from '../../components/common/FloatingAddButton';
import BookDetailsModal from '../../components/BookShelf/BookDetailsModal';
import BookColumnOfCards from '../../components/BookShelf/BookColumnOfCards';
import { myBookShelfStyles } from '../../style/bookshelf/MyBookShelfStyle';
import { signUpStyles } from '../../style/user/SignUpStyle';
import { auth } from '../../backend/firebase';
import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore';

const MyBookShelfScreen = () => {
  const navigation = useNavigation();

  // สร้าง state เพื่อเก็บข้อมูลของหนังสือที่ผู้ใช้กรอกใหม่
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    purchaseDate: '',
    coverImage: '',
  });

  // สร้าง state เพื่อเก็บข้อมูลหนังสือทั้งหมดในหนังสือของผู้ใช้
  const [books, setBooks] = useState([]);

  // สร้าง state เพื่อเก็บข้อมูลหนังสือที่ผู้ใช้เลือกเพื่อดูรายละเอียด
  const [selectedBook, setSelectedBook] = useState(null);

  // สร้าง state เพื่อควบคุมการแสดงหรือซ่อน Modal ข้อมูลหนังสือ
  const [isModalVisible, setIsModalVisible] = useState(false);

  // สร้าง state เพื่อใช้ในการ trigger ให้ useEffect ทำงานเมื่อมีการอัปเดต
  const [updateTrigger, setUpdateTrigger] = useState(0);

  // ฟังก์ชันสำหรับดึงข้อมูลหนังสือจาก Firebase Firestore
  const fetchUserBookshelf = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(getFirestore(), 'users', user.uid);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          const userBookshelfId = userDocSnapshot.data().bookshelfId;
          const bookshelfDocRef = doc(getFirestore(), 'bookshelf', userBookshelfId);
          const bookshelfDocSnapshot = await getDoc(bookshelfDocRef);

          if (bookshelfDocSnapshot.exists()) {
            const userBooks = bookshelfDocSnapshot.data().books || [];
            setBooks(userBooks);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching user bookshelf:', error.message);
    }
  };

  const isFocused = useIsFocused();
  // useEffect ที่จะทำงานเมื่อมีการเปลี่ยนแปลงใน updateTrigger
  useEffect(() => {
    // ตรวจสอบว่าหน้าจออยู่ในสถานะ focus หรือไม่
    if (isFocused) {
      fetchUserBookshelf();
    }
  }, [isFocused, updateTrigger]);

  // ฟังก์ชันสำหรับเพิ่มหนังสือ
  const addBook = () => {
    // ... (ไม่ได้เปลี่ยนแปลง)
  };

  // ฟังก์ชันสำหรับเปิด Modal เพื่อดูรายละเอียดของหนังสือ
  const openBookDetails = (book) => {
    setSelectedBook(book);
    setIsModalVisible(true);
  };

  // ฟังก์ชันสำหรับปิด Modal
  const deleteBook = () => {
    setIsModalVisible(false);
  };

  // ฟังก์ชันที่จะทำงานเมื่อบันทึกการแก้ไขข้อมูลหนังสือ
  const onSave = async (updatedDetails, bookId) => {
    await updateBook(updatedDetails, bookId);
    setIsModalVisible(false); // ปิด Modal
  };

  // ฟังก์ชันที่ใช้ในการอัปเดตข้อมูลหนังสือ
  const updateBook = async (updatedDetails, bookId) => {
    try {
      const bookIndex = books.findIndex((book) => book.id === bookId);
  
      if (bookIndex !== -1) {
        const updatedBooks = [...books];
        updatedBooks[bookIndex] = { ...updatedBooks[bookIndex], ...updatedDetails };
  
        const user = auth.currentUser;
        if (user) {
          const userDocRef = doc(getFirestore(), 'users', user.uid);
          const userDocSnapshot = await getDoc(userDocRef);
  
          if (userDocSnapshot.exists()) {
            const userBookshelfId = userDocSnapshot.data().bookshelfId;
            const bookshelfDocRef = doc(getFirestore(), 'bookshelf', userBookshelfId);
            const bookshelfDocSnapshot = await getDoc(bookshelfDocRef);
  
            if (bookshelfDocSnapshot.exists()) {
              const userBooks = bookshelfDocSnapshot.data().books || [];
              const updatedUserBooks = [...userBooks];
              updatedUserBooks[bookIndex] = { ...userBooks[bookIndex], ...updatedDetails };
  
              await updateDoc(bookshelfDocRef, { books: updatedUserBooks });  // อัปเดต Firebase Firestore
            }
          }
        }
  
        setBooks(updatedBooks);  // อัปเดต local state
      }
      setUpdateTrigger((prev) => prev + 1);
    } catch (error) {
      console.error('Error updating book:', error.message);
    }
  };
  
  
  
  



  return (
    <View style={signUpStyles.container}>
      <SafeAreaView>
        <View style={signUpStyles.titleContainer}>
          <Text style={myBookShelfStyles.title}>ชั้นหนังสือ</Text>
        </View>
      </SafeAreaView>
      <View style={[myBookShelfStyles.contentContainer]}>
        <View style={myBookShelfStyles.bookInputContainer}>
          <TextInput
            style={myBookShelfStyles.input}
            placeholder="Book Title"
            value={newBook.title}
            onChangeText={(text) => setNewBook({ ...newBook, title: text })}
          />
          <Pressable onPress={() => alert('Perform search')} style={{ paddingLeft: 20, userSelect: 'auto' }}>
            <Image
              source={require('../../assets/icons/searchIcon.png')}
              style={{ width: 24, height: 24 }}
            />
          </Pressable>
        </View>
        <ScrollView>
          <View style={{ userSelect: 'none' }} > 
            {books.length > 0 ? (
              <BookColumnOfCards cards={books.reverse()} onPress={openBookDetails} />
            ) : (
              <Text>No books in your bookshelf</Text>
            )}
          </View>
        </ScrollView>
      </View>
      <FloatingButton targetScreen="CreateMyBook" />
      <BottomNavigator style={myBookShelfStyles.bottomNavigator} />
      <BookDetailsModal
        visible={isModalVisible}
        bookDetails={selectedBook}
        onClose={() => setIsModalVisible(false)}
        onDelete={deleteBook}
        onSave={onSave}
      />
    </View>
  );
};

export default MyBookShelfScreen;
