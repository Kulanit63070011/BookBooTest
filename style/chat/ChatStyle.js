// ChatStyles.js
import { StyleSheet } from 'react-native';

export const chatStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  messageText: {
    fontSize: 16,
  },
  timeText: {
    fontSize: 12,
    color: 'gray',
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor:'#7C4DD7',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 10,
    backgroundColor:'white',
  },
  sendButton: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: '#7C4DD7',
    borderRadius: 20,
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  messageContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start', // เปลี่ยนเป็น 'flex-start' เพื่อวางไว้ทางซ้ายของจอ
    marginLeft: 10, // กำหนดระยะห่างทางซ้าย
    paddingBottom: 25,
  },
  messageContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
});
