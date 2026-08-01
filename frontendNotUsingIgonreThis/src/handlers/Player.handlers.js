export const likeHandler=async(isLiked,videoId)=>{
    if(!videoId) {
        console.log("video id missing");
        return false;
    }
    let res=await fetch(`http://localhost:3000/upload/toggleLike/${videoId}`,{
        method:'PATCH',
        credentials:"include",
        headers:{
            "content-type":"application/json"
        }
    });
    let data=await res.json();
    console.log("data from likeHandler: ",data);
    return data.liked;
}

export const subscribeHandler=async ()=>{
    
}

export const addNewComment=async (vidoeId,comment)=>{
    
}