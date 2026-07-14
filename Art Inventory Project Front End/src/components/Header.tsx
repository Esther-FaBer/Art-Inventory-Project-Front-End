import { useState } from 'react';
import './Header.css';

const Header = () => {
  // User input in the search box
  const [searchQuery, setSearchQuery] = useState('');

  // Notifications dropdown is visible
  const [showNotifications, setShowNotifications] = useState(false);

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

        {/* Logged in user info */}
        <div className="user-info">
          {/* User avatar - shows initials */}
          <div className="user-avatar">JD</div>
          <div className="user-details">
            <p className="user-name">Jane Doe</p>
            <p className="user-role">Admin</p>
          </div>
        </div>

      </div>

    </header>
  );
};

export default Header;