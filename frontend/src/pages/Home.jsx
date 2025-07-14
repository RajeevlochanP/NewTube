import { useState } from 'react';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import styles from '../styles/Home.module.css';

const Home = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 100,
    });
  }, []);

  const handleSignIn = () => {
    setIsSignedIn(true);
  };

  const handleSignOut = () => {
    setIsSignedIn(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  // Mock video data
  const videos = [
    {
      id: 1,
      title: "React Tutorial for Beginners",
      channel: "CodeMaster",
      views: "1.2M views",
      timestamp: "2 days ago",
      thumbnail: "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop"
    },
    {
      id: 2,
      title: "JavaScript ES6 Features You Should Know",
      channel: "WebDev Pro",
      views: "856K views",
      timestamp: "1 week ago",
      thumbnail: "https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop"
    },
    {
      id: 3,
      title: "CSS Grid Layout Complete Guide",
      channel: "DesignGuru",
      views: "445K views",
      timestamp: "3 days ago",
      thumbnail: "https://images.pexels.com/photos/11035540/pexels-photo-11035540.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop"
    },
    {
      id: 4,
      title: "Node.js Backend Development",
      channel: "ServerSide",
      views: "723K views",
      timestamp: "5 days ago",
      thumbnail: "https://images.pexels.com/photos/574077/pexels-photo-574077.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop"
    },
    {
      id: 5,
      title: "Modern Web Design Trends 2025",
      channel: "CreativeStudio",
      views: "312K views",
      timestamp: "1 day ago",
      thumbnail: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop"
    },
    {
      id: 6,
      title: "Database Design Best Practices",
      channel: "DataExpert",
      views: "567K views",
      timestamp: "4 days ago",
      thumbnail: "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop"
    },
    {
      id: 7,
      title: "API Development with REST",
      channel: "BackendMaster",
      views: "892K views",
      timestamp: "6 days ago",
      thumbnail: "https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop"
    },
    {
      id: 8,
      title: "Frontend Performance Optimization",
      channel: "SpeedDev",
      views: "634K views",
      timestamp: "1 week ago",
      thumbnail: "https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop"
    }
  ];

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header} data-aos="fade-down">
        <div className={styles.headerLeft}>
          <div className={styles.logo}>
            <span className={styles.logoText}>YouTube</span>
          </div>
        </div>

        <div className={styles.headerCenter}>
          <form onSubmit={handleSearch} className={styles.searchForm}>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
            <button type="submit" className={styles.searchButton}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </form>
        </div>

        <div className={styles.headerRight}>
          <nav className={styles.navigation}>
            <a href="#" className={styles.navLink}>Home</a>
            <a href="#" className={styles.navLink}>Library</a>
            {isSignedIn ? (
              <>
                <a href="#" className={styles.navLink}>Profile</a>
                <button onClick={handleSignOut} className={styles.signOutButton}>
                  Sign Out
                </button>
              </>
            ) : (
              <button onClick={handleSignIn} className={styles.signInButton}>
                Sign In
              </button>
            )}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className={styles.main} data-aos="fade-up" data-aos-delay="200">
        <div className={styles.videoGrid}>
          {videos.map((video, index) => (
            <div 
              key={video.id} 
              className={styles.videoCard}
              data-aos="zoom-in"
              data-aos-delay={300 + (index * 100)}
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
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;