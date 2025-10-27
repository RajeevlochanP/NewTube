import React from 'react'
import AOS from 'aos';
import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css'
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../store';
import { logoutCall } from '../apiCalls/Authentication';
import toast from 'react-hot-toast';

function Header() {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    useEffect(() => {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 100,
        });
    }, []);

    const handleSignOut = async () => {
        setIsSignedIn(false);
        dispatch(authActions.logout());
        // let res = await logoutCall();
        // if (res.success) {
        //     setIsSignedIn(false);
        //     dispatch(authActions.logout());
        //     toast.success(res.msg);
        //     return ;
        // }
        // toast.error(res.msg);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Searching for:', searchQuery);
    };

    return (
        <div>
            <header className={styles.header} data-aos="fade-down">
                <div className={styles.headerLeft}>
                    <a href={window.location.origin}>
                        <div className={styles.logo}>
                            <span className={styles.logoText}>NewTube</span>
                        </div>
                    </a>
                </div>

                {/* <div className={styles.headerCenter}>
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
                </div> */}

                <div className={styles.headerRight}>
                    <nav className={styles.navigation}>
                        <NavLink to={'/'} className={styles.navLink}>Home</NavLink>
                        <NavLink to={'/library'} className={styles.navLink}>Library</NavLink>
                        {isAuthenticated ? (
                            <>
                                <NavLink to={"/profile"} className={styles.navLink}>Profile</NavLink>
                                <button onClick={handleSignOut} className={styles.signOutButton}>
                                    Sign Out
                                </button>
                            </>
                        ) : (
                            <NavLink to={'/auth'}>
                                <button  className={styles.signInButton}>
                                    Sign In
                                </button>
                            </NavLink>
                        )}
                    </nav>
                </div>
            </header>
        </div>
    )
}

export default Header
