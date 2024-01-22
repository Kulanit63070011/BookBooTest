import React, { useState } from 'react';
import { Modal, View, Text, Pressable, StyleSheet, ScrollView, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const PostDetailsModal = ({ visible, post, onClose }) => {
  if (!visible || !post) {
    return null;
  }

  const { title, content } = post;

  // Add state to store like and dislike counts
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  // Add state to track whether the user has voted
  const [voted, setVoted] = useState(false);

  // Add state to store comments
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  // Function to handle liking a post
  const handleLike = () => {
    if (!voted) {
      setLikes(likes + 1);
      setVoted(true);
    }
  };

  // Function to handle disliking a post
  const handleDislike = () => {
    if (!voted) {
      setDislikes(dislikes + 1);
      setVoted(true);
    }
  };

  // Function to handle adding a new comment
  const handleAddComment = () => {
    if (newComment.trim() !== '') {
      setComments([...comments, newComment]);
      setNewComment('');
    }
  };

  return (
    <Modal transparent={true} animationType="slide" visible={visible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.topBar}>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <Icon name="close" size={30} color="red" />
            </Pressable>
          </View>
          <ScrollView>
            <View style={styles.formContainer}>
              <Text style={styles.label}>Post Title:</Text>
              <Text style={styles.content}>{title}</Text>
              <Text style={styles.label}>Content:</Text>
              <Text style={styles.content}>{content}</Text>

              {/* Display like and dislike counts */}
              <View style={styles.likesContainer}>
                <Pressable onPress={handleLike} style={styles.likeButton}>
                  <Icon name="thumb-up" size={20} color="green" />
                  <Text style={styles.likeButtonText}>Like</Text>
                </Pressable>
                <Text style={styles.likeCount}>{likes}</Text>
              </View>

              <View style={styles.dislikesContainer}>
                <Pressable onPress={handleDislike} style={styles.dislikeButton}>
                  <Icon name="thumb-down" size={20} color="red" />
                  <Text style={styles.dislikeButtonText}>Dislike</Text>
                </Pressable>
                <Text style={styles.dislikeCount}>{dislikes}</Text>
              </View>

              {/* Display comments */}
              <View style={styles.commentsContainer}>
                <Text style={styles.commentsHeader}>Comments:</Text>
                {comments.map((comment, index) => (
                  <Text key={index} style={styles.commentText}>{comment}</Text>
                ))}
              </View>

              {/* Add comment section */}
              <TextInput
                style={styles.commentInput}
                value={newComment}
                onChangeText={(text) => setNewComment(text)}
                placeholder="Add a comment..."
                multiline={true}
              />
              <Pressable onPress={handleAddComment} style={styles.commentButton}>
                <Text style={styles.commentButtonText}>Add Comment</Text>
              </Pressable>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

  

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',
    maxHeight: '80%',
    padding: 20,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  closeButton: {
    padding: 10,
    borderRadius: 5,
  },
  formContainer: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  content: {
    marginBottom: 10,
    fontSize: 16,
    color: 'black',
  },
  likesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  likeButtonText: {
    marginLeft: 5,
    color: 'green',
  },
  likeCount: {
    fontSize: 16,
    color: 'green',
  },

  dislikesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  dislikeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  dislikeButtonText: {
    marginLeft: 5,
    color: 'red',
  },
  dislikeCount: {
    fontSize: 16,
    color: 'red',
  },
  commentsContainer: {
    marginTop: 20,
  },
  commentsHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  commentText: {
    fontSize: 16,
    marginBottom: 5,
  },
  commentInput: {
    height: 80,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 5,
    color: 'black',
  },
  commentButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  commentButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default PostDetailsModal;