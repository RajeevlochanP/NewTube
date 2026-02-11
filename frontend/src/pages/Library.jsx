import { useState, useEffect } from 'react';
import styles from '../styles/Library.module.css';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { uploadVideoCall } from '../apiCalls/Upload';
import { fetchMyVideos, timeAgo, fetchLikedVideos } from '../apiCalls/library';
import toast from "react-hot-toast";

const Library = () => {
  const [activeTab, setActiveTab] = useState('myVideos');
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const [currentVideos, setCurrentVideos] = useState([]);

  useEffect(() => {
    console.log("active tab: ", activeTab);
    if (activeTab === 'myVideos') {
      async function forAwait() {
        const response = await fetchMyVideos();
        console.log(response.videos);
        if (response.success) {
          setCurrentVideos(response.videos);
        }
      }
      forAwait();
    }
    else if (activeTab === 'liked') {
      async function forAwait() {
        const response = await fetchLikedVideos();
        console.log(response.videos);
        if (response.success) {
          setCurrentVideos(response.likedVideos);
        }
      }
      forAwait();
    }
    else if (activeTab === 'watchLater') {
      // apiCall
    }
  }, [activeTab]);


  const getCurrentVideos = () => {
    switch (activeTab) {
      case 'myVideos':
        return currentVideos;
      case 'liked':
        return currentVideos;
      case 'watchLater':
        return currentVideos;
      default:
        return currentVideos;
    }
  };

  // const currentVideos = getCurrentVideos();

  const handleUpload = async () => {
    // Placeholder for upload functionality
    console.log('Upload video clicked');
  };

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <div className={styles.hero}>
        {isAuthenticated ? <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Your Library</h1>
          <p className={styles.heroSubtitle}>
            Discover your saved content and continue watching where you left off
          </p>
        </div>
          :
          <div className={styles.heroContent}>
            <h1>Please login to manage your library</h1>
          </div>
        }
        <div className={styles.heroBackground}></div>
      </div>

      {/* Tab Navigation */}
      {isAuthenticated &&
        <div className={styles.tabContainer}>
          <div className={styles.tabWrapper}>
            <button
              className={`${styles.tab} ${activeTab === 'myVideos' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('myVideos')}
            >
              <svg className={styles.tabIcon} viewBox="0 0 24 24" fill="none">
                <path d="M23 7l-7 5 7 5V7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2" stroke="currentColor" strokeWidth="2" />
              </svg>
              My Videos

              {activeTab === 'myVideos' && (
                <span className={styles.tabCount}>{currentVideos.length}</span>
              )}
            </button>
            <button
              className={`${styles.tab} ${activeTab === 'liked' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('liked')}
            >
              <svg className={styles.tabIcon} viewBox="0 0 24 24" fill="none">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Liked Videos
              {activeTab === 'liked' && (
                <span className={styles.tabCount}>{currentVideos.length}</span>
              )}
            </button>
            {/* <button
              className={`${styles.tab} ${activeTab === 'watchLater' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('watchLater')}
            >
              <svg className={styles.tabIcon} viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Watch Later
              {activeTab === 'watchLater' && (
                <span className={styles.tabCount}>{currentVideos.length}</span>
              )}
            </button> */}
          </div>
        </div>}

      {isAuthenticated &&
        <div className={styles.content}>
          {/* Upload Button - Only show in My Videos tab */}
          {activeTab === 'myVideos' && (
            <div className={styles.uploadSection}>
              <NavLink to={'/upload'}>
                <button onClick={handleUpload} className={styles.uploadButton}>
                  <svg className={styles.uploadIcon} viewBox="0 0 24 24" fill="none">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <polyline points="7,10 12,5 17,10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <line x1="12" y1="5" x2="12" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  Upload Video
                </button>
              </NavLink>
            </div>
          )}

          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              {activeTab === 'myVideos' ? 'Your Uploaded Videos' :
                activeTab === 'liked' ? 'Videos You Liked' : 'Watch Later Queue'}
            </h2>
            <p className={styles.sectionSubtitle}>
              {activeTab === 'myVideos'
                ? 'Manage and track your uploaded content'
                : activeTab === 'liked'
                  ? 'Your favorite videos all in one place'
                  : 'Videos saved for later viewing'}
            </p>
          </div>

          {/* Video Grid */}
          <div className={styles.videoGrid}>
            {currentVideos.map((video, index) => (
              <div
                key={video._id}
                className={styles.videoCard}
              >
                <div className={styles.thumbnailContainer}>
                  <img
                    src={import.meta.env.VITE_BACKEND_URL+ "/" + video.thumbnailPath}
                    alt={video.title}
                    className={styles.thumbnail}
                  />
                  <div className={styles.duration}>{video.duration}</div>
                  {/* Status badge for My Videos */}
                  {activeTab === 'myVideos' && (
                    <div className={`${styles.statusBadge} ${styles[video.visibility.toLowerCase()]}`}>
                      {video.visibility}
                    </div>
                  )}
                  <div className={styles.overlay}>
                    <button className={styles.playButton}>
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="5,3 19,12 5,21" />
                      </svg>
                    </button>
                  </div>
                  <div className={styles.actionButtons}>
                    <button className={styles.actionButton} title={activeTab === 'myVideos' ? 'Edit video' : 'dislike'}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        {activeTab === 'myVideos' ? (
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        ) : (
                          <polyline points="3,6 5,6 21,6" />
                        )}
                        {activeTab === 'myVideos' ? (
                          <path d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        ) : (
                          <path d="m19,6v14a2,2 0 0,1-2,2H7a2,2 0 0,1-2-2V6m3,0V4a2,2 0 0,1,2-2h4a2,2 0 0,1,2,2v2" />
                        )}
                      </svg>
                    </button>
                    <button className={styles.actionButton} title="Share" onClick={() => { navigator.clipboard.writeText(window.location.origin + "/player/" + video._id); toast.success("Link copied to clipboard") }}>
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        width="24"
                        height="24"
                      >
                        <circle cx="18" cy="5" r="3" />
                        <circle cx="6" cy="12" r="3" />
                        <circle cx="18" cy="19" r="3" />
                        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className={styles.videoInfo}>
                  <h3 className={styles.videoTitle}>{video.title}</h3>
                  <p className={styles.channelName}>{video.uploadedBy.name}</p>
                  <div className={styles.videoMeta}>
                    <span>{"views not implemented"}</span>
                    <span className={styles.separator}>•</span>
                    <span>{timeAgo(video.uploadTime)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {currentVideos.length === 0 && (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>
                {activeTab === 'myVideos' ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M23 7l-7 5 7 5V7z" />
                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                  </svg>
                ) : activeTab === 'liked' ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12,6 12,12 16,14" />
                  </svg>
                )}
              </div>
              <h3 className={styles.emptyTitle}>
                {activeTab === 'myVideos' ? 'No uploaded videos yet' :
                  activeTab === 'liked' ? 'No liked videos yet' : 'No videos in watch later'}
              </h3>
              <p className={styles.emptyDescription}>
                {activeTab === 'myVideos'
                  ? 'Start creating content by uploading your first video'
                  : activeTab === 'liked'
                    ? 'Videos you like will appear here'
                    : 'Videos you save for later will appear here'}
              </p>
            </div>
          )}
        </div>}

    </div>
  );
};

export default Library;