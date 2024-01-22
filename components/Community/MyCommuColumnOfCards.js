import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

const MyCommuColumnOfCards = ({ cards, onPress, onLeave, cardWidth }) => {
  return (
    <View style={styles.container}>
      {cards.map((community, index) => (
        <Pressable key={index} onPress={() => onPress(community)}>
          <View style={[styles.cardContainer, { width: cardWidth }]}>
            <Text style={styles.cardTitle}>{community.name}</Text>
            <Text style={styles.cardText}>{community.description}</Text>
            <Pressable onPress={() => onLeave(community)} style={styles.leaveButton}>
              <Text style={styles.leaveButtonText}>Leave</Text>
            </Pressable>
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
    height: 160,
    position: 'relative',
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff',
  },
  cardText: {
    marginTop: 8,
    fontSize: 12,
    color: '#fff',
  },
  leaveButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  leaveButtonText: {
    color: '#E21E1E',
    fontWeight: 'bold',
  },
});

export default MyCommuColumnOfCards;