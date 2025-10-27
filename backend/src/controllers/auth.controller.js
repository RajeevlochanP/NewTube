import { loginService, signupService } from "../services/auth.service.js";

export const signup = async (req, res) => {
    const { name,email, password, confirmPassword } = req.body;
    if (!name || !email || !password || !confirmPassword) {
        res.status(400).json({ success:false,error: "must send name,email,password,confirmPassword" });
    }
    if (password !== confirmPassword) {
        res.status(400).json({ success:false,error: "password didn't match with confirm password" });
    }
    const response = await signupService(name,email, password);
    if (!response.success) {
        res.status(409).json({ success:false,error: response.message });
    } else {
        res.cookie('token', response.token, {
            httpOnly: true,         
            maxAge: 24 * 60 * 60 * 1000,
            path: "/",
        });
        return res.status(201).json({
            success:true,
            message: "Sign up successful"
        });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ error: "Both email and password are required" });
    }
    const response = await loginService(email, password);
    if (!response.success) {
        return res.status(401).json({ success:false,error: response.message });
    } else {
        // console.log(response.token);
        res.cookie('token', response.token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            path: "/",
        });
        return res.status(200).json({
            success:true,
            message: 'Login successful',
            token: response.token,
        });
    }
}