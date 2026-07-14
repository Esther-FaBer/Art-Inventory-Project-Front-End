import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">

      {/* Logo at the top */}
      <div className="sidebar-logo">
        <span className="logo-text">ArtDB</span>
      </div>

      {/* Navigation links */}
      <nav className="sidebar-nav">
        <NavLink to="/artworks" className="nav-link">Artworks</NavLink>
        <NavLink to="/artists" className="nav-link">Artists</NavLink>
        <NavLink to="/contacts" className="nav-link">Contacts</NavLink>
        <NavLink to="/sales" className="nav-link">Sales</NavLink>
        <NavLink to="/marketing" className="nav-link">Marketing</NavLink>
        <NavLink to="/accounts" className="nav-link">Accounts</NavLink>
      </nav>

    </aside>
  );
};

export default Sidebar;