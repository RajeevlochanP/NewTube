import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiClient } from '../api/client';

const MyVideos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMyVideos = async () => {
      try {
        const data = await apiClient('/videos/user');
        if (data.success) {
          setVideos(data.videos);
        } else {
          setError(data.error || 'Failed to load your videos.');
        }
      } catch (err) {
        setError('Error fetching your videos.');
      } finally {
        setLoading(false);
      }
    };
    fetchMyVideos();
  }, []);

  if (loading) return <div>Loading your videos...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div>
      <h1 style={{ marginBottom: '1.5rem' }}>My Videos</h1>
      <div className="video-grid">
        {videos.length === 0 ? (
          <p>You haven't uploaded any videos yet.</p>
        ) : (
          videos.map((video) => (
            <div key={video._id} className="video-card">
              <Link to={`/watch/${video._id}`}>
                {video.thumbnailPath ? (
                  <img src={video.thumbnailPath} alt={video.title} className="video-thumbnail" />
                ) : (
                  <div className="video-thumbnail" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#e0e0e0', color: '#666' }}>
                    {video.status === 'ready' ? 'No Thumbnail' : 'Processing...'}
                  </div>
                )}
              </Link>
              <div className="video-info">
                <Link to={`/watch/${video._id}`}>
                  <h3 className="video-title">{video.title}</h3>
                </Link>
                <div className="video-meta">
                  {/* FIX: Changed video.createdAt to video.uploadTime */}
                  Status: {video.status} • {video.visibility} • {new Date(video.uploadTime).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyVideos;