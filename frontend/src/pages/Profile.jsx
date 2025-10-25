import { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import styles from '../styles/Profile.module.css';

const Profile = () => {
  const [user, setUser] = useState({
    username: 'john_doe',
    email: 'john.doe@example.com',
    joinDate: 'January 2023',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
  });

  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [newUsername, setNewUsername] = useState(user.username);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: 'ease-out-cubic',
      once: true,
      offset: 100,
    });
  }, []);

  const handleUsernameEdit = () => {
    setIsEditingUsername(true);
    setNewUsername(user.username);
  };

  const handleUsernameSave = () => {
    if (newUsername.trim() && newUsername !== user.username) {
      setUser(prev => ({ ...prev, username: newUsername.trim() }));
    }
    setIsEditingUsername(false);
  };

  const handleUsernameCancel = () => {
    setNewUsername(user.username);
    setIsEditingUsername(false);
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    if (passwordData.newPassword.length < 6) {
      alert('Password must be at least 6 characters long!');
      return;
    }
    // Simulate password change
    alert('Password changed successfully!');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setIsChangingPassword(false);
  };

  const handleLogout = () => {
    // send logout request to server 
    localStorage.removeItem('token');
    alert('Logged out successfully!');
    setShowLogoutModal(false);
    // Redirect to login page or home page
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header} data-aos="fade-down">
        <div className={styles.headerContent}>
          <h1 className={styles.headerTitle}>Profile Settings</h1>
          <p className={styles.headerSubtitle}>Manage your account information and preferences</p>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.main}>
        {/* Profile Card */}
        <div className={styles.profileCard} data-aos="fade-up" data-aos-delay="200">
          <div className={styles.profileHeader}>
            <div className={styles.avatarContainer}>
              <img src={user.avatar} alt="Profile" className={styles.avatar} />
              <button className={styles.avatarEditButton}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                  <path d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
              </button>
            </div>
            <div className={styles.profileInfo}>
              <div className={styles.usernameSection}>
                {isEditingUsername ? (
                  <div className={styles.editUsername}>
                    <input
                      type="text"
                      value={newUsername}
                      onChange={(e) => setNewUsername(e.target.value)}
                      className={styles.usernameInput}
                      autoFocus
                    />
                    <div className={styles.editButtons}>
                      <button onClick={handleUsernameSave} className={styles.saveButton}>Save</button>
                      <button onClick={handleUsernameCancel} className={styles.cancelButton}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div className={styles.usernameDisplay}>
                    <h2 className={styles.username}>{user.username}</h2>
                    <button onClick={handleUsernameEdit} className={styles.editButton}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                        <path d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                      </svg>
                    </button>
                  </div>
                )}
              </div>
              <p className={styles.email}>{user.email}</p>
              <p className={styles.joinDate}>Member since {user.joinDate}</p>
            </div>
          </div>
        </div>

        {/* Settings Cards */}
        <div className={styles.settingsGrid}>
          {/* Change Password Card */}
          <div className={styles.settingsCard} data-aos="fade-up" data-aos-delay="300">
            <div className={styles.cardHeader}>
              <div className={styles.cardIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <circle cx="12" cy="16" r="1"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </div>
              <div>
                <h3 className={styles.cardTitle}>Change Password</h3>
                <p className={styles.cardDescription}>Update your password to keep your account secure</p>
              </div>
            </div>
            
            {!isChangingPassword ? (
              <button 
                onClick={() => setIsChangingPassword(true)} 
                className={styles.actionButton}
              >
                Change Password
              </button>
            ) : (
              <form onSubmit={handlePasswordSubmit} className={styles.passwordForm}>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Current Password</label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    className={styles.input}
                    required
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>New Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    className={styles.input}
                    required
                    minLength="6"
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Confirm New Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    className={styles.input}
                    required
                    minLength="6"
                  />
                </div>
                <div className={styles.formButtons}>
                  <button type="submit" className={styles.submitButton}>Update Password</button>
                  <button 
                    type="button" 
                    onClick={() => setIsChangingPassword(false)} 
                    className={styles.cancelFormButton}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Account Settings Card */}
          <div className={styles.settingsCard} data-aos="fade-up" data-aos-delay="400">
            <div className={styles.cardHeader}>
              <div className={styles.cardIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                </svg>
              </div>
              <div>
                <h3 className={styles.cardTitle}>Account Settings</h3>
                <p className={styles.cardDescription}>Manage your account preferences and privacy settings</p>
              </div>
            </div>
            <button className={styles.actionButton}>Manage Settings</button>
          </div>

          {/* Logout Card */}
          <div className={styles.settingsCard} data-aos="fade-up" data-aos-delay="500">
            <div className={styles.cardHeader}>
              <div className={`${styles.cardIcon} ${styles.dangerIcon}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                  <polyline points="16,17 21,12 16,7"/>
                  <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
              </div>
              <div>
                <h3 className={styles.cardTitle}>Sign Out</h3>
                <p className={styles.cardDescription}>Sign out of your account on this device</p>
              </div>
            </div>
            <button 
              onClick={() => setShowLogoutModal(true)} 
              className={`${styles.actionButton} ${styles.dangerButton}`}
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className={styles.modalOverlay} data-aos="fade-in">
          <div className={styles.modal} data-aos="zoom-in" data-aos-delay="100">
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>Confirm Sign Out</h3>
            </div>
            <div className={styles.modalBody}>
              <p>Are you sure you want to sign out of your account?</p>
            </div>
            <div className={styles.modalFooter}>
              <button onClick={handleLogout} className={styles.confirmButton}>
                Yes, Sign Out
              </button>
              <button 
                onClick={() => setShowLogoutModal(false)} 
                className={styles.cancelModalButton}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;