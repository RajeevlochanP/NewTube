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

export const addCommentCall = async (videoId,comment)=>{
    let res=await fetch(`http://localhost:3000/stream/addComment/${videoId}`,{
        method:'POST',
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify({
            comment
        })
    });
    let data=await res.json();
    return data.success===true
}

export const deleteCommentCall=async ()=> {

}