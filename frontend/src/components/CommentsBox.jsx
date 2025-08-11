import React from 'react'
import styles from '../styles/Player.module.css'
import { useState,useEffect } from 'react';
import AddComment from './AddComment';
import Comment from './Comment';

function CommentsBox() {
    // receive commets prop from player
    const [comments, setComments] = useState([
        {
            id: 1,
            author: 'John Doe',
            avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
            content: 'Great tutorial! This really helped me understand React hooks better.',
            timestamp: '2 hours ago',
            likes: 12
        },
        {
            id: 2,
            author: 'Sarah Wilson',
            avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
            content: 'Could you make a follow-up video about advanced patterns?',
            timestamp: '5 hours ago',
            likes: 8
        },
        {
            id: 3,
            author: 'Mike Chen',
            avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
            content: 'The explanation at 5:30 was perfect. Thanks for the clear examples!',
            timestamp: '1 day ago',
            likes: 15
        },
        {
            id: 4,
            author: 'Emma Davis',
            avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
            content: 'I\'ve been struggling with this concept for weeks. This video finally made it click!',
            timestamp: '2 days ago',
            likes: 23
        }
    ]);

    return (
        <div className={styles.commentsSection}>
            <div className={styles.commentsHeader}>
                <h3 className={styles.commentsTitle}>{comments.length} Comments</h3>
            </div>

            {/* Add Comment */}
            <AddComment comments={comments} setComments={setComments}/>

            {/* Comments List */}
            <div className={styles.commentsList}>
                {comments.map((comment) => (
                    <Comment key={comment.id} comment={comment}/>
                ))}
            </div>
        </div>
    )
}

export default CommentsBox
