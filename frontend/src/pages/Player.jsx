import { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import styles from '../styles/Player.module.css';
import RelatedVid from '../components/RelatedVid';
import CommentsBox from '../components/CommentsBox';
import VideoPlayer from '../components/VideoPlayer';
import VideoDetails from '../components/VideoDetails';
import RelatedVidSidebar from '../components/RelatedVidSidebar';

const Player = () => { 
  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: 'ease-out-cubic',
      once: true,
      offset: 50,
    });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        {/* Video Player Section */}
        <div className={styles.videoSection}>
          <VideoPlayer />

        {/* Video details and channel details  */}
          <VideoDetails />

          {/* Comments Section */}
          <CommentsBox />
        </div>

        {/* Related Videos Sidebar */}
        <RelatedVidSidebar />
      </div>
    </div>
  );
};

export default Player;