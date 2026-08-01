import React from 'react'
import styles from '../styles/Home.module.css'
import { NavLink } from 'react-router-dom';

function VideoCard({ video, index }) {
    // console.log(video.thumbnailPath);
    
    // const thumbnail = video.thumbnailPath ? video.thumbnailPath.split("\\")[2] : "default";

    return (
        <NavLink to={`/player/${video._id}`}>
            <div className={styles.videoCard}>
                <div className={styles.thumbnailContainer}>
                    <img
                        src={`${import.meta.env.VITE_BACKEND_URL}/${video.thumbnailPath}`}
                        alt={video.title}
                        className={styles.thumbnail}
                    />
                </div>
                <div className={styles.videoInfo}>
                    <h3 className={styles.videoTitle}>{video.title || "No title"}</h3>
                    <p className={styles.channelName}>{video.channel}</p>
                    <div className={styles.videoMeta}>
                        <span>{video.views}</span>
                        <span className={styles.separator}>•</span>
                        <span>{video.timestamp}</span>
                    </div>
                </div>
            </div>
        </NavLink>
    )
}

export default VideoCard
