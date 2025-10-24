export const getVideosByPage=async (page)=>{
    let res=await fetch(`http://localhost:3000/stream/videos/${page}`,{
        method:'GET',
        credentials:"include",
        headers:{
            "content-type":"application/json"
        },
    });
    let data=await res.json();
    if(res.status==200) return data;
    return null;
}

export const getVideosById=async (videoId)=>{
    let res=await fetch(`http://localhost:3000/stream/${videoId}`,{
        method:'GET',
        credentials:'include',
        headers:{
            "content-type":"application/json"
        }
    });
    return res;
}