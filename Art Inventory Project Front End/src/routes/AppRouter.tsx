import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ArtworksPage from '../components/ArtworksPage';

const ArtistsPage  = () => <div>Artists page coming soon</div>;
const ContactsPage = () => <div>Contacts page coming soon</div>;
const SalesPage    = () => <div>Sales page coming soon</div>;
const NotFound     = () => <div>404 - Page not found</div>;

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Default route - redirect to artworks */}
        <Route path="/" element={<ArtworksPage />} />

        {/* Main pages */}
        <Route path="/artworks" element={<ArtworksPage />} />
        <Route path="/artists"  element={<ArtistsPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/sales"    element={<SalesPage />} />

        {/* Catch-all for any URL that doesn't match */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;