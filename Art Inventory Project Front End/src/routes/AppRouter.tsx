import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import ArtworksPage from '../components/ArtworksPage';
import ArtistsPage from '../components/ArtistsPage';
import ContactsPage from '../components/ContactsPage';
import SalesPage from '../components/SalesPage';

<Route path="/sales" element={<Layout><SalesPage /></Layout>} />
const NotFound     = () => <div>404 - Page not found</div>;

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout><ArtworksPage /></Layout>} />
        <Route path="/artworks" element={<Layout><ArtworksPage /></Layout>} />
        <Route path="/artists" element={<Layout><ArtistsPage /></Layout>} />
        <Route path="/contacts" element={<Layout><ContactsPage /></Layout>} />
        <Route path="/sales" element={<Layout><SalesPage /></Layout>} />
        <Route path="*" element={<Layout><NotFound /></Layout>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;