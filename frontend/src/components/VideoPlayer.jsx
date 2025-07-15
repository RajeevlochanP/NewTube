import React from 'react'
import styles from '../styles/Player.module.css'
import { useState, useEffect } from 'react'

function VideoPlayer({poster,src,type}) {
    // props to be used instead of hardcoded urls
    return (
        <div className={styles.videoPlayer}>
            <video
                controls
                className={styles.video}
                poster="https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800&h=450&fit=crop"
            >
                <source src="#" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    )
}

export default VideoPlayer
