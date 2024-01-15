import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { myBookShelfStyles } from '../../style/bookshelf/MyBookShelfStyle';
import BottomNavigator from '../../navigation/BottomNavigator';
import FloatingButton from '../../components/common/FloatingAddButton';
import BookDetailsModal from '../../components/BookShelf/BookDetailsModal';
import { useNavigation } from '@react-navigation/native';
import { signUpStyles } from '../../style/user/SignUpStyle';
import BookColumnOfCards from '../../components/BookShelf/BookColumnOfCards';

const MyBookShelfScreen = () => {
  const navigation = useNavigation();
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    purchaseDate: '',
    coverImage: '',
  });

  const [books, setBooks] = useState([
    { title: 'Book 1', author: 'Author 1', cardText: 'Additional text for Book 1' },
    { title: 'Book 2', author: 'Author 2', cardText: 'Additional text for Book 2' },
    { title: 'Book 3', author: 'Author 3', cardText: 'Additional text for Book 3' },
    { title: 'Book 4', author: 'Author 4', cardText: 'Additional text for Book 4' },
    { title: 'Book 5', author: 'Author 1', cardText: 'Additional text for Book 5' },
    { title: 'Book 6', author: 'Author 2', cardText: 'Additional text for Book 6' },
    { title: 'Book 7', author: 'Author 3', cardText: 'Additional text for Book 7' },
    { title: 'Book 8', author: 'Author 4', cardText: 'Additional text for Book 8' },
    { title: 'Book 9', author: 'Author 1', cardText: 'Additional text for Book 9' },
  ]);

  const [selectedBook, setSelectedBook] = useState(null); // Track the selected book for the modal
  const [isModalVisible, setIsModalVisible] = useState(false);

  const addBook = () => {
    const isBookExist = books.some((book) => book.title === newBook.title);
    if (!isBookExist) {
      setBooks([...books, newBook]);
      setNewBook({ title: '', author: '', purchaseDate: '', coverImage: '' });
    } else {
      alert('This book is already in your bookshelf.');
    }
  };

  useEffect(() => {
    console.log('Modal visibility inside component:', isModalVisible);
  }, [isModalVisible]);

  useEffect(() => {
    console.log('Book details inside component:', selectedBook);
  }, [selectedBook]);

  const openBookDetails = (book) => {
    console.log('Opening book details for:', book);
    setSelectedBook(book);
    setIsModalVisible(true);
  };

  const deleteBook = () => {
    setIsModalVisible(false); // Close the modal after deletion
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
          <TouchableOpacity onPress={() => alert('Perform search')} style={{ paddingLeft: 20 }}>
            <Image
              source={require('../../assets/icons/searchIcon.png')}
              style={{ width: 24, height: 24 }}
            />
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View>
            {books.length > 0 ? (
              <BookColumnOfCards cards={books} onPress={openBookDetails} />
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
      />
    </View>
  );
};

export default MyBookShelfScreen;