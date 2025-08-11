export const likeVideoCall=async (videoId) => {
    let res=await fetch(`http://localhost:3000/stream/toggleLike/${videoId}`,{
        method:'POST',
        headers:{
            "content-type":"application/json"
        }
    })
    let data=await res.json();
    return data.success===true
}

export const addCommentCall = async (videoId)=>{
    let res=await fetch(`http://localhost:3000/stream/addComment/${video}`,{
        method:'POST',
        headers:{
            "content-type":"application/json"
        }
    })
}

export const deleteCommentCall=async ()=> {

}