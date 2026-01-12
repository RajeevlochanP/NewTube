import jwt from 'jsonwebtoken';
import { getUserByEmail, addUser, getUserById } from '../daos/user.dao.js';

export const signupService = async (name,email, password) => {
    const user = await getUserByEmail(email);
    // console.log("sdfjkk :");
    if (user.length!==0) {
        return { success: false, message: "Email already Exists" };
    }
    const newUser = await addUser(name,email, password);
    const payload = { _id: newUser._id };
    const token=jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '24h'
    });
    return {success: true,token:token};
}

export const loginService = async (email, password) => {
    const user = await getUserByEmail(email);
    if (user.length===0) {
        return { success: false, message: "No user exists for the given email" };
    }
    // console.log(user);
    // console.log(user[0].password);
    if (user[0].password === password) {
        const payload = {
            _id: user[0]._id,
        };
        console.log(payload);
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '24h'
        });

        return { success: true, token };
    } else {
        return { success: false, message: "Wrong password for the given email" };
    }
};

export const getUserDetailsService=async(userId)=>{
    try{
        const user=await getUserById(userId);
        if(!user){
            return {success:false,message:"User not found"};
        }
        return {success:true,user};
    }catch(err){
        console.error("Error in getUserDetailsService:",err);
        return {success:false,message:"Internal server error"};
    }
}