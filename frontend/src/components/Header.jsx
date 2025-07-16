import React from 'react'
import AOS from 'aos';
import { useState,useEffect } from 'react';
import styles from '../styles/Home.module.css'

function Header() {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    
    useEffect(() => {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 100,
        });
    }, []);

    const handleSignIn = () => {
        setIsSignedIn(true);
    };

    const handleSignOut = () => {
        setIsSignedIn(false);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Searching for:', searchQuery);
    };

    return (
        <div>
            <header className={styles.header} data-aos="fade-down">
                <div className={styles.headerLeft}>
                    <div className={styles.logo}>
                        <span className={styles.logoText}>YouTube</span>
                    </div>
                </div>

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

                <div className={styles.headerRight}>
                    <nav className={styles.navigation}>
                        <a href="#" className={styles.navLink}>Home</a>
                        <a href="#" className={styles.navLink}>Library</a>
                        {isSignedIn ? (
                            <>
                                <a href="#" className={styles.navLink}>Profile</a>
                                <button onClick={handleSignOut} className={styles.signOutButton}>
                                    Sign Out
                                </button>
                            </>
                        ) : (
                            <button onClick={handleSignIn} className={styles.signInButton}>
                                Sign In
                            </button>
                        )}
                    </nav>
                </div>
            </header>
        </div>
    )
}

export default Header
