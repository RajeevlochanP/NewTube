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
    let res=await fetch(`${import.meta.env.VITE_BACKEND_URL}upload/addComment/${videoId}`,{
        method:'POST',
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify({
            comment
        }),
        credentials:"include",
    });
    let data=await res.json();
    return data;
}

export const deleteCommentCall=async ()=> {

}