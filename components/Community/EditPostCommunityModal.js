// EditPostCommunityModal.js
import React, { useState, useEffect } from 'react';

const EditPostCommunityModal = ({ visible, onClose, onEditPost, post }) => {
  const [editedPostContent, setEditedPostContent] = useState('');

  useEffect(() => {
    // Set initial content when modal is opened
    setEditedPostContent(post.content);
  }, [post]);

  const handleEditPost = () => {
    // Logic to edit the selected post
    onEditPost({ ...post, content: editedPostContent });
    onClose();
  };

  return (
    // Your EditPostCommunityModal JSX
    <div>
      <h2>Edit Post</h2>
      <textarea
        value={editedPostContent}
        onChange={(e) => setEditedPostContent(e.target.value)}
        placeholder="Edit your post content..."
      />
      <button onClick={handleEditPost}>Save Changes</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default EditPostCommunityModal;
