import { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import styles from '../styles/Player.module.css';

const Player = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([
    {
      id: 1,
      author: 'John Doe',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
      content: 'Great tutorial! This really helped me understand React hooks better.',
      timestamp: '2 hours ago',
      likes: 12
    },
    {
      id: 2,
      author: 'Sarah Wilson',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
      content: 'Could you make a follow-up video about advanced patterns?',
      timestamp: '5 hours ago',
      likes: 8
    },
    {
      id: 3,
      author: 'Mike Chen',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
      content: 'The explanation at 5:30 was perfect. Thanks for the clear examples!',
      timestamp: '1 day ago',
      likes: 15
    },
    {
      id: 4,
      author: 'Emma Davis',
      avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
      content: 'I\'ve been struggling with this concept for weeks. This video finally made it click!',
      timestamp: '2 days ago',
      likes: 23
    }
  ]);

  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: 'ease-out-cubic',
      once: true,
      offset: 50,
    });
  }, []);

  // Mock current video data
  const currentVideo = {
    title: "React Hooks Complete Guide - useState, useEffect, and Custom Hooks",
    channel: "CodeMaster",
    subscribers: "1.2M",
    views: "856K views",
    timestamp: "3 days ago",
    likes: "12K",
    description: `In this comprehensive tutorial, we'll dive deep into React Hooks and learn how to use useState, useEffect, and create custom hooks. This video covers everything from basic concepts to advanced patterns.

🔥 What you'll learn:
• Understanding React Hooks fundamentals
• useState for state management
• useEffect for side effects
• Creating custom hooks
• Best practices and common patterns
• Real-world examples and use cases

📚 Timestamps:
0:00 Introduction
2:15 What are React Hooks?
5:30 useState Hook
12:45 useEffect Hook
20:10 Custom Hooks
28:30 Best Practices
35:00 Conclusion

💻 Source code: https://github.com/codemaster/react-hooks-guide
📖 Blog post: https://codemaster.dev/react-hooks-guide

Don't forget to like and subscribe for more React tutorials!`,
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop'
  };

  // Mock related videos data
  const relatedVideos = [
    {
      id: 1,
      title: "Advanced React Patterns You Should Know",
      channel: "React Pro",
      views: "445K views",
      timestamp: "1 week ago",
      duration: "18:30",
      thumbnail: "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop"
    },
    {
      id: 2,
      title: "JavaScript ES6+ Features Explained",
      channel: "JS Academy",
      views: "723K views",
      timestamp: "4 days ago",
      duration: "25:15",
      thumbnail: "https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop"
    },
    {
      id: 3,
      title: "Building a Full Stack App with React",
      channel: "FullStack Dev",
      views: "1.1M views",
      timestamp: "2 weeks ago",
      duration: "45:20",
      thumbnail: "https://images.pexels.com/photos/11035540/pexels-photo-11035540.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop"
    },
    {
      id: 4,
      title: "CSS Grid vs Flexbox - When to Use What",
      channel: "CSS Master",
      views: "634K views",
      timestamp: "5 days ago",
      duration: "16:45",
      thumbnail: "https://images.pexels.com/photos/574077/pexels-photo-574077.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop"
    },
    {
      id: 5,
      title: "Node.js Best Practices for Production",
      channel: "Backend Pro",
      views: "892K views",
      timestamp: "1 week ago",
      duration: "32:10",
      thumbnail: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop"
    },
    {
      id: 6,
      title: "TypeScript for React Developers",
      channel: "TypeScript Guide",
      views: "567K views",
      timestamp: "3 days ago",
      duration: "28:55",
      thumbnail: "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop"
    },
    {
      id: 7,
      title: "API Design Best Practices",
      channel: "API Master",
      views: "445K views",
      timestamp: "6 days ago",
      duration: "22:30",
      thumbnail: "https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop"
    },
    {
      id: 8,
      title: "Web Performance Optimization Tips",
      channel: "Performance Pro",
      views: "789K views",
      timestamp: "1 week ago",
      duration: "35:40",
      thumbnail: "https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop"
    }
  ];

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleSubscribe = () => {
    setIsSubscribed(!isSubscribed);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment = {
        id: comments.length + 1,
        author: 'You',
        avatar: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
        content: newComment,
        timestamp: 'Just now',
        likes: 0
      };
      setComments([comment, ...comments]);
      setNewComment('');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        {/* Video Player Section */}
        <div className={styles.videoSection}>
          <div className={styles.videoPlayer}>
            <video 
              controls 
              className={styles.video}
              poster="https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800&h=450&fit=crop"
            >
              <source src="#" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Video Info */}
          <div className={styles.videoInfo}>
            <h1 className={styles.videoTitle}>{currentVideo.title}</h1>
            
            <div className={styles.videoMeta}>
              <div className={styles.viewsAndDate}>
                <span>{currentVideo.views}</span>
                <span className={styles.separator}>•</span>
                <span>{currentVideo.timestamp}</span>
              </div>
              
              <div className={styles.actionButtons}>
                <button 
                  className={`${styles.actionButton} ${isLiked ? styles.liked : ''}`}
                  onClick={handleLike}
                >
                  <svg viewBox="0 0 24 24" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
                  </svg>
                  {currentVideo.likes}
                </button>
                
                <button className={styles.actionButton}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"/>
                  </svg>
                </button>
                
                <button className={styles.actionButton}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="18" cy="5" r="3"/>
                    <circle cx="6" cy="12" r="3"/>
                    <circle cx="18" cy="19" r="3"/>
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                  </svg>
                  Share
                </button>
              </div>
            </div>
          </div>

          {/* Channel Info */}
          <div className={styles.channelInfo}>
            <div className={styles.channelDetails}>
              <img src={currentVideo.avatar} alt={currentVideo.channel} className={styles.channelAvatar} />
              <div className={styles.channelMeta}>
                <h3 className={styles.channelName}>{currentVideo.channel}</h3>
                <p className={styles.subscriberCount}>{currentVideo.subscribers} subscribers</p>
              </div>
            </div>
            <button 
              className={`${styles.subscribeButton} ${isSubscribed ? styles.subscribed : ''}`}
              onClick={handleSubscribe}
            >
              {isSubscribed ? 'Subscribed' : 'Subscribe'}
            </button>
          </div>

          {/* Description */}
          <div className={styles.description}>
            <div className={styles.descriptionContent}>
              <p className={`${styles.descriptionText} ${showFullDescription ? styles.expanded : ''}`}>
                {currentVideo.description}
              </p>
              <button 
                className={styles.showMoreButton}
                onClick={() => setShowFullDescription(!showFullDescription)}
              >
                {showFullDescription ? 'Show less' : 'Show more'}
              </button>
            </div>
          </div>

          {/* Comments Section */}
          <div className={styles.commentsSection}>
            <div className={styles.commentsHeader}>
              <h3 className={styles.commentsTitle}>{comments.length} Comments</h3>
            </div>

            {/* Add Comment */}
            <form onSubmit={handleCommentSubmit} className={styles.addComment}>
              <img 
                src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop" 
                alt="Your avatar" 
                className={styles.commentAvatar} 
              />
              <div className={styles.commentInputContainer}>
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className={styles.commentInput}
                />
                <div className={styles.commentActions}>
                  <button 
                    type="button" 
                    className={styles.cancelButton}
                    onClick={() => setNewComment('')}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className={styles.commentButton}
                    disabled={!newComment.trim()}
                  >
                    Comment
                  </button>
                </div>
              </div>
            </form>

            {/* Comments List */}
            <div className={styles.commentsList}>
              {comments.map((comment) => (
                <div key={comment.id} className={styles.comment}>
                  <img src={comment.avatar} alt={comment.author} className={styles.commentAvatar} />
                  <div className={styles.commentContent}>
                    <div className={styles.commentHeader}>
                      <span className={styles.commentAuthor}>{comment.author}</span>
                      <span className={styles.commentTimestamp}>{comment.timestamp}</span>
                    </div>
                    <p className={styles.commentText}>{comment.content}</p>
                    <div className={styles.commentActions}>
                      <button className={styles.commentLikeButton}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
                        </svg>
                        {comment.likes}
                      </button>
                      <button className={styles.commentReplyButton}>Reply</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Videos Sidebar */}
        <div className={styles.sidebar}>
          <h3 className={styles.sidebarTitle}>Related Videos</h3>
          <div className={styles.relatedVideos}>
            {relatedVideos.map((video, index) => (
              <div 
                key={video.id} 
                className={styles.relatedVideo}
                data-aos="fade-left"
                data-aos-delay={index * 100}
              >
                <div className={styles.relatedThumbnail}>
                  <img src={video.thumbnail} alt={video.title} />
                  <span className={styles.relatedDuration}>{video.duration}</span>
                </div>
                <div className={styles.relatedInfo}>
                  <h4 className={styles.relatedTitle}>{video.title}</h4>
                  <p className={styles.relatedChannel}>{video.channel}</p>
                  <div className={styles.relatedMeta}>
                    <span>{video.views}</span>
                    <span className={styles.separator}>•</span>
                    <span>{video.timestamp}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;