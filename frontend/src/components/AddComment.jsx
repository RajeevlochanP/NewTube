import React, { use, useState } from 'react'
import styles from '../styles/Player.module.css'
import { addCommentCall } from '../apiCalls/Player';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

function AddComment({comments,setComments,videoId}) {
  const [newComment, setNewComment] = useState('');
  const userId=useSelector(state=>state.user.userId);

    const handleCommentSubmit = async (e) => {
      e.preventDefault();
      if (newComment.trim()) {

        let res=await addCommentCall(videoId,newComment);
        if(!res.success) {
          toast.error("Cannot add your comment");
          return;
        }
        setComments([res.comment, ...comments]); // adding to previous comments list
        setNewComment('');
      }
    };

  return (
    <form onSubmit={handleCommentSubmit} className={styles.addComment}>
      <img
        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
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
