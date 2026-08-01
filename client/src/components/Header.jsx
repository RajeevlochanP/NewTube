import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import UploadModal from './UploadModal';

const Header = () => {
  const { isAuthenticated, logout, loading } = useContext(AuthContext);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/auth');
  };

  return (
    <>
      <header className="header">
        <Link to="/" className="header-brand">NewTube</Link>
        
        <div className="header-nav">
          {!loading && (
            <>
              {isAuthenticated ? (
                <>
                  <Link to="/my-videos" className="btn btn-secondary">My Videos</Link>
                  <button onClick={() => setIsUploadModalOpen(true)} className="btn btn-secondary">
                    Upload Video
                  </button>
                  <button onClick={handleLogout} className="btn btn-primary">
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/auth" className="btn btn-primary">Login</Link>
              )}
            </>
          )}
        </div>
      </header>

      {isUploadModalOpen && (
        <UploadModal onClose={() => setIsUploadModalOpen(false)} />
      )}
    </>
  );
};

export default Header;
