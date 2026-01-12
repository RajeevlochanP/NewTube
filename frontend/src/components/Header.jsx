import React from 'react'
import { useState } from 'react';
import styles from '../styles/Home.module.css'
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authActions, userActions } from '../store';
import { logoutCall } from '../apiCalls/Authentication';
import toast from 'react-hot-toast';

function Header() {
    const [searchQuery, setSearchQuery] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const username = useSelector(state => state.user.username);

    const handleSignOut = async () => {
        try {
            const res = await logoutCall();
            dispatch(authActions.logout());
            dispatch(userActions.clearProfile());
            toast.success('Signed out successfully');
            navigate('/');
        } catch (error) {
            // Still logout on client side even if server call fails
            dispatch(authActions.logout());
            dispatch(userActions.clearProfile());
            toast.success('Signed out');
            navigate('/');
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Searching for:', searchQuery);
    };

    return (
        <header className={styles.header}>
            <div className={styles.headerLeft}>
                <NavLink to="/">
                    <div className={styles.logo}>
                        <span className={styles.logoText}>NewTube</span>
                    </div>
                </NavLink>
            </div>

            {/* Search - commented out for now
            <div className={styles.headerCenter}>
                <form onSubmit={handleSearch} className={styles.searchForm}>
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={styles.searchInput}
                    />
                    <button type="submit" className={styles.searchButton}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </form>
            </div>
            */}

            <div className={styles.headerRight}>
                <nav className={styles.navigation}>
                    <NavLink to="/" className={styles.navLink}>Home</NavLink>
                    <NavLink to="/library" className={styles.navLink}>Library</NavLink>
                    {isAuthenticated ? (
                        <>
                            <NavLink to="/profile" className={styles.navLink}>
                                {username || 'Profile'}
                            </NavLink>
                            <button onClick={handleSignOut} className={styles.signOutButton}>
                                Sign Out
                            </button>
                        </>
                    ) : (
                        <NavLink to="/auth">
                            <button className={styles.signInButton}>
                                Sign In
                            </button>
                        </NavLink>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default Header
