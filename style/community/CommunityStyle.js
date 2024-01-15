// styles.js
import { StyleSheet } from 'react-native';
import { allCommunityStyles } from './AllCommunityStyle';

const communityStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  postContainer: {
    marginBottom: 20,
  },
  post: {
    border: '1px solid #ccc',
    padding: 10,
    marginVertical: 10,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default communityStyles;
