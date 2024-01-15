import { StyleSheet } from 'react-native';

export const createMyBookStyles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      backgroundColor: 'white',
    },
    topBar: {
      paddingTop: 20,
      paddingHorizontal: 20,
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    closeButton: {
      backgroundColor: 'blue',
      padding: 10,
      borderRadius: 5,
    },
    modalContent: {
      marginBottom: 20,
      paddingHorizontal: 20,
    },
    label: {
      marginBottom: 5,
      fontSize: 16,
      fontWeight: 'bold',
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 10,
      paddingLeft: 5,
      borderRadius:30,
      backgroundColor:'#CEE3F3',
    },
    actionButton: {
      backgroundColor: 'red',
      padding: 10,
      borderRadius: 5,
      marginTop: 10,
      width: '50%',
      alignItems: 'center',
      alignSelf: 'center',
      borderRadius: 50,
    },
    buttonText: {
      color: 'white',
      textAlign: 'center',
      fontSize: 16,
    },
  });