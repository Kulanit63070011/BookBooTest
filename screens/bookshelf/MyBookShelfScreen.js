import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { myBookShelfStyles } from '../../style/bookshelf/MyBookShelfStyle';
import BottomNavigator from '../../navigation/BottomNavigator';
import ColumnOfCards from '../../components/BookShelf/ColumnCard/ColumnOfCards';
import FloatingButton from '../../components/common/FloatingAddButton';
import BookDetailsModal from '../../components/BookShelf/BookDetailsModal';
import { useNavigation } from '@react-navigation/native';
import { signUpStyles } from '../../style/user/SignUpStyle';

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
    { title: 'Book 1', author: 'Author 1', cardText: 'Additional text for Book 1' },
    { title: 'Book 2', author: 'Author 2', cardText: 'Additional text for Book 2' },
    { title: 'Book 3', author: 'Author 3', cardText: 'Additional text for Book 3' },
    { title: 'Book 4', author: 'Author 4', cardText: 'Additional text for Book 4' },
    { title: 'Book 1', author: 'Author 1', cardText: 'Additional text for Book 1' },
    { title: 'Book 2', author: 'Author 2', cardText: 'Additional text for Book 2' },
    { title: 'Book 3', author: 'Author 3', cardText: 'Additional text for Book 3' },
    { title: 'Book 4', author: 'Author 4', cardText: 'Additional text for Book 4' },
    // ... (other books)
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
    // Implement book deletion logic here
    // ...
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
          {/* ... (other TextInput fields) */}
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
              <ColumnOfCards cards={books} onPress={openBookDetails} />
            ) : (
              <Text>No books in your bookshelf</Text>
            )}
          </View>
        </ScrollView>
      </View>
      <FloatingButton />
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
