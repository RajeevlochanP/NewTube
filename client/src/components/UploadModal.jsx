import React, { useState } from 'react';
import { apiClient } from '../api/client';

const UploadModal = ({ onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [visibility, setVisibility] = useState('public');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a video file.');
      return;
    }
    
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // 1. Initiate upload
      const initiateResponse = await apiClient('/videos/upload/initiate', {
        method: 'POST',
        body: JSON.stringify({
          title,
          description,
          visibility,
          originalName: file.name,
          mimeType: file.type || 'video/mp4',
          size: file.size
        })
      });

      if (!initiateResponse.success) {
        throw new Error(initiateResponse.error || 'Failed to initiate upload');
      }

      const { presignedUrl } = initiateResponse;

      // 2. Upload file directly to S3 (or local object storage depending on backend) using presigned URL
      // We use standard fetch here, without our apiClient, as this goes to S3 and we don't want to attach cookies or JSON content type
      const uploadResponse = await fetch(presignedUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type || 'video/mp4'
        }
      });

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload file to storage server.');
      }

      setSuccess('Video uploaded successfully! It is now processing.');
      setTimeout(() => {
        onClose();
      }, 2000);
      
    } catch (err) {
      console.error(err);
      setError(err.message || 'An error occurred during upload.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">Upload Video</h2>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>
        
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Title</label>
            <input 
              type="text" 
              className="form-control" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              required 
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea 
              className="form-control" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              rows="3"
            ></textarea>
          </div>
          
          <div className="form-group">
            <label className="form-label">Visibility</label>
            <select 
              className="form-control" 
              value={visibility} 
              onChange={(e) => setVisibility(e.target.value)}
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>
          
          <div className="form-group">
            <label className="form-label">Video File (MP4)</label>
            <input 
              type="file" 
              className="form-control" 
              accept="video/mp4,video/x-m4v,video/*" 
              onChange={handleFileChange} 
              required 
            />
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadModal;
