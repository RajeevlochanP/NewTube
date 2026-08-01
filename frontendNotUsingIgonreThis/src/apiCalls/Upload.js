export const uploadVideoCall = async (title, description, genre, video) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("genre", genre);
    formData.append("video", video); 

    let res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/upload/video`, {
        method: "POST",
        credentials: "include",
        body: formData 
    });

    return res;
};