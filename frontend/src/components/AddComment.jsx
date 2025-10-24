import React, { useState } from 'react'
import styles from '../styles/Player.module.css'

function AddComment({comments,setComments}) {
  const [newComment, setNewComment] = useState('');

    const handleCommentSubmit = (e) => {
      e.preventDefault();
      if (newComment.trim()) {
        const comment = {
          // id: comments.length + 1,
          // author: 'You',
          // avatar: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
          content: newComment,
          timestamp: 'Just now',
          likes: 0
        };
        setComments([comment, ...comments]); // adding to previous comments list
        setNewComment('');
      }
    };

  return (
    <form onSubmit={handleCommentSubmit} className={styles.addComment}>
      <img
        src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop"
        alt="Your avatar"
        className={styles.commentAvatar}
      />
      <div className={styles.commentInputContainer}>
        <input
          type="text"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className={styles.commentInput}
        />
        <div className={styles.commentActions}>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={() => setNewComment('')}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={styles.commentButton}
            disabled={!newComment.trim()}
          >
            Comment
          </button>
        </div>
      </div>
    </form>
  )
}

export default AddComment
