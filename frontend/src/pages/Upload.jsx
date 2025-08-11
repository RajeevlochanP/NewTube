import { useState } from 'react';
import styles from '../styles/Upload.module.css';
import toast from 'react-hot-toast';
import { uploadVideoCall } from '../apiCalls/Upload';

const Upload = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    genre: '',
    tags: '',
    videoFile: null
  });

  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const genres = [
    'Education',
    'Entertainment',
    'Music',
    'Gaming',
    'Technology',
    'Sports',
    'News',
    'Comedy',
    'Travel',
    'Food',
    'Lifestyle',
    'Science',
    'Art',
    'Documentary',
    'Other'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('video/')) {
      setFormData(prev => ({
        ...prev,
        videoFile: file
      }));
    } else {
      alert('Please select a valid video file');
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('video/')) {
      setFormData(prev => ({
        ...prev,
        videoFile: file
      }));
    } else {
      alert('Please drop a valid video file');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      toast.error('Please enter a title');
      return;
    }
    
    if (!formData.videoFile) {
      toast.error('Please select a video file');
      return;
    }

    // Simulate upload process
    setIsUploading(true);
    setUploadProgress(0);

    let res=await uploadVidoeCall(formData.title,formData.description,formData.genre,formData.videoFile);
    setUploadProgress(80);

    let data=await res.json();
    setUploadProgress(100);
    
    if(data.success) {
      toast.success(data.message);
      return ;
    }
    toast.error(data.message);
    
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Upload Your Video</h1>
        <p className={styles.subtitle}>Share your content with the world</p>
      </div>

      <div className={styles.uploadCard}>
        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Video File Upload */}
          <div className={styles.section}>
            <label className={styles.sectionTitle}>Video File</label>
            <div 
              className={`${styles.dropZone} ${dragActive ? styles.dragActive : ''} ${formData.videoFile ? styles.hasFile : ''}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                className={styles.fileInput}
                id="videoFile"
              />
              
              {!formData.videoFile ? (
                <div className={styles.dropContent}>
                  <div className={styles.uploadIcon}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="7,10 12,5 17,10"/>
                      <line x1="12" y1="5" x2="12" y2="15"/>
                    </svg>
                  </div>
                  <h3>Drag and drop your video here</h3>
                  <p>or <label htmlFor="videoFile" className={styles.browseLink}>browse to choose a file</label></p>
                  <div className={styles.fileInfo}>
                    <p>Supported formats: MP4, AVI, MOV, WMV</p>
                    <p>Maximum file size: 2GB</p>
                  </div>
                </div>
              ) : (
                <div className={styles.fileSelected}>
                  <div className={styles.fileIcon}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="23,7 16,12 23,17"/>
                      <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
                    </svg>
                  </div>
                  <div className={styles.fileDetails}>
                    <h4>{formData.videoFile.name}</h4>
                    <p>{formatFileSize(formData.videoFile.size)}</p>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => setFormData(prev => ({ ...prev, videoFile: null }))}
                    className={styles.removeFile}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18"/>
                      <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Title */}
          <div className={styles.section}>
            <label htmlFor="title" className={styles.sectionTitle}>Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter video title"
              className={styles.input}
              maxLength="100"
              required
            />
            <div className={styles.charCount}>{formData.title.length}/100</div>
          </div>

          {/* Description */}
          <div className={styles.section}>
            <label htmlFor="description" className={styles.sectionTitle}>Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Tell viewers about your video"
              className={styles.textarea}
              rows="4"
              maxLength="500"
            />
            <div className={styles.charCount}>{formData.description.length}/500</div>
          </div>

          {/* Genre */}
          <div className={styles.section}>
            <label htmlFor="genre" className={styles.sectionTitle}>Genre</label>
            <select
              id="genre"
              name="genre"
              value={formData.genre}
              onChange={handleInputChange}
              className={styles.select}
            >
              <option value="">Select a genre</option>
              {genres.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
          </div>

          {/* Tags */}
          <div className={styles.section}>
            <label htmlFor="tags" className={styles.sectionTitle}>Tags</label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleInputChange}
              placeholder="Enter tags separated by commas (e.g., tutorial, javascript, coding)"
              className={styles.input}
            />
            <div className={styles.tagHelp}>
              Use tags to help people discover your video. Separate tags with commas.
            </div>
          </div>

          {/* Upload Progress */}
          {isUploading && (
            <div className={styles.progressSection}>
              <div className={styles.progressLabel}>
                Uploading... {uploadProgress}%
              </div>
              <div className={styles.progressBar}>
                <div 
                  className={styles.progressFill}
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className={styles.submitSection}>
            <button 
              type="submit" 
              className={styles.submitButton}
              disabled={isUploading}
            >
              {isUploading ? (
                <>
                  <div className={styles.spinner}></div>
                  Uploading...
                </>
              ) : (
                <>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="17,8 12,3 7,8"/>
                    <line x1="12" y1="3" x2="12" y2="15"/>
                  </svg>
                  Upload Video
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Upload;