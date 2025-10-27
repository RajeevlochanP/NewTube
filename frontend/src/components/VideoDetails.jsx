import AOS from 'aos';
import React, { useEffect, useState } from 'react'
import styles from '../styles/Player.module.css'
import { likeHandler } from '../handlers/Player.handlers.js'
import toast from 'react-hot-toast';

function VideoDetails({ videoId, likeStatus, description, title, channel, likesCount, uploadTime }) {
    const [isLiked, setIsLiked] = useState(likeStatus);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [likes, setLikes] = useState(likesCount);

    // console.log(likesCount);
    const currentVideo = {
        title: title,
        channel: channel,
        subscribers: "need to keep",
        views: "view feature pending",
        timestamp: timeAgo(uploadTime),
        likes: likes,
        description: description,
        avatar: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
    };

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


    useEffect(() => {
        AOS.init({
            duration: 600,
            easing: 'ease-out-cubic',
            once: true,
            offset: 50,
        });
    }, []);

    // useEffect(() => {
    //     currentVideo.likes = likes;
    // }, [likes]);

    const handleLike = async () => {
        if (!videoId) {
            toast.error("Video ID is missing");
            return;
        }
        let res = await likeHandler(isLiked, videoId);
        console.log("res in handleLike: ", res);
        if (res.success) {
            setIsLiked(res.liked);
            setLikes(prevLikes => res.liked ? prevLikes + 1 : prevLikes - 1);
        }else{
            toast.error("Please sign in to like");
        }
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

                        {/* <button className={styles.actionButton}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17" />
                            </svg>
                        </button> */}

                        <button className={styles.actionButton} onClick={() => { navigator.clipboard.writeText(window.location.href); toast.success("Link copied to clipboard") }}>
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
                        {/* <p className={styles.subscriberCount}>{currentVideo.subscribers} subscribers</p> */}
                    </div>
                </div>
                {/* <button
                    className={`${styles.subscribeButton} ${isSubscribed ? styles.subscribed : ''}`}
                    onClick={handleSubscribe}
                >
                    {isSubscribed ? 'Subscribed' : 'Subscribe'}
                </button> */}
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
