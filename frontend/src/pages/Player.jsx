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
  const [video, setVideo] = useState(null);
  // const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: 'ease-out-cubic',
      once: true,
      offset: 50,
    });

    async function loadVideoById(id) {
      try {
        const data = await getVideosById(id);
        console.log("data: ", data);

        if (data.success) {
          setVideo(data.video);
          // setComments(data.video.comments || []);
        } else {
          toast.error(data.error);
        }
      } catch (error) {
        console.error("Error loading video:", error);
        toast.error("Failed to load video");
      } finally {
        setLoading(false);
      }
    }

    loadVideoById(id);
  }, [id]);

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.videoSection}>
          {loading ? (
            <p>Loading...</p>
          ) : video ? (
            <>
              <VideoPlayer 
              videoId={id}
              thumbnailPath={video.thumbnailPath}
              />
              <VideoDetails 
                videoId={id} 
                likeStatus={video.isLiked} 
                description={video.description} 
                title={video.title}
                channel={video.uploadedBy.name}
                likesCount={video.likesCount}
                uploadTime={video.uploadTime}
              />
              <CommentsBox videoId={id} commentss={video.comments} />
            </>
          ) : (
            <p>Failed to load video.</p>
          )}
        </div>

        {/* <RelatedVidSidebar /> */}
      </div>
    </div>
  );
};

export default Player;
