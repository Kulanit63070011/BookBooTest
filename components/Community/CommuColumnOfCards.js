import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

const CommuColumnOfCards = ({ cards, onPress, cardWidth }) => {
  return (
    <View style={styles.container}>
      {cards.map((community, index) => (
        <Pressable key={index} onPress={() => onPress(community)} style={{userSelect: 'auto'}}>
          <View style={[styles.cardContainer, { width: cardWidth }]}>
            <Text style={styles.cardTitle}>{community.name}</Text>
            <Text style={styles.cardText}>{community.description}</Text>
          </View>
        </Pressable>
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
    elevation: 2,
    height: 120,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  cardText: {
    marginTop: 8,
    fontSize: 12,
    color: '#fff',
  },
});

export default CommuColumnOfCards;