import React, { useState } from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import CreatePostCommunityModal from '../../components/Community/CreatePostCommunityModal';
import EditPostCommunityModal from '../../components/Community/EditPostCommunityModal';
import PostDetailsModal from '../../components/Community/PostModal';
import communityStyles from '../../style/community/CommunityStyle';

const CommunityScreen = () => {
    const [isCreatePostModalVisible, setCreatePostModalVisible] = useState(false);
    const [isEditPostModalVisible, setEditPostModalVisible] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);

    const [posts, setPosts] = useState([
        { id: 1, title: 'Post 1', content: 'This is the content of Post 1' },
        { id: 2, title: 'Post 2', content: 'This is the content of Post 2' },
    ]);

    const handleCreatePost = (newPost) => {
        setPosts([...posts, { ...newPost, id: posts.length + 1 }]);
        setCreatePostModalVisible(false);
    };

    const handleEditPost = (editedPost) => {
        setPosts(posts.map((post) => (post.id === editedPost.id ? editedPost : post)));
        setEditPostModalVisible(false);
    };

    const handleLikeDislike = (postId, isLike) => {
        // Logic to handle like/dislike
    };

    const handleViewPost = (post) => {
        setSelectedPost(post);
    };

    return (
        <View style={communityStyles.container}>
            <Text style={communityStyles.heading}>Community Screen</Text>

            {/* <Button title="Create Post" onPress={() => setCreatePostModalVisible(true)} /> */}
            <CreatePostCommunityModal
                visible={isCreatePostModalVisible}
                onClose={() => setCreatePostModalVisible(false)}
                onCreatePost={handleCreatePost}
            />

            <ScrollView style={communityStyles.postContainer}>
                {posts.map((post) => (
                    <View key={post.id} style={communityStyles.post}>
                        <Text style={communityStyles.postTitle}>{post.title}</Text>
                        <Text>{post.content}</Text>
                        <Button title="Like" onPress={() => handleLikeDislike(post.id, true)} />
                        <Button title="Dislike" onPress={() => handleLikeDislike(post.id, false)} />
                        <Button title="แสดงความเห็น" onPress={() => handleViewPost(post)} />
                    </View>
                ))}
            </ScrollView>


            {selectedPost && (
                <EditPostCommunityModal
                    visible={isEditPostModalVisible}
                    onClose={() => setEditPostModalVisible(false)}
                    onEditPost={handleEditPost}
                    post={selectedPost}
                />
            )}
            {selectedPost && (
                <PostDetailsModal
                    visible={selectedPost !== null}
                    onClose={() => setSelectedPost(null)}
                    post={selectedPost}
                />
            )}
        </View>
    );
};

export default CommunityScreen;