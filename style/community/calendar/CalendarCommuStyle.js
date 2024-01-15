import { StyleSheet } from 'react-native';

export const calendarCommuStyles = StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 16,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'black', // Adjust the text color as needed
    },
    contentContainer: {
      flex: 1,
      padding: 16,
    },
    card: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      padding: 16,
      marginBottom: 16,
      backgroundColor: 'red',
    },
    eventName: {
      fontSize: 18,
      marginBottom: 8,
    },
    timestamp: {
      color: 'gray',
    },
  });
  