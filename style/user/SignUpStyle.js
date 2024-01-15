// SignUpStyle.js
import { StyleSheet } from 'react-native';
import { themeColors } from '../../theme';

export const signUpStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.bg,
  },
  titleContainer: {
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 48,
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  inputContainer: {
    flexDirection: 'column',
    marginVertical: 8,
  },
  inputLabel: {
    color: '#7C4DD7',
    marginLeft: 4,
  },
  textInput: {
    paddingStart: 16,
    backgroundColor: '#CEE3F3',
    color: 'black',
    borderRadius: 20,
    height: 40,
  },
  signUpButton: {
    paddingVertical: 12,
    backgroundColor: '#F04B27',
    borderRadius: 20,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 30,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  signUpButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  text: {
    fontSize: 20,
    color: 'gray',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 5,
  },
  socialButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  socialButton: {
    padding: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
  },
  socialButtonImage: {
    width: 40,
    height: 40,
  },
  profileImage: {
    width: 90,
    height: 90,
    alignSelf:'center',
    borderRadius: 50,
    overflow: 'hidden',
  },
  loginLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 7,
  },
  loginLinkText: {
    color: 'gray',
    fontWeight: 'bold',
  },
  loginLink: {
    fontWeight: 'bold',
    color: '#FFD700',
  },
});

