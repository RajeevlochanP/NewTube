import { useState } from 'react';
import styles from '../styles/Upload.module.css';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Upload = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    genres: [],
    tags: '',
    video: null,
    thumbnail: null
  });

  const [dragActive, setDragActive] = useState(false);
  const [thumbnailDragActive, setThumbnailDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const navigator = useNavigate();

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

  const handleGenreToggle = (genre) => {
    setFormData(prev => ({
      ...prev,
      genres: prev.genres.includes(genre)
        ? prev.genres.filter(g => g !== genre)
        : [...prev.genres, genre]
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('video/')) {
      setFormData(prev => ({
        ...prev,
        video: file
      }));
    } else {
      alert('Please select a valid video file');
    }
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setFormData(prev => ({
        ...prev,
        thumbnail: file
      }));
    } else {
      alert('Please select a valid image file');
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
        video: file
      }));
    } else {
      alert('Please drop a valid video file');
    }
  };

  const handleThumbnailDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setThumbnailDragActive(true);
    } else if (e.type === 'dragleave') {
      setThumbnailDragActive(false);
    }
  };

  const handleThumbnailDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setThumbnailDragActive(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setFormData(prev => ({
        ...prev,
        thumbnail: file
      }));
    } else {
      alert('Please drop a valid image file');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    if (!formData.title.trim()) {
      alert('Please enter a title');
      return;
    }

    if (!formData.video) {
      alert('Please select a video file');
      return;
    }

    if (!formData.thumbnail) {
      alert('Please select a thumbnail image');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    // do apiCall here to upload
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("genre", JSON.stringify(formData.genres)); // arrays need JSON.stringify
    formDataToSend.append("video", formData.video);       // File object
    formDataToSend.append("thumbnail", formData.thumbnail); // File object
    formDataToSend.append("visibility","public");

    let res = await fetch('http://localhost:3000/upload/video', {
      method: 'POST',
      credentials: 'include',
      body: formDataToSend
    });

    let response = await res.json();
    console.log(response);

    if (!response.success) {
      toast.error("Upload failed");
      return;
    }

    setIsUploading(false);
    setUploadProgress(100);

    toast.success("Uploaded Successfully.!");
    setFormData({
      title: '',
      description: '',
      genres: [],
      tags: '',
      video: null,
      thumbnail: null
    })
    // Navigate to Profile page.!
    return;
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
              className={`${styles.dropZone} ${dragActive ? styles.dragActive : ''} ${formData.video ? styles.hasFile : ''}`}
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

              {!formData.video ? (
                <div className={styles.dropContent}>
                  <div className={styles.uploadIcon}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7,10 12,5 17,10" />
                      <line x1="12" y1="5" x2="12" y2="15" />
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
                      <polygon points="23,7 16,12 23,17" />
                      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                    </svg>
                  </div>
                  <div className={styles.fileDetails}>
                    <h4>{formData.video.name}</h4>
                    <p>{formatFileSize(formData.video.size)}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, video: null }))}
                    className={styles.removeFile}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Thumbnail Upload */}
          <div className={styles.section}>
            <label className={styles.sectionTitle}>Thumbnail Image *</label>
            <div
              className={`${styles.thumbnailDropZone} ${thumbnailDragActive ? styles.dragActive : ''} ${formData.thumbnail ? styles.hasFile : ''}`}
              onDragEnter={handleThumbnailDrag}
              onDragLeave={handleThumbnailDrag}
              onDragOver={handleThumbnailDrag}
              onDrop={handleThumbnailDrop}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleThumbnailChange}
                className={styles.fileInput}
                id="thumbnailFile"
              />

              {!formData.thumbnail ? (
                <div className={styles.dropContent}>
                  <div className={styles.imageIcon}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21,15 16,10 5,21" />
                    </svg>
                  </div>
                  <h3>Upload thumbnail image</h3>
                  <p>or <label htmlFor="thumbnailFile" className={styles.browseLink}>browse to choose a file</label></p>
                  <div className={styles.fileInfo}>
                    <p>Supported formats: JPG, PNG, GIF</p>
                    <p>Recommended: 1280x720 pixels</p>
                  </div>
                </div>
              ) : (
                <div className={styles.thumbnailSelected}>
                  <div className={styles.thumbnailPreview}>
                    <img
                      src={URL.createObjectURL(formData.thumbnail)}
                      alt="Thumbnail preview"
                      className={styles.thumbnailImage}
                    />
                  </div>
                  <div className={styles.fileDetails}>
                    <h4>{formData.thumbnail.name}</h4>
                    <p>{formatFileSize(formData.thumbnail.size)}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, thumbnail: null }))}
                    className={styles.removeFile}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
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
              maxLength="1000"
            />
            <div className={styles.charCount}>{formData.description.length}/1000</div>
          </div>

          {/* Genres */}
          <div className={styles.section}>
            <label className={styles.sectionTitle}>Genres</label>
            <div className={styles.genreButtons}>
              {genres.map(genre => (
                <button
                  key={genre}
                  type="button"
                  onClick={() => handleGenreToggle(genre)}
                  className={`${styles.genreButton} ${formData.genres.includes(genre) ? styles.genreSelected : ''}`}
                >
                  {genre}
                </button>
              ))}
            </div>
            <div className={styles.genreHelp}>
              Select one or more genres that best describe your video
            </div>
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
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17,8 12,3 7,8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
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