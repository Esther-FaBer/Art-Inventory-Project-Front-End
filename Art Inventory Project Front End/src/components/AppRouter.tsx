import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import ArtworksPage from '../components/ArtworksPage';

const ArtistsPage  = () => <div>Artists page coming soon</div>;
const ContactsPage = () => <div>Contacts page coming soon</div>;
const SalesPage = () => <div>Sales page coming soon</div>;
const NotFound  = () => <div>404 - Page not found</div>;

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