import React, { useState } from 'react';

const CreatePostCommunityModal = ({ visible, onClose, onCreatePost }) => {
    const [newPostContent, setNewPostContent] = useState('');

    const handleCreatePost = () => {
        onCreatePost({ content: newPostContent });
        onClose();
    };

    return (
        <div>
            <h2>Create Post</h2>
            <textarea
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                placeholder="Enter your post content..."
            />
            <button onClick={handleCreatePost}>Create Post</button>
            <button onClick={onClose}>Cancel</button>
        </div>
    );
};

export default CreatePostCommunityModal;