import AOS from 'aos';
import React, { useEffect, useState } from 'react'
import styles from '../styles/Player.module.css'

function VideoDetails() {
    const [isLiked, setIsLiked] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [showFullDescription, setShowFullDescription] = useState(false);

    const currentVideo = {
        title: "React Hooks Complete Guide - useState, useEffect, and Custom Hooks",
        channel: "CodeMaster",
        subscribers: "1.2M",
        views: "856K views",
        timestamp: "3 days ago",
        likes: "12K",
        description: `In this comprehensive tutorial, we'll dive deep into React Hooks and learn how to use useState, useEffect, and create custom hooks. This video covers everything from basic concepts to advanced patterns.

🔥 What you'll learn:
• Understanding React Hooks fundamentals
• useState for state management
• useEffect for side effects
• Creating custom hooks
• Best practices and common patterns
• Real-world examples and use cases

📚 Timestamps:
0:00 Introduction
2:15 What are React Hooks?
5:30 useState Hook
12:45 useEffect Hook
20:10 Custom Hooks
28:30 Best Practices
35:00 Conclusion

💻 Source code: https://github.com/codemaster/react-hooks-guide
📖 Blog post: https://codemaster.dev/react-hooks-guide

Don't forget to like and subscribe for more React tutorials!`,
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop'
    };

    useEffect(() => {
        AOS.init({
            duration: 600,
            easing: 'ease-out-cubic',
            once: true,
            offset: 50,
        });
    }, []);

      const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleSubscribe = () => {
    setIsSubscribed(!isSubscribed);
  };

    return (
        <>
            {/* Video Info */}
            <div className={styles.videoInfo}>
                <h1 className={styles.videoTitle}>{currentVideo.title}</h1>

                <div className={styles.videoMeta}>
                    <div className={styles.viewsAndDate}>
                        <span>{currentVideo.views}</span>
                        <span className={styles.separator}>•</span>
                        <span>{currentVideo.timestamp}</span>
                    </div>

                    <div className={styles.actionButtons}>
                        <button
                            className={`${styles.actionButton} ${isLiked ? styles.liked : ''}`}
                            onClick={handleLike}
                        >
                            <svg viewBox="0 0 24 24" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                            </svg>
                            {currentVideo.likes}
                        </button>

                        <button className={styles.actionButton}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17" />
                            </svg>
                        </button>

                        <button className={styles.actionButton}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="18" cy="5" r="3" />
                                <circle cx="6" cy="12" r="3" />
                                <circle cx="18" cy="19" r="3" />
                                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                            </svg>
                            Share
                        </button>
                    </div>
                </div>
            </div>

            {/* Channel Info */}
            <div className={styles.channelInfo}>
                <div className={styles.channelDetails}>
                    <img src={currentVideo.avatar} alt={currentVideo.channel} className={styles.channelAvatar} />
                    <div className={styles.channelMeta}>
                        <h3 className={styles.channelName}>{currentVideo.channel}</h3>
                        <p className={styles.subscriberCount}>{currentVideo.subscribers} subscribers</p>
                    </div>
                </div>
                <button
                    className={`${styles.subscribeButton} ${isSubscribed ? styles.subscribed : ''}`}
                    onClick={handleSubscribe}
                >
                    {isSubscribed ? 'Subscribed' : 'Subscribe'}
                </button>
            </div>

            {/* Description */}
            <div className={styles.description}>
                <div className={styles.descriptionContent}>
                    <p className={`${styles.descriptionText} ${showFullDescription ? styles.expanded : ''}`}>
                        {currentVideo.description}
                    </p>
                    <button
                        className={styles.showMoreButton}
                        onClick={() => setShowFullDescription(!showFullDescription)}
                    >
                        {showFullDescription ? 'Show less' : 'Show more'}
                    </button>
                </div>
            </div>

        </>
    )
}

export default VideoDetails
