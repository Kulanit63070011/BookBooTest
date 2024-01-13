// components/ColumnOfCardsStyle.js
import { StyleSheet } from 'react-native';

export const columnOfCardsStyles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingHorizontal: 8, // Add padding between columns
  },
  cardContainer: {
    flex: 1,
    backgroundColor: '#BCDCF4',
    borderRadius: 10,
    padding: 16,
    marginRight: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  cardAuthor: {
    fontSize: 14,
    color: 'white',
  },
  cardText: {
    fontSize: 16,
    color: 'white',
  },
});