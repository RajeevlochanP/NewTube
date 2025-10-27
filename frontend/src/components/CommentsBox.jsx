import React from 'react'
import styles from '../styles/Player.module.css'
import { useState,useEffect } from 'react';
import AddComment from './AddComment';
import Comment from './Comment';

function CommentsBox({videoId, commentss}) {
    // receive commets prop from player
    const [comments, setComments] = useState(commentss || []);

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
