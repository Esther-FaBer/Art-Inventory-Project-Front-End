import { NavLink } from 'react-router-dom';
import Header from './Header';
import './Layout.css';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="layout">

      {/* Top bar - search, notifications, user menu */}
      <Header />

      {/* Horizontal nav bar - logo on left, links across */}
      <nav className="nav-bar">
        <span className="nav-logo">ArtDB</span>
        <div className="nav-links">
          <NavLink to="/artworks" className="nav-link">Artworks</NavLink>
          <NavLink to="/artists" className="nav-link">Artists</NavLink>
          <NavLink to="/contacts" className="nav-link">Contacts</NavLink>
          <NavLink to="/sales" className="nav-link">Sales</NavLink>
          <NavLink to="/marketing" className="nav-link">Marketing</NavLink>
          <NavLink to="/accounts" className="nav-link">Accounts</NavLink>
        </div>
      </nav>

      {/* Page content */}
      <main className="layout-main">
        {children}
      </main>

    </div>
  );
};

export default Layout;