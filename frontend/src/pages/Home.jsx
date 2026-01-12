import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';
import Header from '../components/Header';
import VideoCard from '../components/VideoCard';
import { getVideosByPage } from '../apiCalls/Home.js';
import toast from 'react-hot-toast';

const Home = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    async function loadVideos() {
      let data = await getVideosByPage(0);
      if (data) {
        setVideos(data.videos);
        console.log("data: ", data);
        return;
      } else {
        toast.error("Error while fetching videos");
      }
    }
    loadVideos();
  }, []);

  return (
    <div className={styles.container}>
      {/* Main Content */}
      <main className={styles.main}>
        <div className={styles.videoGrid}>
          {videos.map((video, index) => (
            <VideoCard key={video._id} video={video} index={index} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;