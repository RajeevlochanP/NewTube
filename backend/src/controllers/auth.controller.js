import { loginService, signupService } from "../services/auth.service.js";

export const signup = async (req, res) => {
    const { email, password, confirmPassword } = req.body;
    if (!email || !password || !confirmPassword) {
        res.status(400).json({ error: "must send email,password,confirmPassword" });
    }
    if (password !== confirmPassword) {
        res.status(400).json({ error: "password didn't match with confirm password" });
    }
    const response = await signupService(email, password);
    if (!response.success) {
        res.status(409).json({ error: response.message });
    } else {
        res.cookie('token', response.token, {
            httpOnly: true,         
            maxAge: 24 * 60 * 60 * 1000,
            path: "/",
        });
        return res.status(200).json({
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
        return res.status(401).json({ error: response.message });
    } else {
        // console.log(response.token);
        res.cookie('token', response.token, {
            httpOnly: true,        
            maxAge: 24 * 60 * 60 * 1000,
            path: "/",
        });
        return res.status(200).json({
            message: 'Login successful'
        });
    }
}