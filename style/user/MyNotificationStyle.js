import { StyleSheet } from 'react-native';

export const myNotificationStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    markAsSeenButton: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        alignItems:'flex-end'
    },
    markAsSeenText: {
        color: 'black',
    },
    notificationItem: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        padding: 10,
    },
    notificationMessage: {
        fontSize: 16,
        marginBottom: 5,
    },
    timestamp: {
        color: 'gray',
    },
    seenText: {
        color: 'green',
    },
});