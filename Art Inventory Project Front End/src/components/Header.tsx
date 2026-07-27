import { useState } from 'react';
import './Header.css';

const Header = () => {
  // User input in the search box
  const [searchQuery, setSearchQuery] = useState('');

  // Notifications dropdown is visible
  const [showNotifications, setShowNotifications] = useState(false);

  // User menu dropdown is visible
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Hardcoded logged-in user - will be replaced with real auth later
  const currentUser = {
    name: 'Jane Doe',
    email: 'jane.doe@artdb.com',
    role: 'Admin',
    initials: 'JD',
  };

  // Called every time the user types in the search box
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Called when the user clicks the bell icon
  const handleNotificationsClick = () => {
    setShowNotifications(!showNotifications);
  };

  // Called when the user clicks the settings icon
  const handleSettingsClick = () => {
    console.log('Settings clicked');
  };

  // Called when the user clicks their name/avatar
  const handleUserMenuClick = () => {
    setShowUserMenu(!showUserMenu);
    setShowNotifications(false);
  };

  // Called when the user clicks Log out
  const handleLogout = () => {
    console.log('Logout clicked');
    // Will be wired up to AuthContext later
  };

  return (
    <header className="header">

      {/* Left side - search bar */}
      <div className="header-left">
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search artworks, contacts..."
            value={searchQuery}
            onChange={handleSearch}
            className="search-input"
          />
        </div>
      </div>

      {/* Right side - notifications, settings, user info */}
      <div className="header-right">

        {/* Bell icon for notifications */}
        <div className="icon-button" onClick={handleNotificationsClick}>
          <span className="icon">🔔</span>
          {/* Red dot to show there are unread notifications */}
          <span className="notification-dot"></span>

          {/* Notifications dropdown - only shows when bell is clicked */}
          {showNotifications && (
            <div className="notifications-dropdown">
              <p className="notifications-title">Notifications</p>
              <p className="notification-item">No new notifications</p>
            </div>
          )}
        </div>

        {/* Settings gear icon */}
        <div className="icon-button" onClick={handleSettingsClick}>
          <span className="icon">⚙️</span>
        </div>

        {/* Divider line between icons and user info */}
        <div className="header-divider"></div>

        {/* Logged in user info - clicking opens the user menu */}
        <div className="user-info" onClick={handleUserMenuClick}>
          {/* User avatar - shows initials */}
          <div className="user-avatar">{currentUser.initials}</div>
          <div className="user-details">
            <p className="user-name">{currentUser.name}</p>
            <p className="user-role">{currentUser.role}</p>
          </div>
          <span className="user-chevron">{showUserMenu ? '▲' : '▼'}</span>
        </div>

        {/* User menu dropdown - only shows when user info is clicked */}
        {showUserMenu && (
          <div className="user-menu">

            {/* User summary at the top of the menu */}
            <div className="user-menu-header">
              <div className="user-menu-avatar">{currentUser.initials}</div>
              <div>
                <p className="user-menu-name">{currentUser.name}</p>
                <p className="user-menu-email">{currentUser.email}</p>
              </div>
            </div>

            <div className="user-menu-divider"></div>

            {/* Menu options */}
            <button className="user-menu-item">My Profile</button>
            <button className="user-menu-item">Account Settings</button>

            <div className="user-menu-divider"></div>

            <button className="user-menu-item user-menu-logout" onClick={handleLogout}>
              Log out
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;