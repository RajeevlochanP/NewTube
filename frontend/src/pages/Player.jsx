import { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import styles from '../styles/Player.module.css';
import RelatedVid from '../components/RelatedVid';
import CommentsBox from '../components/CommentsBox';
import VideoPlayer from '../components/VideoPlayer';
import VideoDetails from '../components/VideoDetails';
import RelatedVidSidebar from '../components/RelatedVidSidebar';
import { useParams } from 'react-router-dom';
import { getVideosById } from '../apiCalls/Home.js';
import toast from 'react-hot-toast';

const Player = () => { 
  const [video,setVideo]=useState(null);
  const [comments,setComments]=useState([]);
  
  const {id} =useParams();
  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: 'ease-out-cubic',
      once: true,
      offset: 50,
    });
    async function loadVideoById(id) {
      let res=await getVideosById(id);
      if(!res) {
        toast.error("Error while playing video");
        return ;
      }
      let data=await res.json();
      if(data.success) {
        setVideo(data.video);
      }
      toast.error(data.error);
    }
    // loadVideoById(id);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        {/* Video Player Section */}
        {/* pass poster , src , type to this */}
        <div className={styles.videoSection}>
          <VideoPlayer videoId={id}/>

        {/* Video details and channel details  */}
        {/*  pass likes, description ,subscription data and videoId to this*/}
          <VideoDetails />

          {/* Comments Section */}
          {/* pass comments to this */}
          <CommentsBox videoId={id} comments={comments}/>
        </div>

        {/* Related Videos Sidebar */}
        {/* fetch related videos by genere and pass */}
        <RelatedVidSidebar />
      </div>
    </div>
  );
};

export default Player;