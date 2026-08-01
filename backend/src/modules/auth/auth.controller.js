import { signupService, loginService } from "./auth.service.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    // console.log(req.body);
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ success: false, error: "All fields (name, email, password, confirmPassword) are required" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, error: "Password and confirm password do not match" });
    }
    const response = await signupService(name, email, password);
    if (!response.success) {
      return res.status(response.status).json({ success: false, error: response.message });
    }
    res.cookie("token", response.token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000,
      path: "/",
    });
    return res.status(response.status).json({
      success: true,
      message: "Sign up successful",
      user: response.user,
    });
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, error: "Both email and password are required" });
    }
    const response = await loginService(email, password);
    if (!response.success) {
      return res.status(response.status).json({ success: false, error: response.message });
    }
    res.cookie("token", response.token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000,
      path: "/",
    });
    return res.status(response.status).json({
      success: true,
      message: "Login successful",
      user: response.user,
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", { path: "/" });
    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (err) {
    console.error("Logout error:", err);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
};
