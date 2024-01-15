import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const BookColumnOfCards = ({ cards, onPress }) => {
  return (
    <View style={styles.container}>
      {cards.map((book, index) => (
        <TouchableOpacity key={index} onPress={() => onPress(book)}>
          <View style={styles.cardContainer}>
            <Text style={styles.cardTitle}>{book.title}</Text>
            <Text style={styles.cardAuthor}>{book.author}</Text>
            <Text style={styles.cardText}>{book.cardText}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  cardContainer: {
    margin: 10,
    padding: 15,
    backgroundColor: '#E21E1E',
    borderRadius: 10,
    width: 170,
    elevation: 2,
    height: 200,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  cardAuthor: {
    color: '#555',
    fontSize: 14,
  },
  cardText: {
    marginTop: 8,
    fontSize: 12,
    color: '#777',
  },
});

export default BookColumnOfCards;