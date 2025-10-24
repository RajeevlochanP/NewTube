import React from 'react'
import styles from '../styles/Player.module.css'
import { useState,useEffect } from 'react';
import AddComment from './AddComment';
import Comment from './Comment';

function CommentsBox({videoId}) {
    // receive commets prop from player
    const [comments, setComments] = useState([
        {
            id: 1,
            author: 'John Doe',
            content: 'Great tutorial! This really helped me understand React hooks better.',
            timestamp: '2 hours ago',
        },
        {
            id: 2,
            author: 'Sarah Wilson',
            content: 'Could you make a follow-up video about advanced patterns?',
            timestamp: '5 hours ago',
        },
        {
            id: 3,
            author: 'Mike Chen',
            content: 'The explanation at 5:30 was perfect. Thanks for the clear examples!',
            timestamp: '1 day ago',
        },
        {
            id: 4,
            author: 'Emma Davis',
            content: 'I\'ve been struggling with this concept for weeks. This video finally made it click!',
            timestamp: '2 days ago',
        }
    ]);

    return (
        <div className={styles.commentsSection}>
            <div className={styles.commentsHeader}>
                <h3 className={styles.commentsTitle}>{comments.length} Comments</h3>
            </div>

            {/* Add Comment */}
            <AddComment comments={comments} setComments={setComments} videoId={videoId}/>

            {/* Comments List */}
            <div className={styles.commentsList}>
                {comments.map((comment) => (
                    <Comment key={comment._id} comment={comment}/>
                ))}
            </div>
        </div>
    )
}

export default CommentsBox
