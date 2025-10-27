import { useState } from 'react';
import styles from '../styles/Auth.module.css';
import { useSelector,useDispatch } from 'react-redux';
import {authActions} from '../store/index.js'
import { useNavigate } from 'react-router-dom';
import { loginCall,signupCall } from '../apiCalls/Authentication.js';
import toast from 'react-hot-toast';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const dispatch=useDispatch();
  const navigate=useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isLogin && formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    if(isLogin) {   // Login flow
      setIsLoading(true);
      let response=await loginCall(formData.email , formData.password);
      setIsLoading(false);

      if(response.success) {
        localStorage.setItem("accessToken" , response.token);
        dispatch(authActions.login());
        navigate('/');
        toast.success(res.msg);
        return ;
      }
      toast.error(res.msg);
      return ;
    }

    else { // Signup flow-------------------------------->
      setIsLoading(true);
      let res=await signupCall(formData.firstName+" "+formData.lastName,formData.email , formData.password , formData.confirmPassword);
      setIsLoading(false);

      if(res.success) {
        dispatch(authActions.login());
        navigate('/');
        toast.success(res.msg);
        return ;
      }
      toast.error(res.msg);
      return ;
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: ''
    });
  };

  return (
    <div className={styles.container}>
      {/* Animated Background Bubbles */}
      <div className={styles.bubbles}>
        {[...Array(20)].map((_, index) => (
          <div 
            key={index} 
            className={styles.bubble}
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 15}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      {/* Auth Card */}
      <div className={styles.authCard}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className={styles.subtitle}>
            {isLogin 
              ? 'Sign in to your account to continue' 
              : 'Join us and start sharing your videos'
            }
          </p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Name Fields - Only for Sign Up */}
          {!isLogin && (
            <div className={styles.nameRow}>
              <div className={styles.inputGroup}>
                <label htmlFor="firstName" className={styles.label}>First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder="Enter your first name"
                  required={!isLogin}
                />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="lastName" className={styles.label}>Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder="Enter your last name"
                  required={!isLogin}
                />
              </div>
            </div>
          )}

          {/* Email */}
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={styles.input}
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}
          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={styles.input}
              placeholder="Enter your password"
              required
              minLength="6"
            />
          </div>

          {/* Confirm Password - Only for Sign Up */}
          {!isLogin && (
            <div className={styles.inputGroup}>
              <label htmlFor="confirmPassword" className={styles.label}>Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={styles.input}
                placeholder="Confirm your password"
                required
                minLength="6"
              />
            </div>
          )}

          {/* Forgot Password Link - Only for Login */}
          {isLogin && (
            <div className={styles.forgotPassword}>
              <a href="#" className={styles.forgotLink}>Forgot your password?</a>
            </div>
          )}

          {/* Submit Button */}
          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className={styles.spinner}></div>
                {isLogin ? 'Signing In...' : 'Creating Account...'}
              </>
            ) : (
              <>
                {isLogin ? 'Sign In' : 'Create Account'}
                <svg className={styles.buttonIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14"/>
                  <path d="M12 5l7 7-7 7"/>
                </svg>
              </>
            )}
          </button>
        </form>

        {/* Toggle Auth Mode */}
        <div className={styles.footer}>
          <p className={styles.toggleText}>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button 
              type="button" 
              onClick={toggleAuthMode}
              className={styles.toggleButton}
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>

        {/* Social Login Options */}
        <div className={styles.divider}>
          <span className={styles.dividerText}>or continue with</span>
        </div>

        <div className={styles.socialButtons}>
          <button type="button" className={styles.socialButton}>
            <svg viewBox="0 0 24 24" className={styles.socialIcon}>
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Google
          </button>
          <button type="button" className={styles.socialButton}>
            <svg viewBox="0 0 24 24" className={styles.socialIcon}>
              <path fill="currentColor" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Facebook
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;