export const likeHandler=async(isLiked,videoId)=>{
    let res=await fetch(`http://localhost:3000/stream/toggleLike/${videoId}`,{
        method:'POST',
        credentials:"include",
        headers:{
            "content-type":"application/json"
        }
    });
    if(res.status==200) return true;
    return false;
}

export const subscribeHandler=async ()=>{
    
}

export const addNewComment=async (vidoeId,comment)=>{
    
}