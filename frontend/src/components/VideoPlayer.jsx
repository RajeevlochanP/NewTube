import React from 'react'
import styles from '../styles/Player.module.css'
import Hls from 'hls.js';
import { useState, useEffect, useRef } from 'react'

function VideoPlayer({ videoId,thumbnailPath }) {
    // props to be used instead of hardcoded urls
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [showVolumeSlider, setShowVolumeSlider] = useState(false);
    const [showQualityMenu, setShowQualityMenu] = useState(false);
    const [selectedQuality, setSelectedQuality] = useState('Auto');
    const [qualityOptions, setQualityOptions] = useState([]);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showControls, setShowControls] = useState(true);
    const videoRef = useRef(null);
    const playerRef = useRef(null);
    const hlsRef = useRef(null);
    const controlsTimeoutRef = useRef(null);
    // console.log(import.meta.env.VITE_BACKEND_URL + thumbnailPath);
    
    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            setCurrentTime(videoRef.current.currentTime);
        }
    };

    const handleLoadedMetadata = () => {
        if (videoRef.current) {
            setDuration(videoRef.current.duration);
        }
    };

    const handleProgressClick = (e) => {
        if (videoRef.current) {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const newTime = (clickX / rect.width) * duration;
            videoRef.current.currentTime = newTime;
            setCurrentTime(newTime);
        }
    };

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (videoRef.current) {
            videoRef.current.volume = newVolume;
        }
        setIsMuted(newVolume === 0);
    };

    const toggleMute = () => {
        if (videoRef.current) {
            if (isMuted) {
                videoRef.current.volume = volume;
                setIsMuted(false);
            } else {
                videoRef.current.volume = 0;
                setIsMuted(true);
            }
        }
    };

    const toggleFullscreen = () => {
        if (playerRef.current) {
            if (!isFullscreen) {
                if (playerRef.current.requestFullscreen) {
                    playerRef.current.requestFullscreen();
                }
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                }
            }
            setIsFullscreen(!isFullscreen);
        }
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const handleMouseMove = () => {
        setShowControls(true);
        clearTimeout(controlsTimeoutRef.current);
        controlsTimeoutRef.current = setTimeout(() => {
            if (isPlaying) {
                setShowControls(false);
            }
        }, 3000);
    };

    useEffect(() => {
        if (videoRef.current) {
            if (Hls.isSupported()) {
                const hls = new Hls({
                    maxBufferLength: 30,
                    startFragPrefetch: true,
                });
                hlsRef.current = hls;

                const manifestUrl = `${import.meta.env.VITE_BACKEND_URL}stream/masterManifest/${videoId}`;
                hls.loadSource(manifestUrl);
                hls.attachMedia(videoRef.current);

                hls.on(Hls.Events.MANIFEST_PARSED, () => {
                    const levels = hls.levels.map(l => ({
                        label: `${l.height}p`,
                        height: l.height,
                    }));
                    setQualityOptions(['Auto', ...levels.map(l => l.label)]);

                    const index = levels.findIndex(l => l.label === selectedQuality);
                    if (index !== -1) hls.currentLevel = index;
                });

                return () => {
                    hls.destroy();
                };
            } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
                videoRef.current.src = `${import.meta.env.VITE_BACKEND_URL}stream/masterManifest/${videoId}`;
            }
        }
    }, [videoId]);

    useEffect(() => {
        if (!hlsRef.current || !videoRef.current) return;
        const hls = hlsRef.current;
        const video = videoRef.current;

        if (selectedQuality === 'Auto') {
            hls.currentLevel = -1;
            return;
        }

        const index = qualityOptions.indexOf(selectedQuality) - 1;
        if (index < 0) return;

        const currentTime = video.currentTime;
        const wasPaused = video.paused;

        hls.currentLevel = index;
        
        const onLevelSwitched = () => {
            try {
                video.currentTime = currentTime;
                if (!wasPaused) video.play();
            } catch (e) {
                console.warn('Resume failed', e);
            }
            hls.off(Hls.Events.LEVEL_SWITCHED, onLevelSwitched);
        };

        hls.on(Hls.Events.LEVEL_SWITCHED, onLevelSwitched);
    }, [selectedQuality]);


    return (
        // <div className={styles.videoPlayer}>
        //     <video
        //         controls
        //         className={styles.video}
        //         poster="https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800&h=450&fit=crop"
        //     >
        //         <source src="#" type="video/mp4" />
        //         Your browser does not support the video tag.
        //     </video>
        // </div>
        <div
            className={styles.videoPlayer}
            ref={playerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => isPlaying && setShowControls(false)}
        >
            <video
                ref={videoRef}
                className={styles.video}
                poster={import.meta.env.VITE_BACKEND_URL + thumbnailPath}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
            >
                Your browser does not support the video tag.
            </video>

            {/* Custom Video Controls */}
            <div className={`${styles.videoControls} ${showControls ? styles.showControls : ''}`}>
                {/* Progress Bar */}
                <div className={styles.progressContainer}>
                    <div
                        className={styles.progressBar}
                        onClick={handleProgressClick}
                    >
                        <div
                            className={styles.progressFilled}
                            // style={{ width: `50%` }}
                            style={{ width: `${(currentTime / duration) * 100}%` }}
                        />
                        <div
                            className={styles.progressThumb}
                            // style={{ left: `50%` }}
                            style={{ left: `${(currentTime / duration) * 100}%` }}
                        />
                    </div>
                </div>

                {/* Control Buttons */}
                <div className={styles.controlsRow}>
                    <div className={styles.leftControls}>
                        {/* Play/Pause Button */}
                        <button className={styles.controlButton} onClick={togglePlay}>
                            {isPlaying ? (
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                                </svg>
                            ) : (
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            )}
                        </button>

                        {/* Volume Controls */}
                        <div className={styles.volumeContainer}>
                            <button className={styles.controlButton} onClick={toggleMute}>
                                {isMuted || volume === 0 ? (
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                                    </svg>
                                ) : volume > 0.5 ? (
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                                    </svg>
                                ) : (
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z" />
                                    </svg>
                                )}
                            </button>

                            <div className={styles.volumeSlider}>
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.1"
                                    value={isMuted ? 0 : volume}
                                    onChange={handleVolumeChange}
                                    className={styles.volumeInput}
                                />
                            </div>
                        </div>

                        {/* Time Display */}
                        <div className={styles.timeDisplay}>
                            {formatTime(currentTime)} / {formatTime(duration)}
                        </div>
                    </div>

                    <div className={styles.rightControls}>
                        {/* Quality Selector */}
                        <div className={styles.qualityContainer}>
                            <button
                                className={styles.controlButton}
                                onClick={() => setShowQualityMenu(!showQualityMenu)}
                            >
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                </svg>
                                <span className={styles.qualityText}>{selectedQuality}</span>
                            </button>

                            {showQualityMenu && (
                                <div className={styles.qualityMenu}>
                                    {qualityOptions.map((quality) => (
                                        <button
                                            key={quality}
                                            className={`${styles.qualityOption} ${selectedQuality === quality ? styles.activeQuality : ''}`}
                                            onClick={() => {
                                                setSelectedQuality(quality);
                                                setShowQualityMenu(false);
                                            }}
                                        >
                                            {quality}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Fullscreen Button */}
                        <button className={styles.controlButton} onClick={toggleFullscreen}>
                            {isFullscreen ? (
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" />
                                </svg>
                            ) : (
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VideoPlayer
