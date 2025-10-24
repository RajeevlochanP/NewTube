import React from 'react'
import styles from '../styles/Player.module.css'

function Comment({ comment }) {
    return (
        <div className={styles.comment}>
            <img src={comment.avatar} alt={comment.author} className={styles.commentAvatar} />
            <div className={styles.commentContent}>
                <div className={styles.commentHeader}>
                    <span className={styles.commentAuthor}>{comment.author}</span>
                    <span className={styles.commentTimestamp}>{comment.timestamp}</span>
                </div>
                <p className={styles.commentText}>{comment.content}</p>
                <div className={styles.commentActions}>
                    {/* <button className={styles.commentLikeButton}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                        </svg>
                        {comment.likes}
                    </button> */}
                    {/* <button className={styles.commentReplyButton}>Reply</button> */}
                </div>
            </div>
        </div>
    )
}

export default Comment
