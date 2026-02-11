import { loginService, signupService,getUserDetailsService } from "../services/auth.service.js";

export const signup = async (req, res) => {
    const { name,email, password, confirmPassword } = req.body;
    if (!name || !email || !password || !confirmPassword) {
        return res.status(400).json({ success:false,error: "must send name,email,password,confirmPassword" });
    }
    if (password !== confirmPassword) {
        return res.status(400).json({ success:false,error: "password didn't match with confirm password" });
    }
    const response = await signupService(name,email, password);
    if (!response.success) {
        return res.status(409).json({ success:false,error: response.message });
    } else {
        res.cookie('token', response.token, {
            httpOnly: true,         
            maxAge: 24 * 60 * 60 * 1000,
            path: "/",
        });
        return res.status(201).json({
            success:true,
            message: "Sign up successful",
            user: response.user
        });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Both email and password are required" });
    }
    const response = await loginService(email, password);
    if (!response.success) {
        return res.status(401).json({ success:false,error: response.message });
    } else {
        res.cookie('token', response.token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            path: "/",
        });
        return res.status(200).json({
            success:true,
            message: 'Login successful',
            user: response.user,
        });
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie('token', { path: '/' });
        return res.status(200).json({
            success: true,
            message: "Logged out successfully"
        });
    } catch (err) {
        console.error("Logout error:", err);
        return res.status(500).json({
            success: false,
            error: "Internal server error"
        });
    }
}

export const getMyDetails = async (req, res) => {
    const user = req.user;
    if(!user){
        return res.status(404).json({
            success:false,
            message:"User not found"
        });
    }
    const response = await getUserDetailsService(user._id);
    if(!response.success){
        return res.status(500).json({
            success:false,
            message:"Could not fetch user details"
        });
    }
    return res.status(200).json({
        success:true,
        user: response.user
    });
}