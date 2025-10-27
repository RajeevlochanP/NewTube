import toast from "react-hot-toast";

export function timeAgo(uploadTime) {
        const now = new Date();
        const uploaded = new Date(uploadTime);
        const diffMs = now - uploaded;

        const seconds = Math.floor(diffMs / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const months = Math.floor(days / 30);
        const years = Math.floor(days / 365);

        if (years > 0) return `${years} year${years > 1 ? 's' : ''} ago`;
        if (months > 0) return `${months} month${months > 1 ? 's' : ''} ago`;
        if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
        if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
}

export const fetchMyVideos = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}upload/myvideos`, {
            method: "GET",
            headers: { 
                "Content-Type": "application/json",
            },
            credentials:"include",
        });
        if (!response.ok) {
            toast.error("Failed to fetch videos.");
        } else {
            toast.success("Videos fetched successfully.");
        }
        return await response.json();
    } catch (error) {
        toast.error("An error occurred while fetching videos.");
        console.error("Error fetching videos:", error);
    }
};

export const fetchLikedVideos = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}upload/likedVideos`, {
            method: "GET",
            headers: { 
                "Content-Type": "application/json",
            },
            credentials:"include",
        });
        if (!response.ok) {
            toast.error("Failed to fetch videos.");
        } else {
            toast.success("Videos fetched successfully.");
        }
        return await response.json();
    } catch (error) {
        toast.error("An error occurred while fetching videos.");
        console.error("Error fetching videos:", error);
    }
};