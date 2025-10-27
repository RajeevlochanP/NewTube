export const loginCall=async (email,password)=>{
    let res=await fetch('http://localhost:3000/auth/login',{
        method:'POST',
        headers:{
            "content-type":'application/json'
        },
        credentials:'include',
        body:JSON.stringify({
            email:email,
            password:password
        })
    });
    let response=await res.json();
    return response
}

export const signupCall=async (name,email,password,confirmPassword)=>{
    if(password!== confirmPassword) return "Passwords did not match";

    let res=await fetch('http://localhost:3000/auth/signup',{
        method:'POST',
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify({
            name,
            email,
            password,
            confirmPassword
        })
    });
    let response=await res.json();
    if(res.ok) return {msg:response.message ,  success:true}
    return {msg:response.error , success:false}
}

export const logoutCall=async ()=> {
    let res=await fetch('http://localhost:3000/auth/logout',{
        method:'DELETE',
        headers:{
            "content-type":"application/json"
        },
    });
    let response=await res.json();
    if(res.success) {
        return {
            success:true,
            msg:response.message
        }
    }
    return {
        success:false,
        msg:response.error
    }
}