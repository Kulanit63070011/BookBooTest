import { StyleSheet } from 'react-native';

export const myProfileStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    displayName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    email: {
        fontSize: 16,
        color: 'gray',
        marginBottom: 10,
    },
    editProfileButton: {
        backgroundColor: '#3498db',
        padding: 10,
        borderRadius: 5,
        marginVertical: 10,
    },
    logoutButton: {
        backgroundColor: '#e74c3c',
        padding: 10,
        borderRadius: 5,
    },
});