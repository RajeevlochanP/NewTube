import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiClient } from '../api/client';

const HomePage = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const [hasNext, setHasNext] = useState(false);

  const fetchFeed = async (pageNo = 0) => {
    try {
      setLoading(true);
      const data = await apiClient(`/videos/feed?page=${pageNo}`);
      if (data.success) {
        if (pageNo === 0) {
          setVideos(data.videos);
        } else {
          setVideos((prev) => [...prev, ...data.videos]);
        }
        setHasNext(data.hasNext);
      }
    } catch (err) {
      setError('Failed to fetch videos. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeed(0);
  }, []);

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchFeed(nextPage);
  };

  if (loading && page === 0) {
    return <div>Loading videos...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }
  console.log(videos);

  return (
    <div>
      {/* <h1 style={{ marginBottom: '1.5rem' }}>Recommended</h1> */}
      <div className="video-grid">
        {videos.length === 0 ? (
          <p>No videos available yet.</p>
        ) : (
          videos.map((video) => (
            <Link to={`/watch/${video._id}`} key={video._id} className="video-card">
              {video.thumbnailPath ? (
                <img src={video.thumbnailPath} alt={video.title} className="video-thumbnail" />
              ) : (
                <div className="video-thumbnail"></div>
              )}
              <div className="video-info">
                <h3 className="video-title">{video.title}</h3>
                <div className="video-meta">
                  {video.uploadedBy?.name || 'Unknown User'} • {new Date(video.uploadTime).toLocaleDateString()}
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
      {hasNext && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
          <button className="btn btn-secondary" onClick={loadMore} disabled={loading}>
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
