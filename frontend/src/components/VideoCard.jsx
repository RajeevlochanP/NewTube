import React, { useEffect } from 'react'
import styles from '../styles/Home.module.css'
import AOS from 'aos';

function VideoCard({video,index}) {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: 'ease-out-cubic',
            once: true,
            offset: 100,
        });
    }, []);

    return (
        <div
            className={styles.videoCard}
            data-aos="fade-up"
            data-aos-delay={400 + (index * 100)}
        >
            <div className={styles.thumbnailContainer}>
                <img
                    src={video.thumbnail}
                    alt={video.title}
                    className={styles.thumbnail}
                />
            </div>
            <div className={styles.videoInfo}>
                <h3 className={styles.videoTitle}>{video.title}</h3>
                <p className={styles.channelName}>{video.channel}</p>
                <div className={styles.videoMeta}>
                    <span>{video.views}</span>
                    <span className={styles.separator}>•</span>
                    <span>{video.timestamp}</span>
                </div>
            </div>
        </div>
    )
}

export default VideoCard
