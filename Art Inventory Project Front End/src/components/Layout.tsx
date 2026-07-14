import Header from './Header';
import Sidebar from './Sidebar';
import './Layout.css';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="layout">

      {/* Top bar - spans the full width */}
      <Header />

      {/* Below the header - sidebar on left, page content on right */}
      <div className="layout-body">

        <Sidebar />

        {/* children is whatever page is currently active */}
        <main className="layout-main">
          {children}
        </main>

      </div>

    </div>
  );
};

export default Layout;