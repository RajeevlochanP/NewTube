import React from 'react'
import styles from '../styles/Player.module.css'

function RelatedVid({video,index}) {
    return (
        <div
            className={styles.relatedVideo}
            data-aos="fade-left"
            data-aos-delay={index * 100}
        >
            <div className={styles.relatedThumbnail}>
                <img src={video.thumbnail} alt={video.title} />
                <span className={styles.relatedDuration}>{video.duration}</span>
            </div>
            <div className={styles.relatedInfo}>
                <h4 className={styles.relatedTitle}>{video.title}</h4>
                <p className={styles.relatedChannel}>{video.channel}</p>
                <div className={styles.relatedMeta}>
                    <span>{video.views}</span>
                    <span className={styles.separator}>•</span>
                    <span>{video.timestamp}</span>
                </div>
            </div>
        </div>
    )
}

export default RelatedVid
