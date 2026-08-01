import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Hls from 'hls.js';
import { apiClient } from '../api/client';

const VideoPlayer = () => {
  const { videoId } = useParams();
  const videoRef = useRef(null);
  const hlsRef = useRef(null); // Keeps track of HLS instance without causing re-renders

  const [videoDetails, setVideoDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [qualities, setQualities] = useState([]); // Only stores the available resolutions once

  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        const data = await apiClient(`/videos/${videoId}`);
        if (data.success) setVideoDetails(data.video);
        else setError(data.error || 'Failed to load video.');
      } catch (err) {
        setError('Error fetching video details.');
      } finally {
        setLoading(false);
      }
    };
    fetchVideoDetails();
  }, [videoId]);

  useEffect(() => {
    if (!videoDetails?.m3u8Path || !videoRef.current) return;

    const video = videoRef.current;
    const src = videoDetails.m3u8Path;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hlsRef.current = hls;

      hls.loadSource(src);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
        // Only show the dropdown if FFmpeg actually generated more than 1 quality
        if (data.levels.length > 1) {
          setQualities(data.levels);
        }
      });

      return () => {
        hls.destroy();
      };
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src; // Safari fallback
    }
  }, [videoDetails]);

  const handleQualityChange = (e) => {
    if (hlsRef.current) {
      hlsRef.current.nextLevel = Number(e.target.value);
    }
  };

  if (loading) return <div>Loading player...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!videoDetails) return <div>Video not found.</div>;

  return (
    <div className="player-container">
      <div
        className="video-wrapper"
        style={{
          display: 'flex',
          flexDirection: 'column',
          aspectRatio: 'auto',
          overflow: 'visible',
          backgroundColor: 'transparent'
        }}
      >
        {videoDetails.status === 'ready' ? (
          <>
            <video
              ref={videoRef}
              controls
              style={{
                width: '100%',
                maxHeight: '70vh',
                objectFit: 'contain',
                backgroundColor: '#000',
                flexShrink: 1,
                minHeight: 0,
                borderRadius: '8px'
              }}
            />

            {/* MINIMAL QUALITY SELECTOR */}
            {qualities.length > 0 && (
              <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
                <label htmlFor="qualitySelector" style={{ fontWeight: 'bold' }}>Quality:</label>
                <select
                  id="qualitySelector"
                  onChange={handleQualityChange}
                  defaultValue="-1"
                  style={{ padding: '5px', borderRadius: '4px' }}
                >
                  <option value="-1">Auto</option>
                  {qualities.map((level, index) => (
                    <option key={index} value={index}>
                      {level.height}p
                    </option>
                  ))}
                </select>
              </div>
            )}
          </>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '400px', backgroundColor: '#333', color: '#fff' }}>
            Video is currently processing...
          </div>
        )}
      </div>

      <div className="player-details" style={{ marginTop: '1.5rem' }}>
        <h1 className="player-title">{videoDetails.title}</h1>
        <div className="video-meta" style={{ marginTop: '0.5rem', marginBottom: '1rem', color: '#666' }}>
          {videoDetails.uploadedBy?.name || 'Unknown User'} • {new Date(videoDetails.uploadTime).toLocaleDateString()}
        </div>
        <div style={{ backgroundColor: '#f9f9f9', padding: '1rem', borderRadius: '8px' }}>
          <p style={{ whiteSpace: 'pre-wrap', margin: 0 }}>{videoDetails.description || 'No description available.'}</p>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;