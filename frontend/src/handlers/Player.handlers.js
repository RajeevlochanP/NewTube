export const likeHandler=async(isLiked,videoId)=>{
    if(!videoId) {
        console.log("video id missing");
        return false;
    }
    let res=await fetch(`http://localhost:3000/upload/toggleLike/${videoId}`,{
        method:'POST',
        credentials:"include",
        headers:{
            "content-type":"application/json"
        }
    });
    let data=await res.json();
    console.log("data from likeHandler: ",data);
    if(res.status==200) return true;
    return false;
}

export const subscribeHandler=async ()=>{
    
}

export const addNewComment=async (vidoeId,comment)=>{
    
}