import { useState } from 'react';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import styles from '../styles/Home.module.css';
import Header from '../components/Header';
import VideoCard from '../components/VideoCard';

const Home = () => {

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 100,
    });
  }, []);

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
      <Header />
      {/* Main Content */}
      <main className={styles.main} data-aos="fade-up" data-aos-delay="200">
        <div className={styles.videoGrid}>
          {videos.map((video, index) => (
            <VideoCard key={video.id} video={video} index={index}/>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;