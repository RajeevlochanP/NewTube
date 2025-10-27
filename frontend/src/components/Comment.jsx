import React from 'react'
import styles from '../styles/Player.module.css'

function Comment({ comment }) {
    function timeAgo(uploadTime) {
        const now = new Date();
        const uploaded = new Date(uploadTime);
        const diffMs = now - uploaded;

        const seconds = Math.floor(diffMs / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const months = Math.floor(days / 30);
        const years = Math.floor(days / 365);

        if (years > 0) return `${years} year${years > 1 ? 's' : ''} ago`;
        if (months > 0) return `${months} month${months > 1 ? 's' : ''} ago`;
        if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
        if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
    }
    return (
        <div className={styles.comment}>
            <img src={"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt={comment.author} className={styles.commentAvatar} />
            <div className={styles.commentContent}>
                <div className={styles.commentHeader}>
                    <span className={styles.commentAuthor}>{comment.userId?.name}</span>
                    <span className={styles.commentTimestamp}>{timeAgo(comment.commentedAt)}</span>
                </div>
                <p className={styles.commentText}>{comment.comment}</p>
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

export default Comment;
