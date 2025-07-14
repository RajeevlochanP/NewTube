import { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import styles from '../styles/Library.module.css';

const Library = () => {
  const [activeTab, setActiveTab] = useState('liked');

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 100,
    });
  }, []);

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

  const currentVideos = activeTab === 'liked' ? likedVideos : watchLaterVideos;

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <div className={styles.hero} data-aos="fade-down">
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Your Library</h1>
          <p className={styles.heroSubtitle}>
            Discover your saved content and continue watching where you left off
          </p>
        </div>
        <div className={styles.heroBackground}></div>
      </div>

      {/* Tab Navigation */}
      <div className={styles.tabContainer} data-aos="fade-up" data-aos-delay="200">
        <div className={styles.tabWrapper}>
          <button
            className={`${styles.tab} ${activeTab === 'liked' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('liked')}
          >
            <svg className={styles.tabIcon} viewBox="0 0 24 24" fill="none">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Liked Videos
            <span className={styles.tabCount}>{likedVideos.length}</span>
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'watchLater' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('watchLater')}
          >
            <svg className={styles.tabIcon} viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
              <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Watch Later
            <span className={styles.tabCount}>{watchLaterVideos.length}</span>
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className={styles.content}>
        <div className={styles.sectionHeader} data-aos="fade-right" data-aos-delay="300">
          <h2 className={styles.sectionTitle}>
            {activeTab === 'liked' ? 'Videos You Liked' : 'Watch Later Queue'}
          </h2>
          <p className={styles.sectionSubtitle}>
            {activeTab === 'liked' 
              ? 'Your favorite videos all in one place' 
              : 'Videos saved for later viewing'}
          </p>
        </div>

        {/* Video Grid */}
        <div className={styles.videoGrid}>
          {currentVideos.map((video, index) => (
            <div 
              key={video.id} 
              className={styles.videoCard}
              data-aos="zoom-in"
              data-aos-delay={400 + (index * 100)}
            >
              <div className={styles.thumbnailContainer}>
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  className={styles.thumbnail}
                />
                <div className={styles.duration}>{video.duration}</div>
                <div className={styles.overlay}>
                  <button className={styles.playButton}>
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5,3 19,12 5,21"/>
                    </svg>
                  </button>
                </div>
                <div className={styles.actionButtons}>
                  <button className={styles.actionButton} title="Remove from library">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="3,6 5,6 21,6"/>
                      <path d="m19,6v14a2,2 0 0,1-2,2H7a2,2 0 0,1-2-2V6m3,0V4a2,2 0 0,1,2-2h4a2,2 0 0,1,2,2v2"/>
                    </svg>
                  </button>
                  <button className={styles.actionButton} title="Share">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
                      <polyline points="16,6 12,2 8,6"/>
                      <line x1="12" y1="2" x2="12" y2="15"/>
                    </svg>
                  </button>
                </div>
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
          ))}
        </div>

        {/* Empty State */}
        {currentVideos.length === 0 && (
          <div className={styles.emptyState} data-aos="fade-up" data-aos-delay="400">
            <div className={styles.emptyIcon}>
              {activeTab === 'liked' ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12,6 12,12 16,14"/>
                </svg>
              )}
            </div>
            <h3 className={styles.emptyTitle}>
              {activeTab === 'liked' ? 'No liked videos yet' : 'No videos in watch later'}
            </h3>
            <p className={styles.emptyDescription}>
              {activeTab === 'liked' 
                ? 'Videos you like will appear here' 
                : 'Videos you save for later will appear here'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Library;