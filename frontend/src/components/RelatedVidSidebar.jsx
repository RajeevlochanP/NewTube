import React from 'react'
import styles from '../styles/Player.module.css'
import RelatedVid from './RelatedVid';

function RelatedVidSidebar() {
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

    return (
        <div className={styles.sidebar}>
            <h3 className={styles.sidebarTitle}>Related Videos</h3>
            <div className={styles.relatedVideos}>
                {relatedVideos.map((video, index) => (
                    <RelatedVid key={video.id} video={video} index={index} />
                ))}
            </div>
        </div>
    )
}

export default RelatedVidSidebar
