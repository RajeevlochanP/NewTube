import { useState, useEffect, act } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
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
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 100,
    });
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
      // apiCall and setCurrentVideos
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

  // Mock data for user's uploaded videos
  const myVideos = [
    {
      id: 1,
      title: "My First React Tutorial - Getting Started",
      channel: "My Channel",
      views: "1.2K views",
      timestamp: "2 days ago",
      duration: "15:30",
      thumbnail: "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&fit=crop",
      status: "Published"
    },
    {
      id: 2,
      title: "JavaScript Tips and Tricks for Beginners",
      channel: "My Channel",
      views: "856 views",
      timestamp: "5 days ago",
      duration: "22:45",
      thumbnail: "https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&fit=crop",
      status: "Published"
    },
    {
      id: 3,
      title: "CSS Grid Layout Complete Guide",
      channel: "My Channel",
      views: "445 views",
      timestamp: "1 week ago",
      duration: "18:20",
      thumbnail: "https://images.pexels.com/photos/11035540/pexels-photo-11035540.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&fit=crop",
      status: "Published"
    },
    {
      id: 4,
      title: "Building a REST API with Node.js",
      channel: "My Channel",
      views: "723 views",
      timestamp: "1 week ago",
      duration: "35:15",
      thumbnail: "https://images.pexels.com/photos/574077/pexels-photo-574077.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&fit=crop",
      status: "Processing"
    },
    {
      id: 5,
      title: "Web Design Trends 2025 - What's New",
      channel: "My Channel",
      views: "312 views",
      timestamp: "2 weeks ago",
      duration: "28:40",
      thumbnail: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&fit=crop",
      status: "Draft"
    }
  ];

  // Mock data for liked videos
  const likedVideos = [
    {
      id: 1,
      title: "Advanced React Patterns and Best Practices",
      channel: "React Masters",
      views: "2.1M views",
      timestamp: "1 week ago",
      duration: "24:15",
      thumbnail: "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&fit=crop"
    },
    {
      id: 2,
      title: "JavaScript Performance Optimization Techniques",
      channel: "CodeOptimizer",
      views: "1.8M views",
      timestamp: "3 days ago",
      duration: "18:42",
      thumbnail: "https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&fit=crop"
    },
    {
      id: 3,
      title: "Modern CSS Grid and Flexbox Masterclass",
      channel: "DesignPro",
      views: "956K views",
      timestamp: "5 days ago",
      duration: "32:08",
      thumbnail: "https://images.pexels.com/photos/11035540/pexels-photo-11035540.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&fit=crop"
    },
    {
      id: 4,
      title: "Node.js Microservices Architecture",
      channel: "BackendGuru",
      views: "1.3M views",
      timestamp: "1 week ago",
      duration: "45:30",
      thumbnail: "https://images.pexels.com/photos/574077/pexels-photo-574077.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&fit=crop"
    },
    {
      id: 5,
      title: "UI/UX Design Principles for Developers",
      channel: "DesignThinking",
      views: "742K views",
      timestamp: "2 days ago",
      duration: "28:17",
      thumbnail: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&fit=crop"
    },
    {
      id: 6,
      title: "Database Design and Optimization",
      channel: "DataExpert",
      views: "1.1M views",
      timestamp: "4 days ago",
      duration: "36:45",
      thumbnail: "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&fit=crop"
    }
  ];

  // Mock data for watch later videos
  const watchLaterVideos = [
    {
      id: 7,
      title: "Complete Docker Tutorial for Beginners",
      channel: "DevOps Master",
      views: "3.2M views",
      timestamp: "2 weeks ago",
      duration: "1:12:30",
      thumbnail: "https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&fit=crop"
    },
    {
      id: 8,
      title: "Machine Learning with Python",
      channel: "AI Academy",
      views: "2.8M views",
      timestamp: "1 week ago",
      duration: "52:18",
      thumbnail: "https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&fit=crop"
    },
    {
      id: 9,
      title: "Cybersecurity Fundamentals",
      channel: "SecureCode",
      views: "1.9M views",
      timestamp: "3 days ago",
      duration: "41:22",
      thumbnail: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&fit=crop"
    },
    {
      id: 10,
      title: "Cloud Computing with AWS",
      channel: "CloudExpert",
      views: "2.4M views",
      timestamp: "5 days ago",
      duration: "38:55",
      thumbnail: "https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&fit=crop"
    },
    {
      id: 11,
      title: "Blockchain Development Tutorial",
      channel: "CryptoCode",
      views: "1.6M views",
      timestamp: "1 week ago",
      duration: "55:12",
      thumbnail: "https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&fit=crop"
    }
  ];

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
      <div className={styles.hero} data-aos="fade-down">
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
        <div className={styles.tabContainer} data-aos="fade-up" data-aos-delay="200">
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
            <div className={styles.uploadSection} data-aos="fade-right" data-aos-delay="250">
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

          <div className={styles.sectionHeader} data-aos="fade-right" data-aos-delay="300">
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
                data-aos="zoom-in"
                data-aos-delay={400 + (index * 100)}
              >
                <div className={styles.thumbnailContainer}>
                  <img
                    src={import.meta.env.VITE_BACKEND_URL + video.thumbnailPath}
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
            <div className={styles.emptyState} data-aos="fade-up" data-aos-delay="400">
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