import { NavLink } from 'react-router-dom';
import Header from './Header';
import Toast from './Toast';
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

      {/* Footer */}
      <footer className="footer">
        <div className="footer-left">
          <span className="footer-logo">ArtDB</span>
          <span className="footer-tagline">Art inventory management</span>
        </div>
        <div className="footer-center">
          <NavLink to="/artworks" className="footer-link">Artworks</NavLink>
          <NavLink to="/artists" className="footer-link">Artists</NavLink>
          <NavLink to="/contacts" className="footer-link">Contacts</NavLink>
          <NavLink to="/sales" className="footer-link">Sales</NavLink>
        </div>
        <div className="footer-right">
          <p className="footer-copy">© {new Date().getFullYear()} ArtDB. All rights reserved.</p>
        </div>
      </footer>

      <Toast />

    </div>
  );
};

export default Layout;